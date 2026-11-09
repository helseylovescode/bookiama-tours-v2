import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Bokiama Tours & Travel — born in Kenya, built for travellers who want more than a package. Meet the people behind the journeys.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: "🌍",
    title: "Locally rooted",
    description:
      "We are not a global agency reselling someone else's tours. Every route, lodge and guide we recommend has been chosen by people who live here.",
  },
  {
    icon: "🤝",
    title: "Honest dealing",
    description:
      "You will always know exactly what your price includes — and what it does not. No hidden fees. No invented availability. Just straight answers.",
  },
  {
    icon: "✨",
    title: "Journeys that fit",
    description:
      "We believe the best trips are the ones built around the actual person taking them — not a standard template adjusted for your budget.",
  },
  {
    icon: "🌱",
    title: "Travel with purpose",
    description:
      "We work with locally owned lodges, community conservancies and verified partners who share our commitment to responsible tourism.",
  },
  {
    icon: "📞",
    title: "Real support",
    description:
      "From your first enquiry to the moment you get home, a real person is here to answer your questions.",
  },
  {
    icon: "🏆",
    title: "Quality over volume",
    description:
      "We would rather take fewer customers on exceptional journeys than fill seats on average ones.",
  },
];

const milestones = [
  {
    year: "The beginning",
    title: "An idea born on the Mara",
    description:
      "Bokiama grew from a love of East Africa and a belief that travel should bring people closer to the places and communities they visit. The idea was simple: create journeys shaped by local knowledge and each traveller's interests.",
  },
  {
    year: "The name",
    title: "What 'Bokiama' means",
    description:
      "Bokiama is a name that carries meaning — rooted in local culture and chosen deliberately. It is a name that belongs to this part of the world, not borrowed from somewhere else.",
  },
  {
    year: "The approach",
    title: "Building it differently",
    description:
      "Instead of copying the formula that every other agency was using, Bokiama was built around the customer's experience — from the moment someone first considers a trip to the moment they return home with a full memory card and stories worth telling.",
  },
  {
    year: "Today",
    title: "Kenya, Tanzania and beyond",
    description:
      "Bokiama now covers domestic Kenya journeys, Tanzania including Zanzibar and the Serengeti, and selected international destinations. The founding principle has not changed: every journey should be worth the distance.",
  },
];

const stats = [
  { number: "2", label: "Countries covered" },
  { number: "6+", label: "Curated packages" },
  { number: "5", label: "Signature collections" },
  { number: "1", label: "Guiding principle" },
];

