"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AboutContent() {
  return (
    <div className="pt-[52px]">
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black max-w-4xl">
              I&apos;ve been inside
              <br />
              the panel.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-2xl">
              Perry Studio is run by Jordan McClelland — a building automation
              installer who got tired of watching owners overpay for energy
              they weren&apos;t even using.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.03em] text-ps-black leading-[1.15]">
              Why I started Perry Studio.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-[18px] md:text-[20px] text-ps-gray leading-relaxed">
              I install and commission building automation systems for a
              living. Trane, Johnson Controls, Siemens, Honeywell, Niagara —
              I&apos;ve been inside the panels and on the rooftops.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-[18px] md:text-[20px] text-ps-gray leading-relaxed">
              What I kept seeing was the same story in different buildings:
              perfectly good equipment running illogical sequences. Heating
              and cooling fighting each other. Dampers stuck open. Schedules
              ignored. Setpoints nobody had touched in five years. And
              owners writing six- and seven-figure energy checks for
              waste they didn&apos;t know existed.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-[18px] md:text-[20px] text-ps-gray leading-relaxed">
              The controls contractor isn&apos;t going to fix it. Their job
              ended when the equipment passed startup. The facility manager
              has too many fires to chase down a 4% efficiency loss. So the
              waste just sits there, month after month, on the owner&apos;s
              bill.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mt-6 text-[18px] md:text-[20px] text-ps-gray leading-relaxed">
              Perry Studio works for the owner. We connect to your building
              remotely, pull the data, find the waste, and either fix it
              ourselves or coordinate with your existing crew to get it
              fixed. No equipment to sell you. No service contract upsell.
              Just smaller energy bills and a building that runs the way it
              was designed to.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-32 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-ps-black leading-[1.2]">
                  Vendor neutral.
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                  We work across every major controls platform. No
                  proprietary lock-in, no equipment upselling. The right fix
                  for your building, regardless of what brand is on the
                  panel.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-ps-black leading-[1.2]">
                  Owner aligned.
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                  We report directly to ownership. Full transparency on
                  every dollar of waste found and every dollar saved. No
                  middlemen, no markup on recommendations.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-ps-black leading-[1.2]">
                  Remote-first.
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                  Most of our work happens over secure remote access — which
                  means lower cost to you and faster turnaround than a
                  truck-roll contractor. When boots are needed on the
                  ground, we coordinate trusted local techs.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-ps-black leading-[1.2]">
                  Reports in dollars.
                </h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                  We do the deep technical work, but we report it in the
                  language of NOI, ROI, and operating impact. Because your
                  building is an investment — not a collection of equipment.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionLabel light center>Mission</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-light max-w-4xl mx-auto">
              Every commercial building should run
              <br />
              the way it was designed to.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[18px] md:text-[20px] text-ps-gray leading-relaxed max-w-[640px] mx-auto">
              Most aren&apos;t. We&apos;re here to find the gap — and
              translate it into dollars the owner can capture.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/#lead-form" className="btn-gold mt-10">
              Book a free 30-min review
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
