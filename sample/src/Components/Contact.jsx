import React, { useState } from "react";
import Reveal from "./UI/Reveal.jsx";
import SocialIcon from "./UI/SocialIcon.jsx";
import { profile } from "../data/profile.js";
import { socials } from "../data/socials.js";
import {
  FiMail,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";
import "./Contact.css";

const FORM_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "37d02e0d-a0ac-47e2-89cb-94d011abfe63";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!FORM_ACCESS_KEY) {
      setStatus({
        ok: false,
        text: "Contact form configuration pending — please reach out via email or LinkedIn.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ ok: true, text: "Message delivered successfully. Thank you!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          ok: false,
          text: "Unable to send message right now. Please try again or reach out via email.",
        });
      }
    } catch {
      setStatus({
        ok: false,
        text: "Network connection error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        {/* LEFT COLUMN: EDITORIAL HEADING, SUBTITLE & REFINED ROW LIST */}
        <Reveal className="contact__left-col">
          <div className="contact__header">
            <div className="contact__label-group">
              <span className="contact__label-dot" />
              <span className="contact__label-text">CONTACT</span>
            </div>

            <h2 className="contact__title" id="contact-heading">
              Let's build something together.
            </h2>

            <p className="contact__subtitle">
              Have a software engineering opportunity, a web project, or looking for a full-stack developer?
              My inbox is open for new roles, collaborations, and inquiries.
            </p>

            {/* PRIMARY CTA BUTTON */}
            <div className="contact__cta-wrapper">
              <a
                href={profile.email ? `mailto:${profile.email}` : "#contact-form"}
                className="contact__cta-btn"
              >
                <span>GET IN TOUCH</span>
                <FiArrowUpRight className="contact__cta-icon" />
              </a>
            </div>
          </div>

          {/* EDITORIAL REFINED CONTACT ROWS LIST */}
          <div className="contact__list-container">
            <span className="contact__list-heading">DIRECT CHANNELS &amp; SOCIALS</span>
            <div className="contact__rows">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__row-item"
                  aria-label={`Open ${s.label}`}
                >
                  <div className="contact__row-left">
                    <div className="contact__row-icon">
                      <SocialIcon icon={s.icon} size={18} />
                    </div>
                    <div className="contact__row-meta">
                      <span className="contact__row-label">{s.label}</span>
                      <span className="contact__row-value">
                        {s.id === "whatsapp" ? "+91 73975 78509" : s.label}
                      </span>
                    </div>
                  </div>
                  <FiArrowUpRight className="contact__row-arrow" />
                </a>
              ))}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="contact__row-item"
                  aria-label="Send email to Jawahar Sachin"
                >
                  <div className="contact__row-left">
                    <div className="contact__row-icon">
                      <FiMail size={18} />
                    </div>
                    <div className="contact__row-meta">
                      <span className="contact__row-label">EMAIL</span>
                      <span className="contact__row-value">{profile.email}</span>
                    </div>
                  </div>
                  <FiArrowUpRight className="contact__row-arrow" />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        {/* RIGHT COLUMN: WEB3FORMS INTERACTIVE CONTACT FORM */}
        <Reveal delay={0.12} className="contact__right-col">
          <div className="contact__form-card" id="contact-form">
            <div className="contact__form-header">
              <span className="contact__form-badge">DIRECT MESSAGE</span>
              <h3 className="contact__form-title">Send a Message</h3>
              <p className="contact__form-subtitle">
                Fill in your details below and I'll respond within 24 hours.
              </p>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  required
                />
              </div>

              {status && (
                <div
                  className={`contact__status ${
                    status.ok ? "contact__status--ok" : "contact__status--err"
                  }`}
                  role="status"
                >
                  {status.ok ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>{status.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="contact__submit-btn"
                disabled={submitting}
              >
                <span>{submitting ? "SENDING…" : "SEND MESSAGE"}</span>
                <FiSend className="contact__submit-icon" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}