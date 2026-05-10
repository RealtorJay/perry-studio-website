"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  fadeUpVariant,
  fadeInVariant,
  slideInLeftVariant,
  slideInRightVariant,
  scaleUpVariant,
  viewportConfig,
} from "@/lib/animations";

const variants = {
  up: fadeUpVariant,
  fade: fadeInVariant,
  left: slideInLeftVariant,
  right: slideInRightVariant,
  scale: scaleUpVariant,
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof variants;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const variant = variants[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
