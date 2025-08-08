import React from 'react';
import Nav from '../Nav';
import Social from '../social';
import '../Nav.css';
import './PortfolioHeader.css';
import a from '../../assets/Jawahar Sachin.jpg';
// import b from '../../assets/pro2.jpg';
import Typewriter from 'react-typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
      <div className="header">
      <h1 id='nav'> <Nav /></h1> 

        {/* Contact Icon */}
        <a href="#cont" className="contact-icon">
          <FontAwesomeIcon icon={faCommentDots} className="chat-icon" />
        </a>

        <h1 id="me">I'm Jawahar Sachin</h1>

        <Typewriter
          textStyle={{
            fontFamily: 'Georgia',
            color: 'wheat',
            fontSize: '28px',
            marginTop: '10px',
            textAlign: 'center'
          }}
          startDelay={100}
          cursorColor="yellow"
          multiText={[
            "Entry Level Developer 💻",
            "Creative UI/UX Designer 🎨",
            "Frontend Developer 🚀"
          ]}
          multiTextDelay={1500}
          typeSpeed={80}
          multiTextLoop
        />

        <img id="naan" src={a} alt="Jawahar Sachin" />

        <div className="soc">
          <Social />
        </div>

        <div className="cv">
          <h1 id="cv">To know about me!!</h1>
          <a
            href="/Jawahar Sachin_resume.pdf"
            download="Jawahar Sachin_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1>Download CV</h1>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
