import { notFound } from "next/navigation";
import { getAllTourSlugs, getTourBySlug } from "@/lib/queries";
import { coverImage } from "@/lib/queries";
import TourDetailClient from "../TourDetailClient";
import { TOURS, type Tour } from "../data";

export const dynamic = "force-dynamic";

function fromDatabaseTour(tour: NonNullable<Awaited<ReturnType<typeof getTourBySlug>>>): Tour {
  const image = coverImage(tour);
  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    summary: tour.summary ?? "",
    destination: tour.destination.name,
    destinationSlug: tour.destination.slug,
    country: tour.destination.country_code === "TZ" ? "TZ" : "KE",
    category: tour.category?.name ?? "Journey",
    collection: null,
    durationDays: tour.duration_days,
    durationNights: tour.duration_nights,
    highlights: tour.highlights,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    image,
    images: tour.images.length ? tour.images.map((item) => item.storage_path) : [image],
    isFeatured: tour.is_featured,
    pricing: tour.pricing.map((price) => ({
      category: price.pricing_category_code,
      label: price.label,
      adult: price.adult_price,
      child: price.child_price,
      currency: price.currency_code,
    })),
    itinerary: tour.itinerary.map((day) => ({
      day: day.day_number,
      title: day.title,
      description: day.description ?? "",
      overnight: day.overnight_location ?? "Accommodation as arranged",
      meals: "Meals as specified by your camp or lodge",
    })),
    meetingPoint: tour.meeting_point ?? "Confirmed with your itinerary",
    groupSize: "Contact us for group options",
    accommodation: "Confirmed with your itinerary",
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const databaseTour = await getTourBySlug(slug);
  if (databaseTour) return <TourDetailClient tour={fromDatabaseTour(databaseTour)} />;

  const publishedSlugs = await getAllTourSlugs();
  if (publishedSlugs.length > 0) notFound();

  const staticTour = TOURS.find((tour) => tour.slug === slug);
  if (!staticTour) notFound();
  return <TourDetailClient tour={staticTour} />;
}
