import { Suspense } from "react";
import ToursClient from "./ToursClient";
import { getPublishedTours } from "@/lib/queries";
import { TOURS as STATIC_TOURS } from "./data";

// Server component — fetches data, passes to interactive client component
export default async function ToursPage() {
  let tours = await getPublishedTours();

  // Fall back to static data if DB returns nothing (e.g. before migrations)
  if (tours.length === 0) {
    tours = STATIC_TOURS.map((t) => ({
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
        label: p.label,
        currency_code: p.currency,
        adult_price: p.adult,
        child_price: p.child,
        pricing_category_code: p.category,
        display_order: i,
      })),
      itinerary: t.itinerary.map((d) => ({
        day_number: d.day,
        title: d.title,
        description: d.description,
        overnight_location: d.overnight,
      })),
    }));
  }

  return (
    <Suspense>
      <ToursClient tours={tours} />
    </Suspense>
  );
}
