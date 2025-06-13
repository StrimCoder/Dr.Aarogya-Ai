import React, { useState } from 'react';
import './MedicationReminders.css';

function MedicationReminders({ isOpen, onClose }) {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({
      ...newMedication,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const medication = {
      ...newMedication,
      id: Date.now()
    };
    setMedications([...medications, medication]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: '',
      notes: ''
    });
  };

  const handleDelete = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="medication-reminders-container">
      <div className="reminders-header">
        <h1>Medication Reminders</h1>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <p className="reminders-intro">
        Never miss your medications with our smart reminder system. Add your medications below and we'll help you stay on track.
      </p>
      
      <div className="reminders-content">
        <div className="add-medication">
          <h2>Add New Medication</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Medication Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={newMedication.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dosage">Dosage</label>
                <input 
                  type="text" 
                  id="dosage" 
                  name="dosage" 
                  value={newMedication.dosage} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., 10mg"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select 
                  id="frequency" 
                  name="frequency" 
                  value={newMedication.frequency} 
                  onChange={handleChange}
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="three-times-daily">Three Times Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={newMedication.time} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={newMedication.notes} 
                onChange={handleChange} 
                placeholder="Additional instructions (e.g., take with food)"
              ></textarea>
            </div>
            
            <button type="submit" className="add-button">Add Medication</button>
          </form>
        </div>
        
        <div className="medications-list">
          <h2>Your Medications</h2>
          {medications.length === 0 ? (
            <p className="no-medications">No medications added yet.</p>
          ) : (
            <div className="medications">
              {medications.map(med => (
                <div key={med.id} className="medication-card">
                  <div className="medication-header">
                    <h3>{med.name}</h3>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(med.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="medication-details">
                    <p><strong>Dosage:</strong> {med.dosage}</p>
                    <p><strong>Frequency:</strong> {med.frequency.replace('-', ' ')}</p>
                    <p><strong>Time:</strong> {med.time}</p>
                    {med.notes && <p><strong>Notes:</strong> {med.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicationReminders;