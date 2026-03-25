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
  const { navigateTo, transitioning } = usePageTransition();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      const aboutBottom = aboutEl.getBoundingClientRect().bottom;
      setHidden(aboutBottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed z-[999] w-full px-[5.922vw] py-5 font-[NeueMontrealBoldItalic] flex items-center justify-between bg-white/90 backdrop-blur-sm transition-all duration-500 text-zinc-900 ${transitioning ? 'pointer-events-none' : ''} ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
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
