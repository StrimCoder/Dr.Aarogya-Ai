import React, { useState } from 'react';
import ChatBot from './ChatBot';
import './ChatbotButton.css';

function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button 
        className={`chatbot-toggle-button ${isChatOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chatbot"
      >
        <i className={`fas ${isChatOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default ChatbotButton;