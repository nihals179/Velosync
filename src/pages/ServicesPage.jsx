import React from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-zinc-900 font-[NeueMontreal] bg-white">
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;
