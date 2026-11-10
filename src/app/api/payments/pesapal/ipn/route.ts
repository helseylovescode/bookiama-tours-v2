import { NextRequest } from "next/server";
import { getPesapalTransactionStatus } from "@/lib/payments/pesapal";
import { createServiceClient } from "@/lib/supabase/service";

type PesapalNotification = {
  orderTrackingId: string;
  merchantReference: string;
  notificationType: string;
};

function notificationFrom(
  values: URLSearchParams | Record<string, unknown>,
): PesapalNotification | null {
  const get = (key: string) => {
    if (values instanceof URLSearchParams) return values.get(key);
    const value = values[key];
    return typeof value === "string" ? value : null;
  };
  const orderTrackingId = get("OrderTrackingId");
  const merchantReference = get("OrderMerchantReference");
  const notificationType = get("OrderNotificationType") ?? "";
  if (!orderTrackingId || !merchantReference) return null;
  return { orderTrackingId, merchantReference, notificationType };
}

async function updatePayment(notification: PesapalNotification) {
  const supabase = createServiceClient();
  const { data: payment, error: paymentError } = await supabase
    .from("custom_trip_payments")
    .select("id,payment_token,merchant_reference,amount,currency_code,status")
    .eq("order_tracking_id", notification.orderTrackingId)
    .maybeSingle();

  if (paymentError) {
    console.error("[payments.pesapal.ipn.lookup]", paymentError.message);
    throw new Error("Could not find the Pesapal payment.");
  }
  if (!payment || payment.merchant_reference !== notification.merchantReference) {
    throw new Error("The Pesapal notification did not match a payment.");
  }

  const providerStatus = await getPesapalTransactionStatus(notification.orderTrackingId);
  if (
    providerStatus.merchantReference !== payment.merchant_reference ||
    providerStatus.currency !== payment.currency_code ||
    Math.round(providerStatus.amount * 100) !== Math.round(Number(payment.amount) * 100)
  ) {
    throw new Error("Pesapal transaction details did not match the payment request.");
  }

  const description = providerStatus.paymentStatusDescription.trim().toLowerCase();
  const nextStatus =
    description === "completed"
      ? "completed"
      : description === "failed" || description === "invalid"
        ? "failed"
        : description === "reversed"
          ? "reversed"
          : "pending";
  const finalStatus =
    payment.status === "reversed"
      ? "reversed"
      : payment.status === "completed" && ["pending", "failed"].includes(nextStatus)
        ? "completed"
        : nextStatus;
  const { error: updateError } = await supabase
    .from("custom_trip_payments")
    .update({
      status: finalStatus,
      provider_status: providerStatus.paymentStatusDescription,
      confirmation_code: providerStatus.confirmationCode,
      completed_at: finalStatus === "completed" ? new Date().toISOString() : null,
    })
    .eq("id", payment.id);

  if (updateError) {
    console.error("[payments.pesapal.ipn.update]", updateError.message);
    throw new Error("Could not save the verified Pesapal payment status.");
  }

  return { paymentToken: payment.payment_token, status: finalStatus };
}

function isCallback(notificationType: string) {
  return notificationType.toUpperCase().includes("CALLBACK");
}

export async function GET(request: NextRequest) {
  const notification = notificationFrom(request.nextUrl.searchParams);
  if (!notification) return new Response("Invalid Pesapal notification.", { status: 400 });

  try {
    const result = await updatePayment(notification);
    if (isCallback(notification.notificationType)) {
      const url = new URL(`/pay/${result.paymentToken}`, request.nextUrl.origin);
      url.searchParams.set("result", result.status);
      return Response.redirect(url, 303);
    }

    return Response.json({
      orderNotificationType: notification.notificationType,
      orderTrackingId: notification.orderTrackingId,
      orderMerchantReference: notification.merchantReference,
      status: 200,
    });
  } catch (error) {
    console.error(
      "[payments.pesapal.ipn]",
      error instanceof Error ? error.message : "Unknown notification error.",
    );
    return new Response("Could not verify Pesapal notification.", { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  let notification: PesapalNotification | null = notificationFrom(
    request.nextUrl.searchParams,
  );
  const contentType = request.headers.get("content-type") ?? "";
  if (!notification && contentType.includes("application/json")) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid Pesapal notification.", { status: 400 });
    }
    if (typeof body === "object" && body !== null) {
      notification = notificationFrom(body as Record<string, unknown>);
    }
  } else if (!notification && contentType.includes("application/x-www-form-urlencoded")) {
    notification = notificationFrom(new URLSearchParams(await request.text()));
  }
  if (!notification) return new Response("Invalid Pesapal notification.", { status: 400 });

  try {
    await updatePayment(notification);
    return Response.json({
      orderNotificationType: notification.notificationType,
      orderTrackingId: notification.orderTrackingId,
      orderMerchantReference: notification.merchantReference,
      status: 200,
    });
  } catch (error) {
    console.error(
      "[payments.pesapal.ipn]",
      error instanceof Error ? error.message : "Unknown notification error.",
    );
    return new Response("Could not verify Pesapal notification.", { status: 502 });
  }
}
