/**
 * Bokiama Tours & Travel — Supabase query functions
 *
 * All queries run server-side (Server Components / Server Actions).
 * Each function returns typed data or throws so the caller can handle errors.
 *
 * Shape mirrors the static data.ts types so pages can accept either source
 * without changing their rendering logic.
 */

import { createClient } from "@/lib/supabase/server";

// ─── Shared types (subset of DB columns needed by the UI) ────────────────────

export interface DBTourPrice {
  label: string;
  currency_code: string;
  adult_price: number;
  child_price: number | null;
  pricing_category_code: string;
  display_order: number;
}

export interface DBItineraryDay {
  day_number: number;
  title: string;
  description: string | null;
  overnight_location: string | null;
}

export interface DBTourImage {
  storage_path: string;
  alt_text: string | null;
  is_cover: boolean;
  display_order: number;
}

export interface DBTour {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  duration_days: number;
  duration_nights: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  meeting_point: string | null;
  is_featured: boolean;
  display_order: number;
  destination: {
    id: string;
    name: string;
    slug: string;
    country_code: string;
  };
  category: {
    name: string;
    slug: string;
  } | null;
  images: DBTourImage[];
  pricing: DBTourPrice[];
  itinerary: DBItineraryDay[];
}

export interface DBDestination {
  id: string;
  name: string;
  slug: string;
  country_code: string;
  description: string | null;
}

// ─── Tours ───────────────────────────────────────────────────────────────────

/**
 * Fetch all published tours with their destination, category,
 * cover image, and pricing. Used by the tours listing page.
 */
export async function getPublishedTours(): Promise<DBTour[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(`
      id, slug, title, summary,
      duration_days, duration_nights,
      highlights, inclusions, exclusions,
      meeting_point, is_featured, display_order,
      destination:destinations ( id, name, slug, country_code ),
      category:tour_categories ( name, slug ),
      images:tour_images ( storage_path, alt_text, is_cover, display_order ),
      pricing:tour_pricing_options ( label, currency_code, adult_price, child_price, pricing_category_code, display_order )
    `)
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getPublishedTours]", error.message);
    return [];
  }

  return (data ?? []).map(normaliseTour);
}

/**
 * Fetch all published tours for a specific destination (by country code).
 * Used by destination pages.
 */
export async function getToursByCountry(countryCode: string): Promise<DBTour[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(`
      id, slug, title, summary,
      duration_days, duration_nights,
      highlights, inclusions, exclusions,
      meeting_point, is_featured, display_order,
      destination:destinations ( id, name, slug, country_code ),
      category:tour_categories ( name, slug ),
      images:tour_images ( storage_path, alt_text, is_cover, display_order ),
      pricing:tour_pricing_options ( label, currency_code, adult_price, child_price, pricing_category_code, display_order )
    `)
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getToursByCountry]", error.message);
    return [];
  }

  // Filter client-side — destination is a joined object
  const filtered = (data ?? []).filter(
    (t) => (t.destination as { country_code: string } | null)?.country_code === countryCode
  );

  return filtered.map(normaliseTour);
}

/**
 * Fetch a single published tour by slug, including full itinerary.
 * Used by the tour detail page.
 */
export async function getTourBySlug(slug: string): Promise<DBTour | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(`
      id, slug, title, summary,
      duration_days, duration_nights,
      highlights, inclusions, exclusions,
      meeting_point, is_featured, display_order,
      destination:destinations ( id, name, slug, country_code ),
      category:tour_categories ( name, slug ),
      images:tour_images ( storage_path, alt_text, is_cover, display_order ),
      pricing:tour_pricing_options ( label, currency_code, adult_price, child_price, pricing_category_code, display_order ),
      itinerary:tour_itineraries ( day_number, title, description, overnight_location )
    `)
    .eq("is_published", true)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[getTourBySlug]", error.message);
    return null;
  }
  if (!data) return null;

  return normaliseTour(data);
}

/**
 * Fetch all published tour slugs — used to generate static params.
 */
export async function getAllTourSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("[getAllTourSlugs]", error.message);
    return [];
  }

  return (data ?? []).map((r) => r.slug as string);
}

// ─── Destinations ─────────────────────────────────────────────────────────────

export async function getPublishedDestinations(): Promise<DBDestination[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, slug, country_code, description")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[getPublishedDestinations]", error.message);
    return [];
  }

  return data ?? [];
}

// ─── Normaliser ───────────────────────────────────────────────────────────────
// Supabase returns joins as objects or arrays. This ensures consistent shapes
// regardless of whether a tour has 0 or N images / pricing rows.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseTour(raw: any): DBTour {
  const images: DBTourImage[] = Array.isArray(raw.images) ? raw.images : [];
  const pricing: DBTourPrice[] = Array.isArray(raw.pricing) ? raw.pricing : [];
  const itinerary: DBItineraryDay[] = Array.isArray(raw.itinerary) ? raw.itinerary : [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary ?? null,
    duration_days: raw.duration_days,
    duration_nights: raw.duration_nights,
    highlights: raw.highlights ?? [],
    inclusions: raw.inclusions ?? [],
    exclusions: raw.exclusions ?? [],
    meeting_point: raw.meeting_point ?? null,
    is_featured: raw.is_featured ?? false,
    display_order: raw.display_order ?? 0,
    destination: raw.destination ?? { id: "", name: "", slug: "", country_code: "" },
    category: raw.category ?? null,
    images: images.sort((a, b) => a.display_order - b.display_order),
    pricing: pricing.sort((a, b) => a.display_order - b.display_order),
    itinerary: itinerary.sort((a, b) => a.day_number - b.day_number),
  };
}

// ─── Helpers used by UI components ───────────────────────────────────────────

export function coverImage(tour: DBTour): string {
  const cover = tour.images.find((i) => i.is_cover) ?? tour.images[0];
  return (
    cover?.storage_path ??
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85"
  );
}

export function lowestPriceLabel(tour: DBTour): string {
  const kes = tour.pricing.find((p) => p.currency_code === "KES");
  if (kes) return `From KES ${kes.adult_price.toLocaleString()}`;
  const usd = tour.pricing.find((p) => p.currency_code === "USD");
  if (usd) return `From USD ${usd.adult_price.toLocaleString()}`;
  return "Price on request";
}
