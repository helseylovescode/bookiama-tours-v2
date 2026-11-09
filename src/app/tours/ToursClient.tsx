"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { DBTour } from "@/types/tour";

function coverImage(tour: DBTour): string {
  const cover = tour.images.find((i) => i.is_cover) ?? tour.images[0];
  return (
    cover?.storage_path ??
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85"
  );
}

function lowestPriceLabel(tour: DBTour): string {
  const kes = tour.pricing.find((p) => p.currency_code === "KES");
  if (kes) return `From KES ${kes.adult_price.toLocaleString()}`;
  const usd = tour.pricing.find((p) => p.currency_code === "USD");
  if (usd) return `From USD ${usd.adult_price.toLocaleString()}`;
  return "Price on request";
}

// ─── Unique filter options derived from tour data ─────────────────────────────

function uniqueCategories(tours: DBTour[]): string[] {
  return [...new Set(tours.map((t) => t.category?.name).filter(Boolean) as string[])];
}

const DESTINATIONS = [
  { label: "All Destinations", value: "all" },
  { label: "Kenya",            value: "KE"  },
  { label: "Tanzania",         value: "TZ"  },
];

// ─── Tour card ────────────────────────────────────────────────────────────────

function TourCard({ tour }: { tour: DBTour }) {
  const countryCode = tour.destination.country_code;
  const flag = countryCode === "KE" ? "🇰🇪 Kenya" : "🇹🇿 Tanzania";

  return (
    <Link href={`/tours/${tour.slug}`} className="tour-card" aria-label={tour.title}>
      <div className="tour-card-image">
        <Image
          src={coverImage(tour)}
          alt={tour.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="tour-card-img"
        />
        <span className="tour-card-country">{flag}</span>
        {tour.is_featured && <span className="tour-card-featured">Featured</span>}
        <span className="tour-card-arrow">↗</span>
      </div>

      <div className="tour-card-body">
        <p className="tour-card-meta">
          <span className="tour-card-category">{tour.category?.name ?? ""}</span>
          <span className="tour-card-duration">
            {tour.duration_nights}N / {tour.duration_days}D
          </span>
        </p>
        <h3 className="tour-card-title">{tour.title}</h3>
        <p className="tour-card-destination">📍 {tour.destination.name}</p>
        <p className="tour-card-summary">{tour.summary}</p>
        <ul className="tour-card-highlights">
          {tour.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
        </ul>
        <div className="tour-card-footer">
          <span className="tour-card-price">{lowestPriceLabel(tour)}</span>
          <span className="tour-card-cta">View details ↗</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

interface Filters {
  destination: string;
  category: string;
  duration: string;
  search: string;
}

function FilterBar({
  filters,
  categories,
  onChange,
}: {
  filters: Filters;
  categories: string[];
  onChange: (f: Filters) => void;
}) {
  function set(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  const isActive =
    filters.destination !== "all" ||
    filters.category !== "all" ||
    filters.duration !== "all" ||
    !!filters.search;

  return (
    <div className="tours-filters" role="search" aria-label="Filter tours">
      <div className="filter-search-wrap">
        <span className="filter-search-icon" aria-hidden>🔍</span>
        <input
          type="search"
          placeholder="Search tours…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          className="filter-search"
          aria-label="Search tours by name or destination"
        />
      </div>

      <select value={filters.destination} onChange={(e) => set("destination", e.target.value)}
        className="filter-select" aria-label="Filter by destination">
        {DESTINATIONS.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <select value={filters.category} onChange={(e) => set("category", e.target.value)}
        className="filter-select" aria-label="Filter by category">
        <option value="all">All Categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.duration} onChange={(e) => set("duration", e.target.value)}
        className="filter-select" aria-label="Filter by duration">
        <option value="all">Any Duration</option>
        <option value="short">1–3 days</option>
        <option value="medium">4–6 days</option>
        <option value="long">7+ days</option>
      </select>

      {isActive && (
        <button
          className="filter-clear"
          onClick={() => onChange({ destination: "all", category: "all", duration: "all", search: "" })}
          aria-label="Clear all filters"
        >
          Clear ✕
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToursClient({ tours }: { tours: DBTour[] }) {
  const categories = useMemo(() => uniqueCategories(tours), [tours]);

  const [filters, setFilters] = useState<Filters>({
    destination: "all",
    category: "all",
    duration: "all",
    search: "",
  });

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      if (filters.destination !== "all" && t.destination.country_code !== filters.destination)
        return false;
      if (filters.category !== "all" && t.category?.name !== filters.category)
        return false;
      if (filters.duration !== "all") {
        const d = t.duration_days;
        if (filters.duration === "short"  && d > 3)        return false;
        if (filters.duration === "medium" && (d < 4 || d > 6)) return false;
        if (filters.duration === "long"   && d < 7)        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !t.title.toLowerCase().includes(q) &&
          !(t.summary ?? "").toLowerCase().includes(q) &&
          !t.destination.name.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [tours, filters]);

  const featured = filtered.filter((t) => t.is_featured);
  const rest     = filtered.filter((t) => !t.is_featured);

  return (
    <main>
      {/* ── Header ── */}
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Bokiama Tours and Travel home">
          <Image
            src="/bokiama-logo.png"
            alt="Bokiama Tours and Travel logo"
            width={586}
            height={450}
            className="brand-logo"
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/destinations/kenya">Destinations</Link>
          <Link href="/tours" aria-current="page">Our Tours</Link>
          <Link href="/#collections">Experiences</Link>
          <Link href="/about">Our Story</Link>
        </nav>
        <Link href="/contact" className="header-cta">Plan your journey <span>↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">☰</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            <Link href="/destinations/kenya">Kenya</Link>
            <Link href="/destinations/tanzania">Tanzania</Link>
            <Link href="/tours">Our Tours</Link>
            <Link href="/#collections">Experiences</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>

      {/* ── Page hero ── */}
      <section className="tours-hero">
        <div className="tours-hero-content">
          <p className="hero-eyebrow"><span /> OUR JOURNEYS</p>
          <h1>Find your<br /><em>perfect journey.</em></h1>
          <p className="tours-hero-description">
            From weekend escapes to multi-week adventures —
            every Bokiama journey is built around what matters to you.
          </p>
        </div>
        <div className="tours-hero-stats">
          <div className="tours-stat"><span>{tours.length}</span><small>Curated journeys</small></div>
          <div className="tours-stat"><span>2</span><small>Countries</small></div>
          <div className="tours-stat"><span>5</span><small>Collections</small></div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="tours-filter-bar">
        <FilterBar filters={filters} categories={categories} onChange={setFilters} />
      </div>

      {/* ── Results ── */}
      <section className="tours-results section-padding">
        {filtered.length === 0 ? (
          <div className="tours-empty">
            <p>No tours match your filters.</p>
            <button
              className="button button-gold"
              onClick={() => setFilters({ destination: "all", category: "all", duration: "all", search: "" })}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="tours-section">
                <p className="section-label">FEATURED JOURNEYS</p>
                <div className="tours-grid tours-grid-featured">
                  {featured.map((t) => <TourCard key={t.id} tour={t} />)}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div className="tours-section">
                {featured.length > 0 && <p className="section-label">MORE JOURNEYS</p>}
                <div className="tours-grid">
                  {rest.map((t) => <TourCard key={t.id} tour={t} />)}
                </div>
              </div>
            )}
            <p className="tours-count">
              Showing {filtered.length} of {tours.length} journeys
            </p>
          </>
        )}
        <p className="tours-pricing-note">
          Listed prices are starting estimates and may change with dates,
          availability and room arrangements.{" "}
          <Link href="/travel-information#costs">Read our pricing and booking guidance</Link>.
        </p>
      </section>

      {/* ── Custom trip CTA ── */}
      <section className="custom-trip">
        <div className="custom-trip-content">
          <p className="section-label">CAN&apos;T FIND WHAT YOU&apos;RE LOOKING FOR?</p>
          <h2>Let&apos;s build<br /><em>something yours.</em></h2>
          <p>Tell us your dates, budget and travel dreams. We&apos;ll put together a journey designed exactly for you.</p>
          <Link href="/contact" className="button button-gold">Request a custom journey <span>↗</span></Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-top">
          <Link href="/" className="brand footer-brand">
            <Image
              src="/bokiama-logo-light.png"
              alt="Bokiama Tours and Travel logo"
              width={586}
              height={450}
              className="brand-logo"
            />
          </Link>
          <p>Go beyond the expected.<br />Come back with a story.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link href="/destinations/kenya">Kenya</Link>
            <Link href="/destinations/tanzania">Tanzania</Link>
            <Link href="/tours">Our tours</Link>
          </div>
          <div>
            <span>DISCOVER</span>
            <Link href="/travel-information">Travel information</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact us</Link>
          </div>
          <div>
            <span>GET IN TOUCH</span>
            <Link href="/contact">Plan a journey</Link>
            <Link href="/contact">Make an enquiry</Link>
            <a href="tel:+254799941114">+254 799 941114</a>
            <a href="mailto:oyujelsey@gmail.com">oyujelsey@gmail.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bokiama Tours &amp; Travel.</span>
          <span>MADE FOR THE LOVE OF THE JOURNEY.</span>
        </div>
      </footer>
    </main>
  );
}
