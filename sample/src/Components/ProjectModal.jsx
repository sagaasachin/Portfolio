import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "../utils/asset.js";
import { FiExternalLink, FiCode, FiX } from "react-icons/fi";
import "./Projects.css";

/**
 * Data-driven project detail modal. Powered by the same `project` object as
 * the card — no duplicated content.
 */
export default function ProjectModal({ project, onClose }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, handleKey]);

  const hasTech = Array.isArray(project?.technologies) && project.technologies.length > 0;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          onClick={onClose}
        >
          <motion.div
            className="project-modal__panel glass"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              className="project-modal__close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <FiX />
            </button>

            <div className="project-modal__media">
              <img
                src={asset(project.image)}
                alt={project.title}
                className="project-modal__image"
              />
              {project.status === "wip" && (
                <span className="badge badge--success project-modal__badge">In Progress</span>
              )}
            </div>

            <div className="project-modal__body">
              {project.category && <p className="project-card__category">{project.category}</p>}
              <h3 className="project-card__title">{project.title}</h3>
              {project.description ? (
                <p className="project-card__description">{project.description}</p>
              ) : (
                <p className="project-card__description project-modal__placeholder">
                  Details for this project have not been added yet — check back soon or reach out.
                </p>
              )}

              {hasTech && (
                <div className="project-card__tech">
                  {project.technologies.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              )}

              <div className="project-modal__actions">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    aria-label={`Visit ${project.title} live site`}
                  >
                    <FiExternalLink /> View Project
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    aria-label={`View ${project.title} source code`}
                  >
                    <FiCode /> View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}