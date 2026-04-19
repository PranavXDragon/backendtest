import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrors({});

    try {
      const response = await axios.post('/api/contacts', formData);
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: response.data.message
        });
        setFormData({ name: '', email: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus(null);
        }, 5000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMap = {};
        error.response.data.errors.forEach(err => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
      }
      
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit contact form'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form">
        <h1>📬 Contact Us</h1>
        <p className="subtitle">We'd love to hear from you! Send us a message.</p>

        {status && (
          <div className={`alert alert-${status.type}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows="5"
              className={errors.message ? 'input-error' : ''}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Sending... ⏳' : 'Send Message ✉️'}
          </button>
        </form>

        <div className="info-box">
          <h3>💡 Database Connection Info</h3>
          <p>✅ Connected to MongoDB Atlas</p>
          <p>📊 Database: T (appName)</p>
          <p>🔗 All messages are saved securely</p>
        </div>
      </div>
    </div>
  );
}
