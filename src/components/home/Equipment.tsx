"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerContainerSlow, viewportConfig } from "@/lib/animations";

const equipment = [
  {
    src: "/equipment/vav-box.jpg",
    alt: "VAV box with actuator and damper",
    label: "VAV Box",
    caption: "Controls airflow to individual zones",
    hasPhoto: false,
  },
  {
    src: "/equipment/actuator.jpg",
    alt: "Actuator mounted on a damper shaft",
    label: "Actuator",
    caption: "Opens and closes dampers and valves",
    hasPhoto: false,
  },
  {
    src: "/equipment/controls-panel.jpg",
    alt: "Building controls controller mounted in a panel",
    label: "Controls Panel",
    caption: "The brain of your building",
    hasPhoto: true,
  },
  {
    src: "/equipment/rooftop-unit.jpg",
    alt: "Rooftop HVAC unit on a commercial building",
    label: "Rooftop Unit",
    caption: "Heats and cools your building",
    hasPhoto: false,
  },
  {
    src: "/equipment/sensors.jpg",
    alt: "Temperature and pressure sensors",
    label: "Sensors",
    caption: "Measures temperature, pressure, and airflow",
    hasPhoto: false,
  },
  {
    src: "/equipment/ahu.jpg",
    alt: "Air handling unit with coils and fan",
    label: "Air Handler",
    caption: "Moves and conditions air through the building",
    hasPhoto: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Equipment() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="left">
          <SectionLabel>What We Work On</SectionLabel>
          <h2 className="mt-6 text-[36px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-ps-black">
            The equipment behind
            <br className="hidden md:block" />
            your energy bill.
          </h2>
          <p className="mt-6 md:mt-8 text-[19px] md:text-[21px] text-ps-gray leading-relaxed max-w-xl">
            This is what we see inside your building every day. These are the
            systems that control your comfort, your energy costs, and your
            bottom line.
          </p>
        </FadeIn>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainerSlow}
        >
          {equipment.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`group relative aspect-[4/3] bg-ps-subtle rounded-xl overflow-hidden ${
                i === 0 ? "md:row-span-2 md:aspect-auto" : ""
              }`}
            >
              {item.hasPhoto ? (
                <>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover scale-110 transition-transform duration-700 group-hover:scale-[1.18]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Tinted overlay to mute vendor branding and unify look */}
                  <div className="absolute inset-0 bg-ps-black/20 mix-blend-multiply" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16">
                    <p className="text-[15px] font-bold text-white tracking-[-0.01em]">
                      {item.label}
                    </p>
                    <p className="text-[12px] text-white/60 mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ps-subtle group-hover:bg-ps-subtle/90 transition-colors">
                  <div className="w-12 h-12 rounded-full border-2 border-ps-border flex items-center justify-center mb-3 group-hover:border-ps-black group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-ps-gray group-hover:text-ps-black transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-ps-black">
                    {item.label}
                  </p>
                  <p className="text-[12px] text-ps-gray mt-1">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
