import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "../data/experience.js";
import { asset } from "../utils/asset.js";
import { calculateDuration, formatDateRange } from "../utils/dateUtils.js";
import { FiArrowUpRight, FiX, FiCheckCircle } from "react-icons/fi";
import "./Experience.css";

export default function Experience() {
  const [activeCert, setActiveCert] = useState(null);

  if (!experience || experience.length === 0) return null;

  return (
    <section className="experience section" id="experience" aria-labelledby="experience-heading">
      {/* Background Ambient Glow */}
      <div className="experience__glow" aria-hidden="true" />

      <div className="container">
        {/* EDITORIAL SECTION HEADER */}
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="experience__label">
            <span className="experience__label-dot" />
            <span>EXPERIENCE</span>
          </div>

          <h2 className="experience__title" id="experience-heading">
            Internship Journey
          </h2>

          <p className="experience__subtitle">
            A milestone showcase of my software development internships and industry experience.
          </p>
        </motion.div>

        {/* SCROLL-DRIVEN STACKED CARDS WRAPPER */}
        <div className="experience__container">
          {/* Side Progress Rail */}
          <div className="experience__rail" aria-hidden="true">
            <div className="experience__rail-line" />
          </div>

          {/* Cards Stack */}
          <div className="experience-stack">
            {experience.map((item, index) => {
              const dateRange = formatDateRange(item.startDate, item.endDate, item.current);
              const duration = calculateDuration(item.startDate, item.endDate, item.current);
              const certUrl = item.certificate?.url || (typeof item.certificate === "string" ? item.certificate : null);
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={item.id}
                  className="experience-item"
                  style={{
                    "--i": index,
                    "--total": experience.length,
                  }}
                >
                  <article
                    className="experience-card glass"
                    style={{ zIndex: index + 1 }}
                  >
                    {/* Gold Left Accent Bar */}
                    <div className="experience-card__accent-bar" aria-hidden="true" />

                    {/* Stable 4-Column CSS Grid */}
                    <div className="experience-card__grid">
                      {/* Column 1: Index Number */}
                      <div className="experience-index">{numStr}</div>

                      {/* Column 2: Company Logo */}
                      <div className="experience-logo">
                        {item.logo && (
                          <img
                            src={asset(item.logo)}
                            alt={`${item.company} logo`}
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Column 3: Main Role & Company */}
                      <div className="experience-main">
                        <h3 className="experience-title">{item.role}</h3>
                        <p className="experience-company">
                          {item.company}
                          {item.location && <span className="experience-location"> · {item.location}</span>}
                        </p>
                      </div>

                      {/* Column 4: Right Metadata Stack */}
                      <div className="experience-meta">
                        {dateRange && <span className="experience-dates">{dateRange}</span>}
                        {duration && <span className="experience-duration">{duration}</span>}
                        {certUrl && (
                          <button
                            className="experience-certificate"
                            onClick={() =>
                              setActiveCert({
                                title: item.certificate?.title || `${item.role} Certificate`,
                                url: certUrl,
                              })
                            }
                            aria-label={`View certificate for ${item.role} at ${item.company}`}
                          >
                            <span>VIEW CERTIFICATE</span>
                            <FiArrowUpRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="experience__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
            onClick={() => setActiveCert(null)}
          >
            <div className="experience__lightbox-panel glass" onClick={(e) => e.stopPropagation()}>
              <div className="experience__lightbox-head">
                <div className="experience__lightbox-title">
                  <FiCheckCircle className="accent" />
                  <span>{activeCert.title}</span>
                </div>
                <button
                  className="experience__lightbox-close"
                  onClick={() => setActiveCert(null)}
                  aria-label="Close certificate"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="experience__lightbox-body">
                <img
                  src={asset(activeCert.url)}
                  alt={activeCert.title}
                  className="experience__lightbox-img"
                />
              </div>

              <div className="experience__lightbox-foot">
                <a
                  href={asset(activeCert.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Open Original File <FiArrowUpRight />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}