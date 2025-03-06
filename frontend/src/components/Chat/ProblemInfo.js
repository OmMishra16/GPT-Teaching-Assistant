import React, { useState } from 'react';
import './ProblemInfo.css';

const ProblemInfo = ({ problem }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!problem) return null;
  
  return (
    <div className="problem-info">
      <div className="problem-header">
        <h2>{problem.title}</h2>
        <div className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </div>
      </div>
      
      <div className="problem-topics">
        {problem.topics && problem.topics.map((topic, index) => (
          <span key={index} className="topic-tag">{topic}</span>
        ))}
      </div>
      
      <div className={`problem-content ${expanded ? 'expanded' : ''}`}>
        <div dangerouslySetInnerHTML={{ __html: problem.content }} />
      </div>
      
      <button 
        className="toggle-expand-btn" 
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default ProblemInfo; 