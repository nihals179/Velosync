import React from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { useContent } from "../context/ContentContext";

const ServicesPage = () => {
  // Use servicesBgColor from content, fallback to global backgroundColor or white
  const { content } = useContent ? useContent() : { content: null };
  const servicesBgColor = (content && content.servicesBgColor) || (content && content.backgroundColor) || '#fff';
  const servicesBgColorDark = (content && content.servicesBgColorDark) || (content && content.backgroundColorDark) || '#18181b';
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-zinc-900 dark:text-white font-[NeueMontreal] bg-[var(--background-color)] dark:bg-[var(--background-color-dark)]" style={{ background: servicesBgColor }}>
      <Navbar />
      <Services />
      <Footer variant="green" bgColor={(content && content.servicesFooterBgColor) || (content && content.primaryColor) || '#004d43'} />
    </div>
  );
};

export default ServicesPage;
