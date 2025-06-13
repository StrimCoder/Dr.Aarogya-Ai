import React from 'react';
import './ChatBotOverlay.css';

function ChatBotOverlay({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="chatbot-overlay">
      <div className="chatbot-overlay-content">
        {children}
      </div>
    </div>
  );
}

export default ChatBotOverlay;