import React from 'react';

const Visualizer = ({ array, indices, comparingIndices, sortedIndices }) => {
  const getBarClass = (index) => {
    let className = 'bar ';
    if (sortedIndices.includes(index)) {
      className += 'bar-sorted';
    } else if (comparingIndices.includes(index)) {
      className += 'bar-comparing';
    } else if (indices.includes(index)) {
      className += 'bar-active';
    } else {
      className += 'bar-default';
    }
    return className;
  };

  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);

  return (
    <div className="visualizer">
      <h2 className="visualizer-title">Sorting Visualization</h2>
      
      <div className="visualizer-canvas">
        {array.map((value, index) => {
          const normalizedHeight = ((value - minValue) / (maxValue - minValue || 1)) * 100;
          
          return (
            <div
              key={index}
              className={getBarClass(index)}
              style={{
                height: `${Math.max(normalizedHeight, 5)}%`,
                opacity: sortedIndices.includes(index) ? 0.8 : 1,
              }}
              title={`Value: ${value}`}
            />
          );
        })}
      </div>
      
      <div className="color-legend">
        <div className="legend-item">
          <div className="legend-color bar-default"></div>
          <span>Default</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bar-comparing"></div>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bar-active"></div>
          <span>Active</span>
        </div>
        <div className="legend-item">
          <div className="legend-color bar-sorted"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
