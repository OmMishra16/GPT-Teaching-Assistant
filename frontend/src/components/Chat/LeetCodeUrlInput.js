import React, { useState } from 'react';
import { validateLeetCodeUrl } from '../../services/api';

const LeetCodeUrlInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await validateLeetCodeUrl(url);
      if (response.success && response.isValid) {
        onSubmit(url);
      } else {
        setError('Please enter a valid LeetCode problem URL');
      }
    } catch (err) {
      setError('Error validating URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="leetcode-input">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter LeetCode problem URL..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !url.trim()}>
        Start
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default LeetCodeUrlInput;
