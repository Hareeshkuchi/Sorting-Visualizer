// Pseudocode for each sorting algorithm

export const pseudocodes = {
  bubbleSort: [
    'function bubbleSort(array)',
    'for i = 0 to n-2',
    'for j = 0 to n-i-2',
    'if array[j] > array[j+1]',
    'swap(array[j], array[j+1])',
    'array[n-i-1] is now sorted',
  ],
  quickSort: [
    'function quickSort(array, low, high)',
    'if low < high',
    'partition and compare with pivot',
    'swap if needed',
    'recursively sort partitions',
  ],
  mergeSort: [
    'function mergeSort(array, left, right)',
    'if left < right',
    'find middle point',
    'compare left and right halves',
    'merge sorted subarrays',
  ],
  heapSort: [
    'function heapSort(array)',
    'build max heap',
    'compare parent and children',
    'swap to maintain heap property',
    'extract elements from heap',
  ],
};

export const algorithms = {
  bubbleSort: { name: 'Bubble Sort', pseudocode: pseudocodes.bubbleSort },
  quickSort: { name: 'Quick Sort', pseudocode: pseudocodes.quickSort },
  mergeSort: { name: 'Merge Sort', pseudocode: pseudocodes.mergeSort },
  heapSort: { name: 'Heap Sort', pseudocode: pseudocodes.heapSort },
};
