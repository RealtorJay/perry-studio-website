"use client";

import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import { viewportConfig } from "@/lib/animations";

const stats = [
  {
    value: 40,
    prefix: "$",
    suffix: "K",
    label: "wasted per building annually",
    displayPrefix: "$20K–$",
  },
  {
    value: 80,
    prefix: "",
    suffix: "%",
    label: "of buildings have drifted controls",
  },
  {
    value: 6,
    prefix: "",
    suffix: " mo",
    label: "typical payback period",
    displayPrefix: "3–",
  },
];

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerStats = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Stats() {
  return (
    <section className="bg-ps-black py-24 md:py-32">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerStats}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="md:border-r md:last:border-r-0 border-white/10"
            >
              <p className="text-[56px] md:text-[72px] font-bold text-ps-light leading-none">
                {stat.displayPrefix !== undefined ? (
                  <>
                    {stat.displayPrefix}
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </>
                ) : (
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </p>
              <p className="mt-3 text-[16px] text-ps-gray">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
