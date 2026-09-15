import React from "react";
import Reveal from "./UI/Reveal.jsx";
import { education } from "../data/education.js";
import "./Education.css";

export default function Education() {
  if (!education.length) return null;

  return (
    <section className="education section" id="education" aria-labelledby="education-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Education</p>
          <h2 className="section-title" id="education-heading">
            Where I studied
          </h2>
        </Reveal>

        <div className="education__list">
          {education.map((item, i) => (
            <Reveal key={item.id} delay={0.06 * i}>
              <article className="education__item glass">
                <div className="education__header">
                  <h3 className="education__qualification">{item.qualification}</h3>
                  <p className="education__period">
                    {item.period || item.location}
                  </p>
                </div>
                <p className="education__institution">{item.institution}</p>
                {item.description && (
                  <p className="education__desc">{item.description}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}