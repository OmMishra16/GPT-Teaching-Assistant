import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🧑🏻‍🏫'}
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
