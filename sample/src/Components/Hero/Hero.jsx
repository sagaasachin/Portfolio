import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile.js";
import { socials } from "../../data/socials.js";
import SocialIcon from "../UI/SocialIcon.jsx";
import { FaArrowDown, FaDownload, FaBriefcase } from "react-icons/fa";
import { asset } from "../../utils/asset.js";
import { scrollToId } from "../../utils/scroll.js";
import "./Hero.css";

export default function Hero() {
  const scrollToProjects = () => scrollToId("projects");

  return (
    <section
      className="hero section"
      id="hero"
      aria-label="Hero Landing Page"
    >
      {/* Ambient Background Spotlight & Lighting */}
      <div className="hero__spotlight" aria-hidden="true" />
      <div className="hero__light-streak" aria-hidden="true" />

      <div className="hero__inner container container--wide">
        {/* PROFILE VISUAL COMPOSITION (First in DOM: Mobile Top / Desktop Right) */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__visual-frame">
            <img
              src={asset(profile.avatar)}
              alt={profile.name}
              className="hero__visual-img"
              loading="eager"
            />
            <div className="hero__visual-border" aria-hidden="true" />
          </div>
        </motion.div>

        {/* HERO CONTENT CONTAINER (Second in DOM: Mobile Below Image / Desktop Left) */}
        <div className="hero__content">
          {/* NAME HEADING (Mobile Order 2) */}
          <motion.div
            className="hero__name-block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero__headline">
              I'M <span className="accent">{profile.name.toUpperCase()}</span>
            </h1>
          </motion.div>

          {/* PROFESSIONAL ROLE / EYEBROW (Mobile Order 3) */}
          <motion.div
            className="hero__label"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__label-dot" aria-hidden="true" />
            <span>{profile.eyebrow || "SOFTWARE DEVELOPER / WEB DEVELOPER"}</span>
          </motion.div>

          {/* SHORT BIO INTRODUCTION (Mobile Order 4) */}
          <motion.p
            className="hero__intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Full-stack developer and UI artist crafting scalable web applications, modern interfaces, and high-performance digital products.
          </motion.p>

          {/* CTA BUTTONS (Mobile Order 5) */}
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="btn btn--primary" onClick={scrollToProjects}>
              <FaBriefcase /> View My Work
            </button>
            {profile.resume?.file && (
              <a
                href={asset(profile.resume.file)}
                download={profile.resume.filename}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload /> Download Resume
              </a>
            )}
          </motion.div>

          {/* SOCIAL LINKS (Mobile Order 6) */}
          <motion.div
            className="hero__socials"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            aria-label="Social links"
          >
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={s.label}
                title={s.label}
              >
                <SocialIcon icon={s.icon} size={18} />
                <span className="hero__social-label">{s.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        className="hero__scroll-hint"
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        aria-label="Scroll down to projects"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowDown size={11} />
        </motion.span>
      </motion.button>
    </section>
  );
}
