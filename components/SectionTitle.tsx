"use client";

import { motion } from "framer-motion";

const viewport = { once: true, amount: 0.3 };

export default function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
