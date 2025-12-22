import React, { useState } from "react";
import "./PortfolioCertificate.css";

// logos
import vdart from "../../assets/vdart.svg";
import il from "../../assets/internz-learn.png";
import tn from "../../assets/tn.png";
import guvi from "../../assets/guvi.webp";
import nm from "../../assets/nm.svg";
import nptel from "../../assets/nptel.jpg";
import info from "../../assets/info.webp";
import t4 from "../../assets/logo t4teq.ico";
import sl from "../../assets/sl.jpg";
import online from "../../assets/online.jpg";
import carspare from "../../assets/car spare.jpg";
import ecom from "../../assets/logo1.png";
import todo from "../../assets/todo.jpg";
import weather from "../../assets/weather1.jpg";
import money from "../../assets/moeny.jpg";
import as from "../../assets/logo.jpg";
import skill from "../../assets/skill.jpg";

// certificate images
import vc from "../../assets/certificate/vdart.jpg";
import intc1 from "../../assets/certificate/intern c1.jpg";
import intc from "../../assets/certificate/intern c.jpg";
import infoc from "../../assets/certificate/info c.jpg";
import t4c from "../../assets/certificate/t4c.jpg";
import appc from "../../assets/certificate/app c.jpg";
import t4c1 from "../../assets/certificate/t4c1.jpg";
import npc from "../../assets/certificate/npc.jpg";
import guvic from "../../assets/certificate/guvi c.jpg";
import slc from "../../assets/certificate/sl c.jpg";
import tecc from "../../assets/certificate/tecc.jpg";
import sl1c from "../../assets/certificate/sl 1c.jpg";
import t4mc from "../../assets/certificate/t4mc.jpg";
import t4dc from "../../assets/certificate/t4dc.jpg";

function Certifi() {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const [projectModal, setProjectModal] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  // Certificate modal handlers
  const handleOpenModal = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setOpenModal(false);
  };

  // Project click handler
  const handleProjectClick = (link) => {
    if (!link) {
      setProjectMessage("🚧 Project is in Progress");
      setProjectModal(true);
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const certificates = [
    {
      id: "1",
      title: "View Certificate",
      img: vc,
      p: "Fullstack Developer Intern",
      image: vdart,
    },
    {
      id: "2",
      title: "View Certificate",
      img: intc1,
      p: "Fullstack Developer Intern",
      image: il,
    },
    {
      id: "3",
      title: "View Certificate",
      img: infoc,
      p: "Web Development Training",
      image: info,
    },
    {
      id: "4",
      title: "View Certificate",
      img: t4c1,
      p: "Web Development Intern",
      image: t4,
    },
    {
      id: "5",
      title: "View Certificate",
      img: t4mc,
      p: "MERN Full Stack Development",
      image: t4,
    },

    {
      id: "6",
      title: "View Certificate",
      img: appc,
      p: "App Development",
      image: nm,
    },
    {
      id: "7",
      title: "View Certificate",
      img: intc,
      p: "Web Development Training",
      image: il,
    },
    {
      id: "8",
      title: "View Certificate",
      img: npc,
      p: "Python for Data Science",
      image: nptel,
    },
    {
      id: "9",
      title: "View Certificate",
      img: t4dc,
      p: "Database Develpopment with MongoDB",
      image: t4,
    },
    {
      id: "10",
      title: "View Certificate",
      img: guvic,
      p: "Intro to ChatGPT",
      image: guvi,
    },
    {
      id: "11",
      title: "View Certificate",
      img: slc,
      p: "Python for Beginners",
      image: sl,
    },
    {
      id: "12",
      title: "View Certificate",
      img: tecc,
      p: "Python Development",
      image: tn,
    },
  ];

  const projects = [
    {
      id: "1",
      p: "AURA SOFTWARES",
      image: as,
      link: "https://sagaasachin.github.io/Company/",
    },
    {
      id: "2",
      p: "E-Commerce Website",
      image: ecom,
      link: "https://maanclothing-2.onrender.com/",
    },

    {
      id: "4",
      p: "Auto Spare Parts Website",
      image: carspare,
      link: "https://sagaasachin.github.io/Spares/",
    },
    {
      id: "5",
      p: "Weather WebApp",
      image: weather,
      link: "https://sagaasachin.github.io/Weather/",
    },
    {
      id: "6",
      p: "Skill Gap Analyzer",
      image: skill,
      link: "",
    },

    {
      id: "7",
      p: "Todo WebApp",
      image: todo,
      link: "",
    },
    {
      id: "8",
      p: "Personal Expense Tracker",
      image: money,
      link: "",
    },
    { id: "3", p: "Online Test Platform", image: online, link: "" },
  ];

  return (
    <>
      <div className="Certifi">
        <h1 id="certifi">Earned Certificates</h1>

        <div className="class">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="card-certificate">
              <img src={certificate.image} alt={certificate.p} />
              <p>{certificate.p}</p>
              <h1
                className="popup-trigger"
                onClick={() => handleOpenModal(certificate.img)}
              >
                {certificate.title}
              </h1>
            </div>
          ))}
        </div>

        <h2 id="cer">Projects I Have Done</h2>

        <div className="certificates">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={project.p}
                  className="project-img"
                />
                <div className="project-overlay">
                  <button
                    className="visit-btn"
                    onClick={() => handleProjectClick(project.link)}
                  >
                    {project.link ? "Visit Site" : "In Progress"}
                  </button>
                </div>
              </div>
              <p className="project-title">{project.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            <img
              src={modalImage}
              alt="Certificate Preview"
              className="modal-image"
            />
          </div>
        </div>
      )}

      {/* Project Message Modal */}
      {projectModal && (
        <div className="modal-overlay" onClick={() => setProjectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setProjectModal(false)}>
              &times;
            </span>
            <h2>{projectMessage}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Certifi;
