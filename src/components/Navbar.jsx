import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the About section element (look for the lime green section)
      const aboutSection = document.querySelector('.bg-\\[\\#cdea68\\]');
      
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        // Hide navbar when About section is in view (top is above viewport)
        if (aboutRect.top <= 0) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed z-[999] w-full px-[5.922vw] py-5 font-[NeueMontrealBoldItalic] flex items-center justify-between backdrop-blur-2xl transition-all duration-500 ${
        isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
      }`}
    >
      <div className="logo">
          <h3 className={'text-[2.1vw] md:text-[1.3vw] font-light capitalize '} style={{ fontSize: '2.5vw'}}>
            VeloSync
          </h3>
      </div>
      <div className="links flex gap-[3vw] mb-2" >
        {["Services", "Our Work", "About Us", "Insights", "Contact Us"].map(
          (item, index) => (
            <a
              key={index}
              className={`text-[1.1vw] md:text-[1.1vw] font-[NeueMontrealLight]  capitalize ${
                index === 4 && "ml-[12vw]"
              }`}
            >
              {item}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
