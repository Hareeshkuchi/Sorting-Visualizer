// Sorting algorithm implementations with step-by-step visualization support

export const COLORS = {
  DEFAULT: 'bg-blue-500',
  COMPARING: 'bg-yellow-400',
  ACTIVE: 'bg-red-500',
  SORTED: 'bg-green-500',
};



export class SortingVisualizer {
  constructor(array) {
    this.originalArray = [...array];
    this.array = [...array];
    this.steps = [];
    this.currentStep = 0;
  }

  addStep(array, indices, comparingIndices, sortedIndices, pseudocodeLine) {
    this.steps.push({
      array: [...array],
      indices,
      comparingIndices,
      sortedIndices,
      pseudocodeLine,
    });
  }

  // Bubble Sort
  bubbleSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    let pseudoLine = 0;

    this.addStep(arr, [], [], [], pseudoLine);

    for (let i = 0; i < n - 1; i++) {
      pseudoLine = 1;
      for (let j = 0; j < n - i - 1; j++) {
        pseudoLine = 2;
        this.addStep(arr, [j, j + 1], [j, j + 1], [], pseudoLine);

        if (arr[j] > arr[j + 1]) {
          pseudoLine = 3;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.addStep(arr, [j, j + 1], [], [], pseudoLine);
        }
      }
      pseudoLine = 4;
      this.addStep(arr, [], [], Array.from({ length: i + 1 }, (_, k) => n - k - 1), pseudoLine);
    }

    this.array = arr;
    return this.steps;
  }

  // Quick Sort
  quickSort() {
    this.steps = [];
    const arr = [...this.array];
    const sorted = [];

    const partition = (low, high, pseudoLineRef) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        this.addStep(arr, [j, high], [j, high], [...sorted], 2);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          this.addStep(arr, [i, j], [], [...sorted], 3);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      this.addStep(arr, [i + 1, high], [], [...sorted], 4);
      return i + 1;
    };

    const quickSortHelper = (low, high) => {
      if (low < high) {
        this.addStep(arr, [], [], [...sorted], 1);
        const pi = partition(low, high, 2);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    this.addStep(arr, [], [], [], 0);
    quickSortHelper(0, arr.length - 1);
    this.array = arr;
    return this.steps;
  }

  // Merge Sort
  mergeSort() {
    this.steps = [];
    const arr = [...this.array];

    const merge = (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        this.addStep(arr, [left + i, mid + 1 + j], [left + i, mid + 1 + j], [], 2);

        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
        } else {
          arr[k++] = rightArr[j++];
        }
        this.addStep(arr, [], [], [], 3);
      }

      while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        this.addStep(arr, [], [], [], 4);
      }
      while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        this.addStep(arr, [], [], [], 5);
      }
    };

    const mergeSortHelper = (left, right) => {
      if (left < right) {
        this.addStep(arr, [], [], [], 1);
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    };

    this.addStep(arr, [], [], [], 0);
    mergeSortHelper(0, arr.length - 1);
    this.array = arr;
    return this.steps;
  }

  // Heap Sort
  heapSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;

    const heapify = (n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        this.addStep(arr, [left, largest], [left, largest], [], 2);
        if (arr[left] > arr[largest]) largest = left;
      }

      if (right < n) {
        this.addStep(arr, [right, largest], [right, largest], [], 2);
        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        this.addStep(arr, [i, largest], [], [], 3);
        heapify(n, largest);
      }
    };

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.addStep(arr, [], [], [], 1);
      heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.addStep(arr, [0, i], [], [i], 4);
      heapify(i, 0);
    }

    this.array = arr;
    return this.steps;
  }
}
