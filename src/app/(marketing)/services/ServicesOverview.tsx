"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const paths = [
  {
    label: "Commercial",
    title: "Building Intelligence",
    description:
      "Controls optimization for commercial buildings. We find the waste in your building systems, fix it, and keep it fixed — with every dollar quantified.",
    href: "/services/commercial",
    features: [
      "Building assessments",
      "Controls optimization",
      "24/7 monitoring",
    ],
  },
  {
    label: "Residential",
    title: "Smart Home Systems",
    description:
      "A unified operating system for your home. Dedicated network, wall-recessed control panels, and every system — HVAC, security, lighting — working as one.",
    href: "/services/residential",
    features: [
      "Home consultation",
      "Full build-out",
      "Ongoing support",
    ],
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

export default function ServicesOverview() {
  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionLabel center>What We Do</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black">
              Services
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px] mx-auto">
              Intelligent systems for commercial buildings and modern homes.
              Two worlds, one approach — make every system work smarter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Two paths */}
      <section className="pb-32 md:pb-40 px-6">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {paths.map((path) => (
            <motion.div key={path.label} variants={cardVariants}>
              <Link
                href={path.href}
                className="block bg-white rounded-2xl p-10 md:p-12 border border-ps-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ps-gray">
                  {path.label}
                </span>
                <h2 className="mt-4 text-[28px] md:text-[36px] font-bold tracking-[-0.03em] text-ps-black leading-tight">
                  {path.title}
                </h2>
                <p className="mt-4 text-[17px] text-ps-gray leading-relaxed">
                  {path.description}
                </p>
                <ul className="mt-8 space-y-2">
                  {path.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-[15px] text-ps-black flex items-center gap-3"
                    >
                      <span className="text-ps-gray text-[10px]">●</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-block text-[15px] font-semibold text-ps-black">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-light">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-[19px] text-[#666] max-w-xl mx-auto">
              Tell us about your building or home and we&apos;ll point you in the right direction.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/contact" className="btn-gold mt-10">
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
