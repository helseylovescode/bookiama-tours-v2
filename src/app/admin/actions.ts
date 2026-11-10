"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedOwner } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const requestStatuses = [
  "requested",
  "planning",
  "quoted",
  "accepted",
  "declined",
  "cancelled",
  "converted",
] as const;

export async function updateEnquiry(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) {
    return { status: "error", message: "You do not have permission to update enquiries." };
  }

  const id = formData.get("id");
  const status = formData.get("status");
  const adminNotes = formData.get("admin_notes");

  if (
    typeof id !== "string" ||
    typeof status !== "string" ||
    !requestStatuses.includes(status as (typeof requestStatuses)[number]) ||
    (adminNotes !== null && typeof adminNotes !== "string")
  ) {
    return { status: "error", message: "The enquiry update was invalid." };
  }

  const { data, error } = await supabase
    .from("custom_trip_requests")
    .update({
      status,
      admin_notes: typeof adminNotes === "string" ? adminNotes.trim() || null : null,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[admin.updateEnquiry]", error.message);
    return { status: "error", message: "Could not save this enquiry. Please try again." };
  }

  if (!data) {
    return { status: "error", message: "Enquiry not found or you do not have permission to update it." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  return { status: "success", message: "Enquiry updated." };
}

export async function signOutAdmin() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[admin.auth.signOut]", error.message);
    throw new Error("Could not sign out.");
  }
  redirect("/admin/login");
}
