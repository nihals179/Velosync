import React from "react";
import { motion } from "framer-motion";

const members = [
  {
    name: "Nihal Sonwane",
    role: "Co-Founder & CEO",
    description:
      "Building the future of product velocity. Passionate about developer experience, scalable systems, and helping teams ship faster.",
    tags: ["Product", "Engineering", "Strategy"],
    initials: "NS",
    bg: "#e8f4fd",
    accent: "#3b82f6",
  },
  {
    name: "Hari Krishna",
    role: "Co-Founder & CTO",
    description:
      "Architecting resilient platforms that scale. Deep expertise in distributed systems, DevOps automation, and building high-performing engineering teams.",
    tags: ["Architecture", "DevOps", "Leadership"],
    initials: "HK",
    bg: "#ecfdf5",
    accent: "#10b981",
  },
];

const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
    className="flex-1 min-w-0"
  >
    {/* Avatar */}
    <div
      className="w-full aspect-[4/3] rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: member.bg }}
    >
      <span
        className="font-['FoundersGrotesk'] text-[8vw] leading-none select-none"
        style={{ color: member.accent }}
      >
        {member.initials}
      </span>
    </div>

    {/* Info */}
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="font-['FoundersGrotesk'] uppercase text-[2.8vw] leading-none text-white">
        {member.name}
      </h3>
      <span
        className="shrink-0 mt-1 px-3 py-1 text-xs font-['NeueMontrealLight'] border rounded-full"
        style={{ color: member.accent, borderColor: `${member.accent}50`, backgroundColor: `${member.accent}10` }}
      >
        {member.role}
      </span>
    </div>

    <p className="font-['NeueMontrealLight'] text-zinc-400 text-[1.1vw] leading-relaxed mb-5">
      {member.description}
    </p>

    <div className="flex flex-wrap gap-2">
      {member.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-zinc-500 border border-zinc-700 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const Team = () => {
  return (
    <div className="relative z-10 bg-zinc-900 w-full py-20 border-t border-zinc-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-[3.922vw] pb-14">
        <div>
          <p className="font-['NeueMontrealLight'] text-zinc-500 text-[1.1vw] mb-3 uppercase tracking-widest">
            The people behind it
          </p>
          <h1 className="font-['FoundersGrotesk'] uppercase text-[7vw] leading-none text-white">
            Our Team
          </h1>
        </div>
        <p className="font-['NeueMontrealLight'] text-zinc-400 text-[1.1vw] max-w-[35vw] leading-relaxed text-right">
          A small, focused team obsessed with velocity, craft, and building things that matter.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800 mx-[3.922vw] mb-14" />

      {/* Cards */}
      <div className="px-[3.922vw] flex flex-col md:flex-row gap-10">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Team;
