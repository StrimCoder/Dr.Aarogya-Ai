import React, { useState } from 'react';
import axios from 'axios';

const RiskForm = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/predict-risk', formData);
    setResult(response.data.prediction);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🩺 Dr.Aarogya AI Health Advisor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Check Risk</button>
      </form>

      {result && <h3>Prediction: {result}</h3>}
    </div>
  );
};

export default RiskForm;
