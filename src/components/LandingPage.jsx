import { motion } from "framer-motion";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const LandingPage = () => {
  
  return (
    <div data-scroll data-scroll-speed='-0.6' className="relative z-0 bg-white w-full box-border h-screen pt-10 flex flex-col">
      <div className="textstructure mt-28 px-[5.922vw]">
        {["We Build", "Game-Changing", "Software"].map((text, index) => (
          <div className="masker" key={index}>
            <div className="w-fit flex items-end overflow-hidden">
              {index === 1 && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "9vw" }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  className="w-[9vw] h-[5.9vw] rounded-md mr-2 relative"
                  style={{ backgroundColor: "#004d43" }}
                />
              )}
              <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw] flex items-center text-zinc-900">
                {text}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="font-['NeueMontrealLight'] border-t mt-32 border-zinc-300 flex items-center justify-between px-[5.922vw] py-4 text-zinc-900">
        {[
          "For startups to enterprises",
          "From MVP to market leadership",
        ].map((text, index) => (
          <span
            key={index}
            className="tracking-tight text-[2vw] md:text-[1.3vw] leading-tight text-zinc-600"
          >
            {text}
          </span>
        ))}

        <div className="start flex items-center gap-2">
          <span className="tracking-tight text-[2vw] md:text-[1.2vw] leading-tight bg-[#004d43] border border-[#004d43] rounded-full px-6 py-[0.35rem] uppercase font-extralight text-white hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300 cursor-pointer">
            Start building
          </span>
          <span className="w-8 h-8 border border-zinc-900 p-2 rounded-full font-[900] flex items-center justify-center box-border text-sm text-zinc-900">
            <BsArrowUpRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
