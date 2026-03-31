

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { motion } from "framer-motion";

const WorkWithUs = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const { content } = useContent();
  const workWithUsBgColor = (content && content.workWithUsBgColor) || (content && content.primaryColor) || '#004d43';
  return (
    <section
      ref={wrapperRef}
      className="w-full min-h-[40vh] md:min-h-screen h-auto flex flex-col items-center justify-center py-4 md:py-0"
      style={{ background: workWithUsBgColor }}
    >
      <motion.h1
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="font-['FoundersGrotesk'] uppercase text-[7vw] md:text-[7vw] leading-none text-white text-center mb-2 md:mb-8"
      >
        Are You Ready?
      </motion.h1>
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center gap-2 md:gap-6 w-full max-w-md px-2 md:px-0"
      >
        <p className="font-['NeueMontrealLight'] text-[3vw] md:text-[1.1vw] uppercase tracking-widest" style={{ color: "#00e5c8" }}>
          Let's build together
        </p>
        <p className="font-['NeueMontrealLight'] text-[3vw] md:text-[1.3vw] leading-relaxed text-center" style={{ color: "#a8d5cf" }}>
          Whether you want to contribute, collaborate, or just say hi — we'd love to hear from you.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="group inline-flex items-center gap-1 md:gap-3 px-4 py-2 md:px-10 md:py-4 font-['NeueMontrealLight'] text-xs md:text-base rounded-full transition-all duration-500"
          style={{ border: "1px solid #00e5c8", color: "#00e5c8", backgroundColor: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00e5c8"; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00e5c8"; }}
        >
          Work With Us
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default WorkWithUs;
