"use client";

import { useActionState } from "react";
import {
  startPesapalCheckout,
  type CheckoutActionState,
} from "./actions";

const initialState: CheckoutActionState = { status: "idle" };

export default function PayButton({ paymentToken }: { paymentToken: string }) {
  const [state, action, isPending] = useActionState(
    startPesapalCheckout,
    initialState,
  );

  return (
    <>
      <form action={action}>
        <input type="hidden" name="payment_token" value={paymentToken} />
        <button type="submit" disabled={isPending}>
          {isPending ? "Connecting to Pesapal..." : "Continue to Pesapal"}
        </button>
      </form>
      {state.status === "error" && (
        <p className="payment-notice" role="alert">{state.message}</p>
      )}
    </>
  );
}
