"use client";

import { useActionState } from "react";
import { updateEnquiry, type AdminActionState } from "../actions";

type Enquiry = {
  id: string;
  request_reference: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  preferred_start_date: string | null;
  flexible_dates: boolean;
  traveller_count: number | null;
  travel_mood: string | null;
  notes: string | null;
  admin_notes: string | null;
  status: string;
  created_at: string;
};

const initialState: AdminActionState = { status: "idle" };
const statuses = ["requested", "planning", "quoted", "accepted", "declined", "cancelled", "converted"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const [state, action, isPending] = useActionState(updateEnquiry, initialState);

  return (
    <article className="admin-request-card">
      <header className="admin-request-header">
        <div>
          <span className="admin-reference">{enquiry.request_reference}</span>
          <h3>{enquiry.contact_name}</h3>
        </div>
        <span className={`admin-status admin-status--${enquiry.status}`}>{enquiry.status}</span>
      </header>
      <p className="admin-request-time">{formatDate(enquiry.created_at)}</p>
      <div className="admin-request-details">
        <a href={`mailto:${enquiry.contact_email}`}>{enquiry.contact_email}</a>
        <a href={`tel:${enquiry.contact_phone}`}>{enquiry.contact_phone}</a>
        <span>{enquiry.traveller_count ?? "—"} travellers</span>
        <span>
          {enquiry.flexible_dates
            ? "Dates flexible"
            : enquiry.preferred_start_date
              ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${enquiry.preferred_start_date}T00:00:00`))
              : "Date not set"}
        </span>
        {enquiry.travel_mood && <span>{enquiry.travel_mood}</span>}
      </div>
      {enquiry.notes && <p className="admin-request-notes">{enquiry.notes}</p>}
      <form action={action} className="admin-request-update">
        <input type="hidden" name="id" value={enquiry.id} />
        <label>
          Status
          <select name="status" defaultValue={enquiry.status}>
            {statuses.map((status) => (
              <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </label>
        <label className="admin-notes-field">
          Private team notes
          <textarea name="admin_notes" defaultValue={enquiry.admin_notes ?? ""} rows={2} />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save updates"}
        </button>
        {state.status !== "idle" && (
          <span className={`admin-save-message admin-save-message--${state.status}`} role={state.status === "error" ? "alert" : "status"}>
            {state.message}
          </span>
        )}
      </form>
    </article>
  );
}
