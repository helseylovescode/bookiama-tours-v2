"use client";

import { useActionState } from "react";
import {
  createQuotationPaymentLink,
  type PaymentLinkActionState,
} from "./actions";

const initialState: PaymentLinkActionState = { status: "idle" };

export default function PaymentLinkForm({
  quotationId,
}: {
  quotationId: string;
}) {
  const [state, action, isPending] = useActionState(
    createQuotationPaymentLink,
    initialState,
  );

  return (
    <div className="admin-payment-link">
      <form action={action}>
        <input type="hidden" name="quotation_id" value={quotationId} />
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating link..." : "Create payment link"}
        </button>
      </form>
      {state.status === "success" && (
        <div className="admin-payment-link-result" role="status">
          <p>{state.message}</p>
          <a href={state.paymentUrl} target="_blank" rel="noreferrer">
            Open payment page
          </a>
          <input
            aria-label="Customer payment link"
            readOnly
            value={state.paymentUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
          <small>Copy this link and send it to the customer.</small>
        </div>
      )}
      {state.status === "error" && (
        <p className="admin-save-message admin-save-message--error" role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}
