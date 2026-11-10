import type { Metadata } from "next";
import { getAuthenticatedOwner } from "@/lib/admin";
import QuotationForm from "../../quotations/QuotationForm";
import QuotationStatusForm from "../../quotations/QuotationStatusForm";
import PaymentLinkForm from "../../payments/PaymentLinkForm";

export const metadata: Metadata = { title: "Quotation management" };

export default async function AdminQuotationsPage() {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) return null;

  const [requestsResult, quotationsResult] = await Promise.all([
    supabase
      .from("custom_trip_requests")
      .select("id,request_reference,contact_name,contact_email,status")
      .in("status", ["requested", "planning", "quoted", "accepted"])
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("custom_trip_quotations")
      .select("id,custom_trip_request_id,version,currency_code,subtotal,taxes_and_fees,total_amount,valid_until,status,customer_message,created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const failed = [requestsResult.error, quotationsResult.error].find(Boolean);
  if (failed) {
    console.error("[admin.getQuotations]", failed.message);
    throw new Error("Could not load quotation management.");
  }

  const requests = requestsResult.data ?? [];
  const quotations = quotationsResult.data ?? [];
  const requestIds = [...new Set(quotations.map((quote) => quote.custom_trip_request_id))];
  const quotationIds = quotations.map((quote) => quote.id);
  const [relatedRequestsResult, itemsResult, paymentsResult] = await Promise.all([
    requestIds.length
      ? supabase
          .from("custom_trip_requests")
          .select("id,request_reference,contact_name,contact_email")
          .in("id", requestIds)
      : Promise.resolve({ data: [], error: null }),
    quotationIds.length
      ? supabase
          .from("quotation_items")
          .select("id,quotation_id,item_type,description,quantity,unit_price,line_total,display_order")
          .in("quotation_id", quotationIds)
          .order("display_order", { ascending: true })
      : Promise.resolve({ data: [], error: null }),
    quotationIds.length
      ? supabase
          .from("custom_trip_payments")
          .select("id,quotation_id,payment_token,status,amount,currency_code,confirmation_code,created_at")
          .in("quotation_id", quotationIds)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ]);

  const relatedError = relatedRequestsResult.error ?? itemsResult.error ?? paymentsResult.error;
  if (relatedError) {
    console.error("[admin.getQuotationDetails]", relatedError.message);
    throw new Error("Could not load quotation details.");
  }

  const requestById = new Map((relatedRequestsResult.data ?? []).map((request) => [request.id, request]));
  const itemsByQuotation = new Map<string, typeof itemsResult.data>();
  for (const item of itemsResult.data ?? []) {
    const items = itemsByQuotation.get(item.quotation_id) ?? [];
    items.push(item);
    itemsByQuotation.set(item.quotation_id, items);
  }
  const paymentsByQuotation = new Map<string, typeof paymentsResult.data>();
  for (const payment of paymentsResult.data ?? []) {
    const payments = paymentsByQuotation.get(payment.quotation_id) ?? [];
    payments.push(payment);
    paymentsByQuotation.set(payment.quotation_id, payments);
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">PERSONALISED PRICING</p>
          <h1>Quotations</h1>
          <p>Prepare itemised travel quotes for customer enquiries.</p>
        </div>
        <span className="admin-tour-count">{quotations.length} saved</span>
      </header>

      <section className="admin-panel admin-create-quotation">
        <div className="admin-panel-heading">
          <div>
            <h2>Prepare a quotation</h2>
            <p>New quotations are saved as drafts and are not emailed automatically.</p>
          </div>
        </div>
        <QuotationForm requests={requests} />
      </section>

      <section className="admin-panel admin-quotation-list-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Saved quotations</h2>
            <p>Update status after you send or hear back about a quote.</p>
          </div>
        </div>
        {quotations.length ? (
          <div className="admin-saved-quotations">
            {quotations.map((quotation) => {
              const request = requestById.get(quotation.custom_trip_request_id);
              const items = itemsByQuotation.get(quotation.id) ?? [];
              const payments = paymentsByQuotation.get(quotation.id) ?? [];
              const emailBody = [
                `Quotation ${quotation.version} for ${request?.request_reference ?? "your trip enquiry"}`,
                "",
                ...items.map((item) => `${item.description}: ${quotation.currency_code} ${Number(item.line_total).toLocaleString()}`),
                "",
                `Subtotal: ${quotation.currency_code} ${Number(quotation.subtotal).toLocaleString()}`,
                `Taxes and fees: ${quotation.currency_code} ${Number(quotation.taxes_and_fees).toLocaleString()}`,
                `Total: ${quotation.currency_code} ${Number(quotation.total_amount).toLocaleString()}`,
                quotation.valid_until ? `Valid until: ${quotation.valid_until}` : "",
                quotation.customer_message ?? "",
              ].filter(Boolean).join("\n");

              return (
                <article className="admin-saved-quotation" key={quotation.id}>
                  <div className="admin-saved-quotation-header">
                    <div>
                      <span className="admin-reference">{request?.request_reference ?? "Enquiry"}</span>
                      <h3>{request?.contact_name ?? "Customer"} · Quote {quotation.version}</h3>
                      {request?.contact_email && <a href={`mailto:${request.contact_email}`}>{request.contact_email}</a>}
                    </div>
                    <span className={`admin-status admin-status--${quotation.status === "accepted" ? "accepted" : quotation.status === "rejected" || quotation.status === "expired" ? "declined" : quotation.status === "sent" ? "quoted" : "requested"}`}>{quotation.status}</span>
                  </div>
                  <ul className="admin-quote-line-list">
                    {items.map((item) => (
                      <li key={item.id}>
                        <span>{item.description}<small>{Number(item.quantity).toLocaleString()} × {quotation.currency_code} {Number(item.unit_price).toLocaleString()}</small></span>
                        <strong>{quotation.currency_code} {Number(item.line_total).toLocaleString()}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="admin-quote-totals">
                    <span>Subtotal <strong>{quotation.currency_code} {Number(quotation.subtotal).toLocaleString()}</strong></span>
                    <span>Taxes &amp; fees <strong>{quotation.currency_code} {Number(quotation.taxes_and_fees).toLocaleString()}</strong></span>
                    <span>Total <strong>{quotation.currency_code} {Number(quotation.total_amount).toLocaleString()}</strong></span>
                  </div>
                  {quotation.customer_message && <p className="admin-request-notes">{quotation.customer_message}</p>}
                  {quotation.status === "accepted" && quotation.currency_code === "KES" && (
                    <div className="admin-quotation-payments">
                      <h4>Payment</h4>
                      <PaymentLinkForm quotationId={quotation.id} />
                    </div>
                  )}
                  {payments.map((payment) => (
                    <div className="admin-quotation-payment-row" key={payment.id}>
                      <span>
                        Payment link · {payment.status} · KES {Number(payment.amount).toLocaleString()}
                        {payment.confirmation_code ? ` · Receipt ${payment.confirmation_code}` : ""}
                      </span>
                      {payment.status === "created" || payment.status === "pending" ? (
                        <a
                          href={`/pay/${payment.payment_token}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open customer link
                        </a>
                      ) : null}
                    </div>
                  ))}
                  <div className="admin-quotation-footer">
                    <span>{quotation.valid_until ? `Valid until ${quotation.valid_until}` : "No expiry date"} · {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(quotation.created_at))}</span>
                    {request?.contact_email && (
                      <a className="admin-public-link" href={`mailto:${request.contact_email}?subject=${encodeURIComponent(`Bokiama travel quotation ${quotation.version}`)}&body=${encodeURIComponent(emailBody)}`}>
                        Prepare email ↗
                      </a>
                    )}
                  </div>
                  <QuotationStatusForm quotationId={quotation.id} status={quotation.status} />
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty-state">
            <h3>No quotations yet</h3>
            <p>Prepare a quote from a customer enquiry above.</p>
          </div>
        )}
      </section>
    </div>
  );
}
