import React from "react";

const Marquee = () => {
  return (
    <div data-scroll data-scroll-speed='-0.08' className="relative z-10 w-full py-[5.922vw] mt-[6vw] rounded-t-3xl bg-[#004d43] overflow-hidden">
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
        <div className="marquee-track font-[FoundersGrotesk] uppercase text-[30vw] text-white whitespace-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <h1
              key={i}
              className="leading-none -mt-[5.8vw] -mb-[2.665vw] shrink-0 pr-[4vw]"
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
