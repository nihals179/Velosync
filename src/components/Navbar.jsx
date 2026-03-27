import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "./NavTransition";

const navLinks = [
  { label: "About Us", href: "about", page: null },
  { label: "Our Work", href: "our-work", page: null },
  { label: "Services", href: null, page: "/services" },
  { label: "Careers", href: null, page: "/careers" },
  { label: "Contact Us", href: null, page: "/contact" },
]; 

const Navbar = () => {
  const { navigateTo, directNavigate, transitioning } = usePageTransition();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      let hide = false;

      // Existing marquee-based hide logic
      const marqueeEl = document.querySelector(".marquee-track");
      if (marqueeEl) {
        const marqueeParent = marqueeEl.closest(".relative.z-10");
        if (marqueeParent) {
          const marqueeBottom = marqueeParent.getBoundingClientRect().bottom;
          if (marqueeBottom < 0) hide = true;
        }
      }

      // Hide when the About section has reached the top of the viewport
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // when the top of #about is at/above the top and it's still visible
        if (rect.top <= 0 && rect.bottom > 0) hide = true;
      }

      setHidden(hide);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item) => {
    setMenuOpen(false);
    if (item.page) {
      // Bypass page transition overlays when navigating from navbar
          // Use navigateTo so the exit/entry transition overlays run
          navigateTo(item.page);
    } else {
      if (location.pathname !== "/") {
        // Navigate back to home without the entry/exit overlay, then scroll
            directNavigate("/", { state: { skipEntryLoader: true } });
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


  return (
    <>
      <nav
        className={`fixed z-[999] w-full px-5 md:px-[5.922vw] py-4 md:py-5 font-[NeueMontrealBoldItalic] flex items-center justify-between bg-white/90 backdrop-blur-sm transition-all duration-500 text-zinc-900 ${transitioning ? 'pointer-events-none' : ''} ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="logo">
              <h3
                className="text-[7vw] md:text-[2.5vw] lg:text-[1.8vw] font-light capitalize cursor-pointer"
                onClick={() => { setMenuOpen(false); directNavigate("/", { state: { skipEntryLoader: true } }); }}
          >
            VeloSync
          </h3>
        </div>

        {/* Desktop links */}
        <div className="links hidden md:flex gap-[3vw] mb-2">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNav(item)}
              className={`text-[1.4vw] lg:text-[1.1vw] font-['NeueMontrealLight'] capitalize hover:opacity-60 transition-opacity duration-200 ${
                index === navLinks.length - 1 ? "ml-[12vw]" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* Mobile hamburger placeholder (keeps layout parity on larger screens) */}
        <div className="md:hidden w-7 h-5" />
      </nav>

      {/* Always visible mobile menu button (rendered outside nav so it stays visible when navbar hides) */}
      <button
        className={`md:hidden flex flex-col gap-[5px] w-12 h-12 justify-center items-center z-[1001] fixed top-4 right-4 rounded-xl ${hidden ? 'bg-white/5 backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] w-6 bg-zinc-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block h-[2px] w-6 bg-zinc-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-[2px] w-6 bg-zinc-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile menu overlay with entry/exit animations */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            onClick={() => setMenuOpen(false)}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[998] bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((item, index) => (
              <motion.button
                key={index}
                onClick={(e) => { e.stopPropagation(); handleNav(item); }}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.36, delay: index * 0.06, ease: [0.22, 1, 0.36, 1]  }}
                className="font-['FoundersGrotesk'] uppercase text-[8vw] text-zinc-900 hover:text-[#004d43] transition-colors duration-200"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
