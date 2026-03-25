import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkWithUs = () => {
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const wrapper = wrapperRef.current;

    gsap.set(headingRef.current, { y: "100%" });
    gsap.set([labelRef.current, subtitleRef.current, buttonRef.current, bottomRef.current], {
      opacity: 0,
      x: 50,
    });

    const tl = gsap.timeline()
      .to(headingRef.current, { y: "0%", duration: 0.4, ease: "power3.out" })
      .to(labelRef.current,    { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, "+=0.05")
      .to(subtitleRef.current, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, "-=0.15")
      .to(buttonRef.current,   { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, "-=0.15")
      .to(bottomRef.current,   { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, "-=0.15");

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      animation: tl,
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "400vh", position: "relative" }}>
      <div
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ backgroundColor: "#004d43", position: "sticky", top: 0, zIndex: 20 }}
      >
        <div className="relative flex flex-col items-center text-center px-[3.922vw]">
          <div className="overflow-hidden mb-6">
            <h1
              ref={headingRef}
              className="font-['FoundersGrotesk'] uppercase text-[10vw] leading-none text-white"
            >
              Are You Ready?
            </h1>
          </div>

          <p
            ref={labelRef}
            className="font-['NeueMontrealLight'] text-[1.1vw] uppercase tracking-widest mb-4"
            style={{ color: "#00e5c8" }}
          >
            Let's build together
          </p>

          <p
            ref={subtitleRef}
            className="font-['NeueMontrealLight'] text-[1.3vw] leading-relaxed max-w-[50vw] mb-12"
            style={{ color: "#a8d5cf" }}
          >
            Whether you want to contribute, collaborate, or just say hi —<br />
            we'd love to hear from you.
          </p>

          <button
            ref={buttonRef}
            onClick={() => navigate("/contact")}
            className="group inline-flex items-center gap-3 px-10 py-4 font-['NeueMontrealLight'] text-base rounded-full transition-all duration-500"
            style={{ border: "1px solid #00e5c8", color: "#00e5c8", backgroundColor: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00e5c8"; e.currentTarget.style.color = "#0a0a0a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00e5c8"; }}
          >
            Work With Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p
          ref={bottomRef}
          className="absolute bottom-8 font-['NeueMontrealLight'] text-[0.9vw] uppercase tracking-widest"
          style={{ color: "#006657" }}
        >
          VeloSynq — Ship Faster
        </p>
      </div>
    </div>
  );
};

export default WorkWithUs;
