import React, { useState } from 'react';

const ControlPanel = ({
  arraySize,
  setArraySize,
  animationSpeed,
  setAnimationSpeed,
  algorithm,
  setAlgorithm,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onGenerateArray,
  onInputArray,
  currentStep,
  totalSteps,
}) => {
  const [csvInput, setCsvInput] = useState('');

  const handleCsvInput = () => {
    try {
      const numbers = csvInput
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));

      if (numbers.length > 0) {
        onInputArray(numbers);
        setCsvInput('');
      }
    } catch (error) {
      alert('Invalid input format. Please enter comma-separated numbers.');
    }
  };

  return (
    <div className="control-panel">
      {/* Algorithm Selection */}
      <div className="control-group">
        <label className="control-label">Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isPlaying}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="heapSort">Heap Sort</option>
          <option value="shellSort">Shell Sort</option>
          <option value="countingSort">Counting Sort</option>
          <option value="radixSort">Radix Sort</option>
          <option value="bucketSort">Bucket Sort</option>
          <option value="timsort">Timsort</option>
          <option value="introsort">Introsort</option>
        </select>
      </div>

      {/* Array Size Slider */}
      <div className="control-group">
        <div className="control-label">
          <span>Array Size</span>
          <span className="control-value">{arraySize}</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={isPlaying}
        />
        <div className="slider-labels">
          <span>10</span>
          <span>100</span>
        </div>
      </div>

      {/* Animation Speed Slider */}
      <div className="control-group">
        <div className="control-label">
          <span>Animation Speed</span>
          <span className="control-value">{animationSpeed}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
        />
        <div className="slider-labels">
          <span>Slow (1ms)</span>
          <span>Fast (1000ms)</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="control-group">
        <label className="control-label">Playback</label>
        <div className="button-group">
          <button
            onClick={onPlay}
            disabled={isPlaying}
            className="btn-play"
          >
            ▶ Play
          </button>
          <button
            onClick={onPause}
            disabled={!isPlaying}
            className="btn-pause"
          >
            ⏸ Pause
          </button>
        </div>

        {/* Step Navigation */}
        <div className="button-group">
          <button
            onClick={onPrev}
            disabled={isPlaying || currentStep === 0}
            className="btn-step"
          >
            ◀ Prev
          </button>
          <button
            onClick={onNext}
            disabled={isPlaying || currentStep >= totalSteps - 1}
            className="btn-step"
          >
            Next ▶
          </button>
        </div>

        {/* Progress */}
        <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
          Step: <span className="control-value">{currentStep + 1}</span> / {totalSteps}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        disabled={isPlaying}
        className="btn-reset"
      >
        🔄 Reset
      </button>

      {/* Array Controls */}
      <div className="control-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button
          onClick={onGenerateArray}
          disabled={isPlaying}
          className="btn-generate"
        >
          🎲 Generate Random Array
        </button>
      </div>

      {/* Custom Array Input */}
      <div className="control-group">
        <label className="control-label">Custom Array (CSV)</label>
        <input
          type="text"
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="e.g., 5, 2, 8, 1, 9"
          disabled={isPlaying}
        />
        <button
          onClick={handleCsvInput}
          disabled={isPlaying || !csvInput.trim()}
          className="btn-load"
        >
          📥 Load Array
        </button>
      </div>

      {/* Info */}
      <div className="info-box">
        <p className="info-title">Color Guide:</p>
        <ul style={{ listStyle: 'none' }}>
          <li className="info-item">🔵 Blue: Default</li>
          <li className="info-item">🟡 Yellow: Comparing</li>
          <li className="info-item">🔴 Red: Active/Swapping</li>
          <li className="info-item">🟢 Green: Sorted</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
