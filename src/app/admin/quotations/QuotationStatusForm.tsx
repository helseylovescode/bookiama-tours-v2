"use client";

import { useActionState } from "react";
import { updateQuotationStatus } from "./actions";
import type { AdminActionState } from "../actions";

const initialState: AdminActionState = { status: "idle" };
const statuses = ["draft", "sent", "accepted", "rejected", "expired"];

export default function QuotationStatusForm({
  quotationId,
  status,
}: {
  quotationId: string;
  status: string;
}) {
  const [state, action, isPending] = useActionState(updateQuotationStatus, initialState);

  return (
    <form action={action} className="admin-quote-status-form">
      <input type="hidden" name="quotation_id" value={quotationId} />
      <label>
        <span className="admin-sr-only">Quotation status</span>
        <select name="status" defaultValue={status}>
          {statuses.map((item) => (
            <option value={item} key={item}>{item[0].toUpperCase() + item.slice(1)}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Update"}</button>
      {state.status !== "idle" && (
        <span className={`admin-save-message admin-save-message--${state.status}`} role={state.status === "error" ? "alert" : "status"}>
          {state.message}
        </span>
      )}
    </form>
  );
}
