"use client";

import dynamic from "next/dynamic";
import FadeIn from "@/components/ui/FadeIn";
import HeroLeadForm from "@/components/home/HeroLeadForm";

const VAVBox = dynamic(() => import("@/components/three/VAVBox"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[600px] h-[400px] md:h-[500px] mx-auto" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-[80px] pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f3] via-white to-white" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ps-black/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-ps-black/5 rounded-full px-4 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[12px] font-semibold text-ps-black/60 tracking-wide">
                  Remote BAS analysis & commissioning
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-[44px] md:text-[64px] lg:text-[72px] font-bold tracking-[-0.04em] leading-[0.95] text-ps-black">
                Higher NOI.
                <br />
                Lower energy bills.
                <br />
                <span className="text-ps-black/50">No new equipment.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-[17px] md:text-[19px] text-ps-gray leading-relaxed max-w-xl">
                We find the money your building is leaking through illogical
                controls — and turn it into savings, rebates, and incentives
                your CPA can capture.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ul className="mt-8 space-y-2 text-[15px] text-ps-black/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-[2px]">✓</span>
                  <span>30-minute review of your building, no obligation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-[2px]">✓</span>
                  <span>We work for the owner — not the controls contractor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-[2px]">✓</span>
                  <span>Most buildings have 10–20% waste hiding in the sequences</span>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 hidden lg:block">
                <VAVBox />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="scale">
            <div id="lead-form" className="bg-white border border-ps-border/60 rounded-2xl p-6 md:p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)]">
              <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] text-ps-black">
                Book a free 30-min review.
              </h2>
              <p className="mt-2 text-[14px] text-ps-gray leading-relaxed">
                Tell us about your building. We&apos;ll respond within 24 hours
                with a time to talk.
              </p>
              <div className="mt-6">
                <HeroLeadForm />
              </div>
            </div>
          </FadeIn>

          <div className="lg:hidden">
            <FadeIn delay={0.5} direction="scale">
              <VAVBox />
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 flex items-center justify-center gap-6 text-[13px] text-ps-gray/60 flex-wrap">
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
