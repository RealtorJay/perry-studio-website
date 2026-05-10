"use client";

import dynamic from "next/dynamic";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const BuildingScene = dynamic(
  () => import("@/components/three/BuildingScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[600px] h-[400px] md:h-[500px] mx-auto" />
    ),
  }
);

const metrics = [
  { value: "87/100", label: "Building health" },
  { value: "3 faults", label: "detected this week" },
  { value: "$4,230", label: "waste identified" },
];

export default function Platform() {
  return (
    <section className="bg-black py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <SectionLabel light center>The Platform</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-light">
            See what your building
            <br />
            is really doing.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-xl mx-auto">
            Real-time problem detection. Energy waste in dollars. Monthly
            reports that prove your savings.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} direction="scale">
          <BuildingScene />
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            {metrics.map((m, i) => (
              <div key={i}>
                <p className="text-[36px] md:text-[48px] font-bold text-ps-light leading-none">
                  {m.value}
                </p>
                <p className="mt-2 text-[14px] text-ps-gray">{m.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
