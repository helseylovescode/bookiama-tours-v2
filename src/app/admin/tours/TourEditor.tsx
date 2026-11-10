"use client";

import { useActionState } from "react";
import { saveTour } from "./actions";
import type { AdminActionState } from "../actions";

type Option = { id: string; name: string };
type Tour = {
  id: string;
  destination_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  duration_days: number;
  duration_nights: number;
  meeting_point: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  is_published: boolean;
  is_featured: boolean;
};

const initialState: AdminActionState = { status: "idle" };

function textList(values: string[]) {
  return values.join("\n");
}

export default function TourEditor({
  tour,
  destinations,
  categories,
  create = false,
}: {
  tour?: Tour;
  destinations: Option[];
  categories: Option[];
  create?: boolean;
}) {
  const [state, action, isPending] = useActionState(saveTour, initialState);

  return (
    <details className="admin-tour-editor" open={create}>
      <summary>
        <span>
          <strong>{create ? "Create a tour" : tour?.title}</strong>
          {!create && <small>/{tour?.slug} · {tour?.duration_days} days</small>}
        </span>
        {!create && (
          <span className={`admin-status ${tour?.is_published ? "admin-status--accepted" : "admin-status--requested"}`}>
            {tour?.is_published ? "Published" : "Draft"}
          </span>
        )}
      </summary>
      <form action={action} className="admin-tour-form">
        {tour && <input type="hidden" name="id" value={tour.id} />}
        <div className="admin-tour-form-grid">
          <label>
            Tour title *
            <input name="title" required maxLength={160} defaultValue={tour?.title ?? ""} />
          </label>
          <label>
            URL slug *
            <input
              name="slug"
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              placeholder="example-safari"
              defaultValue={tour?.slug ?? ""}
            />
          </label>
          <label>
            Destination *
            <select name="destination_id" required defaultValue={tour?.destination_id ?? ""}>
              <option value="" disabled>Select a destination</option>
              {destinations.map((destination) => (
                <option value={destination.id} key={destination.id}>{destination.name}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select name="category_id" defaultValue={tour?.category_id ?? ""}>
              <option value="">No category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>
            Days *
            <input name="duration_days" type="number" min="1" step="1" required defaultValue={tour?.duration_days ?? 1} />
          </label>
          <label>
            Nights *
            <input name="duration_nights" type="number" min="0" step="1" required defaultValue={tour?.duration_nights ?? 0} />
          </label>
          <label className="admin-tour-wide">
            Summary
            <textarea name="summary" rows={2} defaultValue={tour?.summary ?? ""} />
          </label>
          <label className="admin-tour-wide">
            Description
            <textarea name="description" rows={4} defaultValue={tour?.description ?? ""} />
          </label>
          <label className="admin-tour-wide">
            Meeting point
            <input name="meeting_point" defaultValue={tour?.meeting_point ?? ""} />
          </label>
          <label>
            Highlights <small>One per line</small>
            <textarea name="highlights" rows={4} defaultValue={textList(tour?.highlights ?? [])} />
          </label>
          <label>
            Included <small>One per line</small>
            <textarea name="inclusions" rows={4} defaultValue={textList(tour?.inclusions ?? [])} />
          </label>
          <label>
            Not included <small>One per line</small>
            <textarea name="exclusions" rows={4} defaultValue={textList(tour?.exclusions ?? [])} />
          </label>
        </div>
        <div className="admin-tour-controls">
          <label className="admin-checkbox">
            <input type="checkbox" name="is_featured" defaultChecked={tour?.is_featured ?? false} />
            Featured
          </label>
          <label className="admin-checkbox">
            <input type="checkbox" name="is_published" defaultChecked={tour?.is_published ?? false} />
            Published on website
          </label>
          <button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : create ? "Create tour" : "Save tour"}
          </button>
        </div>
        {state.status !== "idle" && (
          <p className={`admin-save-message admin-save-message--${state.status}`} role={state.status === "error" ? "alert" : "status"}>
            {state.message}
          </p>
        )}
      </form>
    </details>
  );
}
