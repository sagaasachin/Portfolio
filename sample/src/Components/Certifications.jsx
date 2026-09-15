import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./UI/Reveal.jsx";
import { certifications } from "../data/certifications.js";
import { asset } from "../utils/asset.js";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import "./Certifications.css";

function IssuerLogo({ cert }) {
  if (cert.logo) {
    return (
      <div className="certs__card-logo-wrapper">
        <img
          src={asset(cert.logo)}
          alt={`${cert.issuer || cert.title} logo`}
          loading="lazy"
          className="certs__card-logo-img"
        />
      </div>
    );
  }
  return (
    <div className="certs__card-logo-wrapper certs__card-logo-wrapper--emblem">
      <span className="certs__card-emblem-text">
        {(cert.issuer || cert.title).substring(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  const handleKey = useCallback((e) => {
    if (e.key === "Escape") setSelected(null);
  }, []);

  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected, handleKey]);

  return (
    <section
      className="certs section"
      id="certifications"
      aria-labelledby="certs-heading"
    >
      <div className="container">
        {/* EDITORIAL SECTION HEADER */}
        <Reveal>
          <div className="certs__header">
            <div className="certs__label-group">
              <span className="certs__label-dot" />
              <span className="certs__label-text">CERTIFICATIONS</span>
            </div>
            <h2 className="section-title" id="certs-heading">
              Credentials &amp; Learning
            </h2>
            <p className="section-subtitle">
              Professional credentials earned through specialized courses, industry training, and software engineering development.
            </p>
          </div>
        </Reveal>

        {/* 4 CARDS PER ROW DESKTOP GRID */}
        <div className="certs__grid">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={0.05 * (i % 4)}>
              <article className="certs__card">
                {/* ORGANIZATION LOGO (PRIMARY VISUAL IDENTITY) */}
                <div className="certs__card-logo-area">
                  <IssuerLogo cert={cert} />
                </div>

                {/* CREDENTIAL TEXT METADATA */}
                <div className="certs__card-body">
                  <span className="certs__card-category">
                    CERTIFICATION
                  </span>

                  <h3 className="certs__card-title">{cert.title}</h3>

                  {cert.issuer && (
                    <p className="certs__card-issuer">{cert.issuer}</p>
                  )}
                </div>

                {/* LOW-CONTRAST CARD DIVIDER */}
                <div className="certs__card-divider" />

                {/* BOTTOM ACTION AREA (VIEW CERTIFICATE BUTTON) */}
                <div className="certs__card-footer">
                  <button
                    className="certs__card-action"
                    onClick={() => setSelected(cert)}
                    aria-label={`View certificate: ${cert.title}`}
                  >
                    <span>VIEW CERTIFICATE</span>
                    <FiArrowUpRight className="certs__action-icon" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* REFINED CONSTRAINED MODAL LIGHTBOX (LOADS CERTIFICATE SCAN ONLY ON OPEN) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="certs__modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} certificate viewer`}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="certs__modal-container"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="certs__modal-header">
                <div className="certs__modal-meta">
                  <span className="certs__modal-badge">CREDENTIAL</span>
                  <h4 className="certs__modal-title">{selected.title}</h4>
                  {selected.issuer && (
                    <span className="certs__modal-issuer">· {selected.issuer}</span>
                  )}
                </div>
                <button
                  className="certs__modal-close"
                  onClick={() => setSelected(null)}
                  aria-label="Close certificate modal"
                >
                  <FiX />
                </button>
              </div>

              {/* MODAL IMAGE (CONSTRAINED REFINED SIZE, NEVER TOUCHES VIEWPORT EDGES) */}
              <div className="certs__modal-image-wrapper">
                <img
                  className="certs__modal-image"
                  src={asset(selected.image)}
                  alt={`${selected.title} certificate scan`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}