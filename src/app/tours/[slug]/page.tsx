"use client";

import { notFound } from "next/navigation";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { TOURS, type Tour, type ItineraryDay } from "../data";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lowestPrice(tour: Tour): string {
  const kes = tour.pricing.find((p) => p.currency === "KES");
  if (kes) return `From KES ${kes.adult.toLocaleString()}`;
  const usd = tour.pricing.find((p) => p.currency === "USD");
  if (usd) return `From USD ${usd.adult.toLocaleString()}`;
  return "Price on request";
}

function fmt(n: number, currency: string) {
  if (currency === "KES") return `KES ${n.toLocaleString()}`;
  if (currency === "USD") return `USD ${n.toLocaleString()}`;
  return `${currency} ${n.toLocaleString()}`;
}

// ─── Image gallery ───────────────────────────────────────────────────────────

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="td-gallery">
      <div className="td-gallery-main">
        <Image
          key={active}
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 60vw"
          className="td-gallery-main-img"
        />
        {images.length > 1 && (
          <>
            <button
              className="td-gallery-arrow td-gallery-arrow--prev"
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="td-gallery-arrow td-gallery-arrow--next"
              onClick={() => setActive((a) => (a + 1) % images.length)}
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
        <span className="td-gallery-count">
          {active + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="td-gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={`td-gallery-thumb${i === active ? " td-gallery-thumb--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="td-gallery-thumb-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Itinerary ────────────────────────────────────────────────────────────────

function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="td-itinerary">
      {days.map((day, i) => {
        const isOpen = open === i;
        return (
          <div
            key={day.day}
            className={`td-itinerary-item${isOpen ? " td-itinerary-item--open" : ""}`}
          >
            <button
              className="td-itinerary-header"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="td-itinerary-day">Day {day.day}</span>
              <span className="td-itinerary-title">{day.title}</span>
              <span className="td-itinerary-chevron" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="td-itinerary-body">
                <p>{day.description}</p>
                <div className="td-itinerary-meta">
                  <span>🏕️ {day.overnight}</span>
                  <span>🍽️ {day.meals}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Pricing table ────────────────────────────────────────────────────────────

function PricingTable({ tour }: { tour: Tour }) {
  return (
    <div className="td-pricing-wrap">
      <table className="td-pricing-table">
        <thead>
          <tr>
            <th>Traveller type</th>
            <th>Adult</th>
            <th>Child</th>
          </tr>
        </thead>
        <tbody>
          {tour.pricing.map((p) => (
            <tr key={p.category}>
              <td className="td-pricing-label">{p.label}</td>
              <td className="td-pricing-price">{fmt(p.adult, p.currency)}</td>
              <td className="td-pricing-price">
                {p.child !== null ? fmt(p.child, p.currency) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="td-pricing-note">
        ℹ️ Prices are per person and subject to availability. A confirmed quotation will be sent
        after your enquiry is received. Child rates typically apply to ages 3–11.
      </p>
    </div>
  );
}

// ─── Related tours ────────────────────────────────────────────────────────────

function RelatedTours({ current }: { current: Tour }) {
  const related = TOURS.filter(
    (t) =>
      t.id !== current.id &&
      (t.country === current.country || t.category === current.category),
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="td-related section-padding">
      <p className="section-label">YOU MIGHT ALSO LIKE</p>
      <h2 className="td-related-heading">
        More <em>journeys to explore.</em>
      </h2>
      <div className="tours-grid">
        {related.map((t) => (
          <Link href={`/tours/${t.slug}`} key={t.id} className="tour-card">
            <div className="tour-card-image">
              <Image
                src={t.image}
                alt={t.title}
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                className="tour-card-img"
              />
              {t.isFeatured && <span className="tour-card-featured">Featured</span>}
              <span className="tour-card-arrow">↗</span>
            </div>
            <div className="tour-card-body">
              <p className="tour-card-meta">
                <span className="tour-card-category">{t.category}</span>
                <span className="tour-card-duration">
                  {t.durationNights}N / {t.durationDays}D
                </span>
              </p>
              <h3 className="tour-card-title">{t.title}</h3>
              <p className="tour-card-destination">📍 {t.destination}</p>
              <p className="tour-card-summary">{t.summary}</p>
              <div className="tour-card-footer">
                <span className="tour-card-price">{lowestPrice(t)}</span>
                <span className="tour-card-cta">View details ↗</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) notFound();

  const [activeTab, setActiveTab] = useState<
    "itinerary" | "inclusions" | "pricing" | "practical"
  >("itinerary");

  const tabs = [
    { id: "itinerary" as const, label: "Itinerary" },
    { id: "inclusions" as const, label: "What's included" },
    { id: "pricing" as const, label: "Pricing" },
    { id: "practical" as const, label: "Practical info" },
  ];

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
          <Link href={`/destinations/${tour.destinationSlug}`}>
            {tour.country === "KE" ? "Kenya" : "Tanzania"}
          </Link>
          <Link href="/tours" aria-current="page">
            Our Tours
          </Link>
          <Link href="/about">Our Story</Link>
        </nav>
        <Link href="/contact" className="header-cta">
          Plan your journey <span>↗</span>
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">☰</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            <Link href="/destinations/kenya">Kenya</Link>
            <Link href="/destinations/tanzania">Tanzania</Link>
            <Link href="/tours">Our Tours</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>

      {/* ── Breadcrumb ── */}
      <nav className="dest-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/tours">Tours</Link>
        <span>›</span>
        <Link href={`/destinations/${tour.destinationSlug}`}>
          {tour.country === "KE" ? "Kenya" : "Tanzania"}
        </Link>
        <span>›</span>
        <span aria-current="page">{tour.title}</span>
      </nav>

      {/* ── Tour hero ── */}
      <section className="td-hero">
        {/* Left — gallery */}
        <Gallery images={tour.images} title={tour.title} />

        {/* Right — summary */}
        <div className="td-summary">
          {tour.collection && (
            <p className="td-collection">{tour.collection}</p>
          )}
          <span className="tour-card-category" style={{ fontSize: "10px" }}>
            {tour.category}
          </span>
          <h1 className="td-title">{tour.title}</h1>
          <p className="td-destination">
            📍 {tour.destination}
            <span className="td-country">
              {tour.country === "KE" ? "🇰🇪 Kenya" : "🇹🇿 Tanzania"}
            </span>
          </p>
          <p className="td-summary-text">{tour.summary}</p>

          {/* Quick facts */}
          <div className="td-facts">
            <div className="td-fact">
              <span>📅</span>
              <div>
                <small>Duration</small>
                <strong>
                  {tour.durationNights} nights / {tour.durationDays} days
                </strong>
              </div>
            </div>
            <div className="td-fact">
              <span>📍</span>
              <div>
                <small>Meeting point</small>
                <strong>{tour.meetingPoint}</strong>
              </div>
            </div>
            <div className="td-fact">
              <span>👥</span>
              <div>
                <small>Group size</small>
                <strong>{tour.groupSize}</strong>
              </div>
            </div>
            <div className="td-fact">
              <span>🏕️</span>
              <div>
                <small>Accommodation</small>
                <strong>{tour.accommodation}</strong>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="td-highlights">
            <p className="section-label" style={{ marginBottom: "12px" }}>
              HIGHLIGHTS
            </p>
            <ul className="td-highlights-list">
              {tour.highlights.map((h) => (
                <li key={h}>
                  <span aria-hidden>✓</span> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="td-cta-block">
            <div className="td-price-preview">
              <small>Starting from</small>
              <strong>{lowestPrice(tour)}</strong>
              <span>per person</span>
            </div>
            <Link
              href={`/contact?tour=${encodeURIComponent(tour.title)}`}
              className="button button-gold td-book-btn"
            >
              Enquire about this journey <span>↗</span>
            </Link>
            <p className="td-cta-note">
              Displayed prices are starting estimates. Request a quote to
              confirm your trip&apos;s current price and terms.{" "}
              <Link href="/travel-information#costs">Pricing and booking guidance</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="td-tabs-bar">
        <div className="td-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`td-tab${activeTab === tab.id ? " td-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab panels ── */}
      <section className="td-panel section-padding">
        {activeTab === "itinerary" && (
          <div className="td-panel-inner">
            <div className="td-panel-header">
              <p className="section-label">DAY BY DAY</p>
              <h2>
                Your <em>{tour.durationDays}-day journey.</em>
              </h2>
              <p className="td-panel-desc">
                Every day has been planned to make the most of each destination.
                Click any day to read the full details.
              </p>
            </div>
            <Itinerary days={tour.itinerary} />
          </div>
        )}

        {activeTab === "inclusions" && (
          <div className="td-panel-inner td-inclusions-grid">
            <div className="td-inclusions-col">
              <p className="section-label">WHAT'S INCLUDED</p>
              <h2>
                Everything
                <br />
                <em>taken care of.</em>
              </h2>
              <ul className="td-list td-list--included">
                {tour.inclusions.map((item) => (
                  <li key={item}>
                    <span className="td-list-icon td-list-icon--yes" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="td-inclusions-col">
              <p className="section-label">NOT INCLUDED</p>
              <h2>
                What to
                <br />
                <em>arrange yourself.</em>
              </h2>
              <ul className="td-list td-list--excluded">
                {tour.exclusions.map((item) => (
                  <li key={item}>
                    <span className="td-list-icon td-list-icon--no" aria-hidden>
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="td-panel-inner">
            <div className="td-panel-header">
              <p className="section-label">TRANSPARENT PRICING</p>
              <h2>
                Know exactly
                <br />
                <em>what you're paying.</em>
              </h2>
              <p className="td-panel-desc">
                Bokiama applies different rates based on your traveller category,
                as set by national park and accommodation suppliers. We never apply
                arbitrary markups — the price you see reflects actual supplier costs.
              </p>
            </div>
            <PricingTable tour={tour} />
            <div className="td-pricing-cta">
              <Link
                href={`/contact?tour=${encodeURIComponent(tour.title)}`}
                className="button button-gold"
              >
                Request a personalised quote <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="td-panel-inner">
            <div className="td-panel-header">
              <p className="section-label">BEFORE YOU GO</p>
              <h2>
                Everything
                <br />
                <em>you need to know.</em>
              </h2>
            </div>
            <div className="td-practical-grid">
              <div className="td-practical-card">
                <h3>Meeting point</h3>
                <p>{tour.meetingPoint}</p>
              </div>
              <div className="td-practical-card">
                <h3>Group size</h3>
                <p>{tour.groupSize}</p>
              </div>
              <div className="td-practical-card">
                <h3>Accommodation</h3>
                <p>{tour.accommodation}</p>
              </div>
              <div className="td-practical-card">
                <h3>What to pack</h3>
                <p>
                  Light, neutral-coloured clothing for game drives. Layers for cool
                  mornings. Sun protection, insect repellent, good walking shoes.
                  A full packing list is sent with your booking confirmation.
                </p>
              </div>
              <div className="td-practical-card">
                <h3>Fitness level</h3>
                <p>
                  This journey is suitable for all fitness levels. Game drives are
                  vehicle-based. Optional walks are at a gentle pace.
                </p>
              </div>
              <div className="td-practical-card">
                <h3>Booking & payment</h3>
                <p>
                  The supplied terms specify a 25% deposit to confirm a booking
                  and the remaining balance 40 days before travel. Confirm the
                  payment method, due dates and total price in your written quote.
                </p>
              </div>
              <div className="td-practical-card td-practical-card--wide">
                <h3>Cancellation policy</h3>
                <p>
                  The supplied terms list charges of 26% from 90–40 days before
                  arrival, 52% from 39–22 days, and 100% from 21 days before
                  arrival or for a no-show. Refunds are processed within 15 days
                  after confirmation, less bank and currency-exchange fees.
                  Review the written terms with your quote; travel insurance is
                  recommended.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Sticky mobile book button ── */}
      <div className="td-sticky-cta" aria-hidden="false">
        <div className="td-sticky-price">{lowestPrice(tour)}</div>
        <Link
          href={`/contact?tour=${encodeURIComponent(tour.title)}`}
          className="button button-gold td-sticky-btn"
        >
          Enquire now ↗
        </Link>
      </div>

      {/* ── Related tours ── */}
      <RelatedTours current={tour} />

      {/* ── CTA ── */}
      <section className="custom-trip">
        <div className="custom-trip-content">
          <p className="section-label">READY TO GO?</p>
          <h2>
            Let's make this
            <br />
            <em>journey yours.</em>
          </h2>
          <p>
            Tell us your travel dates and any special requests.
            We will send you a personalised quotation within 24 hours.
          </p>
          <Link
            href={`/contact?tour=${encodeURIComponent(tour.title)}`}
            className="button button-gold"
          >
            Enquire about this tour <span>↗</span>
          </Link>
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
          <p>
            Go beyond the expected.
            <br />
            Come back with a story.
          </p>
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
