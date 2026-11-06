import type { Metadata } from "next";
import DestinationPage from "../DestinationPage";
import { DESTINATIONS } from "../data";
import { getToursByCountry } from "@/lib/queries";
import { TOURS as STATIC_TOURS } from "@/app/tours/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kenya",
  description:
    "Discover extraordinary Kenya — the Maasai Mara, Amboseli, Lake Nakuru and the Indian Ocean coast. Book your Kenya safari and travel experience with Bokiama Tours & Travel.",
};

export default async function KenyaPage() {
  let tours = await getToursByCountry("KE");

  // Fall back to static data if DB not yet available
  if (tours.length === 0) {
    tours = STATIC_TOURS
      .filter((t) => t.country === "KE")
      .map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        summary: t.summary,
        duration_days: t.durationDays,
        duration_nights: t.durationNights,
        highlights: t.highlights,
        inclusions: t.inclusions,
        exclusions: t.exclusions,
        meeting_point: t.meetingPoint,
        is_featured: t.isFeatured,
        display_order: 0,
        destination: { id: t.id, name: t.destination, slug: t.destinationSlug, country_code: t.country },
        category: { name: t.category, slug: t.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") },
        images: t.images.map((src, i) => ({ storage_path: src, alt_text: t.title, is_cover: i === 0, display_order: i })),
        pricing: t.pricing.map((p, i) => ({
          label: p.label, currency_code: p.currency, adult_price: p.adult,
          child_price: p.child, pricing_category_code: p.category, display_order: i,
        })),
        itinerary: t.itinerary.map((d) => ({
          day_number: d.day, title: d.title, description: d.description, overnight_location: d.overnight,
        })),
      }));
  }

  return <DestinationPage destination={DESTINATIONS.kenya} tours={tours} />;
}
