import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills.js";
import { asset } from "../utils/asset.js";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="skills section" id="skills" aria-labelledby="skills-heading">
      {/* Subtle Ambient Gold Light Spotlight */}
      <div className="skills__glow" aria-hidden="true" />
      <div className="skills__dec-line" aria-hidden="true" />

      <div className="container">
        {/* EDITORIAL SECTION HEADER */}
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="skills__label">
            <span className="skills__label-dot" />
            <span>TECH STACK</span>
          </div>

          <h2 className="skills__title" id="skills-heading">
            Technologies I work with
          </h2>

          <p className="skills__subtitle">
            A curated set of technologies I use to design, develop and deliver modern digital experiences.
          </p>
        </motion.div>

        {/* INTEGRATED EDITORIAL SHOWCASE COMPOSITION (NO CLICKABLE CARDS, NO HOVER DEPENDENCY) */}
        <motion.div
          className="skills__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.94 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={`skills__tile ${skill.featured ? "skills__tile--featured" : ""}`}
              style={{
                animationDelay: `${(i % 4) * 0.45}s`,
              }}
            >
              {/* Logo Frame */}
              <div className="skills__logo-box">
                <img
                  src={asset(skill.icon)}
                  alt={`${skill.name} technology icon`}
                  className="skills__logo-img"
                  loading="lazy"
                  width="48"
                  height="48"
                />
              </div>

              {/* Technology Name & Category */}
              <div className="skills__tile-info">
                <h3 className="skills__tile-name">{skill.name}</h3>
                {skill.category && (
                  <span className="skills__tile-cat">{skill.category}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SUBTLE TRANSITION CONNECTOR TO NEXT SECTION */}
        <div className="skills__ending" aria-hidden="true">
          <span className="skills__ending-line" />
        </div>
      </div>
    </section>
  );
}
