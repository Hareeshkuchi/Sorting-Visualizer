import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sorting visualizer app', () => {
  render(<App />);
  const algorithmLabel = screen.getAllByText(/Algorithm/i)[0];
  expect(algorithmLabel).toBeInTheDocument();
});

test('renders all sorting algorithms in dropdown', () => {
  render(<App />);
  const selectElement = screen.getByRole('combobox');

  // Check that the select element contains the expected options
  expect(selectElement).toHaveValue('bubbleSort');

  // Check that some algorithms are present in the options
  const options = screen.getAllByRole('option');
  const optionTexts = options.map(option => option.textContent);

  expect(optionTexts).toContain('Bubble Sort');
  expect(optionTexts).toContain('Quick Sort');
  expect(optionTexts).toContain('Merge Sort');
  expect(optionTexts).toContain('Selection Sort');
  expect(optionTexts).toContain('Insertion Sort');
  expect(optionTexts).toContain('Heap Sort');
  expect(optionTexts).toContain('Shell Sort');
  expect(optionTexts).toContain('Counting Sort');
  expect(optionTexts).toContain('Radix Sort');
  expect(optionTexts).toContain('Bucket Sort');
  expect(optionTexts).toContain('Timsort');
  expect(optionTexts).toContain('Introsort');
});
