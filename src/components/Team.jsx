import React from "react";
import { motion } from "framer-motion";

const Team = () => {
  return (
    <div className="w-full py-10 border-t border-white/20 overflow-hidden" style={{ backgroundColor: "#004d43", position: "relative", zIndex: 10 }}>


      {/* Header */}
      <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 px-[3.922vw] pb-8">
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-['NeueMontrealLight'] text-[1.1vw] mb-3 uppercase tracking-widest"
            style={{ color: "white" }}
          >
            The people behind it
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-['FoundersGrotesk'] uppercase text-[7vw] leading-none text-white"
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
          className="font-['NeueMontrealLight'] text-[1.1vw] max-w-[37vw] leading-relaxed text-right"
          style={{ color: "rgba(255,255,255,0.7)" }}
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
        className="origin-left border-t mx-[3.922vw] mb-8"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="relative mx-[3.922vw] mt-8 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
      >
        <div>
          <h3 className="font-['FoundersGrotesk'] uppercase text-[3vw] leading-none text-white mb-2">
            Become a Contributor
          </h3>
          <p className="font-['NeueMontrealLight'] text-[1.1vw] leading-relaxed" style={{ color: "#a8d5cf" }}>
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
