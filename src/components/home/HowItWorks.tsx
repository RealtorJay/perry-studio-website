"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "We walk your building.",
    body: "Free 2-hour on-site assessment. We connect to your building controls, pull performance data, and identify issues — no cost, no commitment.",
  },
  {
    number: "02",
    title: "We find the waste.",
    body: "Within 5 business days, you get a detailed report quantifying every dollar of energy waste with fix recommendations and projected savings.",
  },
  {
    number: "03",
    title: "We fix it. Then we keep it fixed.",
    body: "We implement every fix, verify the savings, and set up ongoing monitoring so your building never drifts back.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-32 md:py-40 px-6 bg-ps-subtle">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center">
            <SectionLabel center>How It Works</SectionLabel>
            <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black">
              Three steps. Real answers.
            </h2>
          </div>
        </FadeIn>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative"
            >
              <p className="text-[100px] md:text-[120px] font-bold leading-none text-ps-border/50">
                {step.number}
              </p>
              <h3 className="mt-4 text-[24px] md:text-[28px] font-bold text-ps-black">
                {step.title}
              </h3>
              <p className="mt-4 text-[17px] md:text-[19px] text-ps-gray leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
