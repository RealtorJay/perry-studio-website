"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerContainerSlow,
  fadeUpVariant,
  viewportConfig,
} from "@/lib/animations";
import HomeDashboard from "@/components/residential/HomeDashboard";

const services = [
  {
    name: "Smart Home Consultation",
    price: "Contact for pricing",
    description:
      "We evaluate your home's existing systems — HVAC, electrical, networking, security — and deliver a written integration plan showing exactly what's possible, what infrastructure you need, and a phased roadmap to get there. No pressure, no upsell. Just a clear picture of what your home could be.",
    includes: [
      "Full home systems audit (HVAC, electrical, security, networking)",
      "Network infrastructure assessment",
      "Integration compatibility report",
      "Phased implementation roadmap with pricing",
      "Technology recommendations (hardware, controllers, displays)",
      "Written proposal with floor plan markup",
    ],
  },
  {
    name: "Smart Home Build-Out",
    price: "Contact for pricing",
    description:
      "Full design and installation of the Perry Studio smart home system. A dedicated private network, wall-recessed iPad control panels, and every system in your home — HVAC, security, lighting, shades — unified into a single intelligent platform. Not a collection of gadgets. An operating system for your home.",
    includes: [
      "Dedicated smart home network (wired backbone, not WiFi-dependent)",
      "Wall-recessed iPad control panels (kitchen, master, entry)",
      "HVAC integration and zoned climate control",
      "Smart lock integration (front door, garage, gates)",
      "Lighting scenes and automated schedules",
      "Security camera and alarm system integration",
      "Motorized shade and blind integration",
      "Perry Studio Home OS — custom dashboard with 3D home view",
      "All hardware, installation, and programming included",
    ],
  },
  {
    name: "Home Monitoring & Support",
    price: "Contact for pricing",
    description:
      "24/7 automated monitoring of every connected system in your home. Energy tracking, security alerts, system health, and proactive maintenance notifications. Monthly reports show exactly how your home is performing and what we're optimizing.",
    includes: [
      "24/7 system health monitoring",
      "Real-time security and environmental alerts",
      "Monthly home performance reports",
      "Energy usage tracking and optimization",
      "Automatic software and firmware updates",
      "Priority on-site support for hardware issues",
      "Seasonal system tuning (HVAC schedules, lighting scenes)",
      "Direct line to your technician",
    ],
  },
];

const differentiators = [
  {
    title: "One system, not 50 apps",
    description:
      "Every device, every system, one interface. No jumping between apps to check your thermostat, locks, and lights.",
  },
  {
    title: "Dedicated network, not WiFi",
    description:
      "Your smart home runs on its own wired backbone — independent from your home WiFi. Faster, more reliable, more secure.",
  },
  {
    title: "Built-in, not stuck-on",
    description:
      "Recessed iPad panels, concealed wiring, and invisible infrastructure. Technology that disappears into your home's design.",
  },
  {
    title: "Designed for your home",
    description:
      "Every system is configured for your specific floor plan, routines, and preferences. Not a cookie-cutter install.",
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

export default function ResidentialServicesContent() {
  return (
    <div className="pt-[52px]">
      {/* Hero */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <SectionLabel center>Residential</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-[48px] md:text-[80px] font-bold tracking-[-0.04em] leading-none text-ps-black">
              Your home,
              <br className="hidden md:block" />
              intelligently connected.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-[680px] mx-auto">
              A unified operating system for your home. Every system — climate,
              security, lighting, energy — working together through one
              intelligent platform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Home OS Dashboard */}
      <HomeDashboard />

      {/* Differentiators */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel center>Why It&apos;s Different</SectionLabel>
              <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black">
                Not another smart home.
                <br className="hidden md:block" />
                A home that&apos;s actually smart.
              </h2>
            </div>
          </FadeIn>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainerSlow}
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="border-l-2 border-ps-border pl-6 py-2"
              >
                <h3 className="text-[20px] md:text-[24px] font-bold text-ps-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-[17px] text-ps-gray leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      {services.map((service, i) => (
        <section
          key={i}
          className={`py-24 md:py-32 px-6 ${i % 2 === 0 ? "bg-ps-subtle" : ""}`}
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
              <Link href="/contact" className="link-gold text-[16px]">
                Schedule a consultation →
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
              Ready to make your
              <br />
              home intelligent?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/contact" className="btn-gold mt-10">
              Schedule a Consultation
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
