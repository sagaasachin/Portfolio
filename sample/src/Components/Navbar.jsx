import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile.js";
import useActiveSection from "../hooks/useActiveSection";
import useTheme from "../hooks/useTheme";
import { scrollToId, scrollToTop } from "../utils/scroll.js";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(SECTION_IDS, "about");
  const progressRef = useRef(null);
  const rafId = useRef(null);

  // 1. Scrolled header background state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Global Top Page Scroll Progress Indicator (Zero React re-renders)
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // 3. Navigation click handler
  const navigate = useCallback((id) => {
    setOpen(false);
    scrollToId(id);
  }, []);

  // 4. Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Global Top Page Scroll Progress Bar (Fixed at top: 0 above navbar) */}
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressRef} className="scroll-progress__bar" />
      </div>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        role="banner"
      >
        <div className="navbar__inner container container--wide">
          {/* Logo Mark Only (Text Name Completely Removed) */}
          <button
            className="navbar__logo"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            title="Home / Top"
          >
            <span className="navbar__logo-badge">{profile.initials}</span>
          </button>

          {/* Desktop Links */}
          <nav className="navbar__nav hide-mobile" role="navigation" aria-label="Main navigation">
            <ul className="navbar__links" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <button
                      className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
                      onClick={() => navigate(link.id)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions: Theme Toggle + Mobile Menu Burger */}
          <div className="navbar__actions">
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="navbar__theme-icon"
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile Burger Toggle */}
            <button
              className="navbar__burger hide-desktop"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.ul
              className="navbar__overlay-links"
              role="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <button
                      className={`navbar__overlay-link ${isActive ? "navbar__overlay-link--active" : ""}`}
                      onClick={() => navigate(link.id)}
                      style={{ transitionDelay: `${i * 25}ms` }}
                    >
                      <span className="navbar__overlay-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="navbar__overlay-text">{link.label}</span>
                      {isActive && <span className="navbar__overlay-indicator" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
