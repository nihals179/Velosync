import React from "react";
import Navbar from "../components/Navbar";
import Careers from "../components/Careers";
import Footer from "../components/Footer";
import { useContent } from "../context/ContentContext";

const CareersPage = () => {
  // Use careersBgColor from content, fallback to global backgroundColor or white
  const { content } = useContent ? useContent() : { content: null };
  const careersBgColor = (content && content.careersBgColor) || (content && content.backgroundColor) || '#fff';
  return (
    <div className="w-full overflow-x-hidden min-h-screen text-zinc-900 font-[NeueMontreal]" style={{ background: careersBgColor }}>
      <Navbar />
      <Careers />
      <Footer variant="green" bgColor={(content && content.careersFooterBgColor) || (content && content.primaryColor) || '#004d43'} />
    </div>
  );
};

export default CareersPage;
