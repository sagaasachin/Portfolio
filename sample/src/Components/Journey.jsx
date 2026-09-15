import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { journeyMilestones } from "../data/journeyData.js";
import "./Journey.css";

function MilestoneLogo({ item }) {
  if (item.logo) {
    return (
      <div className="journey-card__logo-box">
        <img
          src={item.logo}
          alt={`${item.title} logo`}
          className="journey-card__logo-img"
        />
      </div>
    );
  }

  // Academic & Technical Visual Identity Monograms / Emblems
  return (
    <div className="journey-card__logo-box journey-card__logo-box--emblem">
      {item.id === "10th" || item.id === "12th" ? (
        <div className="journey-card__emblem-content">
          <svg
            className="journey-card__emblem-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
          <span className="journey-card__emblem-text">SFS</span>
        </div>
      ) : item.id === "college" ? (
        <div className="journey-card__emblem-content">
          <svg
            className="journey-card__emblem-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
          </svg>
          <span className="journey-card__emblem-text">SRM TRP</span>
        </div>
      ) : item.id === "smart-traffic" ? (
        <div className="journey-card__emblem-content">
          <svg
            className="journey-card__emblem-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="2" width="10" height="20" rx="3" />
            <circle cx="12" cy="6" r="1.75" fill="currentColor" />
            <circle cx="12" cy="12" r="1.75" fill="currentColor" />
            <circle cx="12" cy="18" r="1.75" fill="currentColor" />
          </svg>
          <span className="journey-card__emblem-text">AI TRAFFIC</span>
        </div>
      ) : item.id === "skillyics" ? (
        <div className="journey-card__emblem-content">
          <svg
            className="journey-card__emblem-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="journey-card__emblem-text">SKILLYICS</span>
        </div>
      ) : item.id === "professional-journey" ? (
        <div className="journey-card__emblem-content journey-card__emblem-content--final">
          <svg
            className="journey-card__emblem-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="journey-card__emblem-text">NEXT STEP</span>
        </div>
      ) : (
        <div className="journey-card__emblem-content">
          <span className="journey-card__emblem-text">{item.title}</span>
        </div>
      )}
    </div>
  );
}

function JourneyStageCard({ item }) {
  return (
    <article
      className={`journey-card ${item.isFinal ? "journey-card--final" : ""}`}
    >
      {/* LEFT COLUMN: LOGO / VISUAL EMBLEM CONTAINER */}
      <div className="journey-card__logo-col">
        <MilestoneLogo item={item} />
      </div>

      {/* RIGHT COLUMN: EDITORIAL MILESTONE CONTENT */}
      <div className="journey-card__info-col">
        {/* HEADER ROW: NUMBER + CATEGORY LABEL + YEAR */}
        <div className="journey-card__top-row">
          <div className="journey-card__badge-group">
            <span className="journey-card__number">{item.number}</span>
            <span className="journey-card__label">{item.label}</span>
          </div>
          <span className="journey-card__year-badge">{item.year}</span>
        </div>

        {/* MAIN TITLE */}
        <h3 className="journey-card__title">{item.title}</h3>

        {/* INSTITUTION / COURSE / LOCATION META */}
        {item.institution && (
          <div className="journey-card__meta">
            <p className="journey-card__institution">{item.institution}</p>
            {item.course && <p className="journey-card__course">{item.course}</p>}
            {item.location && (
              <p className="journey-card__location">{item.location}</p>
            )}
          </div>
        )}

        {/* ROLE / PERIOD / LOCATION META FOR INTERNSHIPS */}
        {item.role && (
          <div className="journey-card__meta">
            <p className="journey-card__role">
              {item.role} {item.location ? `· ${item.location}` : ""}
            </p>
            {item.period && <p className="journey-card__period">{item.period}</p>}
          </div>
        )}

        {/* DESCRIPTION OR FINAL DESTINATION STATEMENT */}
        {item.description && (
          <p className="journey-card__description">{item.description}</p>
        )}
      </div>
    </article>
  );
}

