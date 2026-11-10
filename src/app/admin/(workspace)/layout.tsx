import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedOwner } from "@/lib/admin";
import { signOutAdmin } from "../actions";
import "../admin.css";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  if (!(await getAuthenticatedOwner())) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-mark">B</span>
          <span>Bokiama<small>TOURS &amp; TRAVEL</small></span>
        </Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/enquiries">Enquiries</Link>
          <Link href="/admin/tours">Tours</Link>
          <Link href="/admin/quotations">Quotations</Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/">View website</Link>
          <form action={signOutAdmin}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
