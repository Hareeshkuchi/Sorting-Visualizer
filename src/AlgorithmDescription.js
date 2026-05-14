import React from 'react';

const AlgorithmDescription = ({ algorithm }) => {
  const descriptions = {
    bubbleSort: {
      title: "Bubble Sort",
      description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      stable: true
    },
    selectionSort: {
      title: "Selection Sort",
      description: "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items. It repeatedly finds the minimum element from the unsorted portion and puts it at the end of the sorted portion.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      stable: false
    },
    insertionSort: {
      title: "Insertion Sort",
      description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      stable: true
    },
    quickSort: {
      title: "Quick Sort",
      description: "Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
      timeComplexity: "O(n log n) average, O(n²) worst case",
      spaceComplexity: "O(log n)",
      stable: false
    },
    mergeSort: {
      title: "Merge Sort",
      description: "Merge Sort is an efficient, stable sorting algorithm that makes use of the divide and conquer strategy. It divides the unsorted list into n sublists, each containing one element, and then repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      stable: true
    },
    heapSort: {
      title: "Heap Sort",
      description: "Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      stable: false
    },
    shellSort: {
      title: "Shell Sort",
      description: "Shell Sort is a generalized version of insertion sort. It first sorts elements that are far apart from each other and successively reduces the interval between the elements to be sorted.",
      timeComplexity: "O(n log² n)",
      spaceComplexity: "O(1)",
      stable: false
    },
    countingSort: {
      title: "Counting Sort",
      description: "Counting Sort is a sorting technique based on keys between a specific range. It works by counting the number of objects having distinct key values, and using arithmetic on those counts to determine the positions of each key value in the output sequence.",
      timeComplexity: "O(n + k)",
      spaceComplexity: "O(n + k)",
      stable: true
    },
    radixSort: {
      title: "Radix Sort",
      description: "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value.",
      timeComplexity: "O(n * d)",
      spaceComplexity: "O(n + k)",
      stable: true
    },
    bucketSort: {
      title: "Bucket Sort",
      description: "Bucket Sort is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.",
      timeComplexity: "O(n + k)",
      spaceComplexity: "O(n + k)",
      stable: true
    },
    timsort: {
      title: "Timsort",
      description: "Timsort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It was implemented as the standard sort algorithm in Python and Java.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      stable: true
    },
    introsort: {
      title: "Introsort",
      description: "Introsort is a hybrid sorting algorithm that provides both fast average performance and optimal worst-case performance. It begins with quicksort and switches to heapsort when the recursion depth exceeds a level based on the number of elements being sorted.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      stable: false
    }
  };

  const currentAlgo = descriptions[algorithm];

  return (
    <div className="algorithm-description">
      <h3 className="description-title">{currentAlgo.title}</h3>
      <p className="description-text">{currentAlgo.description}</p>
      <div className="complexity-info">
        <div className="complexity-item">
          <span className="complexity-label">Time Complexity:</span>
          <span className="complexity-value">{currentAlgo.timeComplexity}</span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Space Complexity:</span>
          <span className="complexity-value">{currentAlgo.spaceComplexity}</span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Stable:</span>
          <span className="complexity-value">{currentAlgo.stable ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;