import React, { useState } from 'react';
import './HealthProfiles.css';

function HealthProfiles() {
  const [step, setStep] = useState('login');
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [healthForm, setHealthForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    bloodType: 'O+',
    allergies: '',
    conditions: '',
    bloodPressure: '',
    cholesterol: '',
    glucose: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    setStep('collect-data');
  };

  const handleHealthFormSubmit = (e) => {
    e.preventDefault();
    
    // Process the form data
    const processedData = {
      ...healthForm,
      bmi: calculateBMI(healthForm.height, healthForm.weight),
      allergies: healthForm.allergies.split(',').map(item => item.trim()).filter(item => item),
      conditions: healthForm.conditions.split(',').map(item => item.trim()).filter(item => item),
      // Generate predictions based on input data
      predictions: generatePredictions(healthForm),
      // Generate trends
      trends: {
        bloodPressure: generateTrends('bloodPressure', healthForm.bloodPressure),
        weight: generateTrends('weight', healthForm.weight)
      }
    };
    
    setUserData(processedData);
    setStep('display-profile');
  };

  const calculateBMI = (height, weight) => {
    // Height in cm, weight in kg
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters === 0) {
      return "N/A";
    }
    
    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const generatePredictions = (formData) => {
    // This is a simplified mock prediction generator
    // In a real app, this would use ML models or API calls
    
    const predictions = [];
    const today = new Date();
    
    // Cardiovascular risk based on age, blood pressure
    const age = parseInt(formData.age);
    const bp = formData.bloodPressure.split('/');
    const systolic = bp[0] ? parseInt(bp[0]) : 120;
    const diastolic = bp[1] ? parseInt(bp[1]) : 80;
    
    let cvRiskScore = 0;
    if (age > 50) cvRiskScore += 15;
    if (age > 60) cvRiskScore += 10;
    if (systolic > 140 || diastolic > 90) cvRiskScore += 25;
    
    predictions.push({
      date: today.toISOString().split('T')[0],
      risk: `${cvRiskScore > 30 ? 'Moderate' : 'Low'} risk of cardiovascular disease`,
      score: cvRiskScore
    });
    
    // Diabetes risk based on weight, age, glucose
    let diabetesRiskScore = 0;
    const bmi = calculateBMI(formData.height, formData.weight);
    const glucose = parseInt(formData.glucose) || 100;
    
    if (bmi > 25) diabetesRiskScore += 15;
    if (bmi > 30) diabetesRiskScore += 15;
    if (age > 45) diabetesRiskScore += 10;
    if (glucose > 100) diabetesRiskScore += 20;
    
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    
    predictions.push({
      date: lastMonth.toISOString().split('T')[0],
      risk: `${diabetesRiskScore > 30 ? 'Moderate' : 'Low'} risk of type 2 diabetes`,
      score: diabetesRiskScore
    });
    
    return predictions;
  };

  const generateTrends = (type, currentValue) => {
    // Generate mock trend data based on current value
    const today = new Date();
    const trends = [];
    
    // Add current value
    trends.push({
      date: today.toISOString().split('T')[0],
      value: type === 'bloodPressure' ? currentValue : `${currentValue} kg`
    });
    
    // Add previous values with slight variations
    for (let i = 1; i <= 2; i++) {
      const prevDate = new Date();
      prevDate.setMonth(today.getMonth() - i);
      
      if (type === 'bloodPressure') {
        const bp = currentValue.split('/');
        const systolic = parseInt(bp[0]) || 120;
        const diastolic = parseInt(bp[1]) || 80;
        
        // Add small random variations
        const systolicVar = systolic + Math.floor(Math.random() * 6) - 3;
        const diastolicVar = diastolic + Math.floor(Math.random() * 4) - 2;
        
        trends.push({
          date: prevDate.toISOString().split('T')[0],
          value: `${systolicVar}/${diastolicVar}`
        });
      } else if (type === 'weight') {
        const weight = parseFloat(currentValue);
        // Add small random variations to weight
        const weightVar = (weight + (Math.random() * 2 - 1)).toFixed(1);
        
        trends.push({
          date: prevDate.toISOString().split('T')[0],
          value: `${weightVar} kg`
        });
      }
    }
    
    return trends;
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'login') {
      setLoginForm(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (formType === 'health') {
      setHealthForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Render login screen
  const renderLogin = () => {
    return (
      <div className="login-container">
        <h3>Login to Access Your Health Profile</h3>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={loginForm.email} 
              onChange={(e) => handleInputChange(e, 'login')} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={loginForm.password} 
              onChange={(e) => handleInputChange(e, 'login')} 
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-help">
          Don't have an account? <a href="#signup">Sign up</a> | <a href="#forgot">Forgot password?</a>
        </p>
      </div>
    );
  };

  // Render health data collection form
  const renderHealthForm = () => {
    return (
      <div className="health-form-container">
        <form onSubmit={handleHealthFormSubmit} className="health-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={healthForm.name} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  min="1" 
                  max="120" 
                  value={healthForm.age} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={healthForm.gender} 
                  onChange={(e) => handleInputChange(e, 'health')}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bloodType">Blood Type</label>
                <select 
                  id="bloodType" 
                  name="bloodType" 
                  value={healthForm.bloodType} 
                  onChange={(e) => handleInputChange(e, 'health')}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Body Measurements</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input 
                  type="number" 
                  id="height" 
                  name="height" 
                  min="50" 
                  max="250" 
                  value={healthForm.height} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight" 
                  min="1" 
                  max="300" 
                  step="0.1" 
                  value={healthForm.weight} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Health Indicators</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bloodPressure">Blood Pressure (systolic/diastolic)</label>
                <input 
                  type="text" 
                  id="bloodPressure" 
                  name="bloodPressure" 
                  placeholder="120/80" 
                  value={healthForm.bloodPressure} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="glucose">Glucose (mg/dL)</label>
                <input 
                  type="number" 
                  id="glucose" 
                  name="glucose" 
                  min="50" 
                  max="300" 
                  value={healthForm.glucose} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cholesterol">Cholesterol (mg/dL)</label>
                <input 
                  type="number" 
                  id="cholesterol" 
                  name="cholesterol" 
                  min="50" 
                  max="300" 
                  value={healthForm.cholesterol} 
                  onChange={(e) => handleInputChange(e, 'health')} 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="form-group">
              <label htmlFor="allergies">Allergies (comma separated)</label>
              <input 
                type="text" 
                id="allergies" 
                name="allergies" 
                placeholder="Peanuts, Penicillin, etc." 
                value={healthForm.allergies} 
                onChange={(e) => handleInputChange(e, 'health')} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="conditions">Medical Conditions (comma separated)</label>
              <input 
                type="text" 
                id="conditions" 
                name="conditions" 
                placeholder="Hypertension, Asthma, etc." 
                value={healthForm.conditions} 
                onChange={(e) => handleInputChange(e, 'health')} 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-button">Generate Health Profile</button>
        </form>
      </div>
    );
  };

  // Render profile with the collected data
  const renderProfile = () => {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-info">
            <h3>{userData.name}</h3>
            <p>{userData.age} years • {userData.gender} • {userData.bloodType}</p>
          </div>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'predictions' ? 'active' : ''} 
            onClick={() => setActiveTab('predictions')}
          >
            Risk Predictions
          </button>
          <button 
            className={activeTab === 'trends' ? 'active' : ''} 
            onClick={() => setActiveTab('trends')}
          >
            Health Trends
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Height</h4>
                  <p>{userData.height} cm</p>
                </div>
                <div className="metric-card">
                  <h4>Weight</h4>
                  <p>{userData.weight} kg</p>
                </div>
                <div className="metric-card">
                  <h4>BMI</h4>
                  <p>{userData.bmi}</p>
                </div>
                <div className="metric-card">
                  <h4>Blood Type</h4>
                  <p>{userData.bloodType}</p>
                </div>
              </div>
              
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Blood Pressure</h4>
                  <p>{userData.bloodPressure}</p>
                </div>
                <div className="metric-card">
                  <h4>Glucose</h4>
                  <p>{userData.glucose} mg/dL</p>
                </div>
                <div className="metric-card">
                  <h4>Cholesterol</h4>
                  <p>{userData.cholesterol} mg/dL</p>
                </div>
              </div>
              
              <div className="health-section">
                <h4>Allergies</h4>
                {userData.allergies.length > 0 ? (
                  <ul className="tag-list">
                    {userData.allergies.map((allergy, index) => (
                      <li key={index} className="tag">{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No allergies reported</p>
                )}
              </div>
              
              <div className="health-section">
                <h4>Medical Conditions</h4>
                {userData.conditions.length > 0 ? (
                  <ul className="tag-list">
                    {userData.conditions.map((condition, index) => (
                      <li key={index} className="tag">{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No medical conditions reported</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'predictions' && (
            <div className="predictions-tab">
              <h3>Your Health Risk Predictions</h3>
              <div className="predictions-list">
                {userData.predictions.map((prediction, index) => (
                  <div key={index} className="prediction-card">
                    <div className="prediction-date">{prediction.date}</div>
                    <div className="prediction-risk">{prediction.risk}</div>
                    <div className="risk-meter">
                      <div 
                        className="risk-level" 
                        style={{
                          width: `${prediction.score}%`,
                          backgroundColor: prediction.score < 30 ? '#2ecc71' : 
                                          prediction.score < 70 ? '#f39c12' : '#e74c3c'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'trends' && (
            <div className="trends-tab">
              <h3>Your Health Trends</h3>
              
              <div className="trend-section">
                <h4>Blood Pressure</h4>
                <div className="trend-data">
                  {userData.trends.bloodPressure.map((item, index) => (
                    <div key={index} className="trend-point">
                      <div className="trend-date">{item.date}</div>
                      <div className="trend-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="trend-section">
                <h4>Weight</h4>
                <div className="trend-data">
                  {userData.trends.weight.map((item, index) => (
                    <div key={index} className="trend-point">
                      <div className="trend-date">{item.date}</div>
                      <div className="trend-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="profiles" className="health-profiles">
      <h2>User Health Profiles</h2>
      <p className="section-description">
        Secure health records and prediction history for each user, offering insights and trend analysis over time.
      </p>
      
      {step === 'login' && renderLogin()}
      {step === 'collect-data' && renderHealthForm()}
      {step === 'display-profile' && userData && renderProfile()}
    </section>
  );
}

export default HealthProfiles;