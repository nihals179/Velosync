import React from "react";
import Navbar from "../components/Navbar";
import Careers from "../components/Careers";
import Footer from "../components/Footer";

const CareersPage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-white font-[NeueMontreal]" style={{ backgroundColor: "#cdea68" }}>
      <Navbar />
      <Careers />
      <Footer />
    </div>
  );
};

export default CareersPage;
