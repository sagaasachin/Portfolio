import React from "react";
import { asset } from "../utils/asset.js";
import { FiArrowUpRight, FiCode } from "react-icons/fi";
import "./Projects.css";

/**
 * Premium Editorial Project Card Component
 * Restrained Black + Gold theme with alternating split layout.
 */
export default function ProjectCard({ project, index, isReverse, onOpen }) {
  const hasDescription = Boolean(project.description);
  const hasTech = Array.isArray(project.technologies) && project.technologies.length > 0;
  const isWIP = project.status === "wip";
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`project-card ${isReverse ? "project-card--reverse" : ""}`}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
          e.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open project details for ${project.title}`}
    >
      {/* Editorial Text Content Column */}
      <div className="project-card__text">
        <div className="project-card__meta">
          <span className="project-card__number">{numStr}</span>
          {project.category && (
            <span className="project-card__category">{project.category}</span>
          )}
          {isWIP && (
            <span className="badge badge--success">In Progress</span>
          )}
        </div>

        <h3 className="project-card__title">{project.title}</h3>

        {hasDescription && (
          <p className="project-card__description">{project.description}</p>
        )}

        {hasTech && (
          <div className="project-card__tech">
            {project.technologies.map((t) => (
              <span key={t} className="project-card__tech-tag">{t}</span>
            ))}
          </div>
        )}

        <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`Visit ${project.title} live site`}
            >
              <span>VIEW PROJECT</span>
              <FiArrowUpRight className="project-card__link-icon" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`View ${project.title} source code`}
            >
              <FiCode />
              <span>VIEW CODE</span>
              <FiArrowUpRight className="project-card__link-icon" />
            </a>
          )}
          {!project.live && !project.github && (
            <span className="project-card__placeholder">
              Details on request
            </span>
          )}
        </div>
      </div>

      {/* Framed Image Showcase Visual Column */}
      <div className="project-card__visual-frame">
        <img
          src={asset(project.image)}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__visual-overlay" aria-hidden="true" />
      </div>
    </article>
  );
}