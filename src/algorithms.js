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
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], pseudoLine);

    for (let i = 0; i < n - 1; i++) {
      pseudoLine = 1;
      for (let j = 0; j < n - i - 1; j++) {
        pseudoLine = 2;
        this.addStep(arr, [j, j + 1], [j, j + 1], [...sortedElements], pseudoLine);

        if (arr[j] > arr[j + 1]) {
          pseudoLine = 3;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.addStep(arr, [j, j + 1], [], [...sortedElements], pseudoLine);
        }
      }
      // Mark the last element of this pass as sorted
      sortedElements.push(n - i - 1);
      pseudoLine = 4;
      this.addStep(arr, [], [], [...sortedElements], pseudoLine);
    }

    this.array = arr;
    return this.steps;
  }

  // Quick Sort
  quickSort() {
    this.steps = [];
    const arr = [...this.array];
    const sortedElements = [];

    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        this.addStep(arr, [j, high], [j, high], [...sortedElements], 2);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          this.addStep(arr, [i, j], [], [...sortedElements], 3);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      this.addStep(arr, [i + 1, high], [], [...sortedElements], 4);
      return i + 1;
    };

    const quickSortHelper = (low, high) => {
      if (low < high) {
        this.addStep(arr, [], [], [...sortedElements], 1);
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
      // Mark the entire range as sorted when recursion completes
      for (let idx = low; idx <= high; idx++) {
        if (!sortedElements.includes(idx)) {
          sortedElements.push(idx);
        }
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
    const sortedElements = [];

    const merge = (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        this.addStep(arr, [left + i, mid + 1 + j], [left + i, mid + 1 + j], [...sortedElements], 2);

        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
        } else {
          arr[k++] = rightArr[j++];
        }
        this.addStep(arr, [], [], [...sortedElements], 3);
      }

      while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        this.addStep(arr, [], [], [...sortedElements], 4);
      }
      while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        this.addStep(arr, [], [], [...sortedElements], 5);
      }

      // Mark the merged range as sorted
      for (let idx = left; idx <= right; idx++) {
        if (!sortedElements.includes(idx)) {
          sortedElements.push(idx);
        }
      }
      this.addStep(arr, [], [], [...sortedElements], 6);
    };

    const mergeSortHelper = (left, right) => {
      if (left < right) {
        this.addStep(arr, [], [], [...sortedElements], 1);
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
    const sortedElements = [];

    const heapify = (n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        this.addStep(arr, [left, largest], [left, largest], [...sortedElements], 2);
        if (arr[left] > arr[largest]) largest = left;
      }

      if (right < n) {
        this.addStep(arr, [right, largest], [right, largest], [...sortedElements], 2);
        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        this.addStep(arr, [i, largest], [], [...sortedElements], 3);
        heapify(n, largest);
      }
    };

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.addStep(arr, [], [], [...sortedElements], 1);
      heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      sortedElements.push(i); // Mark this position as sorted
      this.addStep(arr, [0, i], [], [...sortedElements], 4);
      heapify(i, 0);
    }

    // Mark the first element as sorted
    sortedElements.push(0);
    this.addStep(arr, [], [], [...sortedElements], 5);

    this.array = arr;
    return this.steps;
  }

  // Selection Sort
  selectionSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      this.addStep(arr, [i], [], [...sortedElements], 1);

      for (let j = i + 1; j < n; j++) {
        this.addStep(arr, [minIdx, j], [minIdx, j], [...sortedElements], 2);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          this.addStep(arr, [minIdx], [], [...sortedElements], 3);
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        this.addStep(arr, [i, minIdx], [], [...sortedElements], 4);
      }

      sortedElements.push(i);
      this.addStep(arr, [], [], [...sortedElements], 5);
    }

    // Mark the last element as sorted
    sortedElements.push(n - 1);
    this.addStep(arr, [], [], [...sortedElements], 6);

    this.array = arr;
    return this.steps;
  }

  // Insertion Sort
  insertionSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      this.addStep(arr, [i], [], [...sortedElements], 1);

      while (j >= 0 && arr[j] > key) {
        this.addStep(arr, [j, j + 1], [j, j + 1], [...sortedElements], 2);
        arr[j + 1] = arr[j];
        this.addStep(arr, [j, j + 1], [], [...sortedElements], 3);
        j--;
      }

      arr[j + 1] = key;
      this.addStep(arr, [j + 1], [], [...sortedElements], 4);

      // Mark elements up to i as sorted
      for (let k = 0; k <= i; k++) {
        if (!sortedElements.includes(k)) {
          sortedElements.push(k);
        }
      }
      this.addStep(arr, [], [], [...sortedElements], 5);
    }

    this.array = arr;
    return this.steps;
  }

  // Shell Sort
  shellSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      this.addStep(arr, [], [], [...sortedElements], 1);

      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;

        this.addStep(arr, [i], [], [...sortedElements], 2);

        while (j >= gap && arr[j - gap] > temp) {
          this.addStep(arr, [j - gap, j], [j - gap, j], [...sortedElements], 3);
          arr[j] = arr[j - gap];
          this.addStep(arr, [j], [], [...sortedElements], 4);
          j -= gap;
        }

        arr[j] = temp;
        this.addStep(arr, [j], [], [...sortedElements], 5);
      }
    }

    // Mark all elements as sorted
    for (let i = 0; i < n; i++) {
      sortedElements.push(i);
    }
    this.addStep(arr, [], [], [...sortedElements], 6);

    this.array = arr;
    return this.steps;
  }

  // Counting Sort
  countingSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n);

    // Count frequencies
    for (let i = 0; i < n; i++) {
      count[arr[i] - min]++;
      this.addStep(arr, [i], [], [...sortedElements], 1);
    }

    // Cumulative count
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
      this.addStep(arr, [], [], [...sortedElements], 2);
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
      this.addStep(arr, [i], [], [...sortedElements], 3);
    }

    // Copy back to original array
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      sortedElements.push(i);
      this.addStep(arr, [i], [], [...sortedElements], 4);
    }

    this.array = arr;
    return this.steps;
  }

  // Radix Sort
  radixSort() {
    this.steps = [];
    const arr = [...this.array];
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    const getMax = (arr) => Math.max(...arr);
    const countingSortForRadix = (arr, exp) => {
      const n = arr.length;
      const output = new Array(n);
      const count = new Array(10).fill(0);

      for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        this.addStep(arr, [i], [], [...sortedElements], 1);
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
        this.addStep(arr, [], [], [...sortedElements], 2);
      }

      for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
        this.addStep(arr, [i], [], [...sortedElements], 3);
      }

      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        this.addStep(arr, [i], [], [...sortedElements], 4);
      }
    };

    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSortForRadix(arr, exp);
    }

    // Mark all elements as sorted
    for (let i = 0; i < arr.length; i++) {
      sortedElements.push(i);
    }
    this.addStep(arr, [], [], [...sortedElements], 5);

    this.array = arr;
    return this.steps;
  }

  // Bucket Sort
  bucketSort() {
    this.steps = [];
    const arr = [...this.array];
    const n = arr.length;
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketCount = Math.floor(Math.sqrt(n)) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor(((arr[i] - min) / (max - min + 1)) * bucketCount);
      buckets[Math.min(bucketIndex, bucketCount - 1)].push(arr[i]);
      this.addStep(arr, [i], [], [...sortedElements], 1);
    }

    // Sort individual buckets and concatenate
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
      if (buckets[i].length > 0) {
        buckets[i].sort((a, b) => a - b);
        for (let j = 0; j < buckets[i].length; j++) {
          arr[index] = buckets[i][j];
          sortedElements.push(index);
          this.addStep(arr, [index], [], [...sortedElements], 2);
          index++;
        }
      }
    }

    this.array = arr;
    return this.steps;
  }

  // Timsort (simplified version)
  timsort() {
    this.steps = [];
    const arr = [...this.array];
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    // Use insertion sort for small subarrays and merge for larger ones
    const MIN_MERGE = 32;

    const insertionSort = (arr, left, right) => {
      for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;

        this.addStep(arr, [i], [], [...sortedElements], 1);

        while (j >= left && arr[j] > key) {
          this.addStep(arr, [j, j + 1], [j, j + 1], [...sortedElements], 2);
          arr[j + 1] = arr[j];
          this.addStep(arr, [j, j + 1], [], [...sortedElements], 3);
          j--;
        }

        arr[j + 1] = key;
        this.addStep(arr, [j + 1], [], [...sortedElements], 4);
      }
    };

    const merge = (arr, left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        this.addStep(arr, [left + i, mid + 1 + j], [left + i, mid + 1 + j], [...sortedElements], 5);

        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
        } else {
          arr[k++] = rightArr[j++];
        }
        this.addStep(arr, [], [], [...sortedElements], 6);
      }

      while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        this.addStep(arr, [], [], [...sortedElements], 7);
      }
      while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        this.addStep(arr, [], [], [...sortedElements], 8);
      }
    };

    // Sort small subarrays with insertion sort
    for (let i = 0; i < arr.length; i += MIN_MERGE) {
      insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, arr.length - 1));
    }

    // Merge sorted subarrays
    for (let size = MIN_MERGE; size < arr.length; size = 2 * size) {
      for (let left = 0; left < arr.length; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, arr.length - 1);

        if (mid < right) {
          merge(arr, left, mid, right);
        }
      }
    }

    // Mark all elements as sorted
    for (let i = 0; i < arr.length; i++) {
      sortedElements.push(i);
    }
    this.addStep(arr, [], [], [...sortedElements], 9);

    this.array = arr;
    return this.steps;
  }

  // Introsort (simplified version - Quick sort with Heap sort fallback)
  introsort() {
    this.steps = [];
    const arr = [...this.array];
    const sortedElements = [];

    this.addStep(arr, [], [], [...sortedElements], 0);

    const maxDepth = Math.floor(Math.log2(arr.length)) * 2;

    const heapSort = (arr, left, right) => {
      const heapify = (arr, n, i) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          this.addStep(arr, [i, largest], [], [...sortedElements], 1);
          heapify(arr, n, largest);
        }
      };

      for (let i = Math.floor((right - left + 1) / 2) - 1; i >= left; i--) {
        heapify(arr, right + 1, i);
      }

      for (let i = right; i > left; i--) {
        [arr[left], arr[i]] = [arr[i], arr[left]];
        sortedElements.push(i);
        this.addStep(arr, [left, i], [], [...sortedElements], 2);
        heapify(arr, i, left);
      }
    };

    const insertionSort = (arr, left, right) => {
      for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= left && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;
        this.addStep(arr, [j + 1], [], [...sortedElements], 3);
      }
    };

    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        this.addStep(arr, [j, high], [j, high], [...sortedElements], 4);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          this.addStep(arr, [i, j], [], [...sortedElements], 5);
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      this.addStep(arr, [i + 1, high], [], [...sortedElements], 6);
      return i + 1;
    };

    const introsortHelper = (arr, left, right, depthLimit) => {
      const size = right - left + 1;

      if (size <= 16) {
        insertionSort(arr, left, right);
        return;
      }

      if (depthLimit === 0) {
        heapSort(arr, left, right);
        return;
      }

      const pivot = partition(arr, left, right);
      introsortHelper(arr, left, pivot - 1, depthLimit - 1);
      introsortHelper(arr, pivot + 1, right, depthLimit - 1);
    };

    introsortHelper(arr, 0, arr.length - 1, maxDepth);

    // Mark all elements as sorted
    for (let i = 0; i < arr.length; i++) {
      sortedElements.push(i);
    }
    this.addStep(arr, [], [], [...sortedElements], 7);

    this.array = arr;
    return this.steps;
  }
}
