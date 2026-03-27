import React, { useState, useEffect, useRef } from "react";
import { useContent } from "../context/ContentContext";
import { usePageTransition } from "./NavTransition";
import { motion, useAnimate } from "framer-motion";

const EntryLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("entering"); // entering | counting | zooming | done
  const [scope, animate] = useAnimate();
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const { content } = useContent();
  const { navigateTo } = usePageTransition();
  const subtexts = (content && content.landing && content.landing.subtexts) || ["For startups to enterprises", "From MVP to market leadership"];

  // Phase 1: Slide card up from bottom
  useEffect(() => {
    if (phase !== "entering") return;
    const run = async () => {
      await animate(
        scope.current,
        { y: 0, rotate: 0 },
        { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      );
      setPhase("counting");
    };
    run();
  }, [phase]);

  // Phase 2: Count from 0 → 100 over ~2.2s with easing
  useEffect(() => {
    if (phase !== "counting") return;
    const duration = 2200;
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("zooming");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Once counting done → zoom the preview to full screen
  useEffect(() => {
    if (phase !== "zooming") return;
    const run = async () => {
      // Scale preview from 0.35 → 1 and fade out overlay
      await animate(
        scope.current,
        { scale: 1, borderRadius: "0px" },
        { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
      );
      setPhase("done");
      onComplete();
    };
    run();
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-zinc-200">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
        }
      `}</style>
      {/* Left shadow card — slides in from left */}
      {phase !== "zooming" && phase !== "done" && (
        <motion.div
          className="absolute w-full h-full bg-zinc-100 rounded-3xl shadow-xl"
          initial={{ scale: 0.5, x: "-120vw", rotate: -12, opacity: 0 }}
          animate={
            phase === "entering"
              ? { scale: 0.5, x: "-120vw", rotate: -12, opacity: 0 }
              : { scale: 0.48, x: "-18vw", rotate: -8, opacity: 0.6 }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Right shadow card — slides in from right */}
      {phase !== "zooming" && phase !== "done" && (
        <motion.div
          className="absolute w-full h-full bg-zinc-100 rounded-3xl shadow-xl"
          initial={{ scale: 0.5, x: "120vw", rotate: 12, opacity: 0 }}
          animate={
            phase === "entering"
              ? { scale: 0.5, x: "120vw", rotate: 12, opacity: 0 }
              : { scale: 0.48, x: "18vw", rotate: 8, opacity: 0.6 }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Main card — miniature landing page preview */}
      <motion.div
        ref={scope}
        className="w-full h-full origin-center overflow-hidden bg-white shadow-2xl"
        initial={{ scale: 0.55, borderRadius: "24px", y: "110vh", rotate: 6 }}
        style={{ pointerEvents: "none", zIndex: 2 }}
      >
        {/* Percentage counter overlay on the card */}
        {phase === "counting" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-start justify-end p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-baseline gap-1">
              <span className="font-['FoundersGrotesk'] text-[20vw] md:text-[12vw] leading-none text-zinc-900 tabular-nums">
                {count}
              </span>
              <span className="font-['FoundersGrotesk'] text-[6vw] md:text-[4vw] leading-none text-zinc-400">
                %
              </span>
            </div>
          </motion.div>
        )}

        {/* Replicated landing page content */}
        <div className="relative z-0 bg-white w-full h-[32vh] md:h-screen pt-10 flex flex-col">
          <div className="flex-1 flex flex-col items-start justify-start pt-12 md:pt-24 px-5 md:px-[5.922vw]">
            {((content && content.landing && content.landing.headlines) || ["We Build", "Game-Changing", "Software"]).map((text, index) => (
              <div className="masker" key={index}>
                <div className="w-fit flex items-end overflow-hidden">
                  {index === 1 && (
                    <span
                      className="w-[11vw] md:w-[9vw] h-[8vw] md:h-[7.5vw] rounded-md mr-2 relative"
                      style={{ backgroundColor: "#004d43" }}
                    />
                  )}
                  <h1 className="font-['FoundersGrotesk'] leading-[12vw] md:leading-[9.5vw] uppercase text-[12vw] md:text-[11.5vw] flex items-center text-zinc-900">
                    {text}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replicated marquee - only show on desktop */}
        <div className="relative w-full py-[5.922vw] mt-[6vw] rounded-t-3xl bg-[#004d43] overflow-hidden">
          <div className="border-t border-b border-white/20 overflow-hidden">
            <div className="marquee-track font-[FoundersGrotesk] uppercase text-[40vw] text-white whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <h1
                  key={i}
                  className="leading-none -mt-[7vw] -mb-[3.5vw] shrink-0 pr-[4vw]"
                  aria-hidden={i > 0 ? "true" : undefined}
                >
                  {(content && content.landing && content.landing.marquee) || 'We are Velosync'}
                </h1>
              ))}
            </div>
          </div>
        </div>

        {/* Replicated about - only show on desktop */}
        <div className="relative w-full py-12 bg-white rounded-t-3xl text-zinc-900 mt-[2.1w]">
          <div className="px-5 mb-6">
            <p className="font-['NeueMontrealLight'] text-[3vw] uppercase tracking-widest" style={{ color: "#004d43" }}>
              / About Us
            </p>
          </div>
          <div className="px-5">
            <p className="text-[7vw] leading-tight w-full text-zinc-900">
              VeloSynq is the all-in-one platform designed to accelerate product velocity
              and synchronize teams across development, marketing, and sales. We help
          ambitious companies ship faster and scale smarter.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EntryLoader;
