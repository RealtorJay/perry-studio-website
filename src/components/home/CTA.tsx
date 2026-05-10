"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function CTA() {
  return (
    <section className="relative bg-ps-black py-32 md:py-40 px-6 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.03] rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-[36px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.05] text-white">
            Find out what your building
            <br />
            is really costing you.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-[#888] leading-relaxed max-w-xl mx-auto">
            A free walkthrough for DFW commercial buildings 25,000 sqft and up.
            No cost, no commitment — just answers.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Schedule Your Walkthrough
            </Link>
            <Link
              href="/incentives"
              className="text-[15px] font-semibold text-[#666] hover:text-white transition-colors"
            >
              See Tax Incentives →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-8 text-[14px] text-[#555]">
            or email{" "}
            <a
              href="mailto:jordan@perrystudio.com"
              className="underline hover:text-white transition-colors"
            >
              jordan@perrystudio.com
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
