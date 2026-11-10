"use client";

import { useActionState } from "react";
import { createQuotation } from "./actions";
import type { AdminActionState } from "../actions";

type RequestOption = {
  id: string;
  request_reference: string;
  contact_name: string;
  contact_email: string;
  status: string;
};

const itemTypes = [
  ["accommodation", "Accommodation"],
  ["transport", "Transport"],
  ["activity", "Activity"],
  ["entry_fee", "Park & entry fees"],
  ["meal", "Meals"],
  ["guide", "Guide"],
  ["other", "Other"],
];
const initialState: AdminActionState = { status: "idle" };

export default function QuotationForm({ requests }: { requests: RequestOption[] }) {
  const [state, action, isPending] = useActionState(createQuotation, initialState);

  return (
    <form action={action} className="admin-quotation-form">
      <label>
        Enquiry *
        <select name="request_id" required defaultValue="">
          <option value="" disabled>Select an enquiry</option>
          {requests.map((request) => (
            <option value={request.id} key={request.id}>
              {request.request_reference} · {request.contact_name} ({request.status})
            </option>
          ))}
        </select>
      </label>
      <div className="admin-quotation-meta">
        <label>
          Currency
          <select name="currency_code" defaultValue="KES">
            {["KES", "USD", "EUR", "GBP"].map((currency) => (
              <option value={currency} key={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label>
          Taxes &amp; fees
          <input name="taxes_and_fees" type="number" min="0" step="0.01" defaultValue="0" />
        </label>
        <label>
          Valid until
          <input name="valid_until" type="date" min={new Date().toISOString().slice(0, 10)} />
        </label>
      </div>
      <div className="admin-quote-items">
        <p className="admin-quote-items-title">Line items <small>Enter at least one item. Totals are calculated when saved.</small></p>
        {Array.from({ length: 6 }, (_, index) => (
          <div className="admin-quote-item" key={index}>
            <label>
              <span className="admin-sr-only">Item type {index + 1}</span>
              <select name="item_type" defaultValue="other">
                {itemTypes.map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="admin-sr-only">Description {index + 1}</span>
              <input name="description" placeholder="Description" />
            </label>
            <label>
              <span className="admin-sr-only">Quantity {index + 1}</span>
              <input name="quantity" type="number" min="0.01" step="0.01" placeholder="Qty" />
            </label>
            <label>
              <span className="admin-sr-only">Unit price {index + 1}</span>
              <input name="unit_price" type="number" min="0" step="0.01" placeholder="Unit price" />
            </label>
          </div>
        ))}
      </div>
      <label>
        Message for the traveller
        <textarea name="customer_message" rows={3} maxLength={2000} />
      </label>
      {state.status !== "idle" && (
        <p className={`admin-save-message admin-save-message--${state.status}`} role={state.status === "error" ? "alert" : "status"}>
          {state.message}
        </p>
      )}
      <button type="submit" disabled={isPending || !requests.length}>
        {isPending ? "Saving..." : "Save as draft"}
      </button>
      {!requests.length && <p className="admin-inline-note">There are no enquiries available to quote yet.</p>}
    </form>
  );
}
