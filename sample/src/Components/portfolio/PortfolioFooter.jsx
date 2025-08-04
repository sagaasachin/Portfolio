import React from 'react';
import './PortfolioFooter.css';
// import Social from '../social';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {fainstagram } from '@fortawesome/free-solid-svg-icons'
import { faInstagram,faWhatsapp,faFacebook,faLinkedinIn,faGithub} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          © {new Date().getFullYear()} Jawahar Sachin. All Rights Reserved.
        </p>
        <div className="footer-links">
                  <a href="https://www.instagram.com/sachin_272_/ "target='self'><FontAwesomeIcon icon={faInstagram} size="2xl" color='rgb(247, 234, 59)' /></a>
                  <a href="https://wa.me/917397578509" target='self'><FontAwesomeIcon icon={faWhatsapp} size="2xl" color='rgb(247, 234, 59)' /></a>
                  <a href="https://www.facebook.com/sachin0304"><FontAwesomeIcon icon={faFacebook} size="2xl" color='rgb(247, 234, 59)' /></a>
                  <a href="https://www.linkedin.com/in/jawaharsachin0304/ "><FontAwesomeIcon icon={faLinkedinIn} size="2xl" color='rgb(247, 234, 59)'/></a> 
                  <a href="https://github.com/sagaasachin" target='self'><FontAwesomeIcon icon={faGithub} size="2xl" color='rgb(247, 234, 59)' /></a> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
