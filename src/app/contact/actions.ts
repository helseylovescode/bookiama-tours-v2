"use server";

import { randomBytes } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

export type FormState =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

// ─── Validation helpers ───────────────────────────────────────────────────────

function required(value: string, field: string): string | null {
  if (!value || value.trim().length === 0)
    return `${field} is required.`;
  return null;
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ─── Submit general enquiry or tour-specific enquiry ─────────────────────────

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Extract fields
  const name = (formData.get("name") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const phone = (formData.get("phone") as string) ?? "";
  const country = (formData.get("country") as string) ?? "";
  const tourName = (formData.get("tour_name") as string) ?? "";
  const enquiryType = (formData.get("enquiry_type") as string) ?? "general";
  const travelDate = (formData.get("travel_date") as string) ?? "";
  const adults = parseInt((formData.get("adults") as string) ?? "1", 10);
  const children = parseInt((formData.get("children") as string) ?? "0", 10);
  const budget = (formData.get("budget") as string) ?? "";
  const mood = (formData.get("mood") as string) ?? "";
  const message = (formData.get("message") as string) ?? "";
  const enquiryContext = [
    country ? `Traveller country: ${country.trim()}` : null,
    budget ? `Approximate budget: ${budget}` : null,
  ].filter(Boolean);

  // ── Validate ──
  const errors: string[] = [];
  const nameErr = required(name, "Full name");
  if (nameErr) errors.push(nameErr);
  const emailErr = required(email, "Email address");
  if (emailErr) errors.push(emailErr);
  else if (!validEmail(email)) errors.push("Please enter a valid email address.");
  const phoneErr = required(phone, "Phone number");
  if (phoneErr) errors.push(phoneErr);
  if (isNaN(adults) || adults < 1) errors.push("At least 1 adult is required.");

  if (errors.length > 0) {
    return { status: "error", message: errors.join(" ") };
  }

  const supabase = await createClient();
  const requestReference = `TRIP-${randomBytes(5).toString("hex").toUpperCase()}`;

  try {
    if (enquiryType === "tour" && tourName) {
      // ── Tour-specific booking request ──
      // We insert into booking_requests with the tour title in special_requests
      // since we don't have a tour UUID at this stage (pre-Supabase data).
      // Once tours are live in the DB, this will look up the tour_id by slug.
      const { error } = await supabase
        .from("custom_trip_requests")
        .insert({
          request_reference: requestReference,
          contact_name: name.trim(),
          contact_email: email.trim().toLowerCase(),
          contact_phone: phone.trim(),
          preferred_start_date: travelDate || null,
          flexible_dates: !travelDate,
          traveller_count: adults + children,
          budget_currency: "KES",
          travel_mood: mood || null,
          notes: [
            tourName ? `Tour of interest: ${tourName}` : null,
            ...enquiryContext,
            message ? message.trim() : null,
          ]
            .filter(Boolean)
            .join("\n\n") || null,
          status: "requested",
        });

      if (error) {
        console.error("[submitEnquiry] Supabase insert failed", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        return {
          status: "error",
          message:
            "We could not submit your enquiry right now. Please try again or call +254 799 941114.",
        };
      }

      return {
        status: "success",
        reference: requestReference,
      };
    } else {
      // ── General / custom trip enquiry ──
      const { error } = await supabase
        .from("custom_trip_requests")
        .insert({
          request_reference: requestReference,
          contact_name: name.trim(),
          contact_email: email.trim().toLowerCase(),
          contact_phone: phone.trim(),
          preferred_start_date: travelDate || null,
          flexible_dates: !travelDate,
          traveller_count: adults + children > 0 ? adults + children : null,
          budget_currency: "KES",
          travel_mood: mood || null,
          notes: [...enquiryContext, message ? message.trim() : null]
            .filter(Boolean)
            .join("\n\n") || null,
          status: "requested",
        });

      if (error) {
        console.error("[submitEnquiry] Supabase insert failed", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        return {
          status: "error",
          message:
            "We could not submit your enquiry right now. Please try again or call +254 799 941114.",
        };
      }

      return {
        status: "success",
        reference: requestReference,
      };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please try again later or email oyujelsey@gmail.com.",
    };
  }
}
