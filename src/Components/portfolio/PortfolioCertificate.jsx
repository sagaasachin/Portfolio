import React, { useState } from 'react';
import './PortfolioCertificate.css';
import vdart from '../../assets/vdart.svg'
import il from '../../assets/internz-learn.png'
import tn from '../../assets/tn.png'
import guvi from '../../assets/guvi.webp'
import nm from '../../assets/nm.svg'
import nptel from '../../assets/nptel.jpg'
import info from '../../assets/info.webp'
import t4 from '../../assets/t4.png'
import sl from '../../assets/sl.jpg'
import online from '../../assets/online.jpg'
import carspare from '../../assets/car spare.jpg'
import ecom from '../../assets/e commerece.jpg'
import insta from '../../assets/insta.jpg'
import webdev1 from '../../assets/webdev1.jpg'

//certificate images
import vc from '../../assets/certificate/vdart.jpg'
import intc1 from '../../assets/certificate/intern c1.jpg'
import intc from '../../assets/certificate/intern c.jpg'
import infoc from '../../assets/certificate/info c.jpg'
import t4c from '../../assets/certificate/t4c.jpg'
import appc from '../../assets/certificate/app c.jpg'
import t4c1 from '../../assets/certificate/t4c1.jpg'
import npc from '../../assets/certificate/npc.jpg'
import guvic from '../../assets/certificate/guvi c.jpg'
import slc from '../../assets/certificate/sl c.jpg'
import tecc from '../../assets/certificate/tecc.jpg'

function Certifi() {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleOpenModal = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setOpenModal(false);
  };

  const certificates = [
    { id: '1', title: 'View Certificate', img: vc, p: 'Fullstack developer intern', image: vdart },
    { id: '2', title: 'View Certificate', img: intc1, p: 'Fullstack developer intern', image: il },
    { id: '3', title: 'View Certificate', img: infoc, p: 'web development training', image: info },
    { id: '4', title: 'View Certificate', img: t4c1, p: 'Web Development Intern', image: t4 },
    { id: '5', title: 'View Certificate', img: appc, p: 'App development', image: nm },
    { id: '6', title: 'View Certificate', img: t4c, p: 'Frontend Development', image: t4 },
    { id: '7', title: 'View Certificate', img: intc, p: 'web development training', image: il },
    { id: '8', title: 'View Certificate', img: npc, p: 'Python for Data Science', image: nptel },
    { id: '9', title: 'View Certificate', img: guvic, p: 'Intro to ChatGPT', image: guvi },
    { id: '10', title: 'View Certificate', img: slc, p: 'Python for Beginners', image: sl },
    { id: '11', title: 'View Certificate', img: tecc, p: 'Python Development', image: tn },
  ];

  const projects = [
    { id: '5', p: 'Web Development', image: webdev1, link: 'https://sagaasachin.github.io/Company/' },
    { id: '1', p: 'Online Test Platform', image: online, link: 'https://example.com/test-platform' },
    { id: '2', p: 'Autospare Parts Website', image: carspare, link: 'https://sagaasachin.github.io/Spares/' },
    { id: '3', p: 'E-commerce Website', image: ecom, link: 'https://example.com/ecommerce' },
    { id: '4', p: 'Instagram Clone', image: insta, link: 'https://example.com/instaclone' },
  ];

  const certificateCards = certificates.map((certificate) => (
    <div key={certificate.id} className="card-certificate">
      <img src={certificate.image} alt={certificate.p} />
      <p>{certificate.p}</p>
      <h1 onClick={() => handleOpenModal(certificate.img)} className="popup-trigger">
        {certificate.title}
      </h1>
    </div>
  ));

  const projectCards = projects.map((project) => (
    <div key={project.id} className="project-card">
      <div className="project-img-wrapper">
        <img src={project.image} alt={project.p} className="project-img" />
        <div className="project-overlay">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="visit-btn">
            Visit Site
          </a>
        </div>
      </div>
      <p className="project-title">{project.p}</p>
    </div>
  ));

  return (
    <>
      <div className="Certifi">
        <h1 id="certifi">Earned Certificates</h1>
        <div className="class">
          {certificateCards}
        </div>

        <h2 id="cer">Projects I Have Done</h2>
        <div className="certificates">
          {projectCards}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <img src={modalImage} alt="Certificate Preview" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default Certifi;
