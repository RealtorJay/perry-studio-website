"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const VAVBox = dynamic(() => import("@/components/three/VAVBox"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[600px] h-[400px] md:h-[500px] mx-auto" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-[52px] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f3] via-white to-white" />

      {/* Subtle warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ps-black/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto w-full text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-ps-black/5 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-semibold text-ps-black/60 tracking-wide">
              Building Intelligence for DFW
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mt-8 text-[48px] md:text-[88px] lg:text-[96px] font-bold tracking-[-0.04em] leading-[0.95] text-ps-black">
            Your building
            <br />
            is losing money.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 md:mt-8 text-[18px] md:text-[21px] text-ps-gray leading-relaxed max-w-lg mx-auto">
            Perry Studio finds the energy waste hiding in your building
            controls — and proves it in dollars, not jargon.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Schedule a Free Walkthrough
            </Link>
            <Link
              href="/services"
              className="text-[15px] font-semibold text-ps-black/60 hover:text-ps-black transition-colors"
            >
              See Services →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} direction="scale">
          <VAVBox />
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center gap-6 text-[13px] text-ps-gray/60">
            <span>Trane</span>
            <span className="w-1 h-1 rounded-full bg-ps-gray/30" />
            <span>Johnson Controls</span>
            <span className="w-1 h-1 rounded-full bg-ps-gray/30" />
            <span>Siemens</span>
            <span className="w-1 h-1 rounded-full bg-ps-gray/30" />
            <span>Honeywell</span>
            <span className="w-1 h-1 rounded-full bg-ps-gray/30" />
            <span>Niagara</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
