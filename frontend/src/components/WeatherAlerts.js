import React, { useState, useEffect } from 'react';
import './WeatherAlerts.css';

function WeatherAlerts({ isOpen, onClose }) {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherAndAQI = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call with mock data
    setTimeout(() => {
      try {
        const mockWeatherData = getMockWeatherData(location);
        const mockAqiData = getMockAQIData(location);
        
        setWeatherData(mockWeatherData);
        setAqiData(mockAqiData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    }, 1500);
  };

  const getMockWeatherData = (location) => {
    // Generate random weather data based on location
    const temp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    const humidity = Math.floor(Math.random() * 50) + 30; // 30-80%
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: location || 'Mumbai',
      temperature: temp,
      humidity: humidity,
      condition: condition,
      forecast: [
        { day: 'Today', temp: temp, condition: condition },
        { day: 'Tomorrow', temp: temp + Math.floor(Math.random() * 5) - 2, condition: conditions[Math.floor(Math.random() * conditions.length)] },
        { day: 'Day 3', temp: temp + Math.floor(Math.random() * 5) - 2, condition: conditions[Math.floor(Math.random() * conditions.length)] }
      ]
    };
  };

  const getMockAQIData = (location) => {
    // Generate random AQI data
    const aqiValue = Math.floor(Math.random() * 300) + 20; // 20-320
    let category, color, healthImplications, precautions;
    
    if (aqiValue <= 50) {
      category = 'Good';
      color = '#009966';
      healthImplications = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
      precautions = 'None needed. Enjoy outdoor activities.';
    } else if (aqiValue <= 100) {
      category = 'Moderate';
      color = '#ffde33';
      healthImplications = 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
      precautions = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.';
    } else if (aqiValue <= 150) {
      category = 'Unhealthy for Sensitive Groups';
      color = '#ff9933';
      healthImplications = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
      precautions = 'People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion.';
    } else if (aqiValue <= 200) {
      category = 'Unhealthy';
      color = '#cc0033';
      healthImplications = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
      precautions = 'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.';
    } else if (aqiValue <= 300) {
      category = 'Very Unhealthy';
      color = '#660099';
      healthImplications = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
      precautions = 'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.';
    } else {
      category = 'Hazardous';
      color = '#7e0023';
      healthImplications = 'Health alert: everyone may experience more serious health effects.';
      precautions = 'Everyone should avoid all outdoor exertion.';
    }
    
    return {
      location: location || 'Mumbai',
      aqi: aqiValue,
      category: category,
      color: color,
      healthImplications: healthImplications,
      precautions: precautions,
      pollutants: {
        pm25: Math.floor(Math.random() * 100) + 5,
        pm10: Math.floor(Math.random() * 150) + 10,
        o3: Math.floor(Math.random() * 80) + 5,
        no2: Math.floor(Math.random() * 60) + 5,
        so2: Math.floor(Math.random() * 40) + 2,
        co: (Math.random() * 9 + 0.5).toFixed(1)
      }
    };
  };

  const getHealthRecommendations = () => {
    if (!aqiData) return [];
    
    const recommendations = [];
    const aqi = aqiData.aqi;
    const temp = weatherData?.temperature || 0;
    
    // AQI-based recommendations
    if (aqi > 150) {
      recommendations.push('Wear a mask when going outside to reduce exposure to pollutants.');
      recommendations.push('Consider using an air purifier at home.');
    }
    if (aqi > 100) {
      recommendations.push('Limit outdoor physical activities, especially during peak traffic hours.');
    }
    
    // Temperature-based recommendations
    if (temp > 30) {
      recommendations.push('Stay hydrated and drink plenty of water.');
      recommendations.push('Avoid direct sun exposure during peak hours (10 AM - 4 PM).');
    } else if (temp < 15) {
      recommendations.push('Dress in layers to stay warm.');
      recommendations.push('Protect extremities with gloves and warm socks in cold weather.');
    }
    
    // Combined recommendations
    if (aqi > 100 && temp > 25) {
      recommendations.push('Consider indoor exercises instead of outdoor activities.');
    }
    
    if (weatherData?.condition === 'Rainy' || weatherData?.condition === 'Stormy') {
      recommendations.push('Carry an umbrella and avoid areas prone to waterlogging.');
    }
    
    return recommendations;
  };

  if (!isOpen) return null;

  return (
    <div className="weather-alerts-container">
      <div className="alerts-header">
        <h1>AQI & Weather Health Alerts</h1>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <p className="alerts-intro">
        Get real-time air quality and weather alerts with personalized health recommendations based on your location.
      </p>
      
      <div className="location-form">
        <form onSubmit={fetchWeatherAndAQI}>
          <div className="form-group">
            <label htmlFor="location">Enter Your Location</label>
            <div className="location-input">
              <input 
                type="text" 
                id="location" 
                value={location} 
                onChange={handleLocationChange} 
                placeholder="Enter city name (e.g., Mumbai)"
                required 
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Get Alerts'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {weatherData && aqiData && (
        <div className="alerts-content">
          <div className="weather-section">
            <h2>Weather Information</h2>
            <div className="weather-card">
              <div className="weather-header">
                <div className="weather-location">{weatherData.location}</div>
                <div className="weather-condition">{weatherData.condition}</div>
              </div>
              <div className="weather-details">
                <div className="weather-temp">
                  <span className="temp-value">{weatherData.temperature}°C</span>
                </div>
                <div className="weather-info">
                  <div className="weather-humidity">
                    <span className="label">Humidity:</span> {weatherData.humidity}%
                  </div>
                </div>
              </div>
              <div className="weather-forecast">
                <h3>3-Day Forecast</h3>
                <div className="forecast-container">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="day-name">{day.day}</div>
                      <div className="day-condition">{day.condition}</div>
                      <div className="day-temp">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="aqi-section">
            <h2>Air Quality Index</h2>
            <div className="aqi-card" style={{ borderColor: aqiData.color }}>
              <div className="aqi-header">
                <div className="aqi-location">{aqiData.location}</div>
                <div className="aqi-value" style={{ backgroundColor: aqiData.color }}>
                  {aqiData.aqi}
                </div>
              </div>
              <div className="aqi-category" style={{ color: aqiData.color }}>
                {aqiData.category}
              </div>
              <div className="aqi-implications">
                <h4>Health Implications:</h4>
                <p>{aqiData.healthImplications}</p>
              </div>
              <div className="aqi-precautions">
                <h4>Precautions:</h4>
                <p>{aqiData.precautions}</p>
              </div>
              <div className="pollutants">
                <h4>Major Pollutants:</h4>
                <div className="pollutants-grid">
                  <div className="pollutant">
                    <span className="pollutant-name">PM2.5</span>
                    <span className="pollutant-value">{aqiData.pollutants.pm25} µg/m³</span>
                  </div>
                  <div className="pollutant">
                    <span className="pollutant-name">PM10</span>
                    <span className="pollutant-value">{aqiData.pollutants.pm10} µg/m³</span>
                  </div>
                  <div className="pollutant">
                    <span className="pollutant-name">O₃</span>
                    <span className="pollutant-value">{aqiData.pollutants.o3} ppb</span>
                  </div>
                  <div className="pollutant">
                    <span className="pollutant-name">NO₂</span>
                    <span className="pollutant-value">{aqiData.pollutants.no2} ppb</span>
                  </div>
                  <div className="pollutant">
                    <span className="pollutant-name">SO₂</span>
                    <span className="pollutant-value">{aqiData.pollutants.so2} ppb</span>
                  </div>
                  <div className="pollutant">
                    <span className="pollutant-name">CO</span>
                    <span className="pollutant-value">{aqiData.pollutants.co} ppm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="health-recommendations">
            <h2>Personalized Health Recommendations</h2>
            <ul className="recommendations-list">
              {getHealthRecommendations().map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherAlerts;