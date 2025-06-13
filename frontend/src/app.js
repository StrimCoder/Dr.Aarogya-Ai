import React, { useState } from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import ChatBotOverlay from './components/ChatBotOverlay';
import HealthProfiles from './components/HealthProfiles';
import SymptomChecker from './components/SymptomChecker';
import HealthRiskAssessment from './components/HealthRiskAssessment';
import MedicationReminders from './components/MedicationReminders';
import WeatherAlerts from './components/WeatherAlerts';
import MedicalImaging from './components/MedicalImaging';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState(false);
  const [isHealthRiskAssessmentOpen, setIsHealthRiskAssessmentOpen] = useState(false);
  const [isMedicationRemindersOpen, setIsMedicationRemindersOpen] = useState(false);
  const [isWeatherAlertsOpen, setIsWeatherAlertsOpen] = useState(false);
  const [isMedicalImagingOpen, setIsMedicalImagingOpen] = useState(false);
  
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-heartbeat pulse-icon"></i> 
          Dr. Aarogya <span className="highlight">AI</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#services"><i className="fas fa-stethoscope"></i> Services</a></li>
          <li><a href="#about"><i className="fas fa-user-md"></i> About</a></li>
          <li><a href="#hospitals"><i className="fas fa-hospital"></i> Hospitals</a></li>
          <li><a href="#profiles"><i className="fas fa-user-circle"></i> Health Profiles</a></li>
          <li><a href="#contact"><i className="fas fa-envelope"></i> Contact</a></li>
        </ul>
      </nav>
      
      <ChatBotOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </ChatBotOverlay>
      
      {isSymptomCheckerOpen && <SymptomChecker isOpen={isSymptomCheckerOpen} onClose={() => setIsSymptomCheckerOpen(false)} />}
      
      {isHealthRiskAssessmentOpen && <HealthRiskAssessment isOpen={isHealthRiskAssessmentOpen} onClose={() => setIsHealthRiskAssessmentOpen(false)} />}
      
      {isMedicationRemindersOpen && <MedicationReminders isOpen={isMedicationRemindersOpen} onClose={() => setIsMedicationRemindersOpen(false)} />}
      
      {isWeatherAlertsOpen && <WeatherAlerts isOpen={isWeatherAlertsOpen} onClose={() => setIsWeatherAlertsOpen(false)} />}
      
      {isMedicalImagingOpen && <MedicalImaging isOpen={isMedicalImagingOpen} onClose={() => setIsMedicalImagingOpen(false)} />}

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to Dr.Aarogya AI</h1>
          <p>Dr.Aarogya AI is a smart, AI-powered health advisory platform, AI-driven healthcare experience right from your browser.</p>
    
        </div>
      </section>
 
      <HealthProfiles />

      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card clickable" onClick={() => setIsSymptomCheckerOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-stethoscope"></i>
            </div>
            <h3>Symptom Checker</h3>
            <p>Get instant insights about your symptoms and potential health issues.</p>
          </div>
          <div className="service-card clickable" onClick={() => setIsHealthRiskAssessmentOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Health Risk Assessment</h3>
            <p>Evaluate your risk factors for various health conditions.</p>
          </div>
          <div className="service-card clickable" onClick={() => setIsMedicationRemindersOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-pills"></i>
            </div>
            <h3>Medication Reminders</h3>
            <p>Never miss your medications with our smart reminder system.</p>
          </div>
          <div className="service-card weather-card clickable" onClick={() => setIsWeatherAlertsOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-cloud-sun"></i>
            </div>
            <h3>AQI & Weather Health Alerts</h3>
            <p>Get real-time air quality and weather alerts with personalized health recommendations.</p>
          </div>
          <div className="service-card medical-imaging-card clickable" onClick={() => setIsMedicalImagingOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-x-ray"></i>
            </div>
            <h3>MRI, X-Ray & CT Analysis</h3>
            <p>AI-powered analysis of medical imaging to detect abnormalities and assist in early diagnosis.</p>
          </div>
          <div className="service-card chatbot-card clickable" onClick={() => setIsChatOpen(true)}>
            <div className="service-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>Healthcare Chatbot</h3>
            <p>24/7 AI-powered chatbot to answer your health questions and provide guidance anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="vision-container">
          <h2>Our Vision</h2>
          <div className="vision-content">
            <div className="vision-text">
              <p>At Dr. Aarogya AI, we envision a world where quality healthcare is accessible to everyone, everywhere. Our mission is to leverage artificial intelligence to democratize healthcare access and empower individuals to take control of their well-being.</p>
              <p>We believe that by combining cutting-edge AI technology with medical expertise, we can provide personalized health insights, early disease detection, and timely interventions that can save lives and improve quality of life.</p>
              <p>Our goal is to bridge the gap between technology and healthcare, making preventive care more accessible and reducing the burden on healthcare systems worldwide.</p>
            </div>
            <div className="vision-image"></div>
          </div>
        </div>

        <h2 className="experts-heading">Our Medical Experts</h2>
        <p className="about-intro">We collaborate with top healthcare specialists to ensure accurate and reliable health insights.</p>
        
        <div className="doctors-container">
          <div className="doctor-card">
            <div className="doctor-img doctor-1"></div>
            <h3>Dr. Priya Sharma</h3>
            <p className="specialty">Cardiologist</p>
            <p>15+ years of experience in treating cardiovascular diseases and conducting research on heart health.</p>
          </div>
          
          <div className="doctor-card">
            <div className="doctor-img doctor-2"></div>
            <h3>Dr. Rajesh Patel</h3>
            <p className="specialty">Endocrinologist</p>
            <p>Expert in diabetes management and hormonal disorders with over 12 years of clinical practice.</p>
          </div>
          
          <div className="doctor-card">
            <div className="doctor-img doctor-3"></div>
            <h3>Dr. Ananya Gupta</h3>
            <p className="specialty">Neurologist</p>
            <p>Specialized in neurological disorders and brain health with extensive research background.</p>
          </div>
        </div>
      </section>

      <section id="hospitals" className="hospitals">
        <h2>Partner Hospitals</h2>
        <p className="hospitals-intro">We've partnered with leading hospitals to provide comprehensive checkups and follow-up care.</p>
        
        <div className="hospitals-container">
          <div className="hospital-card">
            <div className="hospital-img hospital-1"></div>
            <h3>Apollo Hospitals</h3>
            <p>A multi-specialty hospital with state-of-the-art facilities and experienced medical professionals.</p>
            <p className="location">Mumbai, Delhi, Bangalore, Parbhani</p>
          </div>
          
          <div className="hospital-card">
            <div className="hospital-img hospital-2"></div>
            <h3>Fortis Healthcare</h3>
            <p>Comprehensive healthcare services with advanced diagnostic and treatment options.</p>
            <p className="location">Chennai, Kolkata, Pune, A.Nagar</p>
          </div>
          
          <div className="hospital-card">
            <div className="hospital-img hospital-3"></div>
            <h3>Dr.Babasahab Ambedkar Healthcare Hospital</h3>
            <p>Dedicated to providing exceptional patient care with cutting-edge medical technology.</p>
            <p className="location">Delhi NCR, Mohali, Dehradun, Nashik</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p><strong>Email:</strong> Dr. Aarogya Ai@gmail.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Address:</strong> Tech Park, ShivajiNAgar, Pune, Maharastra, India</p>
            <div className="contact-hours">
              <h4>Hours of Operation</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Your Phone Number" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-heartbeat pulse-icon"></i> 
            Dr. Aarogya <span className="highlight">AI</span>
          </div>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <p className="copyright">&copy; 2025 Dr. Aarogya AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;