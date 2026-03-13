"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pageVariants = (reduced: boolean) => ({
  initial: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : -10,
    transition: { duration: reduced ? 0 : 0.3 },
  },
});

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const variants = pageVariants(reducedMotion);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

