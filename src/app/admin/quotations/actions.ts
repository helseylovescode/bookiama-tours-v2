"use server";

import { revalidatePath } from "next/cache";
import { getAuthenticatedOwner } from "@/lib/admin";
import type { AdminActionState } from "../actions";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const itemTypes = [
  "accommodation",
  "transport",
  "activity",
  "entry_fee",
  "meal",
  "guide",
  "other",
] as const;
const currencies = ["KES", "USD", "EUR", "GBP"] as const;
const quotationStatuses = ["draft", "sent", "accepted", "rejected", "expired"] as const;

function isStringArray(values: FormDataEntryValue[]): values is string[] {
  return values.every((value): value is string => typeof value === "string");
}

export async function createQuotation(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) {
    return { status: "error", message: "You do not have permission to create quotations." };
  }

  const requestId = formData.get("request_id");
  const currencyCode = formData.get("currency_code");
  const validUntil = formData.get("valid_until");
  const customerMessage = formData.get("customer_message");
  const taxesValue = formData.get("taxes_and_fees");
  const itemTypeValues = formData.getAll("item_type");
  const descriptions = formData.getAll("description");
  const quantities = formData.getAll("quantity");
  const unitPrices = formData.getAll("unit_price");

  if (
    typeof requestId !== "string" ||
    !uuidPattern.test(requestId) ||
    typeof currencyCode !== "string" ||
    !currencies.includes(currencyCode as (typeof currencies)[number]) ||
    (validUntil !== null && typeof validUntil !== "string") ||
    (customerMessage !== null && typeof customerMessage !== "string") ||
    (taxesValue !== null && typeof taxesValue !== "string") ||
    !isStringArray(itemTypeValues) ||
    !isStringArray(descriptions) ||
    !isStringArray(quantities) ||
    !isStringArray(unitPrices) ||
    itemTypeValues.length !== descriptions.length ||
    itemTypeValues.length !== quantities.length ||
    itemTypeValues.length !== unitPrices.length
  ) {
    return { status: "error", message: "The quotation details are invalid." };
  }

  const taxesAndFees = taxesValue ? Number(taxesValue) : 0;
  if (!Number.isFinite(taxesAndFees) || taxesAndFees < 0) {
    return { status: "error", message: "Enter a valid non-negative amount for taxes and fees." };
  }

  if (customerMessage && customerMessage.length > 2000) {
    return { status: "error", message: "The customer message must be 2,000 characters or fewer." };
  }

  if (validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(validUntil)) {
    return { status: "error", message: "Enter a valid quotation expiry date." };
  }

  const items: {
    item_type: (typeof itemTypes)[number];
    description: string;
    quantity: number;
    unit_price: number;
  }[] = [];

  for (let index = 0; index < descriptions.length; index += 1) {
    const description = descriptions[index].trim();
    const quantityValue = quantities[index].trim();
    const priceValue = unitPrices[index].trim();
    if (!description && !quantityValue && !priceValue) continue;

    const itemType = itemTypeValues[index];
    const quantity = Number(quantityValue);
    const unitPrice = Number(priceValue);
    if (
      !itemTypes.includes(itemType as (typeof itemTypes)[number]) ||
      !description ||
      description.length > 500 ||
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(unitPrice) ||
      unitPrice < 0
    ) {
      return { status: "error", message: `Check quotation line ${index + 1}.` };
    }

    items.push({
      item_type: itemType as (typeof itemTypes)[number],
      description,
      quantity,
      unit_price: unitPrice,
    });
  }

  if (!items.length) {
    return { status: "error", message: "Add at least one quotation line item." };
  }

  const { data: quotationId, error } = await supabase.rpc(
    "create_owner_custom_trip_quotation",
    {
      p_request_id: requestId,
      p_currency_code: currencyCode,
      p_taxes_and_fees: taxesAndFees,
      p_valid_until: validUntil || null,
      p_customer_message: customerMessage || null,
      p_items: items,
    },
  );

  if (error) {
    console.error("[admin.createQuotation]", error.message);
    return { status: "error", message: "Could not create the quotation. Please review the details and try again." };
  }

  if (typeof quotationId !== "string") {
    console.error("[admin.createQuotation] The database did not return a quotation ID.");
    return { status: "error", message: "The quotation could not be confirmed as saved." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/quotations");
  return { status: "success", message: "Quotation saved as a draft." };
}

export async function updateQuotationStatus(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) {
    return { status: "error", message: "You do not have permission to update quotations." };
  }

  const quotationId = formData.get("quotation_id");
  const status = formData.get("status");
  if (
    typeof quotationId !== "string" ||
    !uuidPattern.test(quotationId) ||
    typeof status !== "string" ||
    !quotationStatuses.includes(status as (typeof quotationStatuses)[number])
  ) {
    return { status: "error", message: "The quotation update was invalid." };
  }

  const { data, error } = await supabase
    .from("custom_trip_quotations")
    .update({ status })
    .eq("id", quotationId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[admin.updateQuotationStatus]", error.message);
    return { status: "error", message: "Could not update quotation status." };
  }
  if (!data) {
    return { status: "error", message: "Quotation not found or you do not have permission to update it." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/quotations");
  return { status: "success", message: "Quotation status updated." };
}
