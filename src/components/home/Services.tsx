"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const services = [
  {
    step: "01",
    name: "Building Assessment",
    price: "From $2,500",
    description:
      "We connect to your building controls, pull performance data, and deliver a written report showing exactly where you're losing money — in dollars, not jargon. Every finding quantified with fix recommendations and projected savings.",
  },
  {
    step: "02",
    name: "Optimization",
    price: "Project-based pricing",
    description:
      "We fix everything the assessment finds. Correcting how equipment runs, recalibrating sensors, reprogramming schedules — scoped as a project with guaranteed deliverables. Typical result: 15–30% energy reduction. Qualifies for Oncor utility rebates.",
  },
  {
    step: "03",
    name: "Ongoing Monitoring",
    price: "From $1,500/mo",
    description:
      "24/7 automated monitoring catches problems before tenants complain and before they cost you money. Monthly energy reports prove ongoing savings. Priority response when issues arise.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Services() {
  return (
    <section className="py-32 md:py-40 px-6 bg-ps-warm">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center">
            <SectionLabel center>What We Do</SectionLabel>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black">
              From assessment to
              <br className="hidden md:block" />
              ongoing savings.
            </h2>
          </div>
        </FadeIn>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {services.map((service) => (
            <motion.div
              key={service.step}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-[48px] md:text-[56px] font-bold text-ps-border/40 leading-none">
                {service.step}
              </span>
              <h3 className="mt-4 text-[24px] md:text-[28px] font-bold text-ps-black">
                {service.name}
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-ps-gray">
                {service.price}
              </p>
              <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center space-y-4">
            <Link href="/services/commercial" className="link-gold text-[16px] block">
              See full commercial service details →
            </Link>
            <p className="text-[15px] text-ps-gray">
              We also design smart home systems for DFW homeowners.{" "}
              <Link href="/services/residential" className="link-gold text-[15px]">
                Learn more →
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
