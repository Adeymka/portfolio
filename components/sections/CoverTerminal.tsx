"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CODE_LINES = [
  "const developer = {",
  '  name: "Donald Adjinda",',
  '  role: "Full Stack Developer",',
  '  frontend: ["React.js", "Next.js", "Flutter"],',
  '  backend: ["Laravel", "PHP"],',
  '  passion: "Building things that matter",',
  "  available: true,",
  "}",
];

const BUILD_LINES = [
  { text: "$ npm run build", delay: 0, color: "text-white" },
  { text: "▶ Compiling...", delay: 600, color: "text-yellow-400" },
  { text: "✓ Compiled successfully", delay: 1400, color: "text-green-400" },
  { text: "$ npm run deploy", delay: 2000, color: "text-white" },
  { text: "▶ Deploying to production...", delay: 2600, color: "text-yellow-400" },
  { text: "✓ Live at donald-adjinda.dev", delay: 3400, color: "text-green-400" },
];

type Phase = "typing" | "building" | "preview" | "reset";

const lastBuildDelay = Math.max(...BUILD_LINES.map((l) => l.delay));

export default function CoverTerminal() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [buildLines, setBuildLines] = useState(0);
  const [showBrowser, setShowBrowser] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAllTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  // Phase 1 — Typing
  useEffect(() => {
    if (phase !== "typing") return;
    const line = CODE_LINES[currentLine];
    if (!line) return;

    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 35);
      timersRef.current.push(t);
      return () => clearTimeout(t);
    }

    setTypedLines((prev) => [...prev, line]);
    if (currentLine + 1 < CODE_LINES.length) {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 80);
      timersRef.current.push(t);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("building"), 800);
    timersRef.current.push(t);
    return () => clearTimeout(t);
  }, [phase, currentLine, currentChar]);

  // Phase 2 — Building
  useEffect(() => {
    if (phase !== "building") return;
    BUILD_LINES.forEach(({ delay }) => {
      const t = setTimeout(() => setBuildLines((n) => n + 1), delay);
      timersRef.current.push(t);
    });
    const t = setTimeout(() => {
      setShowBrowser(true);
      setPhase("preview");
    }, lastBuildDelay + 1000);
    timersRef.current.push(t);
    return () => clearAllTimers();
  }, [phase]);

  // Phase 3 — Preview then reset
  useEffect(() => {
    if (phase !== "preview") return;
    const t = setTimeout(() => setPhase("reset"), 3500);
    timersRef.current.push(t);
    return () => clearTimeout(t);
  }, [phase]);

  // Reset
  useEffect(() => {
    if (phase !== "reset") return;
    const t = setTimeout(() => {
      setTypedLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setBuildLines(0);
      setShowBrowser(false);
      setPhase("typing");
    }, 500);
    timersRef.current.push(t);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const showTerminal = phase === "typing" || phase === "building";

  return (
    <div
      className="absolute inset-0 flex items-end justify-center p-4 pb-6 pointer-events-none select-none hidden sm:block"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-[400px] max-w-[90vw] rounded-lg overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: "rgba(15, 15, 20, 0.92)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10"
              style={{ background: "rgba(30, 30, 40, 0.95)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-jetbrains-mono text-[11px] text-white/50">
                portfolio.js
              </span>
            </div>
            <div className="p-3 font-jetbrains-mono text-[11px] leading-5 min-h-[140px]">
              {phase === "typing" && (
                <>
                  {typedLines.map((line, i) => (
                    <div key={i} className="text-green-400">
                      {line}
                    </div>
                  ))}
                  {currentLine < CODE_LINES.length && (
                    <div className="text-green-400">
                      {CODE_LINES[currentLine].substring(0, currentChar)}
                      <span
                        className="inline-block w-[6px] h-[13px] bg-green-400 animate-pulse ml-[1px] align-middle"
                        aria-hidden
                      />
                    </div>
                  )}
                </>
              )}
              {(phase === "building" || phase === "preview") && (
                <>
                  {BUILD_LINES.slice(0, buildLines).map((item, i) => (
                    <div key={i} className={item.color}>
                      {item.text}
                    </div>
                  ))}
                  {buildLines > 0 && buildLines <= BUILD_LINES.length && (
                    <span
                      className="inline-block w-[6px] h-[13px] bg-green-400 animate-pulse ml-[1px] align-middle"
                      aria-hidden
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBrowser && phase === "preview" && (
          <motion.div
            key="browser"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] rounded-lg overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: "rgba(240, 240, 245, 0.97)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 border-b border-black/10"
              style={{ background: "rgba(220, 220, 228, 0.98)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <div
                className="flex-1 mx-2 rounded-md px-2 py-0.5 font-jetbrains-mono text-[10px] text-gray-500 flex items-center gap-1"
                style={{ background: "rgba(255,255,255,0.8)" }}
              >
                🔒 donald-adjinda.vercel.app
              </div>
            </div>
            <div className="px-4 py-4" style={{ background: "white" }}>
              <span className="flex items-center gap-1.5 text-[10px] text-green-600 font-medium mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </span>
              <p className="font-syne font-bold text-[15px] text-gray-900">
                Donald Adjinda
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Full Stack Developer · React · Next.js · Laravel
              </p>
              <div className="mt-2 flex gap-1 flex-wrap">
                <span className="text-[9px] rounded-full px-1.5 py-0.5 font-jetbrains-mono bg-blue-100 text-blue-700">
                  React.js
                </span>
                <span className="text-[9px] rounded-full px-1.5 py-0.5 font-jetbrains-mono bg-gray-100 text-gray-700">
                  Next.js
                </span>
                <span className="text-[9px] rounded-full px-1.5 py-0.5 font-jetbrains-mono bg-red-100 text-red-700">
                  Laravel
                </span>
                <span className="text-[9px] rounded-full px-1.5 py-0.5 font-jetbrains-mono bg-purple-100 text-purple-700">
                  PHP
                </span>
                <span className="text-[9px] rounded-full px-1.5 py-0.5 font-jetbrains-mono bg-cyan-100 text-cyan-700">
                  Flutter
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
