// ContactPage.jsx
import React, { useState } from 'react';
import './PortfolioContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_key: "37d02e0d-a0ac-47e2-89cb-94d011abfe63", // Replace with your actual access key from Web3Forms
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus("There was an error sending your message.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="contact-section" id="cont">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Feel free to share your thoughts</p>

        {status && <p className="status-message">{status}</p>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>

          <div className="contact-button">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
