"use client";

import { useState } from "react";

const buildingSizes = [
  "Under 25,000 sqft",
  "25,000 – 50,000 sqft",
  "50,000 – 100,000 sqft",
  "100,000 – 200,000 sqft",
  "200,000+ sqft",
];

export default function HeroLeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          building_size: data.get("building_size"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-6">
        <div className="text-[18px] font-semibold text-ps-black">
          Thanks — we&apos;ll be in touch within 24 hours.
        </div>
        <p className="mt-2 text-[14px] text-ps-gray leading-relaxed">
          Check your inbox. If you don&apos;t see anything from us, check spam
          or email{" "}
          <a
            href="mailto:jordan@perrystudio.com"
            className="text-ps-black underline underline-offset-4"
          >
            jordan@perrystudio.com
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="hero-name" className="block text-[13px] font-medium text-ps-black mb-1.5">
          Name
        </label>
        <input
          id="hero-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          className="w-full border border-ps-border rounded-lg px-3.5 py-2.5 text-[15px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="hero-email" className="block text-[13px] font-medium text-ps-black mb-1.5">
          Email
        </label>
        <input
          id="hero-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full border border-ps-border rounded-lg px-3.5 py-2.5 text-[15px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="hero-size" className="block text-[13px] font-medium text-ps-black mb-1.5">
          Building size
        </label>
        <select
          id="hero-size"
          name="building_size"
          required
          defaultValue=""
          className="w-full border border-ps-border rounded-lg px-3.5 py-2.5 text-[15px] text-ps-black bg-white focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow"
        >
          <option value="" disabled>
            Select size
          </option>
          {buildingSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hero-message" className="block text-[13px] font-medium text-ps-black mb-1.5">
          What&apos;s the biggest HVAC or energy headache in your building?
        </label>
        <textarea
          id="hero-message"
          name="message"
          rows={3}
          className="w-full border border-ps-border rounded-lg px-3.5 py-2.5 text-[15px] text-ps-black placeholder:text-ps-gray/50 focus:outline-none focus:ring-2 focus:ring-ps-black/10 transition-shadow resize-none"
          placeholder="High bills, hot/cold complaints, broken sensors, controls nobody understands…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Book my free review"}
      </button>

      {status === "error" && (
        <p className="text-[13px] text-red-600">
          Something went wrong. Try again, or email jordan@perrystudio.com.
        </p>
      )}

      <p className="text-[12px] text-ps-gray/70 text-center">
        Free, no obligation. We respond within 24 hours.
      </p>
    </form>
  );
}
