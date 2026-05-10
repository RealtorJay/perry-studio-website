"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const buildingSizes = [
  "Under 25,000 sqft",
  "25,000 – 50,000 sqft",
  "50,000 – 100,000 sqft",
  "100,000 – 200,000 sqft",
  "200,000+ sqft",
];

const steps = [
  "We'll respond within 24 hours to schedule your walkthrough.",
  "A 2-hour on-site visit — we connect to your building controls and pull performance data.",
  "Within 5 business days, you get a written report quantifying waste.",
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        address: data.get("address"),
        building_size: data.get("building_size"),
        message: data.get("message"),
      }),
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-[52px]">
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black">
              Let&apos;s walk your building.
            </h1>
          </FadeIn>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Form */}
            <FadeIn delay={0.2}>
              {submitted ? (
                <div className="py-20">
                  <h2 className="text-[32px] font-semibold text-ps-black">
                    Thanks for reaching out.
                  </h2>
                  <p className="mt-4 text-[19px] text-ps-gray leading-relaxed">
                    We&apos;ll be in touch within 24 hours to schedule your
                    walkthrough.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
                      placeholder="(555) 555-5555"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Building Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
                      placeholder="123 Main St, Dallas, TX"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Building Size
                    </label>
                    <select
                      name="building_size"
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black bg-white focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
                    >
                      <option value="">Select size</option>
                      {buildingSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-ps-black mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full border border-ps-border rounded-lg px-4 py-3 text-[16px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow resize-none"
                      placeholder="Tell us about your building and what you're experiencing."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                  >
                    Request Your Walkthrough
                  </button>
                </form>
              )}
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.3}>
              <div>
                <h2 className="text-[24px] font-semibold text-ps-black">
                  Direct Contact
                </h2>
                <div className="mt-6 space-y-4 text-[17px] text-ps-gray">
                  <p>
                    <span className="text-ps-black font-medium">Email</span>
                    <br />
                    <a
                      href="mailto:jordan@perrystudio.com"
                      className="hover:text-ps-black transition-colors"
                    >
                      jordan@perrystudio.com
                    </a>
                  </p>
                  <p>
                    <span className="text-ps-black font-medium">Phone</span>
                    <br />
                    <a
                      href="tel:+14695555555"
                      className="hover:text-ps-black transition-colors"
                    >
                      (469) 555-5555
                    </a>
                  </p>
                  <p>
                    <span className="text-ps-black font-medium">
                      Service Area
                    </span>
                    <br />
                    Dallas–Fort Worth Metroplex
                  </p>
                </div>

                <div className="mt-12">
                  <h2 className="text-[24px] font-semibold text-ps-black">
                    What to expect
                  </h2>
                  <ol className="mt-6 space-y-6">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-[32px] font-bold text-ps-border leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[17px] text-ps-gray leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
