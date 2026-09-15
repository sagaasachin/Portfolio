/**
 * SKILLS & TECHNOLOGIES DATA
 *
 * Single source of truth for the Skills / Technologies section.
 *
 * Field reference:
 *   id           unique string                (required)
 *   name         technology display name       (required)
 *   category     "frontend"|"backend"|"database"|"programming" (required)
 *   icon         path under public/           (required)
 *   description  short technical summary      (optional)
 *   featured     boolean highlight flag       (optional)
 */

export const skillCategories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "programming", label: "Programming" },
];

export const skills = [
  {
    id: "html",
    name: "HTML5",
    category: "frontend",
    icon: "images/skills/html.webp",
    description: "Semantic markup, accessibility & structured document architecture.",
    featured: false,
  },
  {
    id: "css",
    name: "CSS3",
    category: "frontend",
    icon: "images/skills/css.webp",
    description: "Responsive layouts, Flexbox, Grid & modern visual styling systems.",
    featured: false,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    icon: "images/skills/javascript.webp",
    description: "ES6+ syntax, asynchronous programming & DOM manipulation.",
    featured: true,
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    icon: "images/skills/react.webp",
    description: "Component-driven development, state management & single-page apps.",
    featured: true,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    icon: "images/skills/nodejs.webp",
    description: "Server-side JavaScript runtime, REST API creation & middleware.",
    featured: true,
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    icon: "images/skills/express.webp",
    description: "Lightweight web application framework for API routes & backend services.",
    featured: false,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    icon: "images/skills/mongodb.webp",
    description: "NoSQL document database design, CRUD operations & schema modeling.",
    featured: false,
  },
  {
    id: "python",
    name: "Python",
    category: "programming",
    icon: "images/skills/python.webp",
    description: "Core programming logic, data structures & data science fundamentals.",
    featured: true,
  },
];

export default skills;
