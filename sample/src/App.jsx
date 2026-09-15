import React, { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Journey from "./components/Journey.jsx";
import Certifications from "./components/Certifications.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/UI/CustomCursor.jsx";
import { initLenis, destroyLenis } from "./utils/scroll.js";

function App() {
  const [ready, setReady] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    initLenis();
    return destroyLenis;
  }, []);

  return (
    <div className={`app ${ready ? "app--ready" : ""}`}>
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Journey />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </div>
  );
}

export default App;