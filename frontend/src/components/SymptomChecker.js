import React, { useState } from 'react';
import './SymptomChecker.css';

function SymptomChecker({ isOpen, onClose }) {
  const [step, setStep] = useState('symptoms');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Common symptoms list
  const commonSymptoms = [
    { id: 1, name: 'Fever', category: 'General' },
    { id: 2, name: 'Headache', category: 'Head' },
    { id: 3, name: 'Cough', category: 'Respiratory' },
    { id: 4, name: 'Sore Throat', category: 'Respiratory' },
    { id: 5, name: 'Fatigue', category: 'General' },
    { id: 6, name: 'Shortness of Breath', category: 'Respiratory' },
    { id: 7, name: 'Chest Pain', category: 'Chest' },
    { id: 8, name: 'Abdominal Pain', category: 'Abdominal' },
    { id: 9, name: 'Nausea', category: 'Digestive' },
    { id: 10, name: 'Vomiting', category: 'Digestive' },
    { id: 11, name: 'Diarrhea', category: 'Digestive' },
    { id: 12, name: 'Constipation', category: 'Digestive' },
    { id: 13, name: 'Dizziness', category: 'Neurological' },
    { id: 14, name: 'Rash', category: 'Skin' },
    { id: 15, name: 'Joint Pain', category: 'Musculoskeletal' },
    { id: 16, name: 'Muscle Pain', category: 'Musculoskeletal' },
    { id: 17, name: 'Back Pain', category: 'Musculoskeletal' },
    { id: 18, name: 'Runny Nose', category: 'Respiratory' },
    { id: 19, name: 'Nasal Congestion', category: 'Respiratory' },
    { id: 20, name: 'Sneezing', category: 'Respiratory' }
  ];

  // Predefined conditions based on symptom combinations
  const conditions = {
    'Common Cold': {
      symptoms: ['Cough', 'Sore Throat', 'Runny Nose', 'Nasal Congestion', 'Sneezing'],
      description: 'A viral infection of the upper respiratory tract.',
      severity: 'Mild',
      recommendations: [
        'Rest and stay hydrated',
        'Over-the-counter cold medications may help relieve symptoms',
        'Use a humidifier to ease congestion',
        'Consult a doctor if symptoms persist beyond 10 days'
      ]
    },
    'Influenza (Flu)': {
      symptoms: ['Fever', 'Headache', 'Fatigue', 'Cough', 'Sore Throat', 'Muscle Pain'],
      description: 'A contagious respiratory illness caused by influenza viruses.',
      severity: 'Moderate',
      recommendations: [
        'Rest and stay hydrated',
        'Take over-the-counter pain relievers for fever and aches',
        'Stay home to avoid spreading the virus',
        'Consult a doctor if symptoms are severe or you are in a high-risk group'
      ]
    },
    'COVID-19': {
      symptoms: ['Fever', 'Cough', 'Shortness of Breath', 'Fatigue', 'Headache', 'Sore Throat', 'Loss of Taste or Smell'],
      description: 'A respiratory illness caused by the SARS-CoV-2 virus.',
      severity: 'Moderate to Severe',
      recommendations: [
        'Get tested for COVID-19',
        'Isolate yourself from others',
        'Monitor your symptoms closely',
        'Seek immediate medical attention if you experience severe symptoms'
      ]
    },
    'Gastroenteritis': {
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal Pain'],
      description: 'Inflammation of the stomach and intestines, typically resulting from a viral or bacterial infection.',
      severity: 'Mild to Moderate',
      recommendations: [
        'Stay hydrated with clear fluids',
        'Eat bland, easy-to-digest foods when you can tolerate them',
        'Rest and avoid dairy products',
        'Seek medical attention if symptoms persist beyond 3 days or if you become dehydrated'
      ]
    },
    'Migraine': {
      symptoms: ['Headache', 'Nausea', 'Dizziness'],
      description: 'A neurological condition characterized by severe, recurring headaches.',
      severity: 'Moderate',
      recommendations: [
        'Rest in a quiet, dark room',
        'Apply cold compresses to your forehead',
        'Take over-the-counter pain relievers',
        'Consult a doctor for recurring migraines'
      ]
    },
    'Allergic Reaction': {
      symptoms: ['Rash', 'Sneezing', 'Runny Nose', 'Nasal Congestion'],
      description: 'An immune system response to a substance that the body mistakenly identifies as harmful.',
      severity: 'Mild to Severe',
      recommendations: [
        'Avoid the allergen if known',
        'Take antihistamines for mild symptoms',
        'Seek immediate medical attention for severe reactions, especially if breathing is affected'
      ]
    }
  };

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    // Calculate potential conditions based on selected symptoms
    const potentialConditions = [];
    
    for (const [condition, data] of Object.entries(conditions)) {
      // Count how many symptoms match
      const matchingSymptoms = selectedSymptoms.filter(s => 
        data.symptoms.includes(s)
      );
      
      // Calculate match percentage
      const matchPercentage = (matchingSymptoms.length / data.symptoms.length) * 100;
      
      // If at least 40% of the condition's symptoms are present, consider it
      if (matchPercentage >= 40) {
        potentialConditions.push({
          name: condition,
          matchPercentage: Math.round(matchPercentage),
          ...data
        });
      }
    }
    
    // Sort by match percentage (highest first)
    potentialConditions.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    setResults({
      conditions: potentialConditions,
      selectedSymptoms
    });
    
    setStep('results');
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setResults(null);
    setStep('symptoms');
    setSearchTerm('');
  };

  const filteredSymptoms = commonSymptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group symptoms by category
  const groupedSymptoms = {};
  filteredSymptoms.forEach(symptom => {
    if (!groupedSymptoms[symptom.category]) {
      groupedSymptoms[symptom.category] = [];
    }
    groupedSymptoms[symptom.category].push(symptom);
  });

  if (!isOpen) return null;

  return (
    <div className="symptom-checker-overlay">
      <div className="symptom-checker-container">
        <div className="symptom-checker-header">
          <h2>Symptom Checker</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {step === 'symptoms' && (
          <div className="symptom-selection">
            <p className="instruction">Select all symptoms you're experiencing:</p>
            
            <div className="search-container">
              <input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="symptom-search"
              />
            </div>
            
            <div className="selected-symptoms">
              {selectedSymptoms.length > 0 ? (
                <>
                  <h3>Selected Symptoms:</h3>
                  <div className="selected-symptoms-list">
                    {selectedSymptoms.map(symptom => (
                      <div key={symptom} className="selected-symptom">
                        {symptom}
                        <button onClick={() => toggleSymptom(symptom)}>×</button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="no-symptoms">No symptoms selected yet</p>
              )}
            </div>
            
            <div className="symptoms-list">
              {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
                <div key={category} className="symptom-category">
                  <h3>{category}</h3>
                  <div className="category-symptoms">
                    {symptoms.map(symptom => (
                      <div
                        key={symptom.id}
                        className={`symptom-item ${selectedSymptoms.includes(symptom.name) ? 'selected' : ''}`}
                        onClick={() => toggleSymptom(symptom.name)}
                      >
                        {symptom.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="action-buttons">
              <button 
                className="analyze-button"
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0}
              >
                Analyze Symptoms
              </button>
            </div>
          </div>
        )}
        
        {step === 'results' && results && (
          <div className="results-container">
            <h3>Analysis Results</h3>
            
            <div className="symptoms-summary">
              <h4>Based on your symptoms:</h4>
              <div className="selected-symptoms-list">
                {results.selectedSymptoms.map(symptom => (
                  <div key={symptom} className="selected-symptom">
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
            
            {results.conditions.length > 0 ? (
              <div className="potential-conditions">
                <h4>Potential Conditions:</h4>
                
                {results.conditions.map((condition, index) => (
                  <div key={index} className="condition-card">
                    <div className="condition-header">
                      <h3>{condition.name}</h3>
                      <div className="match-percentage">
                        <div className="percentage-bar">
                          <div 
                            className="percentage-fill"
                            style={{ width: `${condition.matchPercentage}%` }}
                          ></div>
                        </div>
                        <span>{condition.matchPercentage}% match</span>
                      </div>
                    </div>
                    
                    <div className="condition-details">
                      <p className="condition-description">{condition.description}</p>
                      <p className="condition-severity">
                        <strong>Severity:</strong> {condition.severity}
                      </p>
                      
                      <div className="recommendations">
                        <h4>Recommendations:</h4>
                        <ul>
                          {condition.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-matches">
                <p>No potential conditions match your symptoms.</p>
                <p>Please consult with a healthcare professional for proper diagnosis.</p>
              </div>
            )}
            
            <div className="disclaimer">
              <p><strong>Disclaimer:</strong> This symptom checker provides general information only and should not be used for diagnosis or treatment decisions. Always consult with a qualified healthcare provider.</p>
            </div>
            
            <div className="action-buttons">
              <button className="reset-button" onClick={resetChecker}>
                Check Different Symptoms
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;