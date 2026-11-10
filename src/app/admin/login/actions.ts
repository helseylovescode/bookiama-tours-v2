"use server";

import { redirect } from "next/navigation";
import { getAuthenticatedOwner } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function signInAdmin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { error: "Unable to sign in with those credentials." };
  }

  const ownerClient = await getAuthenticatedOwner();
  if (!ownerClient) {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("[admin.login.signOutNonOwner]", signOutError.message);
    }
    return { error: "This account does not have owner access." };
  }

  redirect("/admin");
}
