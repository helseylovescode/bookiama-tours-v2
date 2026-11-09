"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry, type FormState } from "./actions";
import Link from "next/link";

const INITIAL: FormState = { status: "idle" };

const MOODS = [
  "Adventure & Safari",
  "Beach & Relaxation",
  "Culture & Discovery",
  "Family Holiday",
  "Romantic Getaway",
  "Group Travel",
  "Wildlife Photography",
  "Honeymoon",
  "Not sure yet — help me choose",
];

const BUDGETS = [
  "Under KES 20,000 per person",
  "KES 20,000 – 50,000 per person",
  "KES 50,000 – 100,000 per person",
  "KES 100,000 – 200,000 per person",
  "KES 200,000+ per person",
  "USD 500 – 1,000 per person",
  "USD 1,000 – 2,500 per person",
  "USD 2,500+ per person",
  "Prefer not to say",
];

interface Props {
  prefilledTour?: string;
}

export default function ContactForm({ prefilledTour }: Props) {
  const [state, action, isPending] = useActionState(submitEnquiry, INITIAL);
  const successRef = useRef<HTMLDivElement>(null);

  // Scroll into view on success
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.status]);

  // ── Success state ─────────────────────────────────────────────────────────
  if (state.status === "success") {
    return (
      <div className="cf-success" ref={successRef}>
        <span className="cf-success-icon" aria-hidden>✓</span>
        <div>
          <h2>Enquiry received.</h2>
          <p>
            Thank you — we have received your enquiry and will be in touch
            within <strong>24 hours</strong>. Your reference is:
          </p>
          <p className="cf-reference">{state.reference}</p>
          <p className="cf-success-note">
            We will follow up using the contact details you provided.
          </p>
          <div className="cf-success-actions">
            <Link href="/tours" className="cf-text-link">
              Browse more tours ↗
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form action={action} className="cf-form" noValidate>
      {/* Hidden fields */}
      <input type="hidden" name="enquiry_type" value={prefilledTour ? "tour" : "general"} />
      {prefilledTour && (
        <input type="hidden" name="tour_name" value={prefilledTour} />
      )}

      {/* Tour context banner */}
      {prefilledTour && (
        <div className="cf-tour-context">
          <span className="cf-tour-context-label">Enquiring about</span>
          <span className="cf-tour-context-name">{prefilledTour}</span>
          <Link href="/tours" className="cf-tour-context-change">
            Change tour ↗
          </Link>
        </div>
      )}

      {/* Error banner */}
      {state.status === "error" && (
        <div className="cf-error-banner" role="alert">
          <span aria-hidden>⚠</span> {state.message}
        </div>
      )}

      {/* ── Section 1: Contact details ── */}
      <fieldset className="cf-fieldset">
        <legend className="cf-legend">
          <span className="cf-legend-num">01</span> Your details
        </legend>

        <div className="cf-row cf-row-2">
          <div className="cf-field">
            <label htmlFor="name" className="cf-label">
              Full name <span className="cf-required" aria-label="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className="cf-input"
              required
              aria-required="true"
              disabled={isPending}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="country" className="cf-label">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder="e.g. Kenya, Germany, UAE"
              className="cf-input"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="cf-row cf-row-2">
          <div className="cf-field">
            <label htmlFor="email" className="cf-label">
              Email address <span className="cf-required" aria-label="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="cf-input"
              required
              aria-required="true"
              disabled={isPending}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="phone" className="cf-label">
              Phone number <span className="cf-required" aria-label="required">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+254 7XX XXX XXX"
              className="cf-input"
              required
              aria-required="true"
              disabled={isPending}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Section 2: Trip details ── */}
      <fieldset className="cf-fieldset">
        <legend className="cf-legend">
          <span className="cf-legend-num">02</span> Your journey
        </legend>

        <div className="cf-row cf-row-3">
          <div className="cf-field">
            <label htmlFor="adults" className="cf-label">
              Adults <span className="cf-required" aria-label="required">*</span>
            </label>
            <select
              id="adults"
              name="adults"
              className="cf-select"
              defaultValue="1"
              required
              aria-required="true"
              disabled={isPending}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n} adult{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="children" className="cf-label">Children</label>
            <select
              id="children"
              name="children"
              className="cf-select"
              defaultValue="0"
              disabled={isPending}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} child{n !== 1 ? "ren" : ""}</option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="travel_date" className="cf-label">
              Preferred travel date
            </label>
            <input
              id="travel_date"
              name="travel_date"
              type="date"
              className="cf-input"
              disabled={isPending}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="cf-row cf-row-2">
          <div className="cf-field">
            <label htmlFor="mood" className="cf-label">Travel style</label>
            <select
              id="mood"
              name="mood"
              className="cf-select"
              defaultValue=""
              disabled={isPending}
            >
              <option value="">Select a travel style…</option>
              {MOODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="budget" className="cf-label">Approximate budget</label>
            <select
              id="budget"
              name="budget"
              className="cf-select"
              defaultValue=""
              disabled={isPending}
            >
              <option value="">Select a budget range…</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* ── Section 3: Message ── */}
      <fieldset className="cf-fieldset">
        <legend className="cf-legend">
          <span className="cf-legend-num">03</span> Anything else
        </legend>

        <div className="cf-field">
          <label htmlFor="message" className="cf-label">
            Tell us more about what you have in mind
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Destinations you want to visit, special occasions, dietary requirements, accessibility needs — anything that helps us plan your journey better."
            className="cf-textarea"
            disabled={isPending}
          />
        </div>

        <p className="cf-privacy-note">
          Your information is used only to respond to your enquiry and plan your journey.
          We do not share your details with third parties.{" "}
          <Link href="/about" className="cf-privacy-link">
            Learn about our approach ↗
          </Link>
        </p>
      </fieldset>

      {/* ── Submit ── */}
      <div className="cf-submit-row">
        <button
          type="submit"
          className="button button-gold cf-submit-btn"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <>
              <span className="cf-spinner" aria-hidden /> Sending…
            </>
          ) : (
            <>Send my enquiry <span>↗</span></>
          )}
        </button>
        <p className="cf-submit-note">
          No payment is required to send an enquiry. We will follow up with a personalised quotation.
        </p>
      </div>
    </form>
  );
}
