import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLeetCodeUrl } from '../../services/api';
import './LandingPage.css';

const LandingPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Extract problem slug from URL
      const urlMatch = url.match(/leetcode\.com\/problems\/([^\s/?]+)/);
      if (!urlMatch) {
        setError('Please enter a valid LeetCode problem URL');
        setLoading(false);
        return;
      }

      const problemSlug = urlMatch[1];
      navigate(`/chat?problem=${problemSlug}`);
    } catch (err) {
      setError('Error processing URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="logo-container">
          <div className="logo">🧑🏻‍🏫</div>
          <h1>DSA Problem Solving Coach</h1>
        </div>
        
        <p className="landing-description">
          Get step-by-step guidance on solving data structures and algorithms problems.
          Enter a LeetCode problem URL to begin.
        </p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://leetcode.com/problems/two-sum/"
            disabled={loading}
            className="url-input"
          />
          <button type="submit" disabled={loading || !url.trim()} className="submit-button">
            {loading ? 'Loading...' : 'Start Coaching'}
          </button>
        </form>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">📝</div>
            <h3>Guided Learning</h3>
            <p>Step-by-step assistance without giving away the solution</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💡</div>
            <h3>Concept Clarification</h3>
            <p>Clear explanations of algorithms and data structures</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Interactive Coaching</h3>
            <p>Ask questions and get personalized guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 