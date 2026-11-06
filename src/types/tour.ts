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