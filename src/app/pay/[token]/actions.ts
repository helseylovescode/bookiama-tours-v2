"use server";

import { redirect } from "next/navigation";
import {
  getPublicSiteUrl,
  getPesapalAccessToken,
  submitPesapalOrder,
} from "@/lib/payments/pesapal";
import { createServiceClient } from "@/lib/supabase/service";

export type CheckoutActionState =
  | { status: "idle" }
  | { status: "error"; message: string };

async function createCheckoutSession(paymentToken: string) {
  const notificationId = process.env.PESAPAL_IPN_ID;
  if (!notificationId) throw new Error("PESAPAL_IPN_ID is not configured.");

  const supabase = createServiceClient();
  const { data: payment, error: paymentError } = await supabase
    .from("custom_trip_payments")
    .select("id,quotation_id,merchant_reference,order_tracking_id,checkout_url,amount,currency_code,status")
    .eq("payment_token", paymentToken)
    .maybeSingle();

  if (paymentError) {
    console.error("[payments.pesapal.checkout.payment]", paymentError.message);
    throw new Error("Could not load this payment request.");
  }
  if (!payment || !["created", "pending"].includes(payment.status)) {
    throw new Error("This payment request is no longer available.");
  }
  if (payment.checkout_url && payment.order_tracking_id) {
    return payment.checkout_url;
  }
  if (payment.status === "pending") {
    throw new Error("Your payment session is being prepared. Please wait a moment and try again.");
  }

  const { data: quotation, error: quotationError } = await supabase
    .from("custom_trip_quotations")
    .select("custom_trip_request_id,status,currency_code,total_amount,valid_until")
    .eq("id", payment.quotation_id)
    .maybeSingle();
  if (quotationError) {
    console.error("[payments.pesapal.checkout.quotation]", quotationError.message);
    throw new Error("Could not verify the quotation.");
  }
  if (
    !quotation ||
    quotation.status !== "accepted" ||
    quotation.currency_code !== "KES" ||
    Number(quotation.total_amount) !== Number(payment.amount) ||
    (quotation.valid_until && quotation.valid_until < new Date().toISOString().slice(0, 10))
  ) {
    throw new Error("This quotation is no longer available for payment.");
  }

  const { data: request, error: requestError } = await supabase
    .from("custom_trip_requests")
    .select("request_reference,contact_name,contact_email,contact_phone")
    .eq("id", quotation.custom_trip_request_id)
    .maybeSingle();
  if (requestError) {
    console.error("[payments.pesapal.checkout.request]", requestError.message);
    throw new Error("Could not load customer payment details.");
  }
  if (!request) throw new Error("The customer enquiry could not be found.");

  const { data: claimedPayment, error: claimError } = await createServiceClient()
    .from("custom_trip_payments")
    .update({ status: "initiating" })
    .eq("id", payment.id)
    .eq("status", "created")
    .select("id")
    .maybeSingle();
  if (claimError) {
    console.error("[payments.pesapal.checkout.claim]", claimError.message);
    throw new Error("Could not start the payment session.");
  }
  if (!claimedPayment) {
    throw new Error("The payment session is already being prepared. Please try again shortly.");
  }

  let checkoutUrl: string;
  let orderSubmitted = false;
  try {
    const accessToken = await getPesapalAccessToken();
    const siteUrl = getPublicSiteUrl();
    const order = await submitPesapalOrder({
      accessToken,
      merchantReference: payment.merchant_reference,
      notificationId,
      callbackUrl: `${siteUrl}/api/payments/pesapal/ipn`,
      amount: Number(payment.amount),
      description: `Bokiama trip ${request.request_reference}`,
      email: request.contact_email,
      phone: request.contact_phone,
      name: request.contact_name,
    });
    orderSubmitted = true;

    if (order.merchantReference !== payment.merchant_reference) {
      throw new Error("Pesapal returned a different merchant reference.");
    }

    const { error: updateError } = await createServiceClient()
      .from("custom_trip_payments")
      .update({
        order_tracking_id: order.orderTrackingId,
        checkout_url: order.redirectUrl,
        status: "pending",
      })
      .eq("id", payment.id)
      .eq("status", "initiating");
    if (updateError) {
      console.error("[payments.pesapal.checkout]", updateError.message);
      throw new Error("Could not save the Pesapal checkout session.");
    }
    checkoutUrl = order.redirectUrl;
  } catch (error) {
    if (!orderSubmitted) {
      const { error: releaseError } = await createServiceClient()
        .from("custom_trip_payments")
        .update({ status: "created" })
        .eq("id", payment.id)
        .eq("status", "initiating");
      if (releaseError) throw new Error("Could not release the payment session after the checkout attempt failed.");
    }
    throw error;
  }

  return checkoutUrl;
}

export async function startPesapalCheckout(
  _previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const paymentToken = formData.get("payment_token");
  if (typeof paymentToken !== "string" || !/^[A-Za-z0-9_-]{40,50}$/.test(paymentToken)) {
    return { status: "error", message: "This payment link is invalid." };
  }

  let checkoutUrl: string;
  try {
    checkoutUrl = await createCheckoutSession(paymentToken);
  } catch (error) {
    console.error(
      "[payments.pesapal.checkout]",
      error instanceof Error ? error.message : "Unknown checkout error.",
    );
    return {
      status: "error",
      message: "We could not start checkout right now. Please contact Bokiama Tours for help.",
    };
  }

  redirect(checkoutUrl);
}
