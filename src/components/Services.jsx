import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Product Engineering",
    description:
      "End-to-end development of scalable web and mobile products. From architecture to deployment, we build software that ships fast and grows with you.",
    tags: ["React", "Node.js", "Cloud", "CI/CD"],
  },
  {
    number: "02",
    title: "Platform Integration",
    description:
      "Seamlessly connect your tools, APIs, and data pipelines. We design integration layers that eliminate silos and keep your stack in sync.",
    tags: ["REST APIs", "GraphQL", "Webhooks", "ETL"],
  },
  {
    number: "03",
    title: "DevOps & Automation",
    description:
      "Accelerate delivery with robust CI/CD pipelines, infrastructure-as-code, and automated testing frameworks built for high-velocity teams.",
    tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    number: "04",
    title: "Analytics & Observability",
    description:
      "Gain real-time visibility into your product and infrastructure. We instrument, monitor, and alert so you always know what's happening.",
    tags: ["Datadog", "PostHog", "OpenTelemetry", "Dashboards"],
  },
  {
    number: "05",
    title: "AI & Automation",
    description:
      "Embed intelligent automation into your workflows. From LLM-powered features to predictive pipelines, we make your product smarter.",
    tags: ["LLMs", "RAG", "Agents", "Workflow Automation"],
  },
];

const ServiceRow = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex items-start justify-between gap-10 border-b border-zinc-700 py-10 px-[3.922vw] cursor-default"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Number */}
      <span className="text-zinc-600 font-['NeueMontrealLight'] text-[1.1vw] mt-1 w-[4vw] shrink-0">
        {service.number}
      </span>

      {/* Title */}
      <div className="w-[28vw] shrink-0">
        <h2 className="font-['FoundersGrotesk'] uppercase text-[3vw] leading-none text-white group-hover:text-[#cdea68] transition-colors duration-300">
          {service.title}
        </h2>
      </div>

      {/* Description + tags */}
      <div className="flex-1 flex flex-col gap-4">
        <motion.p
          className="font-['NeueMontrealLight'] text-[1.1vw] text-zinc-400 leading-relaxed max-w-[40vw]"
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {service.description}
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-zinc-400 border border-zinc-700 rounded-full group-hover:border-zinc-500 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <motion.span
        className="text-zinc-600 text-2xl mt-1 shrink-0"
        animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        ↗
      </motion.span>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const headingX = useTransform(scrollYProgress, [0, 1], ["4%", "0%"]);

  return (
    <div ref={ref} id="services" className="relative z-10 bg-zinc-900 w-full pt-28 pb-20">
      {/* Header */}
      <div className="flex items-end justify-between px-[3.922vw] pb-10 border-b border-zinc-700">
        <motion.h1
          style={{ x: headingX }}
          className="font-['FoundersGrotesk'] uppercase text-[7vw] leading-none text-white"
        >
          Services
        </motion.h1>
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[1.1vw] max-w-[30vw] text-right leading-relaxed">
          Everything you need to build, ship, and scale — under one roof.
        </p>
      </div>

      {/* Service rows */}
      <div>
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-[3.922vw] pt-16 flex items-center justify-between">
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[1.1vw]">
          Ready to move faster?
        </p>
        <button className="flex items-center gap-4 px-8 py-4 border border-zinc-600 rounded-full text-white font-['NeueMontrealLight'] text-[1.1vw] hover:bg-white hover:text-zinc-900 transition-all duration-300">
          <span>Start a project</span>
          <span className="w-2 h-2 rounded-full bg-current" />
        </button>
      </div>
    </div>
  );
};

export default Services;
