import React, { useState } from 'react';
import axios from 'axios';
import './HealthRiskAssessment.css';

function HealthRiskAssessment({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    cholesterolTotal: '',
    cholesterolHDL: '',
    cholesterolLDL: '',
    smokingStatus: 'never',
    diabetesStatus: 'no',
    familyHistoryHeartDisease: 'no',
    physicalActivity: 'low',
    diet: 'average'
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      // Height in meters (convert from cm)
      const heightInMeters = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      }
    }
    return 'N/A';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Calculate BMI
    const bmi = calculateBMI();
    
    // Prepare data for submission
    const assessmentData = {
      ...formData,
      bmi
    };
    
    try {
      // In a real application, this would call your backend API
      // const response = await axios.post('http://localhost:8000/health-risk-assessment', assessmentData);
      // setResult(response.data);
      
      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        const mockResult = generateMockResult(assessmentData);
        setResult(mockResult);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        error: 'Could not process your health risk assessment. Please try again later.'
      });
      setLoading(false);
    }
  };
  
  // Generate mock results for demonstration
  const generateMockResult = (data) => {
    const risks = {};
    
    // Calculate heart disease risk (simplified mock calculation)
    let heartRisk = 0;
    
    // Age factor
    const age = parseInt(data.age);
    if (age > 50) heartRisk += 15;
    else if (age > 40) heartRisk += 10;
    else if (age > 30) heartRisk += 5;
    
    // Blood pressure factor
    const systolic = parseInt(data.bloodPressureSystolic);
    if (systolic > 140) heartRisk += 15;
    else if (systolic > 120) heartRisk += 10;
    
    // Cholesterol factor
    const totalChol = parseInt(data.cholesterolTotal);
    if (totalChol > 240) heartRisk += 15;
    else if (totalChol > 200) heartRisk += 10;
    
    // Smoking factor
    if (data.smokingStatus === 'current') heartRisk += 20;
    else if (data.smokingStatus === 'former') heartRisk += 10;
    
    // Family history factor
    if (data.familyHistoryHeartDisease === 'yes') heartRisk += 15;
    
    // BMI factor
    const bmi = parseFloat(data.bmi);
    if (bmi > 30) heartRisk += 15;
    else if (bmi > 25) heartRisk += 10;
    
    // Diabetes factor
    if (data.diabetesStatus === 'yes') heartRisk += 15;
    
    // Cap the risk at 100%
    heartRisk = Math.min(heartRisk, 100);
    
    // Diabetes risk (simplified mock calculation)
    let diabetesRisk = 0;
    
    // Age factor
    if (age > 45) diabetesRisk += 10;
    
    // BMI factor
    if (bmi > 30) diabetesRisk += 20;
    else if (bmi > 25) diabetesRisk += 10;
    
    // Family history implied
    if (data.diabetesStatus === 'yes') diabetesRisk += 10;
    
    // Physical activity
    if (data.physicalActivity === 'low') diabetesRisk += 10;
    
    // Cap the risk at 100%
    diabetesRisk = Math.min(diabetesRisk, 100);
    
    return {
      bmi: data.bmi,
      bmiCategory: getBMICategory(bmi),
      risks: {
        heartDisease: {
          risk: heartRisk,
          category: getRiskCategory(heartRisk),
          recommendations: getHeartRecommendations(heartRisk, data)
        },
        diabetes: {
          risk: diabetesRisk,
          category: getRiskCategory(diabetesRisk),
          recommendations: getDiabetesRecommendations(diabetesRisk, data)
        }
      }
    };
  };
  
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  const getRiskCategory = (risk) => {
    if (risk < 20) return 'Low';
    if (risk < 50) return 'Moderate';
    if (risk < 75) return 'High';
    return 'Very High';
  };
  
  const getHeartRecommendations = (risk, data) => {
    const recommendations = [];
    
    if (risk >= 20) {
      recommendations.push('Schedule a check-up with your healthcare provider to discuss your heart health.');
    }
    
    if (parseInt(data.bloodPressureSystolic) > 120 || parseInt(data.bloodPressureDiastolic) > 80) {
      recommendations.push('Monitor your blood pressure regularly.');
    }
    
    if (parseInt(data.cholesterolTotal) > 200) {
      recommendations.push('Consider getting your cholesterol levels checked more frequently.');
    }
    
    if (data.smokingStatus === 'current') {
      recommendations.push('Quitting smoking can significantly reduce your heart disease risk.');
    }
    
    if (parseFloat(data.bmi) > 25) {
      recommendations.push('Maintaining a healthy weight can improve your heart health.');
    }
    
    if (data.physicalActivity === 'low') {
      recommendations.push('Aim for at least 150 minutes of moderate exercise per week.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining your healthy lifestyle.');
    }
    
    return recommendations;
  };
  
  const getDiabetesRecommendations = (risk, data) => {
    const recommendations = [];
    
    if (risk >= 20) {
      recommendations.push('Consider getting screened for diabetes or prediabetes.');
    }
    
    if (parseFloat(data.bmi) > 25) {
      recommendations.push('Losing 5-7% of your body weight can reduce diabetes risk significantly.');
    }
    
    if (data.physicalActivity === 'low') {
      recommendations.push('Regular physical activity helps improve insulin sensitivity.');
    }
    
    if (data.diet === 'poor' || data.diet === 'average') {
      recommendations.push('Focus on a diet rich in vegetables, fruits, whole grains, and lean proteins.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining your healthy lifestyle.');
    }
    
    return recommendations;
  };

  if (!isOpen) return null;

  return (
    <div className="health-risk-assessment-container">
      <div className="assessment-header">
        <h1>Health Risk Assessment</h1>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <p className="assessment-intro">
        Evaluate your risk factors for various health conditions. This assessment helps identify potential health risks
        and provides personalized recommendations to improve your well-being.
      </p>
      
      {!result ? (
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  required 
                  min="18"
                  max="120"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input 
                  type="number" 
                  id="height" 
                  name="height" 
                  value={formData.height} 
                  onChange={handleChange} 
                  required 
                  min="100"
                  max="250"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight" 
                  value={formData.weight} 
                  onChange={handleChange} 
                  required 
                  min="30"
                  max="300"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Health Metrics</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bloodPressureSystolic">Blood Pressure - Systolic (mmHg)</label>
                <input 
                  type="number" 
                  id="bloodPressureSystolic" 
                  name="bloodPressureSystolic" 
                  value={formData.bloodPressureSystolic} 
                  onChange={handleChange} 
                  required 
                  min="70"
                  max="250"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bloodPressureDiastolic">Blood Pressure - Diastolic (mmHg)</label>
                <input 
                  type="number" 
                  id="bloodPressureDiastolic" 
                  name="bloodPressureDiastolic" 
                  value={formData.bloodPressureDiastolic} 
                  onChange={handleChange} 
                  required 
                  min="40"
                  max="150"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cholesterolTotal">Total Cholesterol (mg/dL)</label>
                <input 
                  type="number" 
                  id="cholesterolTotal" 
                  name="cholesterolTotal" 
                  value={formData.cholesterolTotal} 
                  onChange={handleChange} 
                  required 
                  min="100"
                  max="400"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cholesterolHDL">HDL Cholesterol (mg/dL)</label>
                <input 
                  type="number" 
                  id="cholesterolHDL" 
                  name="cholesterolHDL" 
                  value={formData.cholesterolHDL} 
                  onChange={handleChange} 
                  required 
                  min="20"
                  max="100"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cholesterolLDL">LDL Cholesterol (mg/dL)</label>
                <input 
                  type="number" 
                  id="cholesterolLDL" 
                  name="cholesterolLDL" 
                  value={formData.cholesterolLDL} 
                  onChange={handleChange} 
                  required 
                  min="40"
                  max="300"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Lifestyle & Medical History</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="smokingStatus">Smoking Status</label>
                <select 
                  id="smokingStatus" 
                  name="smokingStatus" 
                  value={formData.smokingStatus} 
                  onChange={handleChange} 
                  required
                >
                  <option value="never">Never Smoked</option>
                  <option value="former">Former Smoker</option>
                  <option value="current">Current Smoker</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="diabetesStatus">Diabetes Status</label>
                <select 
                  id="diabetesStatus" 
                  name="diabetesStatus" 
                  value={formData.diabetesStatus} 
                  onChange={handleChange} 
                  required
                >
                  <option value="no">No Diabetes</option>
                  <option value="prediabetes">Prediabetes</option>
                  <option value="yes">Diabetes</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="familyHistoryHeartDisease">Family History of Heart Disease</label>
                <select 
                  id="familyHistoryHeartDisease" 
                  name="familyHistoryHeartDisease" 
                  value={formData.familyHistoryHeartDisease} 
                  onChange={handleChange} 
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="physicalActivity">Physical Activity Level</label>
                <select 
                  id="physicalActivity" 
                  name="physicalActivity" 
                  value={formData.physicalActivity} 
                  onChange={handleChange} 
                  required
                >
                  <option value="low">Low (Less than 30 min/week)</option>
                  <option value="moderate">Moderate (30-150 min/week)</option>
                  <option value="high">High (150+ min/week)</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="diet">Diet Quality</label>
                <select 
                  id="diet" 
                  name="diet" 
                  value={formData.diet} 
                  onChange={handleChange} 
                  required
                >
                  <option value="poor">Poor (High in processed foods)</option>
                  <option value="average">Average (Mixed diet)</option>
                  <option value="good">Good (Mostly whole foods)</option>
                  <option value="excellent">Excellent (Balanced, whole foods)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Processing...' : 'Evaluate My Health Risks'}
            </button>
          </div>
        </form>
      ) : (
        <div className="assessment-results">
          <h2>Your Health Assessment Results</h2>
          
          <div className="result-section">
            <h3>Body Mass Index (BMI)</h3>
            <div className="result-card">
              <div className="result-value">{result.bmi}</div>
              <div className="result-label">{result.bmiCategory}</div>
            </div>
          </div>
          
          <div className="result-section">
            <h3>Heart Disease Risk</h3>
            <div className={`result-card risk-${result.risks.heartDisease.category.toLowerCase()}`}>
              <div className="result-value">{result.risks.heartDisease.risk}%</div>
              <div className="result-label">{result.risks.heartDisease.category} Risk</div>
            </div>
            
            <div className="recommendations">
              <h4>Recommendations:</h4>
              <ul>
                {result.risks.heartDisease.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="result-section">
            <h3>Diabetes Risk</h3>
            <div className={`result-card risk-${result.risks.diabetes.category.toLowerCase()}`}>
              <div className="result-value">{result.risks.diabetes.risk}%</div>
              <div className="result-label">{result.risks.diabetes.category} Risk</div>
            </div>
            
            <div className="recommendations">
              <h4>Recommendations:</h4>
              <ul>
                {result.risks.diabetes.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="disclaimer">
            <p><strong>Disclaimer:</strong> This assessment provides an estimate of your health risks based on the information you provided. 
            It is not a medical diagnosis. Please consult with a healthcare professional for a comprehensive evaluation.</p>
          </div>
          
          <button 
            className="reset-button"
            onClick={() => setResult(null)}
          >
            Take Assessment Again
          </button>
        </div>
      )}
    </div>
  );
}

export default HealthRiskAssessment;