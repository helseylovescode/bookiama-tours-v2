import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Plan your East Africa journey with Bokiama Tours & Travel. Send an enquiry and receive a personalised quotation within 24 hours.",
};

interface Props {
  searchParams: Promise<{ tour?: string }>;
}

const contactChannels = [
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+254 700 000 000",
    note: "Fastest response — usually within the hour",
    href: "https://wa.me/254700000000",
  },
  {
    icon: "📧",
    label: "Email",
    value: "hello@bokiamatours.com",
    note: "We respond within 24 hours",
    href: "mailto:hello@bokiamatours.com",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Nairobi, Kenya",
    note: "Serving Kenya & Tanzania",
    href: null,
  },
];

const faqs = [
  {
    q: "Do I have to pay anything now?",
    a: "No. Submitting an enquiry is completely free. We will send you a personalised quotation and you only confirm and pay once you are happy with everything.",
  },
  {
    q: "How quickly will you respond?",
    a: "We aim to respond within 24 hours on weekdays. For urgent enquiries, WhatsApp is the fastest way to reach us.",
  },
  {
    q: "Can you build a completely custom itinerary?",
    a: "Yes — that is one of the things we do best. Tell us your travel dates, budget, and what you want to experience. We will put together a journey built around you.",
  },
  {
    q: "Do you handle bookings for groups?",
    a: "Yes. We work with families, friend groups and corporate teams. Just indicate your group size in the form and we will get back to you with group pricing options.",
  },
  {
    q: "What are your payment methods?",
    a: "We accept M-Pesa and bank transfer for Kenyan customers. International customers can pay by bank transfer. Full payment instructions are provided with your booking confirmation.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations more than 30 days before departure receive a partial refund. Within 30 days, the deposit is non-refundable. We strongly recommend travel insurance for all bookings.",
  },
];

export default async function ContactPage({ searchParams }: Props) {
  const { tour } = await searchParams;
  const prefilledTour = tour ? decodeURIComponent(tour) : undefined;

  return (
    <main>
      {/* ── Header ── */}
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Bokiama Tours and Travel home">
          <span className="brand-symbol">B</span>
          <span className="brand-name">
            BOKIAMA
            <small>TOURS &amp; TRAVEL</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/destinations/kenya">Destinations</Link>
          <Link href="/tours">Our Tours</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact" aria-current="page">Contact</Link>
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
        <span aria-current="page">Contact</span>
      </nav>

      {/* ── Page hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-text">
          <p className="hero-eyebrow">
            <span /> GET IN TOUCH
          </p>
          <h1>
            Let's plan your
            <br />
            <em>next adventure.</em>
          </h1>
          <p>
            Tell us what you have in mind. We will get back to you with a
            personalised quotation — usually within 24 hours.
          </p>
        </div>
        <div className="contact-channels">
          {contactChannels.map((c) => (
            <div className="contact-channel" key={c.label}>
              <span className="contact-channel-icon" aria-hidden>{c.icon}</span>
              <div>
                <span className="contact-channel-label">{c.label}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    className="contact-channel-value"
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="contact-channel-value">{c.value}</span>
                )}
                <span className="contact-channel-note">{c.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main content: form + sidebar ── */}
      <section className="contact-body section-padding">
        {/* Form column */}
        <div className="contact-form-col">
          <div className="contact-form-header">
            <p className="section-label">SEND AN ENQUIRY</p>
            <h2>
              {prefilledTour
                ? `Tell us about your trip`
                : "Tell us what you're dreaming of."}
            </h2>
            <p>
              Fill in as much or as little as you like. The more you tell us,
              the more accurate your quotation will be — but we can work with
              just a name and phone number too.
            </p>
          </div>
          <ContactForm prefilledTour={prefilledTour} />
        </div>

        {/* Sidebar */}
        <aside className="contact-sidebar">
          {/* WhatsApp CTA */}
          <div className="contact-whatsapp-card">
            <span className="contact-whatsapp-icon" aria-hidden>💬</span>
            <h3>Prefer to chat directly?</h3>
            <p>
              Send us a WhatsApp message with your travel idea.
              We respond fast — usually within the hour.
            </p>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-gold contact-wa-btn"
            >
              Chat on WhatsApp ↗
            </a>
          </div>

          {/* What to expect */}
          <div className="contact-expect-card">
            <h3>What happens next</h3>
            <ol className="contact-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>We receive your enquiry</strong>
                  <p>Your request goes straight to our team in Nairobi.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>We check availability</strong>
                  <p>We verify lodge and guide availability for your dates.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>We send your quotation</strong>
                  <p>A detailed, itemised quote — usually within 24 hours.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>You decide</strong>
                  <p>No pressure. Confirm when you are happy. Pay to secure.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Trust signals */}
          <div className="contact-trust-card">
            <ul className="contact-trust-list">
              <li><span aria-hidden>✓</span> No payment required to enquire</li>
              <li><span aria-hidden>✓</span> Personalised quotation within 24 hours</li>
              <li><span aria-hidden>✓</span> No hidden fees — everything itemised</li>
              <li><span aria-hidden>✓</span> Licensed and locally based in Nairobi</li>
              <li><span aria-hidden>✓</span> M-Pesa and bank transfer accepted</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* ── FAQs ── */}
      <section className="contact-faq section-padding">
        <div className="contact-faq-header">
          <p className="section-label">COMMON QUESTIONS</p>
          <h2>
            Before you
            <br />
            <em>get in touch.</em>
          </h2>
        </div>
        <div className="contact-faq-grid">
          {faqs.map((faq) => (
            <div className="contact-faq-item" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse tours CTA ── */}
      <section className="custom-trip">
        <div className="custom-trip-content">
          <p className="section-label">NOT SURE WHAT TO ASK?</p>
          <h2>
            Browse our
            <br />
            <em>journeys first.</em>
          </h2>
          <p>
            Take a look at what we offer — then come back and tell us
            which ones caught your eye.
          </p>
          <div className="about-cta-buttons">
            <Link href="/tours" className="button button-gold">
              Browse all tours <span>↗</span>
            </Link>
            <Link href="/destinations/kenya" className="about-cta-secondary">
              Explore Kenya ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-top">
          <Link href="/" className="brand footer-brand">
            <span className="brand-symbol">B</span>
            <span className="brand-name">
              BOKIAMA
              <small>TOURS &amp; TRAVEL</small>
            </span>
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
            <Link href="/collections">Collections</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact us</Link>
          </div>
          <div>
            <span>GET IN TOUCH</span>
            <Link href="/contact">Plan a journey</Link>
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
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