const partners = [
  { name: "Kenya Wildlife Service", role: "Park authority" },
  { name: "Tanzania National Parks", role: "Park authority" },
  { name: "Maasai Mara Conservancies", role: "Conservation partner" },
  { name: "Local community lodges", role: "Accommodation" },
  { name: "Licensed safari operators", role: "Ground partner" },
  { name: "Coastal marine guides", role: "Water experiences" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
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
          <Link href="/tours">Our Tours</Link>
          <Link href="/#collections">Experiences</Link>
          <Link href="/about" aria-current="page">Our Story</Link>
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

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-image">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=90"
            alt="The African savannah at golden hour"
            fill
            priority
            sizes="100vw"
            className="about-hero-img"
          />
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="hero-eyebrow">
            <span /> OUR STORY
          </p>
          <h1>
            Born in Kenya.
            <br />
            <em>Built for travellers.</em>
          </h1>
          <p className="about-hero-sub">
            Bokiama Tours &amp; Travel was founded by people who love this part of the world
            — and believe every visitor deserves to experience it properly.
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="dest-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span aria-current="page">Our Story</span>
      </nav>

      {/* ── Opening statement ── */}
      <section className="about-statement section-padding">
        <div className="about-statement-inner">
          <p className="section-label">WHO WE ARE</p>
          <blockquote className="about-quote">
            "Most travel websites show you the same beautiful photographs, the same packages
            and the same booking button. We wanted to build something different —
            a travel company that actually understands what each customer wants
            and works to deliver exactly that."
          </blockquote>
          <p className="about-quote-attr">— The Bokiama team</p>
        </div>
        <div className="about-statement-image">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=85"
            alt="Elephants in Amboseli at sunrise"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="about-statement-img"
          />
          <div className="about-statement-badge">
            <span className="about-badge-symbol">B</span>
            <span className="about-badge-text">
              Kenya &amp; Tanzania
              <small>East Africa</small>
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="about-stats-bar">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat-number">{s.number}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Story timeline ── */}
      <section className="about-story section-padding">
        <div className="about-story-header">
          <p className="section-label">HOW IT STARTED</p>
          <h2>
            The story
            <br />
            <em>behind the name.</em>
          </h2>
        </div>
        <div className="about-timeline">
          {milestones.map((m, i) => (
            <div className="about-timeline-item" key={m.year}>
              <div className="about-timeline-marker">
                <span className="about-timeline-dot" />
                {i < milestones.length - 1 && (
                  <span className="about-timeline-line" />
                )}
              </div>
              <div className="about-timeline-content">
                <p className="about-timeline-year">{m.year}</p>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values section-padding">
        <div className="about-values-header">
          <p className="section-label">WHAT WE STAND FOR</p>
          <h2>
            Six things we
            <br />
            <em>will not compromise on.</em>
          </h2>
          <p>
            These are not taglines. They are the decisions we make every day
            when choosing partners, building packages and answering your questions.
          </p>
        </div>
        <div className="about-values-grid">
          {values.map((v) => (
            <div className="about-value-card" key={v.title}>
              <span className="about-value-icon" aria-hidden>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Destinations split ── */}
      <section className="about-destinations">
        <div
          className="about-dest-panel"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(8,24,28,.8) 0%, rgba(8,24,28,.3) 100%), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          <p className="section-label" style={{ color: "#e7d1a5" }}>OUR HOME</p>
          <h2>Kenya</h2>
          <p>
            The Maasai Mara, Amboseli, the Rift Valley lakes, Mount Kenya and
            500km of Indian Ocean coastline. We know every part of it.
          </p>
          <Link href="/destinations/kenya" className="about-dest-link">
            Explore Kenya ↗
          </Link>
        </div>
        <div
          className="about-dest-panel"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(8,24,28,.8) 0%, rgba(8,24,28,.3) 100%), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          <p className="section-label" style={{ color: "#e7d1a5" }}>EXPLORE BEYOND</p>
          <h2>Tanzania</h2>
          <p>
            The Serengeti, Ngorongoro Crater, Kilimanjaro and the beaches
            of Zanzibar. Africa at its most extraordinary.
          </p>
          <Link href="/destinations/tanzania" className="about-dest-link">
            Explore Tanzania ↗
          </Link>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="about-partners section-padding">
        <div className="about-partners-inner">
          <div className="about-partners-text">
            <p className="section-label">OUR PARTNERS</p>
            <h2>
              Who we
              <br />
              <em>work with.</em>
            </h2>
            <p>
              Bokiama works exclusively with licensed, reputable partners —
              park authorities, community conservancies, locally owned lodges
              and certified guides. We visit properties personally before
              recommending them.
            </p>
            <p>
              We do not accept commissions that compromise our recommendations.
              If we suggest a lodge, it is because it is genuinely good —
              not because it pays us more.
            </p>
          </div>
          <div className="about-partners-grid">
            {partners.map((p) => (
              <div className="about-partner-card" key={p.name}>
                <span className="about-partner-role">{p.role}</span>
                <span className="about-partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Responsible tourism ── */}
      <section className="about-responsible section-padding">
        <div className="about-responsible-image">
          <Image
            src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85"
            alt="Wildlife conservation in Kenya"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="about-responsible-img"
          />
        </div>
        <div className="about-responsible-content">
          <p className="section-label">TRAVEL WITH PURPOSE</p>
          <h2>
            Good travel
            <br />
            <em>gives back.</em>
          </h2>
          <p>
            The communities and landscapes we visit are the reason people
            come to East Africa. We take that seriously.
          </p>
          <ul className="about-responsible-list">
            <li>
              <span aria-hidden>→</span>
              We prioritise locally owned accommodation and suppliers.
            </li>
            <li>
              <span aria-hidden>→</span>
              We only recommend wildlife experiences that follow established
              ethical guidelines.
            </li>
            <li>
              <span aria-hidden>→</span>
              We support community conservancies that give local people
              a direct economic stake in conservation.
            </li>
            <li>
              <span aria-hidden>→</span>
              We never make environmental or community-benefit claims
              we cannot substantiate.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Why Bokiama ── */}
      <section className="about-why section-padding">
        <p className="section-label">WHY BOKIAMA</p>
        <h2 className="about-why-heading">
          What makes us
          <br />
          <em>different from the rest.</em>
        </h2>
        <div className="about-why-grid">
          <div className="about-why-item">
            <span className="about-why-num">01</span>
            <h3>We are from here</h3>
            <p>
              Our team lives and works in Kenya. We are not reading about these
              places in a brochure — we are driving the roads, visiting the lodges
              and building the contacts that make your journey better.
            </p>
          </div>
          <div className="about-why-item">
            <span className="about-why-num">02</span>
            <h3>We build around you</h3>
            <p>
              Tell us your budget, your travel companions, your idea of a perfect
              day — and we will build something around that. Not the other way round.
            </p>
          </div>
          <div className="about-why-item">
            <span className="about-why-num">03</span>
            <h3>Transparent pricing</h3>
            <p>
              Every quotation shows you exactly what you are paying for —
              accommodation, transport, activities, park fees. You will always know
              what is included and what is not.
            </p>
          </div>
          <div className="about-why-item">
            <span className="about-why-num">04</span>
            <h3>We stay in touch</h3>
            <p>
              From your first enquiry through to your return home, we are reachable
              by phone or email. If something changes, we handle it — you do
              not have to figure it out alone.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="custom-trip">
        <div className="custom-trip-content">
          <p className="section-label">LET'S TRAVEL</p>
          <h2>
            Ready to start
            <br />
            <em>your story?</em>
          </h2>
          <p>
            Browse our journeys or tell us what you have in mind.
            We will take it from there.
          </p>
          <div className="about-cta-buttons">
            <Link href="/tours" className="button button-gold">
              Browse journeys <span>↗</span>
            </Link>
            <Link href="/contact" className="about-cta-secondary">
              Contact us directly ↗
            </Link>
          </div>
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
