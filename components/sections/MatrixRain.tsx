"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 12;
const COLOR = "rgba(24, 119, 242, 0.6)";
const BG_CLEAR = "rgba(0, 0, 0, 0.05)";

// Single chars so columns don't overlap; mix of keywords (first letter), tech, symbols, numbers
const CHARS = [
  "c", "l", "f", "r", "i", "R", "N", "P", "L", "F",
  "{", "}", "[", "]", "(", ")", ";", "=", ">", "<", "/", "*", "&", "|", "!",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
];

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function initSize() {
      const c = canvasRef.current;
      if (!c) return;
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const cols = Math.floor(c.width / FONT_SIZE);
      dropsRef.current = Array(cols).fill(1);
    }

    initSize();

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;

      ctx.fillStyle = BG_CLEAR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = COLOR;
      ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;

      const drops = dropsRef.current;
      const cols = drops.length;

      for (let i = 0; i < cols; i++) {
        const char =
          CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i];
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    function handleResize() {
      initSize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    />
  );
}
