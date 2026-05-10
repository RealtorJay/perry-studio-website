"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const reasons = [
  {
    title: "We know both sides.",
    body: "Jordan McClelland is a licensed real estate professional and a building controls technician. We understand your building as an investment, not just a collection of equipment.",
  },
  {
    title: "Vendor neutral.",
    body: "We work with every major system — Trane, Johnson Controls, Siemens, Honeywell, Niagara. No proprietary lock-in. No upselling equipment you don't need.",
  },
  {
    title: "DFW native.",
    body: "We're local, we're responsive, and we know the DFW commercial market inside and out. Same-day response, not a 2-week wait.",
  },
  {
    title: "Owner-first.",
    body: "We report to you, not your property manager. You see every dollar of waste and every dollar saved. Full transparency, always.",
  },
];

const cardVariants = [
  {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  },
  {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  },
  {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  },
  {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  },
];

export default function WhyUs() {
  return (
    <section className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black text-center">
            Not your typical
            <br />
            controls company.
          </h2>
        </FadeIn>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={cardVariants[i]}
              className="border-l-2 border-ps-black pl-8"
            >
              <h3 className="text-[22px] md:text-[24px] font-bold text-ps-black">
                {r.title}
              </h3>
              <p className="mt-3 text-[17px] md:text-[19px] text-ps-gray leading-relaxed">
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
