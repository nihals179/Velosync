import { motion } from "framer-motion";
import React from "react";

const roles = [
  {
    department: "Engineering",
    title: "Senior Full-Stack Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Build and scale core product features across our React/Node.js stack. Own features end-to-end from architecture to deployment.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    bg: "#e8f4fd",
    accent: "#3b82f6",
  },
  {
    department: "Engineering",
    title: "Frontend Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Craft pixel-perfect, performant UIs for our SaaS products. Deep expertise in React, animations, and design systems required.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    bg: "#eef2ff",
    accent: "#6366f1",
  },
  {
    department: "DevOps",
    title: "DevOps Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Own our CI/CD pipelines, cloud infrastructure, and reliability practices. Drive automation across build, test, and deploy workflows.",
    tags: ["Kubernetes", "Terraform", "GitHub Actions", "AWS"],
    bg: "#ecfdf5",
    accent: "#10b981",
  },
  {
    department: "DevOps",
    title: "Site Reliability Engineer",
    type: "Full-time",
    location: "Remote / Hybrid",
    description:
      "Ensure 99.9% uptime across our platform. Build monitoring, alerting, and incident response systems that scale.",
    tags: ["Datadog", "PagerDuty", "Docker", "Linux"],
    bg: "#f0fdf4",
    accent: "#22c55e",
  },
  {
    department: "QA & Testing",
    title: "QA Automation Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Design and maintain automated test suites across web and API layers. Champion quality across feature development cycles.",
    tags: ["Playwright", "Cypress", "Jest", "CI/CD"],
    bg: "#fdf4ff",
    accent: "#a855f7",
  },
  {
    department: "QA & Testing",
    title: "QA Lead",
    type: "Full-time",
    location: "Remote / Hybrid",
    description:
      "Lead quality strategy for our product suite. Define test plans, manage QA engineers, and own the release readiness process.",
    tags: ["Test Strategy", "JIRA", "API Testing", "Selenium"],
    bg: "#fff7ed",
    accent: "#f97316",
  },
];

const RoleCard = ({ role, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      style={{ backgroundColor: role.bg }}
      className="rounded-2xl p-8 flex flex-col justify-between gap-6 min-h-[280px] group hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <span
          style={{ color: role.accent, borderColor: `${role.accent}40`, backgroundColor: `${role.accent}15` }}
          className="px-3 py-1 text-xs font-['NeueMontrealLight'] border rounded-full shrink-0"
        >
          {role.department}
        </span>
        <div className="flex gap-2 text-xs font-['NeueMontrealLight'] text-zinc-500">
          <span className="px-3 py-1 bg-white/60 rounded-full">{role.location}</span>
          <span className="px-3 py-1 bg-white/60 rounded-full">{role.type}</span>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{ color: "#1a1a2e" }}
        className="font-['FoundersGrotesk'] uppercase text-[2.2vw] leading-tight"
      >
        {role.title}
      </h3>

      {/* Description */}
      <p className="font-['NeueMontrealLight'] text-zinc-600 text-[1vw] leading-relaxed flex-1">
        {role.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <span
              key={tag}
              style={{ borderColor: `${role.accent}40`, color: role.accent }}
              className="px-3 py-1 text-xs font-['NeueMontrealLight'] border rounded-full bg-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          style={{ backgroundColor: role.accent }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full font-['NeueMontrealLight'] text-white text-[0.9vw] hover:opacity-80 transition-opacity duration-200 shrink-0"
        >
          <span>Apply Now</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </button>
      </div>
    </motion.div>
  );
};

const Careers = () => {
  return (
    <div id="careers" className="relative z-10 w-full pt-28 pb-20" style={{ backgroundColor: "#cdea68" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-[3.922vw] pb-10 border-b border-zinc-900/20">
        <div>
          <p className="font-['NeueMontrealLight'] text-zinc-900 text-[1.1vw] mb-3 uppercase tracking-widest">
            We're hiring
          </p>
          <h1 className="font-['FoundersGrotesk'] uppercase text-[7vw] leading-none text-zinc-900">
            Careers
          </h1>
        </div>
        <p className="font-['NeueMontrealLight'] text-zinc-900 text-[1.1vw] max-w-[35vw] leading-relaxed text-right">
          Join the team building the future of product development. We're remote-first, async-friendly, and move fast.
        </p>
      </div>

      {/* Role cards grid */}
      <div className="px-[3.922vw] pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((role, index) => (
          <RoleCard key={index} role={role} index={index} />
        ))}
      </div>

      {/* Open application */}
      <div className="px-[3.922vw] pt-16 flex items-center justify-between">
        <p className="font-['NeueMontrealLight'] text-zinc-900 text-[1.1vw]">
          Don't see your role? We'd still love to hear from you.
        </p>
        <button className="flex items-center gap-4 px-8 py-4 border border-zinc-900 rounded-full text-zinc-900 font-['NeueMontrealLight'] text-[1.1vw] hover:bg-zinc-900 hover:text-[#cdea68] transition-all duration-300">
          <span>Send open application</span>
          <span className="w-2 h-2 rounded-full bg-current" />
        </button>
      </div>
    </div>
  );
};

export default Careers;
