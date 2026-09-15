import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile.js";
import { asset } from "../utils/asset.js";
import { FaArrowDown } from "react-icons/fa";
import "./About.css";

// Factual focus areas derived strictly from Jawahar's profile & skills
const FOCUS_AREAS = [
  {
    num: "01",
    title: "FRONTEND & UI ARCHITECTURE",
    desc: "Crafting modern, responsive user interfaces with React, CSS, and component-driven design.",
  },
  {
    num: "02",
    title: "BACKEND & API LOGIC",
    desc: "Building scalable backend services and databases with Node.js, Express, and MongoDB.",
  },
  {
    num: "03",
    title: "FULL-STACK PRODUCT DEVELOPMENT",
    desc: "Turning real-world ideas into complete digital products with clean, efficient code.",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle scroll parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section className="about section" id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="about__inner container">
        {/* SECTION LABEL & HEADING FOR MOBILE & DESKTOP */}
        <div className="about__header">
          <motion.div
            className="about__label"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="about__label-line" />
            <span>ABOUT ME</span>
          </motion.div>

          <motion.h2
            className="about__title"
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Building with curiosity. <br />
            Turning <span className="accent">complex ideas</span> into elegant digital products.
          </motion.h2>
        </div>

        <div className="about__grid">
          {/* LEFT COLUMN: EDITORIAL PROFILE VISUAL */}
          <motion.div className="about__visual-col" style={{ y: imageY }}>
            <motion.div
              className="about__frame"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={asset(profile.aboutImage || profile.avatar)}
                alt={`${profile.name} profile portrait`}
                className="about__image"
                loading="lazy"
              />
              <div className="about__frame-overlay" aria-hidden="true" />
              <div className="about__frame-border" aria-hidden="true" />
              <div className="about__meta-chip">
                <span className="about__meta-dot" />
                <span>{profile.name} — Full-Stack Developer</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: EDITORIAL PARAGRAPHS & FOCUS AREAS */}
          <motion.div className="about__content-col" style={{ y: textY }}>
            <motion.div
              className="about__paragraphs"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="about__paragraph">
                Hey there! I’m <strong className="accent">{profile.name}</strong> — a code crafter, UI artist, and lifelong learner passionate about creating stunning digital experiences. I specialize in turning ideas into elegant, user-friendly interfaces and robust web apps. My goal is to build not just websites, but products that solve real-world problems with <span className="accent">clean, efficient code</span>.
              </p>
              <p className="about__paragraph">
                What sets me apart is my energy, attention to detail, and constant curiosity. I thrive on challenge, collaboration, and creativity. From front-end flair with <span className="accent">React</span> to back-end logic in <span className="accent">Node.js and MongoDB</span>, I bring full-stack capabilities and a user-first mindset.
              </p>
            </motion.div>

            {/* FOCUS AREAS */}
            <motion.div
              className="about__focus"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="about__focus-heading">WHAT I DO</h3>
              <div className="about__focus-list">
                {FOCUS_AREAS.map((item) => (
                  <div key={item.num} className="about__focus-item">
                    <span className="about__focus-num">{item.num}</span>
                    <div className="about__focus-info">
                      <h4 className="about__focus-title">{item.title}</h4>
                      <p className="about__focus-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DOWNWARD SECTION CONNECTOR LINE TOWARD SKILLS/EXPERIENCE */}
        <div className="about__connector" aria-hidden="true">
          <span className="about__connector-line" />
          <span className="about__connector-dot">
            <FaArrowDown size={10} />
          </span>
        </div>
      </div>
    </section>
  );
}
