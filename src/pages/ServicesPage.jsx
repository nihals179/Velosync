import React from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-white font-[NeueMontreal] bg-zinc-900">
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;
