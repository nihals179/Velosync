import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

const Services = () => {
  const { content } = useContent();
  const services = (content && content.services) || [];
  const servicesBgColor = (content && content.servicesBgColor) || (content && content.backgroundColor) || '#fff';

const ServiceRow = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10 border-b border-zinc-200 py-8 md:py-10 px-5 md:px-[3.922vw] cursor-default"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Number */}
      <span className="text-zinc-400 font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] mt-1 w-auto md:w-[4vw] shrink-0">
        {service.number}
      </span>

      {/* Title */}
      <div className="w-full md:w-[28vw] shrink-0">
        <h2 className="font-['FoundersGrotesk'] uppercase text-[7vw] md:text-[3vw] leading-none text-zinc-900 group-hover:text-[#004d43] transition-colors duration-300">
          {service.title}
        </h2>
      </div>

      {/* Description + tags */}
      <div className="flex-1 flex flex-col gap-4">
        <motion.p
          className="font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] text-zinc-500 leading-relaxed max-w-full md:max-w-[40vw]"
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {service.description}
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-zinc-500 border border-zinc-300 rounded-full group-hover:border-zinc-400 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <motion.span
        className="text-zinc-400 text-2xl mt-1 shrink-0 hidden md:block"
        animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        ↗
      </motion.span>
    </motion.div>
  );
};

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const headingX = useTransform(scrollYProgress, [0, 1], ["4%", "0%"]);

  return (
    <div ref={ref} id="services" className="relative z-10 w-full pt-20 md:pt-28 pb-16 md:pb-20" style={{ background: servicesBgColor }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-5 md:px-[3.922vw] pb-8 md:pb-10 gap-4 border-b border-zinc-200">
        <motion.h1
          style={{ x: headingX }}
          className="font-['FoundersGrotesk'] uppercase text-[12vw] md:text-[7vw] leading-none text-zinc-900"
        >
          Services
        </motion.h1>
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[3.5vw] md:text-[1.1vw] max-w-full md:max-w-[30vw] md:text-right leading-relaxed">
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
      <div className="px-5 md:px-[3.922vw] pt-12 md:pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-['NeueMontrealLight'] text-zinc-500 text-[3.5vw] md:text-[1.1vw]">
          Ready to move faster?
        </p>
        <button className="flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 bg-[#004d43] border border-[#004d43] rounded-full text-white font-['NeueMontrealLight'] text-[3.5vw] md:text-[1.1vw] hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300">
          <span>Start a project</span>
          <span className="w-2 h-2 rounded-full bg-current" />
        </button>
      </div>
    </div>
  );
};

export default Services;
