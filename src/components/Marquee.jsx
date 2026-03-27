import React from "react";
import { useContent } from "../context/ContentContext";

const Marquee = () => {
  const { content } = useContent();
  const marqueeBgColor = (content && content.marqueeBgColor) || (content && content.primaryColor) || '#004d43';
  return (
    <div className="relative z-10 w-full py-[8vw] md:py-[5.922vw] md:mt-[6vw] rounded-t-3xl overflow-hidden" style={{ backgroundColor: marqueeBgColor }}>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="border-t border-b border-white/20 overflow-hidden">
        <div className="marquee-track font-[FoundersGrotesk] uppercase text-[40vw] md:text-[30vw] text-white whitespace-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <h1
              key={i}
              className="leading-none -mt-[7vw] md:-mt-[5.8vw] -mb-[3.5vw] md:-mb-[2.665vw] shrink-0 pr-[4vw]"
              aria-hidden={i > 0 ? "true" : undefined}
            >
              We are Velosync
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
