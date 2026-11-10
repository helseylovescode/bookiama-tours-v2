import type { Metadata } from "next";
import { getAuthenticatedOwner } from "@/lib/admin";
import TourEditor from "../../tours/TourEditor";

export const metadata: Metadata = { title: "Tour management" };

export default async function AdminToursPage() {
  const supabase = await getAuthenticatedOwner();
  if (!supabase) return null;

  const [toursResult, destinationsResult, categoriesResult] = await Promise.all([
    supabase
      .from("tours")
      .select("id,destination_id,category_id,title,slug,summary,description,duration_days,duration_nights,meeting_point,highlights,inclusions,exclusions,is_published,is_featured,display_order")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase.from("destinations").select("id,name").order("name"),
    supabase.from("tour_categories").select("id,name").order("name"),
  ]);

  const failed = [toursResult.error, destinationsResult.error, categoriesResult.error].find(Boolean);
  if (failed) {
    console.error("[admin.getTours]", failed.message);
    throw new Error("Could not load tour management.");
  }

  const destinations = destinationsResult.data ?? [];
  const categories = categoriesResult.data ?? [];
  const tours = toursResult.data ?? [];

  return (
    <div className="admin-content">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">YOUR CATALOGUE</p>
          <h1>Tour management</h1>
          <p>Create and update the trip listings shown on your website.</p>
        </div>
        <span className="admin-tour-count">{tours.length} tours</span>
      </header>

      <section className="admin-panel admin-tour-panel">
        <TourEditor
          create
          destinations={destinations}
          categories={categories}
        />
        {tours.map((tour) => (
          <TourEditor
            key={tour.id}
            tour={tour}
            destinations={destinations}
            categories={categories}
          />
        ))}
        {!tours.length && !destinations.length && (
          <div className="admin-empty-state">
            <h3>No destinations are available yet</h3>
            <p>Add destinations before creating tours.</p>
          </div>
        )}
      </section>
    </div>
  );
}
