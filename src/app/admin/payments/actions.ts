"use server";

import { randomBytes, randomUUID } from "node:crypto";
import { getAuthenticatedOwner } from "@/lib/admin";
import { getPublicSiteUrl } from "@/lib/payments/pesapal";

export type PaymentLinkActionState =
  | { status: "idle" }
  | { status: "success"; message: string; paymentUrl: string }
  | { status: "error"; message: string };

export async function createQuotationPaymentLink(
  _previousState: PaymentLinkActionState,
  formData: FormData,
): Promise<PaymentLinkActionState> {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) {
    return { status: "error", message: "You do not have permission to create payment links." };
  }

  const quotationId = formData.get("quotation_id");
  if (
    typeof quotationId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(quotationId)
  ) {
    return { status: "error", message: "The quotation is invalid." };
  }

  const { data: quotation, error: quotationError } = await supabase
    .from("custom_trip_quotations")
    .select("id,custom_trip_request_id,status,currency_code,total_amount,valid_until")
    .eq("id", quotationId)
    .maybeSingle();

  if (quotationError) {
    console.error("[admin.createQuotationPaymentLink]", quotationError.message);
    return { status: "error", message: "Could not load the quotation." };
  }
  if (!quotation || quotation.status !== "accepted") {
    return { status: "error", message: "Only accepted quotations can be paid." };
  }
  if (quotation.currency_code !== "KES") {
    return { status: "error", message: "Pesapal checkout is currently configured for KES quotations only." };
  }
  if (quotation.valid_until && quotation.valid_until < new Date().toISOString().slice(0, 10)) {
    return { status: "error", message: "This quotation has expired. Update its validity before requesting payment." };
  }

  const amount = Number(quotation.total_amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return { status: "error", message: "This quotation does not have a payable total." };
  }

  let siteUrl: string;
  try {
    siteUrl = getPublicSiteUrl();
  } catch (error) {
    console.error(
      "[admin.createQuotationPaymentLink.configuration]",
      error instanceof Error ? error.message : "Invalid site URL configuration.",
    );
    return {
      status: "error",
      message: "Payment links are unavailable until the hosted site URL is configured.",
    };
  }
  const { data: existingPayment, error: existingPaymentError } = await supabase
    .from("custom_trip_payments")
    .select("payment_token,status")
    .eq("quotation_id", quotation.id)
    .in("status", ["created", "initiating", "pending"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingPaymentError) {
    console.error("[admin.createQuotationPaymentLink]", existingPaymentError.message);
    return { status: "error", message: "Could not check existing payment links." };
  }

  if (existingPayment) {
    return {
      status: "success",
      message: "An active payment link already exists.",
      paymentUrl: `${siteUrl}/pay/${existingPayment.payment_token}`,
    };
  }

  const paymentToken = randomBytes(32).toString("base64url");
  const merchantReference = randomUUID();
  const { error: insertError } = await supabase.from("custom_trip_payments").insert({
    quotation_id: quotation.id,
    payment_token: paymentToken,
    merchant_reference: merchantReference,
    amount,
    currency_code: "KES",
    status: "created",
  });

  if (insertError) {
    if (insertError.code === "23505") {
      const { data: activePayment, error: activePaymentError } = await supabase
        .from("custom_trip_payments")
        .select("payment_token")
        .eq("quotation_id", quotation.id)
        .in("status", ["created", "initiating", "pending"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!activePaymentError && activePayment) {
        return {
          status: "success",
          message: "An active payment link already exists.",
          paymentUrl: `${siteUrl}/pay/${activePayment.payment_token}`,
        };
      }
      if (activePaymentError) {
        console.error("[admin.createQuotationPaymentLink]", activePaymentError.message);
      }
    }
    console.error("[admin.createQuotationPaymentLink]", insertError.message);
    return { status: "error", message: "Could not save the payment link. Please try again." };
  }

  return {
    status: "success",
    message: "Payment link created. Share it with the customer.",
    paymentUrl: `${siteUrl}/pay/${paymentToken}`,
  };
}
