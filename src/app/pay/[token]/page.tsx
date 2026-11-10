import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PayButton from "./PayButton";
import { createServiceClient } from "@/lib/supabase/service";
import "./payment.css";

export const metadata: Metadata = {
  title: "Complete your trip payment",
  robots: { index: false, follow: false },
};

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ result?: string }>;
}) {
  const [{ token }, query] = await Promise.all([params, searchParams]);
  if (!/^[A-Za-z0-9_-]{40,50}$/.test(token)) notFound();

  const supabase = createServiceClient();
  const { data: payment, error: paymentError } = await supabase
    .from("custom_trip_payments")
    .select("id,quotation_id,amount,currency_code,status,confirmation_code,order_tracking_id")
    .eq("payment_token", token)
    .maybeSingle();
  if (paymentError) {
    console.error("[payments.page]", paymentError.message);
    throw new Error("Could not load payment details.");
  }
  if (!payment) notFound();

  const { data: quotation, error: quotationError } = await supabase
    .from("custom_trip_quotations")
    .select("custom_trip_request_id,status,valid_until")
    .eq("id", payment.quotation_id)
    .maybeSingle();
  if (quotationError) {
    console.error("[payments.page]", quotationError.message);
    throw new Error("Could not verify payment quotation.");
  }
  if (!quotation) notFound();

  const { data: request, error: requestError } = await supabase
    .from("custom_trip_requests")
    .select("request_reference,contact_name")
    .eq("id", quotation.custom_trip_request_id)
    .maybeSingle();
  if (requestError) {
    console.error("[payments.page]", requestError.message);
    throw new Error("Could not load trip payment reference.");
  }
  if (!request) notFound();

  const expired = Boolean(
    quotation.valid_until &&
      quotation.valid_until < new Date().toISOString().slice(0, 10),
  );
  const payable =
    quotation.status === "accepted" &&
    !expired &&
    ["created", "pending"].includes(payment.status);

  return (
    <main className="payment-page">
      <section className="payment-card">
        <Link className="payment-brand" href="/">Bokiama <span>TOURS &amp; TRAVEL</span></Link>
        {payment.status === "completed" ? (
          <>
            <p className="payment-eyebrow">PAYMENT CONFIRMED</p>
            <h1>Thank you, {request.contact_name.split(/\s+/)[0]}.</h1>
            <p>Your payment for trip reference {request.request_reference} has been confirmed.</p>
            {payment.confirmation_code && <p className="payment-confirmation">Receipt: {payment.confirmation_code}</p>}
          </>
        ) : payment.status === "failed" || payment.status === "reversed" ? (
          <>
            <p className="payment-eyebrow">PAYMENT NOT COMPLETED</p>
            <h1>Please contact Bokiama Tours.</h1>
            <p>This payment request is no longer active. We can arrange another payment link or help with a refund.</p>
          </>
        ) : (
          <>
            <p className="payment-eyebrow">SECURE PAYMENT · M-PESA &amp; CARDS</p>
            <h1>Complete your trip payment</h1>
            <p>For {request.contact_name} · Trip reference {request.request_reference}</p>
            <div className="payment-amount">
              <span>Full confirmed quotation</span>
              <strong>KES {Number(payment.amount).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            {query.result === "pending" && (
              <p className="payment-notice" role="status">
                We have not received a final confirmation yet. Please allow a moment, then refresh this page.
              </p>
            )}
            {payable ? (
              <>
                <PayButton paymentToken={token} />
                <p className="payment-footnote">M-Pesa and card options are provided by Pesapal. Bokiama never receives or stores your card details.</p>
              </>
            ) : (
              <p className="payment-notice">This quotation is not currently payable. Please contact Bokiama Tours for assistance.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
