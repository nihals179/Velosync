import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageTransition } from "./NavTransition";

const navLinks = [
  { label: "About Us", href: "about", page: null },
  { label: "Our Work", href: "our-work", page: null },
  { label: "Services", href: null, page: "/services" },
  { label: "Careers", href: null, page: "/careers" },
  { label: "Contact Us", href: null, page: "/contact" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { navigateTo, transitioning } = usePageTransition();
  const location = useLocation();

  useEffect(() => {
    const checkVisibility = () => {
      if (window.scrollY === 0) {
        setIsVisible(true);
        return;
      }
      const aboutSection = document.querySelector('.bg-\\[\\#cdea68\\]');
      if (aboutSection) {
        setIsVisible(aboutSection.getBoundingClientRect().top > 0);
      } else {
        setIsVisible(true);
      }
    };

    checkVisibility(); // run on mount
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  const handleNav = (item) => {
    if (item.page) {
      navigateTo(item.page);
    } else {
      if (location.pathname !== "/") {
        navigateTo("/");
        setTimeout(() => {
          const el = document.getElementById(item.href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isCareers = location.pathname === "/careers";

  return (
    <nav
      className={`fixed z-[999] w-full px-[5.922vw] py-5 font-[NeueMontrealBoldItalic] flex items-center justify-between backdrop-blur-2xl transition-all duration-500 bg-black/10 ${
        isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
      } ${transitioning ? 'pointer-events-none' : ''} ${isCareers ? 'text-zinc-900' : 'text-white'}`}
    >
      <div className="logo">
        <h3
          className="text-[2.1vw] md:text-[1.3vw] font-light capitalize cursor-pointer"
          style={{ fontSize: '2.5vw' }}
          onClick={() => navigateTo("/")}
        >
          VeloSync
        </h3>
      </div>
      <div className="links flex gap-[3vw] mb-2">
        {navLinks.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNav(item)}
            className={`text-[1.1vw] md:text-[1.1vw] font-['NeueMontrealLight'] capitalize hover:opacity-60 transition-opacity duration-200 ${
              index === navLinks.length - 1 ? "ml-[12vw]" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
