import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";

const Featured = () => {

  const cards =[useAnimation() , useAnimation()]

  const handelHovering = (index) =>{
    cards[index].start({y:"0"})
  } 

  const handelHoverEnd = (index) =>{
    cards[index].start({y:"100%"})
  }


  return (
    <div id="our-work" className="relative z-10 bg-gray-50 w-full py-20">
      <div className="w-full px-[3.922vw] pb-10 border-b border-gray-300">
        <h1 className="text-[4vw] text-zinc-900">Featured projects</h1>
      </div>

      <div className="w-full px-[3.922vw] py-[2.922vw]">
        <div className="w-full relative flex flex-wrap -mx-2">
        

            {/* ****************************** */}
          <motion.div onHoverStart={()=>{handelHovering(0)}} onHoverEnd={()=>{handelHoverEnd(0)}} className="cardcontainer group/card1 relative w-1/2 p-2 mb-10  h-[50vh] md:h-[75vh]">
            <div className="card relative z-0 flex flex-col w-full h-full rounded-lg hover:scale-95 transition-all duration-300 overflow-hidden">
              <p className=" px-4 pt-3 pb-2 text-gray-900 font-['NeueMontrealLight'] text-lg">• DocSync</p>
              <svg className="w-full flex-1" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#f0f7ff"/>
                <rect x="100" y="120" width="60" height="90" fill="#7c9ef8" rx="4"/>
                <rect x="190" y="120" width="60" height="90" fill="#7c9ef8" rx="4"/>
                <rect x="280" y="120" width="60" height="90" fill="#7c9ef8" rx="4"/>
                <path d="M160 190 Q200 220 240 190" stroke="#7c9ef8" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="130" cy="320" r="8" fill="#7c9ef8"/>
                <circle cx="200" cy="320" r="8" fill="#7c9ef8"/>
                <circle cx="270" cy="320" r="8" fill="#7c9ef8"/>
              </svg>
              <div className="flex flex-wrap gap-2 px-4 py-3 ">
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Real-time Editing</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Version History</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Team Wikis</span>
              </div>
            </div>
            <h1 className="text-zinc-900 flex overflow-hidden text-[8vw] absolute z-[9] top-1/2 left-full -translate-x-1/2 -translate-y-1/2 font-['FoundersGrotesk']">
              {"DOCSYNC".split("").map((letter, index) => (
                <motion.span 
                initial={{y:"100%"}} 
                animate={cards[0]} 
                transition={{delay:index*0.06 , ease: [0.76, 0, 0.24, 1]}}
                className="inline-block" key={index}>{letter}</motion.span>
              ))}
            </h1>
          </motion.div>

          {/* ****************************************************** */}
          <motion.div onHoverStart={()=>{handelHovering(1)}} onHoverEnd={()=>{handelHoverEnd(1)}} className="cardcontainer group relative w-1/2 p-2 mb-10 h-[50vh] md:h-[75vh]">
            <div className="card flex flex-col w-full h-full rounded-lg hover:scale-95 transition-all duration-300 overflow-hidden relative">
              <p className=" px-4 pt-3 pb-2 text-gray-900 font-['NeueMontrealLight'] text-lg">• TaskVault</p>
              <svg className="w-full flex-1" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#f0f7ff"/>
                <rect x="120" y="100" width="70" height="70" fill="#7c9ef8" rx="8"/>
                <rect x="210" y="100" width="70" height="70" fill="#7c9ef8" rx="8"/>
                <rect x="120" y="230" width="70" height="70" fill="#7c9ef8" rx="8"/>
                <rect x="210" y="230" width="70" height="70" fill="#7c9ef8" rx="8"/>
                <line x1="190" y1="135" x2="210" y2="135" stroke="#7c9ef8" strokeWidth="2"/>
                <line x1="155" y1="190" x2="155" y2="230" stroke="#7c9ef8" strokeWidth="2"/>
                <circle cx="200" cy="200" r="15" fill="none" stroke="#7c9ef8" strokeWidth="2"/>
              </svg>
              <div className="flex flex-wrap gap-2 px-4 py-3 ">
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Sprint Planning</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Kanban Board</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Backlog Management</span>
              </div>
            </div>
            <h1 className="text-zinc-900 flex overflow-hidden text-[8vw] absolute z-[9] top-1/2 right-full translate-x-1/2 -translate-y-1/2 font-['FoundersGrotesk']">
              {"TASKVAULT".split("").map((letter, index) => (
                <motion.span 
                initial={{y:"100%"}} 
                animate={cards[1]} 
                transition={{delay:index*0.06 , ease: [0.76, 0, 0.24, 1]}}
                className="inline-block" key={index}>{letter}</motion.span>
              ))}
            </h1>
          </motion.div>

          {/* ****************************************************** */}

          <div className="cardcontainer group relative w-1/2 p-2 h-[50vh] md:h-[75vh]">
            <div className="card flex flex-col w-full h-full rounded-lg hover:scale-95 transition-all duration-300 overflow-hidden relative">
              <p className=" px-4 pt-3 pb-2 text-gray-900 font-['NeueMontrealLight'] text-lg">• ContentHub</p>
              <svg className="w-full flex-1" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#f0f7ff"/>
                <circle cx="150" cy="170" r="25" fill="#7c9ef8"/>
                <circle cx="250" cy="170" r="25" fill="#7c9ef8"/>
                <circle cx="125" cy="240" r="25" fill="#7c9ef8"/>
                <circle cx="200" cy="270" r="25" fill="#7c9ef8"/>
                <circle cx="275" cy="240" r="25" fill="#7c9ef8"/>
                <line x1="150" y1="195" x2="200" y2="240" stroke="#7c9ef8" strokeWidth="2"/>
                <line x1="250" y1="195" x2="200" y2="240" stroke="#7c9ef8" strokeWidth="2"/>
              </svg>
              <div className="flex flex-wrap gap-2 px-4 py-3 ">
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Headless CMS</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Media Library</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Multi-channel</span>
              </div>
            </div>
            <h1 className="text-zinc-900 w-full text-center group-hover:block hidden text-[8vw] absolute z-[9] top-1/2 left-full -translate-x-1/2 -translate-y-1/2 font-['FoundersGrotesk']">
              {"CONTENTHUB".split("").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </h1>
          </div>

          {/* ****************************************************** */}
          <div className="cardcontainer group relative w-1/2 p-2 h-[50vh] md:h-[75vh]">
            <div className="card flex flex-col w-full h-full rounded-lg hover:scale-95 transition-all duration-300 overflow-hidden relative">
              <p className=" px-4 pt-3 pb-2 text-gray-900 font-['NeueMontrealLight'] text-lg">• QAFlow</p>
              <svg className="w-full flex-1" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#f0f7ff"/>
                <path d="M180 120 L160 160 L180 200 L200 180 L220 200 L240 160 L220 120 Z" fill="#7c9ef8"/>
                <rect x="140" y="220" width="120" height="40" fill="#7c9ef8" rx="4"/>
                <line x1="170" y1="235" x2="170" y2="245" stroke="#ffffff" strokeWidth="2"/>
                <line x1="200" y1="235" x2="200" y2="245" stroke="#ffffff" strokeWidth="2"/>
                <line x1="230" y1="235" x2="230" y2="245" stroke="#ffffff" strokeWidth="2"/>
                <circle cx="200" cy="290" r="5" fill="#7c9ef8"/>
                <circle cx="170" cy="320" r="5" fill="#7c9ef8"/>
                <circle cx="230" cy="320" r="5" fill="#7c9ef8"/>
                <line x1="200" y1="295" x2="170" y2="315" stroke="#7c9ef8" strokeWidth="2"/>
                <line x1="200" y1="295" x2="230" y2="315" stroke="#7c9ef8" strokeWidth="2"/>
              </svg>
              <div className="flex flex-wrap gap-2 px-4 py-3 ">
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Test Automation</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">Bug Tracking</span>
                <span className="px-3 py-1 text-xs font-['NeueMontrealLight'] text-gray-700 border border-gray-300 rounded-full">CI/CD Integration</span>
              </div>
            </div>
            <h1 className="text-zinc-900 group-hover:block hidden text-[8vw] absolute z-[9] top-1/2 right-full translate-x-1/2 -translate-y-1/2 font-['FoundersGrotesk']">
              {"QAFLOW".split("").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </h1>
          </div>

          {/* ****************************************************** */}
          
        </div>
      </div>
    </div>
  );
};

export default Featured;
