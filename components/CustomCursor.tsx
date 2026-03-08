"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouch) return;

    document.body.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest('input:not([type="search"])') ||
        target.closest("select") ||
        target.closest("textarea")
      ) {
        setIsHoveringClickable(true);
      }
    };

    const handleOut = () => setIsHoveringClickable(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;
  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
      style={{
        x: position.x,
        y: position.y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={false}
      animate={{
        width: isHoveringClickable ? 40 : 12,
        height: isHoveringClickable ? 40 : 12,
        backgroundColor: isHoveringClickable ? "transparent" : "#1877F2",
        border: isHoveringClickable ? "2px solid #1877F2" : "2px solid transparent",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}
