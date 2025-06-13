import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import axios from 'axios';

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Dr. Aarogya AI. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Health-related keywords to check for
    const healthKeywords = [
      'headache', 'fever', 'pain', 'cough', 'cold', 'flu', 'covid', 
      'diabetes', 'blood pressure', 'heart', 'diet', 'nutrition', 
      'exercise', 'sleep', 'stress', 'anxiety', 'depression', 
      'medicine', 'drug', 'vitamin', 'supplement', 'allergy', 
      'asthma', 'breathing', 'stomach', 'digestion', 'skin', 
      'rash', 'joint', 'muscle', 'bone', 'eye', 'ear', 'nose', 
      'throat', 'dental', 'teeth', 'pregnancy', 'cancer', 'tumor',
      'vaccination', 'vaccine', 'immune', 'weight', 'obesity',
      'cholesterol', 'sugar', 'blood', 'urine', 'stool', 'fatigue',
      'tired', 'dizzy', 'nausea', 'vomit', 'diarrhea', 'constipation'
    ];
    
    const userInputLower = input.toLowerCase();
    let isHealthRelated = false;
    
    // Check if input contains any health-related keywords
    for (const keyword of healthKeywords) {
      if (userInputLower.includes(keyword)) {
        isHealthRelated = true;
        break;
      }
    }
    
    // Special case for greetings
    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    const isGreeting = greetings.some(greeting => userInputLower.includes(greeting));
    
    // Special case for thanks
    const thanks = ['thank', 'thanks', 'appreciate', 'grateful'];
    const isThanks = thanks.some(thank => userInputLower.includes(thank));
    
    let botResponse = '';
    
    // Simulate processing delay
    setTimeout(() => {
      if (isGreeting) {
        botResponse = "Hello! I'm Dr. Aarogya AI. I can help with health-related questions. What health concern can I assist you with today?";
      } else if (isThanks) {
        botResponse = "You're welcome! I'm here to help with any health-related questions you may have.";
      } else if (isHealthRelated) {
        // Health-related responses
        if (userInputLower.includes('headache') || userInputLower.includes('head pain')) {
          botResponse = "Headaches can be caused by various factors including stress, dehydration, or lack of sleep. If it's severe or persistent, I recommend consulting with a doctor.";
        } else if (userInputLower.includes('fever') || userInputLower.includes('temperature')) {
          botResponse = "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take over-the-counter fever reducers if needed. If fever persists over 3 days or exceeds 103°F (39.4°C), please seek medical attention.";
        } else if (userInputLower.includes('cold') || userInputLower.includes('flu') || userInputLower.includes('cough')) {
          botResponse = "For cold and flu symptoms, rest and hydration are key. Over-the-counter medications can help manage symptoms. If symptoms worsen or don't improve after a week, consider consulting a healthcare provider.";
        } else if (userInputLower.includes('diet') || userInputLower.includes('nutrition')) {
          botResponse = "A balanced diet rich in fruits, vegetables, whole grains, and lean proteins is essential for good health. Would you like some specific dietary recommendations?";
        } else if (userInputLower.includes('exercise') || userInputLower.includes('workout')) {
          botResponse = "Regular exercise is important for both physical and mental health. Aim for at least 150 minutes of moderate activity per week. What type of exercise are you interested in?";
        } else if (userInputLower.includes('sleep') || userInputLower.includes('insomnia')) {
          botResponse = "Quality sleep is crucial for health. Try to maintain a regular sleep schedule, create a restful environment, and avoid screens before bedtime. If sleep problems persist, consider speaking with a healthcare provider.";
        } else if (userInputLower.includes('stress') || userInputLower.includes('anxiety')) {
          botResponse = "Stress management techniques include deep breathing, meditation, physical activity, and maintaining social connections. If stress is significantly affecting your daily life, professional support can be beneficial.";
        } else if (userInputLower.includes('diabetes') || userInputLower.includes('blood sugar')) {
          botResponse = "Diabetes management involves monitoring blood sugar levels, maintaining a healthy diet, regular exercise, and taking prescribed medications. Regular check-ups with your healthcare provider are essential.";
        } else if (userInputLower.includes('blood pressure') || userInputLower.includes('hypertension')) {
          botResponse = "Managing blood pressure includes reducing sodium intake, regular exercise, maintaining a healthy weight, limiting alcohol, and taking prescribed medications. Regular monitoring is important.";
        } else {
          botResponse = "Based on your health query about " + input + ", I recommend consulting with a healthcare professional for personalized advice. Is there any specific aspect of this health concern you'd like to know more about?";
        }
      } else {
        // Not health-related
        botResponse = "I'm specialized in health-related topics. Could you please ask me something about health, medical conditions, wellness, or lifestyle for better health?";
      }
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3><i className="fas fa-robot"></i> Dr. Aarogya AI Assistant</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your health question..."
        />
        <button onClick={handleSend} disabled={isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatBot;