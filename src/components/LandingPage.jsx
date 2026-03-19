import { motion } from "framer-motion";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const LandingPage = () => {
  
  return (
    <div data-scroll data-scroll-speed='-.3' className="bg-zinc-900 w-full box-border h-screen pt-10">
      <div className="textstructure mt-32 px-[5.922vw]">
        {["We Build", "Game-Changing", "Software"].map((text, index) => (
          <div className="masker " key={index}>
            <div className="w-fit flex items-end overflow-hidden ">
              {index === 1 && (
                <motion.span 
                initial={{width:0}} 
                animate={{width:"9vw"}} 
                transition={{duration:1 , ease: [0.76, 0, 0.24, 1]}}
                className="w-[9vw] h-[5.9vw] rounded-md mr-2 relative bg-red-400"></motion.span>
              )}
              <h1 className="font-['FoundersGrotesk'] leading-[7vw] uppercase text-[9vw] flex items-center">
                {text}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="font-['NeueMontrealLight'] border-t border-zinc-600 mt-24 flex items-center justify-between px-[5.922vw] py-4">
        {[
          "For startups to enterprises",
          "From MVP to market leadership",
        ].map((text, index) => (
          <span
            key={index}
            className=" tracking-tight text-[2vw] md:text-[1.3vw] leading-tight "
          >
            {text}
          </span>
        ))}

        <div className="start flex items-center gap-2">
          <span className="tracking-tight text-[2vw] md:text-[1.2vw] leading-tight border border-zinc-400 rounded-full px-6 py-[0.35rem] uppercase font-extralight">
            Start building
          </span> 
          <span className="w-8 h-8 border border-zinc-400 p-2 rounded-full font-[900] flex items-center justify-center box-border text-sm">
            <BsArrowUpRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
