import type { Metadata } from "next";
import Link from "next/link";
import { getAuthenticatedOwner } from "@/lib/admin";

export const metadata: Metadata = { title: "Dashboard overview" };

function monthStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

export default async function AdminOverviewPage() {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) return null;

  const monthStartDate = monthStart();
  const [total, newRequests, planning, quoted, converted, thisMonth, recent] =
    await Promise.all([
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }),
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }).eq("status", "requested"),
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }).eq("status", "planning"),
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }).eq("status", "quoted"),
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }).in("status", ["accepted", "converted"]),
      supabase.from("custom_trip_requests").select("id", { count: "exact", head: true }).gte("created_at", monthStartDate),
      supabase
        .from("custom_trip_requests")
        .select("id, request_reference, contact_name, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const results = [total, newRequests, planning, quoted, converted, thisMonth, recent];
  const failedQuery = results.find((result) => result.error);
  if (failedQuery?.error) {
    console.error("[admin.getOverview]", failedQuery.error.message);
    throw new Error("Could not load dashboard metrics.");
  }

  const cards = [
    { label: "All enquiries", value: total.count ?? 0, tone: "navy" },
    { label: "Awaiting review", value: newRequests.count ?? 0, tone: "gold" },
    { label: "In planning", value: planning.count ?? 0, tone: "green" },
    { label: "Quotes issued", value: quoted.count ?? 0, tone: "blue" },
    { label: "Confirmed trips", value: converted.count ?? 0, tone: "green" },
    { label: "Received this month", value: thisMonth.count ?? 0, tone: "cream" },
  ];

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">YOUR WORKSPACE</p>
          <h1>Good to see you.</h1>
          <p>A clear view of new requests and what needs attention.</p>
        </div>
        <Link href="/admin/enquiries?status=requested" className="admin-public-link">
          Review new enquiries ↗
        </Link>
      </header>

      <section className="admin-metric-grid" aria-label="Enquiry overview">
        {cards.map((card) => (
          <article className={`admin-metric-card admin-metric-card--${card.tone}`} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value.toLocaleString()}</strong>
          </article>
        ))}
      </section>

      <section className="admin-panel admin-recent-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Latest enquiries</h2>
            <p>The most recent requests sent from your website.</p>
          </div>
          <Link href="/admin/enquiries" className="admin-text-link">Open inbox →</Link>
        </div>
        {recent.data?.length ? (
          <div className="admin-recent-list">
            {recent.data.map((enquiry) => (
              <Link href="/admin/enquiries" className="admin-recent-row" key={enquiry.id}>
                <span>
                  <strong>{enquiry.contact_name}</strong>
                  <small>{enquiry.request_reference} · {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(enquiry.created_at))}</small>
                </span>
                <span className={`admin-status admin-status--${enquiry.status}`}>{enquiry.status}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <h3>No enquiries yet</h3>
            <p>New website requests will appear here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
