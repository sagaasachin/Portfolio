/**
 * Profile / identity data.
 * All values are taken from the existing portfolio content — edit freely here,
 * the UI reads everything from this file.
 */
export const profile = {
  name: "Jawahar Sachin",
  firstName: "Jawahar",
  lastName: "Sachin",
  initials: "JS",

  // Rotating roles shown in the hero (previously the typewriter texts)
  roles: [
    "Entry Level Developer",
    "Creative UI/UX Designer",
    "Frontend Developer",
  ],

  // Short hero statement
  headline: ["Building digital", "experiences that", "feel alive."],
  eyebrow: "Software Developer / Creative Developer",

  // Verbatim about copy from the previous PortfolioAbout component.
  about: [
    "Hey there! I’m Jawahar Sachin — a code crafter, UI artist, and lifelong learner passionate about creating stunning digital experiences. I specialize in turning ideas into elegant, user-friendly interfaces and robust web apps. My goal is to build not just websites, but products that tell stories and solve real-world problems with clean, efficient code.",
    "What sets me apart is my energy, attention to detail, and constant curiosity. I thrive on challenge, collaboration, and creativity. From front-end flair with React and Tailwind CSS to back-end logic in Node.js and MongoDB, I bring full-stack capabilities and a user-first mindset. Let’s build something extraordinary — together.",
  ],

  // Add these when available — the UI simply hides them while empty.
  location: "",
  email: "",

  avatar: "images/profile/profile.webp",
  aboutImage: "images/profile/about.webp",

  resume: {
    label: "Download CV",
    file: "resume/Jawahar_Sachin_Resume.pdf",
    filename: "Jawahar_Sachin_Resume.pdf",
  },
};

export default profile;
