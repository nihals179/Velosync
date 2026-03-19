import React from "react";

const About = () => {
  return (
    <div id="about" data-scroll data-scroll-speed='-0.18' className="w-full py-20 bg-[#cdea68] rounded-t-3xl text-zinc-900">
      <div className="px-[5.922vw]">
        <p className="text-[3.4vw] text-justify leading-none w-[100%]">
          VeloSynq is the all-in-one platform designed to accelerate product velocity
          and synchronize teams across development, marketing, and sales. We help
          ambitious companies ship faster and scale smarter.
        </p>
      </div>
      {/* ******************************************************************************************* */}
      <div className="w-full border-y border-zinc-500/60 mt-12 px-[5.922vw] font-['NeueMontreal'] text-[1.3vw] py-10">
        <div className="flex flex-col md:flex-row gap-10 pt-4 pb-28">
          <div className="md:basis-[25vw] lg:basis-[50vw]">
            What you can expect:
          </div>
          <div className="flex flex-col basis-[25vw] w-[70vw] gap-7">
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
          <div className="flex flex-col basis-[25vw]  justify-end md:pl-40">
            <span className="mb-3">Follow:</span>
            <span>Twitter</span>
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Product Hunt</span>
          </div>
        </div>
      </div>
      {/* ******************************************************************************************* */}
      <div className="flex flex-col lg:flex-row gap-10 px-[3.922vw] mt-4 justify-between">
        <div className="flex flex-col gap-3 items-start">
          <h3 className="text-[4vw]">Our approach:</h3>
          <button className="text-white px-6 py-4 bg-zinc-800 rounded-full text-[1.184vw] flex gap-7 items-center justify-between">
            <span>READ MORE</span>{" "}
            <div className="w-2 h-2 rounded-full bg-zinc-100"></div>
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden flex items-center justify-center w-[400px] md:w-[600px]">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg"
            className=" object-contain w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
