import React, { useState, useEffect, useRef } from 'react';
import ControlPanel from './ControlPanel';
import Visualizer from './Visualizer';
import CodeSidecar from './CodeSidecar';
import { SortingVisualizer } from './algorithms';
import { AnimationController } from './AnimationController';
import './App.css';

const App = () => {
  const [arraySize, setArraySize] = useState(30);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [array, setArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentVisualizationData, setCurrentVisualizationData] = useState({
    array: [],
    indices: [],
    comparingIndices: [],
    sortedIndices: [],
    pseudocodeLine: 0,
  });

  const animationControllerRef = useRef(null);
  const stepsRef = useRef([]);

  // Generate random array
  const generateRandomArray = (size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    resetVisualization();
  };

  // Initialize array on mount
  useEffect(() => {
    generateRandomArray(arraySize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset visualization when array or algorithm changes
  const resetVisualization = () => {
    if (animationControllerRef.current) {
      animationControllerRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentStep(0);
    setCurrentVisualizationData({
      array: array,
      indices: [],
      comparingIndices: [],
      sortedIndices: [],
      pseudocodeLine: 0,
    });
  };

  // Update visualization when algorithm changes
  useEffect(() => {
    if (array.length === 0) return;

    const visualizer = new SortingVisualizer(array);
    let steps = [];

    switch (algorithm) {
      case 'bubbleSort':
        steps = visualizer.bubbleSort();
        break;
      case 'quickSort':
        steps = visualizer.quickSort();
        break;
      case 'mergeSort':
        steps = visualizer.mergeSort();
        break;
      case 'heapSort':
        steps = visualizer.heapSort();
        break;
      default:
        steps = visualizer.bubbleSort();
    }

    stepsRef.current = steps;
    setTotalSteps(steps.length);
    resetVisualization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm, array]);

  // Handle step update from animation controller
  const handleStepUpdate = (stepIndex) => {
    const step = stepsRef.current[stepIndex];
    if (step) {
      setCurrentStep(stepIndex);
      setCurrentVisualizationData({
        array: step.array,
        indices: step.indices || [],
        comparingIndices: step.comparingIndices || [],
        sortedIndices: step.sortedIndices || [],
        pseudocodeLine: step.pseudocodeLine || 0,
      });
    }
  };

  // Play animation
  const handlePlay = async () => {
    setIsPlaying(true);
    animationControllerRef.current = new AnimationController(
      stepsRef.current,
      handleStepUpdate,
      animationSpeed
    );
    animationControllerRef.current.setAnimationSpeed(animationSpeed);

    try {
      await animationControllerRef.current.play();
    } finally {
      setIsPlaying(false);
    }
  };

  // Pause animation
  const handlePause = () => {
    setIsPlaying(false);
    if (animationControllerRef.current) {
      animationControllerRef.current.pause();
    }
  };

  // Next step
  const handleNext = () => {
    if (animationControllerRef.current) {
      animationControllerRef.current.next();
    }
  };

  // Previous step
  const handlePrev = () => {
    if (animationControllerRef.current) {
      animationControllerRef.current.prev();
    }
  };

  // Reset
  const handleReset = () => {
    if (animationControllerRef.current) {
      animationControllerRef.current.reset();
    }
    resetVisualization();
  };

  // Generate new array
  const handleGenerateArray = () => {
    generateRandomArray(arraySize);
  };

  // Load custom array
  const handleInputArray = (numbers) => {
    setArray(numbers);
    resetVisualization();
  };

  // Handle array size change
  const handleArraySizeChange = (size) => {
    setArraySize(size);
    generateRandomArray(size);
  };

  return (
    <div className="app-container">
      {/* Control Panel - Top on mobile, Left on desktop */}
      <ControlPanel
        arraySize={arraySize}
        setArraySize={handleArraySizeChange}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        onGenerateArray={handleGenerateArray}
        onInputArray={handleInputArray}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Visualizer */}
        <Visualizer
          array={currentVisualizationData.array}
          indices={currentVisualizationData.indices}
          comparingIndices={currentVisualizationData.comparingIndices}
          sortedIndices={currentVisualizationData.sortedIndices}
        />

        {/* Code Sidecar - Bottom on mobile, Right on desktop */}
        <CodeSidecar
          algorithm={algorithm}
          currentLine={currentVisualizationData.pseudocodeLine}
        />
      </div>
    </div>
  );
};

export default App;
