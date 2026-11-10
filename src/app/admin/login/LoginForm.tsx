"use client";

import { useActionState } from "react";
import { signInAdmin, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, action, isPending] = useActionState(signInAdmin, initialState);

  return (
    <form action={action} className="admin-login-form">
      <label htmlFor="admin-email">Email address</label>
      <input
        id="admin-email"
        name="email"
        type="email"
        autoComplete="username"
        required
      />
      <label htmlFor="admin-password">Password</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
