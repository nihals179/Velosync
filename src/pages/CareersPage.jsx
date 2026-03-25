import React from "react";
import Navbar from "../components/Navbar";
import Careers from "../components/Careers";
import Footer from "../components/Footer";

const CareersPage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-zinc-900 font-[NeueMontreal] bg-white">
      <Navbar />
      <Careers />
      <Footer />
    </div>
  );
};

export default CareersPage;
