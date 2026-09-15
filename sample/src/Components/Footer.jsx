import React from "react";
import SocialIcon from "./UI/SocialIcon.jsx";
import { profile } from "../data/profile.js";
import { socials } from "../data/socials.js";
import { scrollToId, scrollToTop } from "../utils/scroll.js";
import { FiArrowUp } from "react-icons/fi";
import "./Footer.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Main Footer Content Grid */}
        <div className="footer__grid">
          {/* Brand & Status Column */}
          <div className="footer__brand-col">
            <button
              className="footer__logo"
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
            >
              <span className="footer__logo-badge">{profile.initials}</span>
              <span className="footer__logo-name">{profile.name}</span>
            </button>

            <p className="footer__tagline">
              Software Developer & UI/UX Craftsman building intuitive, high-performance web applications and modern digital experiences.
            </p>

            <div className="footer__status" title="Current Availability Status">
              <span className="footer__status-dot" aria-hidden="true" />
              <span className="footer__status-text">Available for full-time roles & projects</span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="footer__nav-col">
            <h3 className="footer__heading">Navigation</h3>
            <ul className="footer__nav-list" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    className="footer__nav-link"
                    onClick={() => scrollToId(link.id)}
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect (Horizontal Social Logos Only) */}
          <div className="footer__social-col">
            <h3 className="footer__heading">Connect</h3>
            <div className="footer__social-icons-row">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-icon-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  <SocialIcon icon={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="footer__subbar">
          <div className="footer__subbar-left">
            <p className="footer__copy">
              © {year} {profile.name}. All rights reserved.
            </p>
            <span className="footer__divider" aria-hidden="true">•</span>
            <span className="footer__built">Crafted with React & Vite</span>
          </div>

          <button
            className="footer__backtop-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <FiArrowUp className="footer__backtop-icon" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}