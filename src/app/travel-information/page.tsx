import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineIcon from "../components/LineIcon";

export const metadata: Metadata = {
  title: "Travel Information & Booking Terms",
  description:
    "Practical visa, pricing and booking guidance for planning a Bokiama journey in Kenya or Tanzania.",
};

const travelSections = [
  {
    number: "01",
    title: "Entry requirements and visas",
    id: "visas",
  },
  {
    number: "02",
    title: "Prices and what is included",
    id: "costs",
  },
  {
    number: "03",
    title: "Booking, payment and changes",
    id: "booking",
  },
];

export default function TravelInformationPage() {
  return (
    <main>
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
            <Link href="/#collections">Experiences</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>

      <section className="travel-info-hero">
        <p className="hero-eyebrow"><span /> BEFORE YOU TRAVEL</p>
        <h1>
          The details that
          <br />
          <em>make a good journey.</em>
        </h1>
        <p>
          Entry rules, trip costs and booking conditions can vary. Use this
          guide to plan your questions, then check the current details for your
          specific trip before you book.
        </p>
        <Link href="/contact#enquiry" className="button button-gold">
          Ask us about your trip <span>↗</span>
        </Link>
      </section>

      <nav className="travel-info-index section-padding" aria-label="On this page">
        {travelSections.map((section) => (
          <Link href={`#${section.id}`} key={section.id}>
            <span>{section.number}</span>
            {section.title}
            <span aria-hidden>↓</span>
          </Link>
        ))}
      </nav>

      <section id="visas" className="travel-info-section section-padding">
        <div className="travel-info-heading">
          <p className="section-label">PASSPORTS &amp; ENTRY</p>
          <h2>
            Check the rules
            <br />
            <em>for your passport.</em>
          </h2>
          <p>
            Entry permission depends on your nationality, route and travel
            purpose. Requirements, fees and processing times can change, so
            confirm them with the relevant immigration authority before travel.
          </p>
        </div>
        <div className="travel-info-cards">
          <article className="travel-info-card">
            <span className="travel-info-card-number">KENYA</span>
            <h3>Electronic Travel Authorisation</h3>
            <p>
              The supplied itinerary lists a standard Kenya eTA fee of USD 35
              and processing in about five business days. It lists a passport
              valid for at least six months with one blank page, a passport
              photo, contact details, travel itinerary, accommodation booking
              confirmation and a payment method among the application
              requirements. Fees, processing times and requirements may change;
              confirm your eligibility and the current details with Kenya&apos;s
              official portal before applying.
            </p>
            <a
              href="https://www.etakenya.go.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              Kenya eTA — official portal <span>↗</span>
            </a>
          </article>
          <article className="travel-info-card">
            <span className="travel-info-card-number">TANZANIA &amp; ZANZIBAR</span>
            <h3>Online visa information</h3>
            <p>
              Tanzania&apos;s Immigration Services portal provides visa
              categories, nationality-specific requirements and online
              applications for travel to Tanzania, including Zanzibar.
            </p>
            <a
              href="https://visa.immigration.go.tz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              Tanzania Immigration — official portal <span>↗</span>
            </a>
          </article>
          <article className="travel-info-card travel-info-card--wide">
            <span className="travel-info-card-number">BEFORE DEPARTURE</span>
            <h3>Allow time to prepare</h3>
            <p>
              Check passport validity, entry permission, transit rules and any
              health documentation relevant to your route. Keep your approved
              travel documents and itinerary accessible, and verify requirements
              with official authorities and your airline. Bokiama can help you
              plan your trip but cannot issue visas or guarantee entry.
            </p>
            <p>
              The supplied itinerary also advises that a yellow fever
              vaccination certificate may be required when transiting through
              Addis Ababa, Ethiopia. Verify current health requirements for
              your full route with official sources and your airline.
            </p>
          </article>
        </div>
      </section>

      <section id="costs" className="travel-info-section travel-info-section--tint section-padding">
        <div className="travel-info-heading">
          <p className="section-label">CLEAR COSTS</p>
          <h2>
            Know what your
            <br />
            <em>quote covers.</em>
          </h2>
          <p>
            Tour listings show starting prices by traveller category where
            available. Your final price depends on your dates, group, room
            arrangement and confirmed availability.
          </p>
        </div>
        <div className="travel-info-copy">
          <h3>Before you confirm a price</h3>
          <p>
            Ask for a written, itemised quotation for your dates. It should make
            clear the currency and traveller categories, accommodation and
            meals, transfers, park or conservation fees, included activities,
            optional extras, exclusions, payment schedule and quote validity.
            Compare it with the inclusions and exclusions on the tour page.
          </p>
          <p>
            International flights, visas, insurance, gratuities and personal
            expenses are not included unless your specific quotation says they
            are. Do not rely on another operator&apos;s brochure or rates for a
            Bokiama booking.
          </p>
          <Link href="/tours" className="underlined-link">
            Compare our tour starting prices <span>↗</span>
          </Link>
        </div>
      </section>

      <section id="booking" className="travel-info-section section-padding">
        <div className="travel-info-heading">
          <p className="section-label">BOOKING WITH CONFIDENCE</p>
          <h2>
            Read the terms
            <br />
            <em>before paying.</em>
          </h2>
          <p>
            An enquiry is not a confirmed booking. Booking and supplier
            conditions can differ between trips.
          </p>
        </div>
        <div className="travel-info-copy">
          <h3>Prices and availability</h3>
          <ul className="travel-info-list">
            <li>Prices are indicative until a booking is confirmed; no reservation is made by receiving a quotation.</li>
            <li>Rooms, services and prices are subject to availability and may change, including due to exchange rates or government taxes.</li>
            <li>The itinerary may be adjusted for weather, traffic, operational needs or other unforeseen circumstances.</li>
            <li>Hotels are subject to availability. If the listed hotel is unavailable, an alternative of a similar category may be provided.</li>
          </ul>
          <h3>Payment schedule</h3>
          <p>
            The supplied terms specify a 25% deposit to confirm a booking, with
            the balance due 40 days before the trip. If the scheduled payment
            deadlines are missed, services may be cancelled and cancellation
            charges may apply. Confirm the amount, due dates and payment method
            in your written quotation before paying.
          </p>
          <h3>Cancellation and refunds</h3>
          <ul className="travel-info-list">
            <li>90–40 days before arrival: 26% of the total trip cost.</li>
            <li>39–22 days before arrival: 52% of the total trip cost.</li>
            <li>21 days or less before arrival, or a no-show: 100% of the total trip cost.</li>
            <li>Refunds are processed within 15 days after cancellation is confirmed; bank and currency-exchange fees are deducted.</li>
          </ul>
          <h3>Changes and exceptional circumstances</h3>
          <p>
            Requested amendments are not guaranteed. Date changes or transfer
            of a booking may not be possible after tickets are issued, and
            bank charges on refunds are borne by the traveller. For extraordinary
            events beyond the operator&apos;s control, the supplied terms provide
            for a refund under the applicable cancellation conditions (excluding
            insurance premiums) or an alternative tour or date of similar
            standard; any price difference is payable by the traveller. Minor
            operational changes may be made without notice.
          </p>
          <p>
            Review and keep the written quotation and terms before making a
            payment. Ask us to clarify anything you are unsure about. Travel
            insurance is recommended; insurance premiums are not refundable
            under the supplied terms.
          </p>
          <Link href="/contact#enquiry" className="button button-gold">
            Request a written quotation <span>↗</span>
          </Link>
        </div>
      </section>

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
            <Link href="/#collections">Collections</Link>
            <Link href="/about">Our story</Link>
            <Link href="/travel-information">Travel information</Link>
          </div>
          <div>
            <span>GET IN TOUCH</span>
            <Link href="/contact">Contact us</Link>
            <Link href="/contact#enquiry">Request a quotation</Link>
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
