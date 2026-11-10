"use server";

import { revalidatePath } from "next/cache";
import { getAuthenticatedOwner } from "@/lib/admin";
import type { AdminActionState } from "../actions";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function formString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

export async function saveTour(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) {
    return { status: "error", message: "You do not have permission to manage tours." };
  }

  const id = formString(formData, "id");
  const destinationId = formString(formData, "destination_id");
  const categoryId = formString(formData, "category_id");
  const title = formString(formData, "title");
  const slug = formString(formData, "slug");
  const summary = formString(formData, "summary");
  const description = formString(formData, "description");
  const days = Number(formString(formData, "duration_days"));
  const nights = Number(formString(formData, "duration_nights"));
  const meetingPoint = formString(formData, "meeting_point");

  if (
    (id && !uuidPattern.test(id)) ||
    !uuidPattern.test(destinationId) ||
    (categoryId && !uuidPattern.test(categoryId)) ||
    !title ||
    title.length > 160 ||
    !slugPattern.test(slug) ||
    !Number.isInteger(days) ||
    days < 1 ||
    !Number.isInteger(nights) ||
    nights < 0
  ) {
    return {
      status: "error",
      message: "Check the title, URL slug, destination, and trip duration.",
    };
  }

  const record = {
    destination_id: destinationId,
    category_id: categoryId || null,
    title,
    slug,
    summary: summary || null,
    description: description || null,
    duration_days: days,
    duration_nights: nights,
    meeting_point: meetingPoint || null,
    highlights: lines(formString(formData, "highlights")),
    inclusions: lines(formString(formData, "inclusions")),
    exclusions: lines(formString(formData, "exclusions")),
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
  };

  const query = id
    ? supabase.from("tours").update(record).eq("id", id)
    : supabase.from("tours").insert(record);
  const { data, error } = await query.select("id").maybeSingle();

  if (error) {
    console.error("[admin.saveTour]", error.message);
    return {
      status: "error",
      message: "Could not save this tour. Check that its URL slug is unique and try again.",
    };
  }
  if (!data) {
    return { status: "error", message: "Tour not found or you do not have permission to update it." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  return { status: "success", message: id ? "Tour updated." : "Tour created." };
}