export default function Journey() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [stationPoints, setStationPoints] = useState([]);
  const [sparkPos, setSparkPos] = useState({ x: 60, y: 70 });
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Calculate SVG path geometry & station positions on mount & resize
  useLayoutEffect(() => {
    const updateGeometry = () => {
      if (!pathRef.current) return;
      const len = pathRef.current.getTotalLength();
      setPathLength(len);

      const count = journeyMilestones.length;
      const pts = journeyMilestones.map((_, i) => {
        const pt = pathRef.current.getPointAtLength((i / (count - 1)) * len);
        return { x: pt.x, y: pt.y };
      });

      setStationPoints(pts);
      setSparkPos(pts[0] || { x: 60, y: 70 });
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    return () => window.removeEventListener("resize", updateGeometry);
  }, []);

  // Update spark position and active milestone index when scroll progress changes
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const total = journeyMilestones.length;
      const clampV = Math.min(1, Math.max(0, v));

      // Calculate active milestone index with discrete dwell zones
      const rawIdx = clampV * (total - 1);
      const calculatedIdx = Math.min(total - 1, Math.max(0, Math.round(rawIdx)));
      setActiveIdx(calculatedIdx);

      // Update exact spark position along SVG path
      if (pathRef.current && pathLength > 0) {
        const currentLen = clampV * pathLength;
        const pt = pathRef.current.getPointAtLength(currentLen);
        setSparkPos({ x: pt.x, y: pt.y });
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, pathLength]);

  // UX hint opacity (fades out as scroll starts)
  const hintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  // Mobile Spark Y position
  const sparkMobileY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const activeMilestone = journeyMilestones[activeIdx] || journeyMilestones[0];

  return (
    <section
      className="journey section"
      id="journey"
      ref={containerRef}
      aria-labelledby="journey-heading"
    >
      {/* 450vh STICKY SCROLL WRAPPER */}
      <div className="journey__sticky-container">
        <div className="journey__sticky-viewport">
          <div className="container journey__inner-flex">
            {/* EDITORIAL SECTION HEADER */}
            <motion.div
              className="journey__header"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="journey__label">
                <span className="journey__label-dot" />
                <span>JOURNEY</span>
              </div>

              <h2 className="journey__title" id="journey-heading">
                A timeline through my education, learning and growth.
              </h2>

              <motion.p
                className="journey__scroll-hint"
                style={{ opacity: hintOpacity }}
              >
                SCROLL TO TRAVEL THROUGH MY TIMELINE ↓
              </motion.p>
            </motion.div>

            {/* DESKTOP / TABLET LAYOUT: INVERTED SEMICIRCLE SVG + EDITORIAL CARD */}
            <div className="journey__desktop-layout">
              {/* CONTINUOUS INVERTED SEMICIRCLE SVG TIMELINE */}
              <div className="journey__semicircle-wrapper">
                <svg
                  className="journey__semicircle-svg"
                  viewBox="0 0 1000 420"
                  preserveAspectRatio="xMidYMin meet"
                >
                  <defs>
                    <radialGradient
                      id="goldSparkGlow"
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. Base Continuous Inverted Arc Path (Curves Downward) */}
                  <path
                    ref={pathRef}
                    id="journeyPath"
                    d="M 60 70 A 440 320 0 0 0 940 70"
                    fill="none"
                    stroke="var(--color-timeline-base)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />

                  {/* 2. Active Gold Path Segment */}
                  <motion.path
                    d="M 60 70 A 440 320 0 0 0 940 70"
                    fill="none"
                    stroke="var(--color-timeline-progress)"
                    strokeWidth="3.5"
                    style={{ pathLength: smoothProgress }}
                  />

                  {/* 3. Station Holes Embedded Directly ON the SVG Path */}
                  {journeyMilestones.map((m, idx) => {
                    const pt = stationPoints[idx] || { x: 60, y: 70 };
                    const isActive = idx === activeIdx;

                    return (
                      <g key={m.id} className="journey__svg-station">
                        {/* Active Outer Ring */}
                        {isActive && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="15"
                            fill="none"
                            stroke="var(--color-timeline-dot-border)"
                            strokeWidth="1.5"
                            opacity="0.6"
                            className="journey__pulse-ring"
                          />
                        )}

                        {/* Station Hole Circle (○ / ◎) */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isActive ? "9" : "7"}
                          fill={isActive ? "var(--color-timeline-dot-active)" : "var(--color-timeline-dot-bg)"}
                          stroke={isActive ? "var(--color-timeline-dot-border)" : "var(--color-timeline-base)"}
                          strokeWidth={isActive ? "2" : "1.8"}
                          style={{ transition: "all 0.3s ease" }}
                        />

                        {/* Center Dot for Active Hole */}
                        {isActive && (
                          <circle cx={pt.x} cy={pt.y} r="3" fill="var(--color-timeline-dot-bg)" />
                        )}

                        {/* Milestone Year Label Attached Above Hole */}
                        <text
                          x={pt.x}
                          y={pt.y - 18}
                          textAnchor="middle"
                          className={`journey__svg-year ${
                            isActive ? "journey__svg-year--active" : ""
                          }`}
                        >
                          {m.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* 4. TRAVELLING GOLD SPARK (✦) */}
                  <g
                    transform={`translate(${sparkPos.x}, ${sparkPos.y})`}
                    className="journey__spark-group"
                  >
                    <circle cx="0" cy="0" r="16" fill="url(#goldSparkGlow)" />
                    <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>

              {/* SUBTLE VERTICAL CONNECTOR LINE LEADING TO CONTENT PANEL */}
              <div className="journey__connector-wrapper" aria-hidden="true">
                <div className="journey__connector-line" />
              </div>

              {/* LARGE PREMIUM EDITORIAL CONTENT PANEL (85-92% WIDTH) */}
              <div className="journey__content-stage">
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <JourneyStageCard item={activeMilestone} />
                </motion.div>
              </div>
            </div>

            {/* MOBILE LAYOUT (< 768px): VERTICAL TIMELINE STICKY EXPERIENCE */}
            <div className="journey__mobile-layout">
              <div className="journey__mobile-stage">
                {/* LEFT SIDE: VERTICAL TIMELINE AXIS */}
                <div className="journey__mobile-axis" aria-hidden="true">
                  <div className="journey__mobile-line-base" />
                  <motion.div
                    className="journey__mobile-line-active"
                    style={{ scaleY: smoothProgress }}
                  />

                  {/* 8 STATION DOTS ON MOBILE AXIS */}
                  {journeyMilestones.map((m, idx) => {
                    const isActive = idx === activeIdx;
                    const topPct = (idx / (journeyMilestones.length - 1)) * 100;
                    return (
                      <div
                        key={m.id}
                        className={`journey__mobile-station ${
                          isActive ? "journey__mobile-station--active" : ""
                        }`}
                        style={{ top: `${topPct}%` }}
                      >
                        <div className="journey__mobile-hole">
                          {isActive && <span className="journey__mobile-hole-core" />}
                        </div>
                        <span className="journey__mobile-year-tag">{m.year}</span>
                      </div>
                    );
                  })}

                  {/* MOBILE TRAVELLING GOLD SPARK */}
                  <motion.div
                    className="journey__mobile-spark"
                    style={{ top: sparkMobileY }}
                  >
                    <span className="journey__spark-core" />
                    <span className="journey__spark-halo" />
                  </motion.div>
                </div>

                {/* RIGHT SIDE: ACTIVE MILESTONE CONTENT CARD */}
                <div className="journey__mobile-card-wrapper">
                  <motion.div
                    key={activeMilestone.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <JourneyStageCard item={activeMilestone} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}