/**
 * PROJECT DATA — single source of truth for the Projects section.
 *
 * Schema:
 *   id           unique string            (required)
 *   title        project name             (required)
 *   description  short summary            (optional — hidden while empty)
 *   image        path under public/       (e.g. "images/projects/todo.webp")
 *   technologies string[]                 (optional — hidden while empty)
 *   category     short label              (optional)
 *   github       repository URL           (optional — button hidden if empty)
 *   live         deployed URL             (optional — button hidden if empty)
 *   featured     boolean                  (highlighted / larger card)
 *   status       "live" | "wip"           ("wip" shows an "In progress" badge)
 */
export const projects = [
  {
    id: "c2dtech",
    title: "C2D Tech",
    description: "High-performance platform for full-stack web engineering, mobile apps, and AI automation built with Next.js 15, React, TypeScript, Node.js, and Tailwind CSS.",
    image: "images/projects/c2dtech.png",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    category: "Web Application",
    github: "",
    live: "https://www.c2dtech.com",
    featured: true,
    status: "live",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    description: "Modern e-commerce platform with dynamic product listings, shopping cart functionality, and responsive checkout.",
    image: "images/projects/ecommerce.webp",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "Web Application",
    github: "",
    live: "https://maanclothing-2.onrender.com/",
    featured: true,
    status: "live",
  },
  {
    id: "weather",
    title: "Weather Web App",
    description: "Real-time weather tracking application providing instant forecasts, atmospheric conditions, and location search.",
    image: "images/projects/weather.webp",
    technologies: ["JavaScript", "HTML5", "CSS3", "Weather API"],
    category: "Web Application",
    github: "",
    live: "https://sagaasachin.github.io/Weather/",
    featured: true,
    status: "live",
  },
  {
    id: "skillytics",
    title: "Skillytics",
    description: "Skill evaluation and tech gap analyzer platform empowering developers to evaluate skills and track learning progression.",
    image: "images/projects/skill-gap-analyzer.webp",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    category: "Web Application",
    github: "",
    live: "https://sagaasachin.github.io/SKILLYTICS/",
    featured: true,
    status: "live",
  },
  {
    id: "todo",
    title: "Todo Web App",
    description: "Task management dashboard with real-time state tracking, filtering, and productivity workflows.",
    image: "images/projects/todo.webp",
    technologies: ["React", "JavaScript", "CSS3"],
    category: "Web Application",
    github: "",
    live: "",
    featured: false,
    status: "wip",
  },
  {
    id: "expense-tracker",
    title: "Personal Expense Tracker",
    description: "Financial planning tool to monitor spending habits, categorize transactions, and visualize monthly budgets.",
    image: "images/projects/expense-tracker.webp",
    technologies: ["React", "Chart.js", "JavaScript"],
    category: "Web Application",
    github: "",
    live: "",
    featured: false,
    status: "wip",
  },
  {
    id: "auto-spare-parts",
    title: "Auto Spare Parts Website",
    description: "E-commerce portal for automotive spare parts with categorized catalog search and direct inquiry options.",
    image: "images/projects/auto-spare-parts.webp",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Website",
    github: "",
    live: "https://sagaasachin.github.io/Spares/",
    featured: true,
    status: "live",
  },
];

export default projects;
