import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      navigate("/thank-you");
    }, 1000);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have a question about our
        products, pricing, or anything else, our team is ready to answer all
        your questions.
      </p>
      <div className="contact-details">
        <div className="contact-item">
          <h3>Email</h3>
          <p>
            <a href="mailto:support@relentlesspursuit.com">
              support@relentlesspursuit.com
            </a>
          </p>
        </div>
        <div className="contact-item">
          <h3>Phone</h3>
          <p>
            <a href="tel:1234567890">(123) 456-7890</a>
          </p>
        </div>
        <div className="contact-item">
          <h3>Address</h3>
          <p>
            123 Activewear St.
            <br />
            Fitness City, FK 12345
          </p>
        </div>
      </div>
      <h2>Send Us a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="contact-submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
