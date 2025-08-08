// src/Components/About.jsx
import React from 'react';
import './PortfolioAbout.css';
import profileImage from '../../assets/wi3.jpeg'; // Replace with your actual image

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <div className="about-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="about-text">
          <h1 id='about'>About Me</h1>
          <p>
            👋 Hey there! I’m Jawahar Sachin — a code crafter, UI artist, and lifelong learner passionate about creating stunning digital experiences.
            I specialize in turning ideas into elegant, user-friendly interfaces and robust web apps. My goal is to build not just websites, but
            products that tell stories and solve real-world problems with clean, efficient code.
            <br /><br />
            🚀 What sets me apart is my energy, attention to detail, and constant curiosity. I thrive on challenge, collaboration, and creativity.
            From front-end flair with React ⚛️ and Tailwind CSS to back-end logic in Node.js 🟢 and MongoDB 🍃, I bring full-stack capabilities and a user-first mindset.
            Let's build something extraordinary — together.
          </p>
          <a href="#cer"><button>See my Works</button></a>
        </div>
      </div>
    </div>
  );
};

export default About;
