"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant, viewportConfig } from "@/lib/animations";

const services = [
  {
    name: "Building Assessment",
    price: "From $2,500",
    description:
      "We connect to your building controls, pull 6–12 months of performance data, and deliver a detailed written report showing exactly where your building is losing money. No guesswork — every finding is quantified in dollars with fix recommendations and savings projections.",
    includes: [
      "Full controls performance data analysis",
      "Equipment runtime and scheduling review",
      "Sensor accuracy assessment (are your readings correct?)",
      "Controls logic verification (is equipment doing what it should?)",
      "Written report with dollar-quantified findings",
      "Fix recommendations with projected savings",
      "Executive summary for ownership",
    ],
  },
  {
    name: "Optimization",
    price: "Starting at $8,000",
    description:
      "We fix everything the assessment finds. Correcting how equipment runs, recalibrating sensors, reprogramming controls, optimizing schedules — scoped as a project with guaranteed deliverables, not open-ended hourly billing. Typical result: 15–30% energy reduction with a 1–2 year payback. Qualifies for Oncor utility rebates.",
    includes: [
      "Complete equipment inventory and assessment",
      "Controls logic corrections and reprogramming",
      "Sensor recalibration and replacement",
      "Schedule and temperature setpoint optimization",
      "Economizer tuning (free cooling when outside air allows)",
      "Simultaneous heating/cooling elimination (stops equipment fighting itself)",
      "Oncor utility rebate application assistance",
      "All work documented with before/after verified savings",
    ],
  },
  {
    name: "Ongoing Monitoring",
    price: "From $1,500/mo",
    description:
      "24/7 automated monitoring and diagnostics. We watch your building controls remotely and catch problems before tenants complain and before they cost you money. Monthly energy reports show exactly what we caught and how much we saved.",
    includes: [
      "24/7 automated problem detection",
      "Real-time alerts for critical issues",
      "Monthly energy performance reports",
      "Performance tracking and anomaly detection",
      "Quarterly optimization recommendations",
      "Priority on-site response for critical issues",
      "Direct line to your engineer (not a call center)",
      "Annual savings report for ownership",
    ],
  },
];

export default function CommercialServicesContent() {
  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionLabel center>Commercial</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black">
              Building Services
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px] mx-auto">
              Three services. One clear path from waste to savings. Every
              engagement starts with a free walkthrough.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services detail */}
      {services.map((service, i) => (
        <section
          key={i}
          className={`py-24 md:py-32 px-6 ${i % 2 === 1 ? "bg-ps-subtle" : ""}`}
        >
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariant}>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h2 className="text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-ps-black">
                  {service.name}
                </h2>
                <p className="text-[18px] text-ps-gray">{service.price}</p>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUpVariant}
              className="mt-6 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-3xl"
            >
              {service.description}
            </motion.p>

            <motion.div variants={fadeUpVariant} className="mt-10">
              <h3 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-ps-gray mb-6">
                What&apos;s included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.includes.map((item, j) => (
                  <li
                    key={j}
                    className="text-[17px] text-ps-black flex items-start gap-3"
                  >
                    <span className="text-ps-gray mt-1.5 text-[10px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="mt-10">
              <Link
                href="/contact"
                className="link-gold text-[16px]"
              >
                Schedule a walkthrough →
              </Link>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-black py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-light">
              Ready to see what your
              <br />
              building is really doing?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
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
