import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    gsap.fromTo(
      el,
      { yPercent: 6},
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={aboutRef} id="about" className="relative z-20 w-full py-20 bg-white rounded-t-3xl text-zinc-900 -mt-[12vw]">
      {/* Section label */}
      <div className="px-[5.922vw] mb-6">
        <p className="font-['NeueMontrealLight'] text-[1vw] uppercase tracking-widest" style={{ color: "#004d43" }}>
          / About Us
        </p>
      </div>

      {/* Hero text */}
      <div className="px-[5.922vw]">
        <p className="text-[3.4vw] text-justify leading-none w-[100%] text-zinc-900">
          VeloSynq is the all-in-one platform designed to accelerate product velocity
          and synchronize teams across development, marketing, and sales. We help
          ambitious companies ship faster and scale smarter.
        </p>
      </div>

      {/* Details row */}
      <div className="w-full border-y border-zinc-200 mt-12 px-[5.922vw] font-['NeueMontreal'] text-[1.3vw] py-10">
        <div className="flex flex-col md:flex-row gap-10 pt-4 pb-28">
          <div className="md:basis-[25vw] lg:basis-[50vw] text-zinc-500">
            What you can expect:
          </div>
          <div className="flex flex-col basis-[25vw] w-[70vw] gap-7 text-zinc-500">
            <span>
              Our platform streamlines workflows, automates repetitive tasks, and provides
              real-time visibility into your development pipeline. From sprint planning
              to product launch, VeloSynq keeps your team aligned and productive.
            </span>

            <span>
              Built for product teams by product teams, VeloSynq combines powerful
              analytics, intelligent automation, and seamless integrations to transform
              how you build, ship, and iterate on products.
            </span>

            <span>
              Whether you're optimizing for speed, scalability, or collaboration, our platform
              adapts to your workflow. We provide the tools, insights, and support needed to
              accelerate growth and maintain competitive advantage in fast-moving markets.
            </span>
          </div>
          <div className="flex flex-col basis-[25vw] justify-end md:pl-40 text-zinc-500">
            <span className="mb-3 text-zinc-900 font-semibold">Follow:</span>
            <span className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer">Twitter</span>
            <span className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer">GitHub</span>
            <span className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer">LinkedIn</span>
            <span className="hover:text-zinc-900 transition-colors duration-200 cursor-pointer">Product Hunt</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col lg:flex-row gap-10 px-[3.922vw] mt-8 justify-between items-start">
        <div className="flex flex-col gap-4 items-start">
          <h3 className="text-[4vw] text-zinc-900">Our approach:</h3>
          <button className="px-6 py-4 rounded-full text-[1.184vw] flex gap-7 items-center justify-between bg-[#004d43] border border-[#004d43] text-white hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300">
            <span>READ MORE</span>
            <div className="w-2 h-2 rounded-full bg-current"></div>
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden flex items-center justify-center w-[400px] md:w-[600px] border border-zinc-200">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg"
            className="object-contain w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
