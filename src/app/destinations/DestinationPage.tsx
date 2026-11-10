import Image from "next/image";
import Link from "next/link";
import LineIcon from "../components/LineIcon";
import type { Destination } from "./data";
import type { DBTour } from "@/lib/queries";
import { coverImage, lowestPriceLabel } from "@/lib/queries";

function ratingLabel(r: "excellent" | "good" | "fair") {
  if (r === "excellent") return { label: "Excellent", dots: 3 };
  if (r === "good") return { label: "Good", dots: 2 };
  return { label: "Fair", dots: 1 };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TourCard({ tour }: { tour: DBTour }) {
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
        {tour.is_featured && (
          <span className="tour-card-featured">Featured</span>
        )}
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
        <p className="tour-card-destination"><LineIcon name="pin" size={14} /> {tour.destination.name}</p>
        <p className="tour-card-summary">{tour.summary}</p>
        <ul className="tour-card-highlights">
          {tour.highlights.slice(0, 3).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="tour-card-footer">
          <span className="tour-card-price">{lowestPriceLabel(tour)}</span>
          <span className="tour-card-cta">View details ↗</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DestinationPage({
  destination,
  tours,
}: {
  destination: Destination;
  tours: DBTour[];
}) {
  const featured = tours.filter((t) => t.is_featured);
  const others   = tours.filter((t) => !t.is_featured);

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
          <Link href="/destinations/kenya" aria-current={destination.slug === "kenya" ? "page" : undefined}>
            Kenya
          </Link>
          <Link href="/destinations/tanzania" aria-current={destination.slug === "tanzania" ? "page" : undefined}>
            Tanzania
          </Link>
          <Link href="/tours">Our Tours</Link>
          <Link href="/about">Our Story</Link>
        </nav>
        <Link href="/contact" className="header-cta">
          Plan your journey <span>↗</span>
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><LineIcon name="menu" /></summary>
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

      {/* ── Destination hero ── */}
      <section className="dest-hero">
        <div className="dest-hero-image">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="dest-hero-img"
          />
        </div>
        <div className="dest-hero-overlay" />
        <div className="dest-hero-content">
          <p className="hero-eyebrow">
            <span />
            <LineIcon name="globe" size={14} /> EAST AFRICA
          </p>
          <h1>
            {destination.name}
          </h1>
          <p className="dest-hero-tagline">{destination.tagline}</p>
          <div className="dest-hero-actions">
            <Link href="#tours" className="button button-gold">
              Explore journeys <span>↗</span>
            </Link>
            <Link href="#regions" className="text-link">
              Discover regions <span>↓</span>
            </Link>
          </div>
        </div>
        <div className="dest-hero-stats">
          <div className="dest-stat">
            <span>{tours.length}</span>
            <small>Journeys available</small>
          </div>
          <div className="dest-stat">
            <span>{destination.regions.length}</span>
            <small>Key regions</small>
          </div>
          <div className="dest-stat">
            <span>12</span>
            <small>Months of travel</small>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="dest-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/tours">Destinations</Link>
        <span>›</span>
        <span aria-current="page">{destination.name}</span>
      </nav>

      {/* ── Intro ── */}
      <section className="dest-intro section-padding">
        <div className="dest-intro-text">
          <p className="section-label">ABOUT {destination.name.toUpperCase()}</p>
          <h2>{destination.intro}</h2>
          <p>{destination.overview}</p>
        </div>
        <div className="dest-highlights-grid">
          {destination.highlights.map((h) => (
            <div className="dest-highlight-card" key={h.title}>
              <span className="dest-highlight-icon"><LineIcon name={h.icon} size={28} /></span>
              <h3>{h.title}</h3>
              <p>{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Regions ── */}
      <section id="regions" className="dest-regions section-padding">
        <div className="section-heading">
          <div>
            <p className="section-label">REGIONS TO EXPLORE</p>
            <h2>
              Where will
              <br />
              <em>you go?</em>
            </h2>
          </div>
          <p>
            Each region of {destination.name} offers a completely different
            experience. Combine them for the ultimate journey.
          </p>
        </div>

        <div className="dest-regions-grid">
          {destination.regions.map((region, i) => (
            <div
              className={`dest-region-card${i === 0 ? " dest-region-card--large" : ""}`}
              key={region.name}
            >
              <div className="dest-region-image">
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className="dest-region-img"
                />
                <div className="dest-region-overlay" />
              </div>
              <div className="dest-region-content">
                <h3>{region.name}</h3>
                <p>{region.description}</p>
                {region.tourSlugs.length > 0 && (
                  <Link href="#tours" className="dest-region-link">
                    View {region.tourSlugs.length} journey{region.tourSlugs.length > 1 ? "s" : ""} ↗
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tours ── */}
      <section id="tours" className="dest-tours section-padding">
        <div className="section-heading">
          <div>
            <p className="section-label">BOKIAMA JOURNEYS</p>
            <h2>
              Your {destination.name}
              <br />
              <em>adventures.</em>
            </h2>
          </div>
          <Link href="/tours" className="underlined-link">
            View all tours <span>↗</span>
          </Link>
        </div>

        {featured.length > 0 && (
          <>
            <p className="section-label" style={{ marginBottom: "24px" }}>FEATURED</p>
            <div className="tours-grid tours-grid-featured" style={{ marginBottom: "48px" }}>
              {featured.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          </>
        )}

        {others.length > 0 && (
          <>
            {featured.length > 0 && (
              <p className="section-label" style={{ marginBottom: "24px" }}>MORE JOURNEYS</p>
            )}
            <div className="tours-grid">
              {others.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          </>
        )}
      </section>

      {/* ── When to visit ── */}
      <section className="dest-seasons section-padding">
        <div className="dest-seasons-inner">
          <div className="dest-seasons-heading">
            <p className="section-label">WHEN TO VISIT</p>
            <h2>
              Plan your
              <br />
              <em>timing.</em>
            </h2>
            <p>
              {destination.name} welcomes visitors year-round.
              Here is a guide to what each season offers.
            </p>
          </div>
          <div className="dest-seasons-grid">
            {destination.seasons.map((s) => {
              const { label, dots } = ratingLabel(s.rating);
              return (
                <div className="dest-season-card" key={s.name}>
                  <div className="dest-season-header">
                    <h3>{s.name}</h3>
                    <span className="dest-season-months">{s.months}</span>
                  </div>
                  <p>{s.description}</p>
                  <div className="dest-season-rating" aria-label={`Rating: ${label}`}>
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`dest-rating-dot${n <= dots ? " dest-rating-dot--on" : ""}`}
                        aria-hidden
                      />
                    ))}
                    <span className="dest-rating-label">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Practical info ── */}
      <section className="dest-practical section-padding">
        <p className="section-label">PRACTICAL INFORMATION</p>
        <h2 className="dest-practical-heading">
          Everything you need
          <br />
          <em>to know.</em>
        </h2>
        <div className="dest-practical-grid">
          {destination.practical.map((item) => (
            <div className="dest-practical-item" key={item.label}>
              <span className="dest-practical-icon"><LineIcon name={item.icon} size={22} /></span>
              <div>
                <span className="dest-practical-label">{item.label}</span>
                <span className="dest-practical-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="dest-practical-note">
          <LineIcon name="info" size={16} /> Travel requirements can change. Always verify visa, health and entry requirements
          with official government sources before booking.{" "}
          <Link href="/travel-information#visas">See official visa resources ↗</Link>
        </p>
      </section>

      {/* ── Cross-sell other destination ── */}
      <section className="dest-crossell">
        <div className="dest-crossell-image">
          <Image
            src={
              destination.slug === "kenya"
                ? "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85"
                : "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85"
            }
            alt={destination.slug === "kenya" ? "Tanzania" : "Kenya"}
            fill
            sizes="50vw"
            className="dest-crossell-img"
          />
          <div className="dest-crossell-overlay" />
        </div>
        <div className="dest-crossell-content">
          <p className="section-label">EXPLORE MORE</p>
          <h2>
            {destination.slug === "kenya"
              ? "Discover Tanzania too."
              : "Add Kenya to your journey."}
          </h2>
          <p>
            {destination.slug === "kenya"
              ? "Combine your Kenya journey with the Serengeti and Zanzibar. Two countries, one extraordinary East African adventure."
              : "Combine your Tanzania journey with the Maasai Mara and Kenya's coast. Two countries, one seamless East African adventure."}
          </p>
          <Link
            href={destination.slug === "kenya" ? "/destinations/tanzania" : "/destinations/kenya"}
            className="button button-gold"
          >
            Explore {destination.slug === "kenya" ? "Tanzania" : "Kenya"} <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="custom-trip">
        <div className="custom-trip-content">
          <p className="section-label">READY TO GO?</p>
          <h2>
            Let's plan your
            <br />
            <em>{destination.name} journey.</em>
          </h2>
          <p>
            Tell us your travel dates, budget and what excites you most.
            We will put together the perfect itinerary.
          </p>
          <Link href="/contact" className="button button-gold">
            Start planning <span>↗</span>
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
