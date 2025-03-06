import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatContainer from './ChatContainer';
import { getProblemDetails } from '../../services/api';
import './ChatPage.css';

const ChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialProblem, setInitialProblem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const problemSlug = params.get('problem');
        
        if (!problemSlug) {
          navigate('/');
          return;
        }
        
        // Clean the slug by removing any query parameters
        const cleanSlug = problemSlug.split('?')[0].split('#')[0];
        console.log(`Fetching details for problem: ${cleanSlug}`);
        
        const details = await getProblemDetails(cleanSlug);
        
        if (details.success) {
          setInitialProblem({
            url: `https://leetcode.com/problems/${cleanSlug}/`,
            details: details.problemDetails
          });
        } else {
          console.error('Failed to load problem details:', details.error);
          setError('Failed to load problem details');
        }
      } catch (err) {
        console.error('Error in fetchProblemDetails:', err);
        setError('Error loading problem');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProblemDetails();
  }, [location.search, navigate]);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading problem details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h2>Error Loading Problem</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }
  
  return <ChatContainer initialProblem={initialProblem} />;
};

export default ChatPage; 