import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const TRANSITION_PAGES = ["/services", "/careers", "/contact"];
const EXIT_MS = 1100;
const pageNames = { "/": "VeloSync", "/services": "Services", "/careers": "Careers", "/contact": "Contact" };

const TransitionCtx = createContext({ navigateTo: () => {}, directNavigate: () => {}, transitioning: false });
export const usePageTransition = () => useContext(TransitionCtx);

const NavTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exitOverlay, setExitOverlay] = useState({ show: false, label: "" });
  const [entryOverlay, setEntryOverlay] = useState({ show: false, label: "" });
  const [transitioning, setTransitioning] = useState(false);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigateTo = useCallback(
    (path) => {
      if (transitioning) return;
      if (path === location.pathname) return;

      const label = pageNames[path] || "";
      setTransitioning(true);
      setExitOverlay({ show: true, label });

      setTimeout(() => {
        navigate(path);
        window.scrollTo(0, 0);
        setExitOverlay({ show: false, label: "" });
        setEntryOverlay({ show: true, label });

        setTimeout(() => {
          setEntryOverlay({ show: false, label: "" });
          setTransitioning(false);
        }, 1400);
      }, EXIT_MS);
    },
    [navigate, transitioning, location.pathname]
  );

  const directNavigate = useCallback(
    (path, options = {}) => {
      if (path === location.pathname) return;
      // allow callers to pass navigation state (e.g. { state: { skipEntryLoader: true } })
      const navOptions = {};
      if (options.state) navOptions.state = options.state;
      navigate(path, navOptions);
      window.scrollTo(0, 0);
    },
    [navigate, location.pathname]
  );

  const { content } = useContent();
  const navTransitionBgColor = (content && content.navTransitionBgColor) || (content && content.primaryColor) || '#004d43';
  return (
    <TransitionCtx.Provider value={{ navigateTo, directNavigate, transitioning }}>
      {/* Exit overlay — scales up from bottom */}
      {exitOverlay.show && (
        <motion.div
          key="exit-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto cursor-default"
          style={{ backgroundColor: navTransitionBgColor, transformOrigin: "bottom" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: [0.37, 0, 0.63, 1] }}
        >
          <motion.span
            className="font-['FoundersGrotesk'] uppercase text-white text-[8vw] leading-none select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.37, 0, 0.63, 1] }}
          >
            {exitOverlay.label}
          </motion.span>
        </motion.div>
      )}

      {/* Entry overlay — reveals new page by scaling down to top */}
      {entryOverlay.show && (
        <motion.div
          key="entry-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: navTransitionBgColor, transformOrigin: "top" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.37, 0, 0.63, 1], delay: 0.1 }}
        >
          <motion.span
            className="font-['FoundersGrotesk'] uppercase text-white text-[8vw] leading-none select-none"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: [0.37, 0, 0.63, 1] }}
          >
            {entryOverlay.label}
          </motion.span>
        </motion.div>
      )}

      {children}
    </TransitionCtx.Provider>
  );
};

export default NavTransition;
