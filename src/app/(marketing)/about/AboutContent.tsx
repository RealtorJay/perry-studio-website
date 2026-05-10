"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AboutContent() {
  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black max-w-4xl">
              We speak building owner,
              <br />
              not just HVAC.
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="pb-32 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <FadeIn>
                <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.03em] text-ps-black leading-[1.1]">
                  The dual perspective
                  <br />
                  that changes everything.
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  Jordan McClelland is a licensed real estate professional and a
                  building controls technician. That combination doesn&apos;t
                  exist at the Big 4 controls companies.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  Most controls companies talk to facility managers in
                  technical language that means nothing to ownership. Building
                  owners hear noise. They want one answer: what&apos;s this
                  costing me and what can you save?
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-6 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  Perry Studio exists to bridge that gap. We do the deep
                  technical work — fixing how equipment runs, reprogramming
                  controls, catching problems early — but we report it in the
                  language of return on investment, operating income impact, and
                  what it means for your property value. Because your building
                  is an investment, not just a collection of equipment.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.03em] text-ps-black leading-[1.1]">
                  Vendor neutral.
                  <br />
                  Owner aligned.
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  We work with every major controls platform — Trane, Johnson
                  Controls, Siemens, Honeywell, and Niagara. No proprietary
                  lock-in. No equipment upselling. Just the right fix for your
                  building.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  The Big 4 have a conflict of interest. They sell equipment and
                  service contracts. When your system has a problem, their
                  incentive is to sell you new hardware. Our incentive is to make
                  your existing system work the way it was designed to.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-6 text-[19px] md:text-[21px] text-ps-gray leading-relaxed">
                  We report directly to building ownership. Full transparency on
                  every dollar of waste found and every dollar saved. No
                  middlemen, no markup on recommendations.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionLabel light center>Our Mission</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-light max-w-4xl mx-auto">
              Make every commercial building in DFW
              run as efficiently as it was designed to.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px] mx-auto">
              80% of commercial buildings have controls that have drifted from
              their original design. That&apos;s billions of dollars wasted
              every year in energy, maintenance, and tenant discomfort. We&apos;re
              here to fix that, one building at a time.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/contact"
              className="btn-gold mt-10"
            >
              Schedule Your Walkthrough
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
