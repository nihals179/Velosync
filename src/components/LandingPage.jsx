import React, { useEffect, useRef } from "react";
import { usePageTransition } from "./NavTransition";
import { useContent } from "../context/ContentContext";

const LandingPage = () => {
  const { navigateTo } = usePageTransition();
  const { content } = useContent();

  const landingRef = useRef(null);

  useEffect(() => {
    const updateScrollSpeed = () => {
      if (!landingRef.current) return;
      const isDesktop = window.innerWidth >= 768;
      const containerSpeed = isDesktop ? '-0.8' : '-0.2';

      try {
        landingRef.current.setAttribute('data-scroll', '');
        landingRef.current.setAttribute('data-scroll-speed', containerSpeed);
      } catch (e) {
        // ignore
      }

      // Refresh locomotive calculations if available
      try {
        if (window.locomotiveScroll && typeof window.locomotiveScroll.update === 'function') {
          window.locomotiveScroll.update();
        }
      } catch (e) {
        // ignore
      }
    };
    updateScrollSpeed();
    window.addEventListener("resize", updateScrollSpeed);
    return () => window.removeEventListener("resize", updateScrollSpeed);
  }, []);

  const headlines = (content && content.landing && Array.isArray(content.landing.headlines) && content.landing.headlines.length)
    ? content.landing.headlines
    : ["We Build", "Game-Changing", "Software"];
  const subtexts = (content && content.landing && Array.isArray(content.landing.subtexts) && content.landing.subtexts.length)
    ? content.landing.subtexts
    : ["For startups to enterprises", "From MVP to market leadership"];

  // Use landingBgColor from content, fallback to global backgroundColor or white
  const landingBgColor = (content && content.landingBgColor) || (content && content.backgroundColor) || '#fff';
  return (
    <div
      ref={landingRef}
      data-scroll
      data-scroll-speed="-0.8"
      className="relative z-0 w-full box-border h-[32vh] md:h-screen pt-10 flex flex-col"
      style={{ background: landingBgColor }}
    >
      <div className="textstructure flex-1 flex flex-col items-start justify-start pt-12 md:pt-24 px-5 md:px-[5.922vw]">
        {headlines.map((text, index) => (
          <div className="masker" key={index}>
            <div className="w-full flex items-end overflow-visible">
              {index === 1 && (
                <span
                  className="w-[11vw] md:w-[9vw] h-[8vw] md:h-[7.5vw] rounded-md mr-2 relative"
                  style={{ backgroundColor: (content && content.landingBgColor) || (content && content.primaryColor) || '#004d43' }}
                />
              )}
              <h1 className="font-['FoundersGrotesk'] leading-[12vw] md:leading-[9.5vw] uppercase text-[12vw] md:text-[11.5vw] flex items-center text-zinc-900">
                {text}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:flex font-['NeueMontrealLight'] border-t mt-auto md:mt-2 border-zinc-300 md:flex-row items-center px-[5.922vw] py-4 text-zinc-900">
        <div className="w-full md:w-1/3 text-left">
          <span className="tracking-tight text-[4.5vw] md:text-[1.1vw] leading-tight text-zinc-600">{subtexts[0] || ''}</span>
        </div>
        <div className="w-full md:w-1/3 text-center">
          <span className="tracking-tight text-[4.5vw] md:text-[1.1vw] leading-tight text-zinc-600">{subtexts[1] || ''}</span>
        </div>
        <div className="w-full md:w-1/3 text-right hidden md:flex md:justify-end">
          <button
            aria-label="Start building — contact us"
            onClick={() => {
              try { navigateTo('/contact'); } catch (e) { window.location.href = '/contact'; }
            }}
            className="tracking-tight text-[3.5vw] md:text-[1.05vw] leading-tight rounded-full px-5 py-2 md:py-[0.35rem] uppercase font-extralight text-white hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300"
            style={{ backgroundColor: (content && content.landingBgColor) || (content && content.primaryColor) || '#004d43', borderColor: (content && content.landingBgColor) || (content && content.primaryColor) || '#004d43' }}
          >
            Start building
          </button>
        </div>
        {/* mobile CTA removed per request */}
      </div>
    </div>
  );
};

export default LandingPage;
