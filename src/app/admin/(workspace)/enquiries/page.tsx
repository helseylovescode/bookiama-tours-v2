import type { Metadata } from "next";
import Link from "next/link";
import { getAuthenticatedOwner } from "@/lib/admin";
import EnquiryCard from "../request-card";

export const metadata: Metadata = { title: "Enquiry inbox" };

const statuses = [
  "all",
  "requested",
  "planning",
  "quoted",
  "accepted",
  "declined",
  "cancelled",
  "converted",
] as const;

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminInboxPage({ searchParams }: Props) {
  const { status: requestedStatus } = await searchParams;
  const status = statuses.includes(requestedStatus as (typeof statuses)[number])
    ? requestedStatus!
    : "all";
  const supabase = await getAuthenticatedOwner();

  if (!supabase) return null;

  let query = supabase
    .from("custom_trip_requests")
    .select(
      "id, request_reference, contact_name, contact_email, contact_phone, preferred_start_date, flexible_dates, traveller_count, travel_mood, notes, admin_notes, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (status !== "all") query = query.eq("status", status);

  const { data: enquiries, error } = await query;
  if (error) {
    console.error("[admin.getEnquiries]", error.message);
    throw new Error("Could not load enquiries.");
  }

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">CUSTOMER ENQUIRIES</p>
          <h1>Enquiry inbox</h1>
          <p>Review trip requests and keep each conversation moving.</p>
        </div>
        <Link href="/contact" className="admin-public-link">Open enquiry form ↗</Link>
      </header>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Recent enquiries</h2>
            <p>{enquiries.length} {enquiries.length === 1 ? "request" : "requests"}{status !== "all" ? ` · ${status}` : " · latest 100"}</p>
          </div>
          <form method="get" className="admin-filter">
            <label htmlFor="status-filter">Status</label>
            <select id="status-filter" name="status" defaultValue={status}>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All enquiries" : item[0].toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
            <button type="submit">Filter</button>
          </form>
        </div>

        {enquiries.length ? (
          <div className="admin-request-list">
            {enquiries.map((enquiry) => (
              <EnquiryCard key={enquiry.id} enquiry={enquiry} />
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <h3>No enquiries here yet</h3>
            <p>New website requests will appear in this inbox.</p>
          </div>
        )}
      </section>
    </div>
  );
}
