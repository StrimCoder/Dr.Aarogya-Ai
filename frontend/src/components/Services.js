import React from 'react';
import './Services.css';

function Services() {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service-card">
          <div className="service-icon">🩺</div>
          <h3>Symptom Checker</h3>
          <p>Get instant insights about your symptoms and potential health issues.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">📊</div>
          <h3>Health Risk Assessment</h3>
          <p>Evaluate your risk factors for various health conditions.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">💊</div>
          <h3>Medication Reminders</h3>
          <p>Never miss your medications with our smart reminder system.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;