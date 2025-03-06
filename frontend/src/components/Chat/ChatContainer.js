import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { sendMessage } from '../../services/api';
import './ChatContainer.css';

const ChatContainer = ({ initialProblem = null }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [problemDetails, setProblemDetails] = useState(initialProblem?.details || null);
  const [sessionId] = useState(() => localStorage.getItem('chatSessionId') || uuidv4());
  const [isProblemExpanded, setIsProblemExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  // Save session ID to localStorage
  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId);
  }, [sessionId]);
  
  // Add welcome message for problem if it's provided initially
  useEffect(() => {
    if (initialProblem?.details && messages.length === 0) {
      setProblemDetails(initialProblem.details);
      
      // Add a more specific welcome message that focuses on the problem
      setMessages([
        { 
          role: 'assistant', 
          content: `Let's solve the "${initialProblem.details.title}" problem (${initialProblem.details.difficulty}). 
          
The problem asks: ${initialProblem.details.content.replace(/<[^>]*>/g, '').substring(0, 200)}...

What's your approach to solving this problem?` 
        }
      ]);
    }
  }, [initialProblem, messages.length]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (message) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message immediately for better UX
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Always include problem context with each message
      const problemContext = problemDetails ? 
        `Current problem: ${problemDetails.title} (${problemDetails.difficulty})` : '';
      
      const response = await sendMessage(
        message, 
        initialProblem?.url || null, 
        sessionId,
        problemContext
      );
      
      if (response.success) {
        // Add assistant response
        setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
        
        // Update problem details if available
        if (response.problemDetails && !problemDetails) {
          setProblemDetails(response.problemDetails);
        }
      } else {
        setError('Failed to get response');
      }
    } catch (err) {
      setError('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProblem = () => {
    navigate('/');
  };

  const toggleProblemPanel = () => {
    setIsProblemExpanded(!isProblemExpanded);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="logo-container">
          <div className="brain-icon">🧑🏻‍🏫</div>
          <h1>DSA Problem Solving Coach</h1>
        </div>
        <button onClick={handleChangeProblem} className="change-problem-btn">
          Change Problem
        </button>
      </div>
      
      {problemDetails && (
        <div className="problem-section">
          <div className="problem-header" onClick={toggleProblemPanel}>
            <div className="problem-title-container">
              <h2>{problemDetails.title}</h2>
              <span className={`difficulty ${problemDetails.difficulty.toLowerCase()}`}>
                {problemDetails.difficulty}
              </span>
            </div>
            <div className="expand-icon">{isProblemExpanded ? '▼' : '▶'}</div>
          </div>
          
          <div className={`problem-content ${isProblemExpanded ? 'expanded' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: problemDetails.content }} />
          </div>
        </div>
      )}
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        
        {loading && (
          <div className="loading-message">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatContainer;
