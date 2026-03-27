import { motion } from "framer-motion";
import React from "react";
import { useContent } from "../context/ContentContext";

const Careers = () => {
  const { content } = useContent();
  const roles = (content && content.careers) || [];
  const careersBgColor = (content && content.careersBgColor) || (content && content.backgroundColor) || '#fff';
  const accentColor = (content && content.careersAccentColor) || (content && content.primaryColor) || '#004d43';

const RoleCard = ({ role, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className="rounded-2xl p-8 flex flex-col justify-between gap-6 min-h-[280px] group hover:scale-[1.02] transition-transform duration-300 bg-white border border-zinc-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <span
          style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}15` }}
          className="px-3 py-1 text-xs font-['NeueMontrealLight'] border rounded-full shrink-0"
        >
          {role.department}
        </span>
          <div className="flex gap-2 text-xs font-['NeueMontrealLight'] text-zinc-500">
          <span className="px-3 py-1 bg-zinc-100 rounded-full">{role.location}</span>
          <span className="px-3 py-1 bg-zinc-100 rounded-full">{role.type}</span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-['FoundersGrotesk'] uppercase text-[6vw] md:text-[2.2vw] leading-tight text-zinc-900"
      >
        {role.title}
      </h3>

      {/* Description */}
      <p className="font-['NeueMontrealLight'] text-zinc-500 text-[3.5vw] md:text-[1vw] leading-relaxed flex-1">
        {role.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <span
              key={tag}
              style={{ borderColor: `${accentColor}40`, color: accentColor }}
              className="px-3 py-1 text-xs font-['NeueMontrealLight'] border rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          style={{ backgroundColor: (content && content.primaryColor) || '#004d43', color: 'white' }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full font-['NeueMontrealLight'] text-sm hover:opacity-80 transition-opacity duration-200 shrink-0 font-semibold"
        >
          <span>Apply Now</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
        </button>
      </div>
    </motion.div>
  );
};

  return (
    <div id="careers" className="relative z-10 w-full pt-20 md:pt-28 pb-16 md:pb-20" style={{ background: careersBgColor }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 px-5 md:px-[3.922vw] pb-8 md:pb-10" style={{ borderBottom: `1px solid ${accentColor}` }}>
        <div>
          <p className="font-['NeueMontrealLight'] text-[3vw] md:text-[1.1vw] mb-3 uppercase tracking-widest" style={{ color: accentColor }}>
            We're hiring
          </p>
          <h1 className="font-['FoundersGrotesk'] uppercase text-[12vw] md:text-[7vw] leading-none text-zinc-900">
            Careers
          </h1>
        </div>
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[3.5vw] md:text-[1.1vw] max-w-full md:max-w-[35vw] leading-relaxed md:text-right">
          Join the team building the future of product development. We're remote-first, async-friendly, and move fast.
        </p>
      </div>

      {/* Role cards grid */}
      <div className="px-5 md:px-[3.922vw] pt-8 md:pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((role, index) => (
          <RoleCard key={index} role={role} index={index} />
        ))}
      </div>

      {/* Open application */}
      <div className="px-5 md:px-[3.922vw] pt-12 md:pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[3.5vw] md:text-[1.1vw]">
          Don't see your role? We'd still love to hear from you.
        </p>
        <button className="flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300" style={{ backgroundColor: (content && content.primaryColor) || '#004d43', borderColor: (content && content.primaryColor) || '#004d43' }}>
          <span>Send open application</span>
          <span className="w-2 h-2 rounded-full bg-current" />
        </button>
      </div>
    </div>
  );
};

export default Careers;
