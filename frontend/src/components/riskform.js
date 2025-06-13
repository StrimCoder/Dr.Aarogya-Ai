import React, { useState } from 'react';
import axios from 'axios';
import './riskform.css';

function RiskForm() {
  const [formData, setFormData] = useState({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/predict-risk', formData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Could not get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="risk-form-container">
      <h1>Dr. Aarogya AI Health Risk Assessment</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pregnancies:</label>
          <input 
            type="number" 
            name="Pregnancies" 
            value={formData.Pregnancies} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Glucose (mg/dL):</label>
          <input 
            type="number" 
            name="Glucose" 
            value={formData.Glucose} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Blood Pressure (mm Hg):</label>
          <input 
            type="number" 
            name="BloodPressure" 
            value={formData.BloodPressure} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Skin Thickness (mm):</label>
          <input 
            type="number" 
            name="SkinThickness" 
            value={formData.SkinThickness} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Insulin (μU/ml):</label>
          <input 
            type="number" 
            name="Insulin" 
            value={formData.Insulin} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>BMI:</label>
          <input 
            type="number" 
            name="BMI" 
            value={formData.BMI} 
            onChange={handleChange} 
            required 
            step="0.1"
          />
        </div>
        
        <div className="form-group">
          <label>Diabetes Pedigree Function:</label>
          <input 
            type="number" 
            name="DiabetesPedigreeFunction" 
            value={formData.DiabetesPedigreeFunction} 
            onChange={handleChange} 
            required 
            step="0.001"
          />
        </div>
        
        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="Age" 
            value={formData.Age} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Check Risk'}
        </button>
      </form>
      
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default RiskForm;