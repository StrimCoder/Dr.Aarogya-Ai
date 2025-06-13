import React, { useState } from 'react';
import './MedicalImaging.css';

function MedicalImaging({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageType, setImageType] = useState('xray');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleTypeChange = (e) => {
    setImageType(e.target.value);
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const mockResults = getMockResults(imageType);
      setResult(mockResults);
      setAnalyzing(false);
    }, 2000);
  };

  const getMockResults = (type) => {
    switch (type) {
      case 'xray':
        return {
          findings: [
            { area: 'Lungs', observation: 'No significant abnormalities detected', confidence: 92 },
            { area: 'Heart', observation: 'Normal cardiac silhouette', confidence: 95 },
            { area: 'Bones', observation: 'No fractures or lesions detected', confidence: 90 }
          ],
          conclusion: 'No significant pathological findings. Normal chest X-ray.',
          recommendations: 'No further imaging studies recommended at this time.'
        };
      case 'mri':
        return {
          findings: [
            { area: 'Brain Tissue', observation: 'Normal brain parenchyma', confidence: 94 },
            { area: 'Ventricles', observation: 'Normal size and configuration', confidence: 96 },
            { area: 'Blood Vessels', observation: 'No vascular abnormalities detected', confidence: 91 }
          ],
          conclusion: 'Normal brain MRI without evidence of acute pathology.',
          recommendations: 'No follow-up imaging required.'
        };
      case 'ct':
        return {
          findings: [
            { area: 'Liver', observation: 'Normal size and density', confidence: 93 },
            { area: 'Spleen', observation: 'Normal appearance', confidence: 95 },
            { area: 'Kidneys', observation: 'Bilateral kidneys appear normal', confidence: 92 }
          ],
          conclusion: 'Normal abdominal CT scan without evidence of pathology.',
          recommendations: 'No further imaging studies recommended at this time.'
        };
      default:
        return {
          findings: [],
          conclusion: 'Unable to analyze image.',
          recommendations: 'Please consult with a healthcare professional.'
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="medical-imaging-container">
      <div className="imaging-header">
        <h1>Medical Imaging Analysis</h1>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <p className="imaging-intro">
        Upload your medical images for AI-powered analysis to detect abnormalities and assist in early diagnosis.
        Our system can analyze X-rays, MRIs, and CT scans.
      </p>
      
      <div className="imaging-content">
        <div className="upload-section">
          <h2>Upload Medical Image</h2>
          
          <div className="form-group">
            <label htmlFor="imageType">Select Image Type</label>
            <select 
              id="imageType" 
              value={imageType} 
              onChange={handleTypeChange}
            >
              <option value="xray">X-Ray</option>
              <option value="mri">MRI</option>
              <option value="ct">CT Scan</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="imageUpload">Upload Image (JPEG or PNG)</label>
            <input 
              type="file" 
              id="imageUpload" 
              accept="image/jpeg, image/png" 
              onChange={handleFileChange} 
            />
          </div>
          
          {previewUrl && (
            <div className="image-preview">
              <h3>Image Preview</h3>
              <img src={previewUrl} alt="Medical scan preview" />
            </div>
          )}
          
          <button 
            className="analyze-button" 
            onClick={handleAnalyze} 
            disabled={!selectedFile || analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
        
        {result && (
          <div className="results-section">
            <h2>Analysis Results</h2>
            
            <div className="findings">
              <h3>Findings</h3>
              <table className="findings-table">
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Observation</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {result.findings.map((finding, index) => (
                    <tr key={index}>
                      <td>{finding.area}</td>
                      <td>{finding.observation}</td>
                      <td>{finding.confidence}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="conclusion">
              <h3>Conclusion</h3>
              <p>{result.conclusion}</p>
            </div>
            
            <div className="recommendations">
              <h3>Recommendations</h3>
              <p>{result.recommendations}</p>
            </div>
            
            <div className="disclaimer">
              <p><strong>Disclaimer:</strong> This analysis is provided by an AI system and is not a substitute for professional medical diagnosis. 
              Please consult with a healthcare professional for proper interpretation of medical images and diagnosis.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalImaging;