"use client";

import dynamic from "next/dynamic";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const AHUScene = dynamic(() => import("@/components/three/AHUScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[500px] h-[350px] md:h-[400px] mx-auto" />
  ),
});

export default function Problem() {
  return (
    <section className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn direction="left">
              <SectionLabel>The Problem</SectionLabel>
            </FadeIn>
            <FadeIn direction="left" delay={0.1}>
              <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black">
                Most buildings
                <br />
                run blind.
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px]">
                Your building controls were installed once and never tuned
                again. Sensors drift. Schedules get overridden. Equipment
                fights itself. The Big 4 charge $250/hour to patch symptoms.
                We find root causes.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={0.3}>
            <AHUScene />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
