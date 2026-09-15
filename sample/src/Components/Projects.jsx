import React, { useState } from "react";
import Reveal from "./UI/Reveal.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";
import { projects } from "../data/projects.js";
import "./Projects.css";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="projects section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <Reveal>
          <div className="projects__header">
            <div className="projects__label">
              <span className="projects__label-dot" />
              <span>PROJECTS</span>
            </div>
            <h2 className="projects__title" id="projects-heading">
              Selected Work
            </h2>
            <p className="projects__subtitle">
              A collection of live web applications, company platforms, and interactive software products.
            </p>
          </div>
        </Reveal>

        {/* Premium Editorial Showcase with Continuous Alternating Layouts */}
        <div className="projects__showcase">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.05 * (i % 2)}>
              <ProjectCard
                project={project}
                index={i}
                isReverse={i % 2 !== 0}
                onOpen={setSelected}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}