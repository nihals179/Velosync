import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";

const Team = () => {
  const sectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [blockScroll, setBlockScroll] = useState(true);
  const { content } = useContent();
  const members = (content && Array.isArray(content.team)) ? content.team : [];

  useEffect(() => {
    setBlockScroll(true);
    const timer = setTimeout(() => setBlockScroll(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!blockScroll) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // If bottom of section is at or above bottom of viewport, stick
      if (rect.bottom <= window.innerHeight + 1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blockScroll]);

  // Allow per-page background color from API/content
  const teamBgColor = (content && content.teamBgColor) || (content && content.primaryColor) || '#004d43';
  const teamBgColorDark = (content && content.teamBgColorDark) || (content && content.primaryColorDark) || '#00b894';
  return (
    <div
      ref={sectionRef}
      className={`w-full py-10 border-t border-white/20 dark:border-white/10 overflow-hidden${isSticky ? ' fixed left-0 bottom-0 z-[50]' : ''} bg-[var(--primary-color)] dark:bg-[var(--primary-color-dark)]`}
      style={isSticky
        ? { width: '100vw', minHeight: 'unset', background: teamBgColor, backgroundColor: 'var(--primary-color)' }
        : { background: teamBgColor, backgroundColor: 'var(--primary-color)', position: "relative", zIndex: 10 }}
    >
      {blockScroll && isSticky && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:9999,background:'rgba(255,255,255,0)',pointerEvents:'auto'}} />
      )}


      {/* Header */}
      <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 px-5 md:px-[3.922vw] pb-8">
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-['NeueMontrealLight'] text-[3vw] md:text-[1.1vw] mb-3 uppercase tracking-widest text-white"
          >
            The people behind it
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-['FoundersGrotesk'] uppercase text-[12vw] md:text-[7vw] leading-none text-white "
            >
              Contributors
            </motion.h1>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] max-w-full md:max-w-[37vw] leading-relaxed md:text-right text-white/70"
        >
          Built by passionate contributors. Want to be part of VeloSynq? <a href="mailto:contact@velosynq.com" className="underline underline-offset-4 text-white hover:opacity-80 transition-opacity">Contact us to contribute.</a>
        </motion.p>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="origin-left border-t mx-5 md:mx-[3.922vw] mb-8 border-white/20 dark:border-zinc-900/20"
      />

      {/* Contributor cards */}
      {members && members.length > 0 && (
        <div className="w-full px-5 md:px-[3.922vw] py-12">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {members.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.76, 0, 0.24, 1] }}
                className="rounded-2xl w-full md:w-[calc(33.333%-1rem)] p-6 flex flex-col h-full justify-between gap-4 min-h-[200px] bg-white border border-zinc-200 shadow-md hover:scale-[1.02] transition-transform duration-300"
                style={{ background: 'rgba(0,0,0,0.15)' }}
              >
                <div className="flex justify-between  gap-4">
                  <div className="w-26 h-26 rounded-2xl overflow-hidden bg-zinc-100 flex items-center justify-center border">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name || `member-${idx}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-zinc-400">No photo</div>
                    )}
                  </div>
                  <div className="flex-1 pt-4">
                    <div className="font-semibold text-white text-lg md:text-xl">{m.name || "Anonymous"}</div>
                    <div className="text-sm md:text-base text-white/80">{m.role || "Contributor"}</div>
                    <div className="text-sm md:text-base text-white/70">
                  {m.experience && <p className="font-['NeueMontrealLight'] text-white/70 text-sm md:text-base leading-relaxed">{m.experience}</p>}
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="relative mx-5 md:mx-[3.922vw] mt-8 rounded-2xl px-6 md:px-8 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
      >
        <div>
          <h3 className="font-['FoundersGrotesk'] uppercase text-[6vw] md:text-[3vw] leading-none text-white mb-2">
            Become a Contributor
          </h3>
          <p className="font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] leading-relaxed" style={{ color: "#a8d5cf" }}>
            Passionate about what we're building? Reach out and join the team.
          </p>
        </div>
        <a
          href="mailto:contact@velosynq.com"
          className="shrink-0 px-8 py-3 font-['NeueMontrealLight'] text-sm rounded-full transition-all duration-300"
          style={{ border: "1px solid white", color: "white" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#004d43"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "white"; }}
        >
          Contact Us
        </a>
      </motion.div>

      
    </div>
  );
};

export default Team;
