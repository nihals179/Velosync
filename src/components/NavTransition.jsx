import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const TRANSITION_PAGES = ["/services", "/careers", "/contact"];
const EXIT_MS = 1100;
const pageNames = { "/services": "Services", "/careers": "Careers", "/contact": "Contact" };

const TransitionCtx = createContext({ navigateTo: () => {}, transitioning: false });
export const usePageTransition = () => useContext(TransitionCtx);

const NavTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exitOverlay, setExitOverlay] = useState({ show: false, label: "" });
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = useCallback(
    (path) => {
      if (transitioning) return;           // block during active transition
      if (path === location.pathname) return; // already on this page

      if (TRANSITION_PAGES.includes(path)) {
        setTransitioning(true);
        setExitOverlay({ show: true, label: pageNames[path] });
        setTimeout(() => {
          setExitOverlay({ show: false, label: "" });
          navigate(path);
          setTransitioning(false);
        }, EXIT_MS);
      } else {
        navigate(path);
      }
    },
    [navigate, transitioning, location.pathname]
  );

  const isEntryPage = TRANSITION_PAGES.includes(location.pathname);

  return (
    <TransitionCtx.Provider value={{ navigateTo, transitioning }}>
      {/* Exit overlay — pointer-events-all during transition to block clicks */}
      <AnimatePresence>
        {exitOverlay.show && (
          <motion.div
            key="exit-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#cdea68] pointer-events-auto cursor-default"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, ease: [0.37, 0, 0.63, 1] }}
            style={{ transformOrigin: "bottom" }}
          >
            <motion.span
              className="font-['FoundersGrotesk'] uppercase text-zinc-900 text-[8vw] leading-none select-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.37, 0, 0.63, 1] }}
            >
              {exitOverlay.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entry overlay — drops from top and reveals new page */}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} style={{ position: "relative" }}>
          {isEntryPage && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#cdea68] pointer-events-none"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.4, ease: [0.37, 0, 0.63, 1], delay: 0.15 }}
              style={{ transformOrigin: "top" }}
            >
              <motion.span
                className="font-['FoundersGrotesk'] uppercase text-zinc-900 text-[8vw] leading-none select-none"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.37, 0, 0.63, 1] }}
              >
                {pageNames[location.pathname]}
              </motion.span>
            </motion.div>
          )}
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
};

export default NavTransition;
