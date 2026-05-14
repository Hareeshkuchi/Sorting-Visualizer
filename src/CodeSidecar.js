import React from 'react';
import { pseudocodes } from './pseudocodes';

const CodeSidecar = ({ algorithm, currentLine }) => {
  const pseudocode = pseudocodes[algorithm] || pseudocodes.bubbleSort;

  return (
    <div className="code-sidecar">
      <h3 className="code-title">Algorithm Steps</h3>
      
      <div className="code-lines">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`code-line ${index === currentLine ? 'active' : ''}`}
          >
            <span className="code-line-number">{index + 1}.</span>
            {line}
          </div>
        ))}
      </div>

      <div className="code-info">
        <p>Current step: <span className="code-step">{currentLine + 1}</span> / {pseudocode.length}</p>
      </div>
    </div>
  );
};

export default CodeSidecar;
