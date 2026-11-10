import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";
import LineIcon from "../components/LineIcon";
import type { IconName } from "../components/LineIcon";

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
    icon: "mail",
    label: "Enquiry form",
    value: "Send us your trip details",
    note: "Request a personalised quotation",
    href: "/contact#enquiry",
  },
  {
    icon: "mail",
    label: "Email",
    value: "oyujelsey@gmail.com",
    note: "We respond within 24 hours",
    href: "mailto:oyujelsey@gmail.com",
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+254 799 941114",
    note: "Call Bokiama Tours & Travel",
    href: "tel:+254799941114",
  },
  {
    icon: "pin",
    label: "Location",
    value: "Nairobi, Kenya",
    note: "Serving Kenya & Tanzania",
    href: null,
  },
] satisfies {
  icon: IconName;
  label: string;
  value: string;
  note: string;
  href: string | null;
}[];

const faqs = [
  {
    q: "Do I have to pay anything now?",
    a: "No. Submitting an enquiry is completely free. We will send you a personalised quotation and you only confirm and pay once you are happy with everything.",
  },
  {
    q: "How quickly will you respond?",
    a: "Send us your trip details using the enquiry form and we will follow up by email.",
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
    a: "The supplied terms specify a 25% deposit and the remaining balance 40 days before travel. Your written quotation will confirm accepted payment methods and due dates.",
  },
  {
    q: "What is your cancellation policy?",
    a: "The supplied terms list cancellation charges of 26% from 90–40 days, 52% from 39–22 days, and 100% from 21 days before arrival or for a no-show. Refunds are processed within 15 days after confirmation, less bank and currency-exchange fees. Review your written quotation before booking.",
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
          <Link href="/about">Our Story</Link>
          <Link href="/contact" aria-current="page">Contact</Link>
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
              <span className="contact-channel-icon"><LineIcon name={c.icon} size={22} /></span>
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
      <section id="enquiry" className="contact-body section-padding">
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
          {/* Enquiry CTA */}
          <div className="contact-whatsapp-card">
            <span className="contact-whatsapp-icon"><LineIcon name="mail" size={30} /></span>
            <h3>Planning a trip?</h3>
            <p>
              Share your dates, group size and interests in our enquiry form.
            </p>
            <Link href="#enquiry" className="button button-gold contact-wa-btn">
              Send an enquiry ↗
            </Link>
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
              <li><LineIcon name="check" size={16} /> No payment required to enquire</li>
              <li><LineIcon name="check" size={16} /> Personalised quotation within 24 hours</li>
              <li><LineIcon name="check" size={16} /> Review trip inclusions and exclusions before booking</li>
              <li><LineIcon name="check" size={16} /> Request payment and cancellation terms before booking</li>
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
            <Link href="/contact#enquiry">Send an enquiry</Link>
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
