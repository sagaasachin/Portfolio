/**
 * EXPERIENCE DATA — Single Source of Truth
 *
 * Each entry represents an internship/role from Jawahar Sachin's portfolio.
 *
 * Schema:
 *   id            unique string                    (required)
 *   role          job title string                 (required)
 *   company       organization name                (required)
 *   logo          path under public/               (optional — e.g. "images/cert-logos/vdart.svg")
 *   startDate     YYYY-MM date string              (optional)
 *   endDate       YYYY-MM or "Present"             (optional)
 *   current       boolean                          (optional)
 *   location      city/type string                 (optional)
 *   description   summary of responsibilities      (optional)
 *   technologies  string[] of tools used           (optional)
 *   certificate   { title: string, url: string }   (optional — shows button only if present)
 */

export const experience = [
  {
    id: "vdart",
    role: "Fullstack Developer Intern",
    company: "VDart",
    type: "Internship",
    logo: "images/cert-logos/vdart.svg",
    startDate: "2024-01",
    endDate: "2024-06",
    current: false,
    location: "Trichy",
    description: "Developed full-stack web features, built responsive React component interfaces, integrated API endpoints, and optimized database queries.",
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "CSS3"],
    certificate: {
      title: "VDart Fullstack Internship Certificate",
      url: "images/certificates/vdart.webp",
    },
  },
  {
    id: "internz-learn",
    role: "Fullstack Developer Intern",
    company: "Internz Learn",
    type: "Internship",
    logo: "images/cert-logos/intern-learn.webp",
    startDate: "2023-08",
    endDate: "2023-11",
    current: false,
    location: "Remote",
    description: "Built interactive web application modules, improved front-end user experience workflows, and collaborated on full-stack web projects.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
    certificate: {
      title: "Internz Learn Fullstack Certificate",
      url: "images/certificates/intern-learn-fullstack-a.webp",
    },
  },
  {
    id: "t4teq",
    role: "Web Development Intern",
    company: "T4Teq",
    type: "Internship",
    logo: "images/cert-logos/t4teq.webp",
    startDate: "2023-03",
    endDate: "2023-06",
    current: false,
    location: "Trichy",
    description: "Created structured web pages, designed UI components, and gained practical experience in full-stack MERN technologies.",
    technologies: ["HTML5", "CSS3", "JavaScript", "MongoDB"],
    certificate: {
      title: "T4Teq Web Development Certificate",
      url: "images/certificates/t4teq-web-intern.webp",
    },
  },
];

export default experience;
