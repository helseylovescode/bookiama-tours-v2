import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedOwner } from "@/lib/admin";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAuthenticatedOwner()) redirect("/admin");

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <p className="admin-eyebrow">BOKIAMA TOURS &amp; TRAVEL</p>
        <h1>Welcome back.</h1>
        <p>Sign in with your owner account to manage enquiries and trips.</p>
        <LoginForm />
      </div>
    </main>
  );
}
