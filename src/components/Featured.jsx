import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Site palette: white | dark green #004d43 | zinc-900 text

const PROJECTS = [
  { name: "DocSync",    tags: ["Real-time Editing", "Version History", "Team Wikis"] },
  { name: "TaskVault",  tags: ["Sprint Planning", "Kanban Board", "Backlog"] },
  { name: "ContentHub", tags: ["Headless CMS", "Media Library", "Multi-channel"] },
  { name: "QAFlow",     tags: ["Test Automation", "Bug Tracking", "CI/CD"] },
];

const Featured = () => {
  const { content } = useContent();
  const accentColor = (content && content.accent) || (content && content.primaryColor) || '#004d43';
  const cards = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const activeCardRef = useRef(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [blockScroll, setBlockScroll] = useState(true);

  // Use only API-provided featured data. If API hasn't provided featured, render nothing.
  const projects = (content && Array.isArray(content.featured)) ? content.featured : [];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Block scroll for 1.5s to show data fully
  useEffect(() => {
    setBlockScroll(true);
    const timer = setTimeout(() => setBlockScroll(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobile) return; // No horizontal scroll on mobile
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // All titles start hidden below, then immediately show first card
    cards.forEach((c) => c.set({ y: "110%" }));
    cards[0].set({ y: "0%" });
    activeCardRef.current = 0;


    const ctx = gsap.context(() => {
      const extraPad = 300;
      const slowZone = 400; // px of slow scroll after horizontal

      const st = ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth - window.innerWidth + extraPad * 2 + slowZone}`,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const maxX = track.scrollWidth - window.innerWidth;
          const total = maxX + extraPad * 2 + slowZone;
          const raw = self.progress * total;
          let x;
          // If in slow zone, slow down scroll progress
          if (raw > maxX + extraPad) {
            // Map the last slowZone px to a much slower scroll
            const slowStart = maxX + extraPad;
            const slowProgress = (raw - slowStart) / slowZone;
            // Only move a small amount in the slow zone
            x = maxX + Math.min(slowProgress * 60, slowZone * 0.15); // only move 60px over the slow zone
          } else {
            x = Math.max(0, Math.min(raw - extraPad, maxX));
          }
          gsap.set(track, { x: -x });

          // Determine which card center is closest to viewport center
          const cardW = window.innerWidth * 0.38;
          const gapW  = window.innerWidth * 0.015;
          const padL  = window.innerWidth * 0.31; // 50vw - 19vw (half card) = centers first card
          const viewCenter = x + window.innerWidth / 2;

          let newActive = 0;
          let closestDist = Infinity;
          for (let i = 0; i < projects.length; i++) {
            const cardCenter = padL + i * (cardW + gapW) + cardW / 2;
            const dist = Math.abs(viewCenter - cardCenter);
            if (dist < closestDist) { closestDist = dist; newActive = i; }
          }

          if (newActive !== activeCardRef.current) {
            // Dismiss outgoing card title
            if (activeCardRef.current >= 0) {
              cards[activeCardRef.current].start({ y: "110%", transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } });
            }
            // Pop up incoming card title with stagger
            cards[newActive].start({ y: "0%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } });
            activeCardRef.current = newActive;
          }
        },
      });

      // Force low z-index on pin-spacer so Team scrolls over
      if (st.spacer) {
        st.spacer.style.zIndex = "1";
        st.spacer.style.position = "relative";
      }
      section.style.zIndex = "1";
    }, section);

    return () => ctx.revert();
  }, [isMobile, projects.length]);

  const svgs = [
    /* DocSync */
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="0" width="232" height="220" rx="10" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="26" y="18" width="80" height="6" rx="3" fill={(content && content.primaryColor) || '#004d43'} opacity="0.9"/>
      <rect x="160" y="16" width="2" height="10" rx="1" fill={(content && content.primaryColor) || '#004d43'} />
      <circle cx="190" cy="21" r="5" fill="#004d43" opacity="0.7"/>
      <circle cx="203" cy="21" r="5" fill="#004d43" opacity="0.45"/>
      <circle cx="216" cy="21" r="5" fill="#004d43" opacity="0.25"/>
      <rect x="26" y="40" width="140" height="4" rx="2" fill="#004d43" opacity="0.22"/>
      <rect x="26" y="52" width="108" height="4" rx="2" fill="#004d43" opacity="0.14"/>
      <rect x="26" y="64" width="124" height="4" rx="2" fill="#004d43" opacity="0.22"/>
      <rect x="26" y="76" width="90" height="4" rx="2" fill="#004d43" opacity="0.14"/>
      <rect x="26" y="92" width="96" height="12" rx="3" fill="#004d43" opacity="0.12"/>
      <rect x="26" y="92" width="96" height="12" rx="3" stroke="#004d43" strokeWidth="0.5" opacity="0.3"/>
      <rect x="30" y="96" width="60" height="4" rx="2" fill="#004d43" opacity="0.55"/>
      <rect x="26" y="114" width="132" height="4" rx="2" fill="#004d43" opacity="0.14"/>
      <rect x="26" y="126" width="110" height="4" rx="2" fill="#004d43" opacity="0.22"/>
      <rect x="26" y="138" width="80" height="4" rx="2" fill="#004d43" opacity="0.14"/>
      <rect x="256" y="0" width="94" height="220" rx="10" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="268" y="16" width="44" height="5" rx="2.5" fill="#004d43" opacity="0.5"/>
      <rect x="268" y="32" width="60" height="16" rx="5" fill="#004d43" opacity="0.08" stroke="#004d4333" strokeWidth="1"/>
      <rect x="274" y="37" width="36" height="3" rx="1.5" fill="#004d43" opacity="0.4"/>
      <rect x="268" y="56" width="60" height="16" rx="5" fill="#004d43" opacity="0.05"/>
      <rect x="274" y="61" width="28" height="3" rx="1.5" fill="#004d43" opacity="0.25"/>
      <rect x="268" y="80" width="60" height="16" rx="5" fill="#004d43" opacity="0.05"/>
      <rect x="274" y="85" width="32" height="3" rx="1.5" fill="#004d43" opacity="0.25"/>
    </svg>,
    /* TaskVault */
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10"  y="0" width="106" height="220" rx="8" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="128" y="0" width="106" height="220" rx="8" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="246" y="0" width="104" height="220" rx="8" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22"  y="12" width="50" height="5" rx="2.5" fill="#004d43" opacity="0.4"/>
      <rect x="140" y="12" width="50" height="5" rx="2.5" fill="#004d43" opacity="0.6"/>
      <rect x="258" y="12" width="50" height="5" rx="2.5" fill="#004d43" opacity="0.9"/>
      <rect x="18"  y="26" width="90" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="26"  y="35" width="54" height="4"  rx="2" fill="#004d43" opacity="0.55"/>
      <rect x="26"  y="45" width="40" height="3"  rx="1.5" fill="#004d43" opacity="0.25"/>
      <rect x="18"  y="78" width="90" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="26"  y="87" width="44" height="4"  rx="2" fill="#004d43" opacity="0.4"/>
      <rect x="26"  y="97" width="36" height="3"  rx="1.5" fill="#004d43" opacity="0.2"/>
      <rect x="18"  y="130" width="90" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="26"  y="139" width="58" height="4" rx="2" fill="#004d43" opacity="0.4"/>
      <rect x="26"  y="149" width="42" height="3" rx="1.5" fill="#004d43" opacity="0.2"/>
      <rect x="136" y="26" width="90" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="144" y="35" width="60" height="4"  rx="2" fill="#004d43" opacity="0.55"/>
      <rect x="144" y="45" width="44" height="3"  rx="1.5" fill="#004d43" opacity="0.25"/>
      <rect x="136" y="78" width="90" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="144" y="87" width="48" height="4"  rx="2" fill="#004d43" opacity="0.4"/>
      <rect x="144" y="97" width="36" height="3"  rx="1.5" fill="#004d43" opacity="0.2"/>
      <rect x="254" y="26" width="88" height="44" rx="6" fill="#003d36" stroke="#004d4355" strokeWidth="1"/>
      <rect x="262" y="35" width="52" height="4"  rx="2" fill="#004d43" opacity="0.9"/>
      <rect x="262" y="45" width="38" height="3"  rx="1.5" fill="#004d43" opacity="0.5"/>
      <circle cx="330" cy="58" r="7" fill="#004d43" opacity="0.9"/>
      <path d="M326 58 L329 61 L334 54" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="254" y="78" width="88" height="44" rx="6" fill="#003d36" stroke="#004d4344" strokeWidth="1"/>
      <rect x="262" y="87" width="44" height="4"  rx="2" fill="#004d43" opacity="0.7"/>
      <rect x="262" y="97" width="32" height="3"  rx="1.5" fill="#004d43" opacity="0.4"/>
      <circle cx="330" cy="110" r="7" fill="#004d43" opacity="0.7"/>
      <path d="M326 110 L329 113 L334 106" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="254" y="130" width="88" height="44" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="262" y="139" width="48" height="4" rx="2" fill="#004d43" opacity="0.4"/>
      <rect x="262" y="149" width="34" height="3" rx="1.5" fill="#004d43" opacity="0.2"/>
    </svg>,
    /* ContentHub */
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="0" width="72" height="220" rx="8" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22" y="16" width="48" height="6" rx="3" fill="#004d43" opacity="0.8"/>
      <rect x="22" y="36" width="38" height="4" rx="2" fill="#004d43" opacity="0.35"/>
      <rect x="22" y="48" width="44" height="4" rx="2" fill="#004d43" opacity="0.55"/>
      <rect x="22" y="60" width="36" height="4" rx="2" fill="#004d43" opacity="0.25"/>
      <rect x="22" y="72" width="42" height="4" rx="2" fill="#004d43" opacity="0.35"/>
      <rect x="22" y="92" width="38" height="4" rx="2" fill="#004d43" opacity="0.2"/>
      <rect x="22" y="104" width="44" height="4" rx="2" fill="#004d43" opacity="0.3"/>
      <rect x="22" y="116" width="32" height="4" rx="2" fill="#004d43" opacity="0.2"/>
      <rect x="94" y="0" width="256" height="220" rx="8" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="106" y="12" width="90" height="6" rx="3" fill="#004d43" opacity="0.2"/>
      <rect x="330" y="10" width="8" height="8" rx="2" fill="#004d43" opacity="0.8"/>
      <rect x="106" y="30" width="72" height="50" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="114" y="38" width="56" height="24" rx="3" fill="#004d43" opacity="0.14"/>
      <rect x="114" y="68" width="42" height="3" rx="1.5" fill="#004d43" opacity="0.4"/>
      <rect x="186" y="30" width="72" height="50" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="194" y="38" width="56" height="24" rx="3" fill="#004d43" opacity="0.08"/>
      <rect x="194" y="68" width="50" height="3" rx="1.5" fill="#004d43" opacity="0.3"/>
      <rect x="268" y="30" width="70" height="50" rx="6" fill="#d4ebe6" stroke="#004d4355" strokeWidth="1"/>
      <rect x="276" y="38" width="54" height="24" rx="3" fill="#004d43" opacity="0.22"/>
      <rect x="276" y="68" width="36" height="3" rx="1.5" fill="#004d43" opacity="0.65"/>
      <rect x="106" y="90" width="72" height="50" rx="6" fill="#d4ebe6" stroke="#004d4355" strokeWidth="1"/>
      <rect x="114" y="98" width="56" height="24" rx="3" fill="#004d43" opacity="0.18"/>
      <rect x="114" y="128" width="44" height="3" rx="1.5" fill="#004d43" opacity="0.5"/>
      <rect x="186" y="90" width="72" height="50" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="194" y="98" width="56" height="24" rx="3" fill="#004d43" opacity="0.07"/>
      <rect x="194" y="128" width="38" height="3" rx="1.5" fill="#004d43" opacity="0.25"/>
      <rect x="268" y="90" width="70" height="50" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="276" y="98" width="54" height="24" rx="3" fill="#004d43" opacity="0.09"/>
      <rect x="276" y="128" width="30" height="3" rx="1.5" fill="#004d43" opacity="0.3"/>
      <rect x="106" y="154" width="232" height="24" rx="6" fill="#e0ecea" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="114" y="161" width="60" height="10" rx="5" fill="#004d43" opacity="0.9"/>
      <rect x="182" y="163" width="40" height="6" rx="3" fill="#004d43" opacity="0.2"/>
      <rect x="232" y="163" width="34" height="6" rx="3" fill="#004d43" opacity="0.2"/>
    </svg>,
    /* QAFlow */
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="10" width="340" height="48" rx="9" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22"  y="22" width="36" height="5" rx="2.5" fill="#004d43" opacity="0.4"/>
      <rect x="22"  y="34" width="24" height="4" rx="2"   fill="#004d43" opacity="0.2"/>
      <rect x="110" y="22" width="42" height="5" rx="2.5" fill="#004d43" opacity="0.55"/>
      <rect x="110" y="34" width="28" height="4" rx="2"   fill="#004d43" opacity="0.25"/>
      <rect x="206" y="22" width="38" height="5" rx="2.5" fill="#004d43" opacity="0.7"/>
      <rect x="206" y="34" width="24" height="4" rx="2"   fill="#004d43" opacity="0.35"/>
      <rect x="286" y="10" width="64" height="48" rx="9" fill="#003d36" stroke="#004d4355" strokeWidth="1"/>
      <rect x="294" y="22" width="38" height="5" rx="2.5" fill="#004d43" opacity="0.9"/>
      <circle cx="324" cy="40" r="7" fill="#004d43" opacity="0.9"/>
      <path d="M320 40 L323 43 L328 36" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="96"  cy="34" r="3" fill="#004d43" opacity="0.3"/>
      <circle cx="192" cy="34" r="3" fill="#004d43" opacity="0.3"/>
      <circle cx="278" cy="34" r="3" fill="#004d43" opacity="0.35"/>
      <rect x="10" y="72" width="340" height="30" rx="7" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22" y="81" width="80" height="4" rx="2" fill="#004d43" opacity="0.5"/>
      <circle cx="338" cy="87" r="7" fill="#004d43" opacity="0.85"/>
      <path d="M334 87 L337 90 L342 83" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="110" width="340" height="30" rx="7" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22" y="119" width="64" height="4" rx="2" fill="#004d43" opacity="0.4"/>
      <circle cx="338" cy="125" r="7" fill="#004d43" opacity="0.85"/>
      <path d="M334 125 L337 128 L342 121" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="148" width="340" height="30" rx="7" fill="#edf5f3" stroke="#b8d8d3" strokeWidth="1"/>
      <rect x="22" y="157" width="72" height="4" rx="2" fill="#004d43" opacity="0.3"/>
      <rect x="310" y="160" width="28" height="4" rx="2" fill="#c4dedb"/>
      <rect x="310" y="160" width="16" height="4" rx="2" fill="#004d43" opacity="0.6"/>
      <rect x="10" y="190" width="340" height="8" rx="4" fill="#c4dedb"/>
      <rect x="10" y="190" width="268" height="8" rx="4" fill="#004d43" opacity="0.65"/>
    </svg>,
  ];

  const featuredBgColor = (content && content.featuredBgColor) || (content && content.backgroundColor) || '#fff';
  return (
    <div ref={sectionRef} id="our-work" className="relative w-full overflow-hidden" style={{ zIndex: 1, background: featuredBgColor }}>
      {blockScroll && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:9999,background:'rgba(255,255,255,0)',pointerEvents:'auto'}} />
      )}

      {/* Section header */}
      <div className="w-full px-5 md:px-[3.922vw] py-8 md:py-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200">
        <div>
          <p className="font-['NeueMontrealLight'] text-[3vw] md:text-[1vw] uppercase tracking-widest mb-3" style={{ color: "#004d43" }}>
            / Our Work
          </p>
          <h1 className="font-['FoundersGrotesk'] text-[10vw] md:text-[6vw] uppercase leading-none text-black">
            Featured Projects
          </h1>
        </div>
        <p className="font-['NeueMontrealLight'] text-[3.5vw] md:text-[1vw] text-zinc-500 max-w-full md:max-w-[24vw] md:text-right leading-relaxed">
          Four tools built to power every layer of the modern product team.
        </p>
      </div>

      {/* Mobile: vertical stack */}
      {isMobile && (
        <div className="flex flex-col gap-6 px-5 py-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              <p
                className="font-['FoundersGrotesk'] uppercase text-zinc-900 mb-2 leading-none text-[4vw]"
                style={{ color: project.accent || accentColor }}
              >
                {project.name}
              </p>
              <div className="card relative w-full h-[55vw] rounded-2xl overflow-hidden bg-white border border-zinc-200">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {svgs[index]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h2 className="font-['FoundersGrotesk'] uppercase leading-none text-[10vw] text-black">
                    {project.name}
                  </h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Desktop: horizontal scroll track */}
      {!isMobile && (
        <div ref={trackRef} className="flex items-center gap-[1.5vw] pl-[31vw] pr-[31vw] py-8" style={{ width: "max-content" }}>

        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            className="cardcontainer relative shrink-0 cursor-pointer"
            style={{ width: "38vw", height: "52vh" }}
          >
            {/* Title — outside the card, top-left corner */}
            <p className="font-['FoundersGrotesk'] uppercase text-zinc-900 mb-2 leading-none" style={{ fontSize: "1.3vw" }}>
              {project.name}
            </p>

            {/* Card */}
            <div className="card relative w-full h-full rounded-2xl overflow-hidden bg-white border border-zinc-200">

              {/* SVG illustration fills entire card */}
                <div className="w-full h-full flex items-center justify-center p-6">
                {project.image ? (
                  // If `image` is raw SVG markup, render it directly. Otherwise treat as image URL/data URL.
                  (typeof project.image === 'string' && project.image.trim().startsWith('<svg')) ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: project.image }} />
                  ) : (
                    <img src={project.image} alt={project.name || `featured-${index}`} className="w-full h-full object-cover" />
                  )
                ) : (
                  svgs[index % svgs.length]
                )}
                </div>

              {/* Project name — pops up when card is scrolled into center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h2
                  className="flex font-['FoundersGrotesk'] uppercase leading-none"
                  style={{ fontSize: "4.5vw", color: project.accent || accentColor }}
                >
                  {project.name.split("").map((letter, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={cards[index]}
                        transition={{ delay: i * 0.04, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                      >
                        {letter}
                      </motion.span>
                    </div>
                  ))}
                </h2>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
      )}
    </div>
  );
};

export default Featured;
