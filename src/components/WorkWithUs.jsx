import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkWithUs = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    // Only animate on desktop
    if (window.innerWidth >= 768 && wrapper && content) {
      gsap.set(content, { opacity: 0, y: 60 });
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top center+=100",
        end: "bottom center",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.to(content, { opacity: self.progress, y: 60 - 60 * self.progress, overwrite: true });
        },
      });
    } else if (content) {
      // On mobile, show all content
      gsap.set(content, { opacity: 1, y: 0 });
    }
  }, []);

  const { content } = useContent();
  const workWithUsBgColor = (content && content.workWithUsBgColor) || (content && content.primaryColor) || '#004d43';
  return (
    <section
      ref={wrapperRef}
      className="w-full min-h-screen h-screen flex flex-col items-center justify-center py-0"
      style={{ minHeight: '100vh', height: '100vh', background: workWithUsBgColor }}
    >
      <h1 className="font-['FoundersGrotesk'] uppercase text-[14vw] md:text-[10vw] leading-none text-white text-center mb-8">
        Are You Ready?
      </h1>
      <div ref={contentRef} className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <p className="font-['NeueMontrealLight'] text-[3vw] md:text-[1.1vw] uppercase tracking-widest" style={{ color: "#00e5c8" }}>
          Let's build together
        </p>
        <p className="font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.3vw] leading-relaxed text-center" style={{ color: "#a8d5cf" }}>
          Whether you want to contribute, collaborate, or just say hi — we'd love to hear from you.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="group inline-flex items-center gap-3 px-10 py-4 font-['NeueMontrealLight'] text-base rounded-full transition-all duration-500"
          style={{ border: "1px solid #00e5c8", color: "#00e5c8", backgroundColor: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00e5c8"; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00e5c8"; }}
        >
          Work With Us
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default WorkWithUs;
