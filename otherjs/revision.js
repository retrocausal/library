function isPrime(n = 0, sqrt = 0, divisor = 2) {
  if (n <= 0) {
    return undefined;
  } else if (n <= 3) {
    return true;
  } else {
    let root = sqrt;
    if (sqrt === 0) {
      root = Math.round(Math.sqrt(n));
    }
    if (divisor > root) {
      return true;
    } else if (n % divisor === 0) {
      return false;
    } else {
      return isPrime(n, root, divisor + 1);
    }
  }
}

console.log(isPrime(17));

//frequency counter
/**Same frequency */

function same(a1, a2) {
  if (a1.length !== a2.length) {
    return false;
  }
  const count1 = a1.reduce((acc, elem) => {
    if (acc.hasOwnProperty(elem)) {
      acc[elem]++;
    } else {
      acc[elem] = 1;
    }
    return acc;
  }, {});
  const count2 = a2.reduce((acc, elem) => {
    acc[elem] = (acc[elem] || 0) + 1;
    return acc;
  }, {});
  let isSame = true;
  for (const key of count1) {
    if (count2[key ** 2] !== count1[key]) {
      isSame = false;
      break;
    }
  }
  return isSame;
}

/** Anagram */

function anagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  let count1 = {};
  let count2 = {};
  for (const char of s1) {
    count1[char] = 1 + (count1[char] || 0);
  }
  for (const char of s2) {
    count2[char] = 1 + (count2[char] || 0);
  }
  let isAnagram = true;
  for (const key of Object.keys(count1)) {
    if (count1[key] !== count2[key]) {
      isAnagram = fasle;
      break;
    }
  }
  return isAnagram;
}
console.log(anagram("cinema", "iceman"));
console.log(anagram("", "iceman"));

//multiple pointers
function naivePairSum(arr, sum) {
  if (arr.length < 1) {
    return null;
  }
  let tuples = [];
  for (let i = 0; i < arr.length; i++) {
    let currSum = 0;
    const element = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const element2 = arr[j];
      currSum = element + element2;
      if (currSum === sum) {
        tuples.push([i, j]);
      }
    }
  }
  return { tuples, count: tuples.length };
}

function pairSum(arr, sum) {
  if (arr.length < 1) return null;
  let tuples = [];
  let right = 0;
  let left = arr.length - 1;
  while (left > right) {
    const currSum = arr[left] + arr[right];
    if (sum === currSum) {
      tuples.push([right, left]);
      left--;
      right++;
    } else if (currSum > sum) {
      left--;
    } else if (currSum < sum) {
      right++;
    } else {
    }
  }
  return { tuples, count: tuples.length };
}
console.log(pairSum([-4, -3, -2, 0, 1, 2, 3, 5], 0));
console.log(naivePairSum([-4, -3, -2, 0, 1, 3, 5], 0));

function isPalindromy(s1) {
  let i = 0;
  let j = s1.length - 1;
  let isPalindrome = true;
  while (j > i) {
    if (s1[i] !== s1[j]) {
      isPalindrome = false;
      break;
    }
    i++;
    j--;
  }
  return isPalindrome;
}
console.log(isPalindromy("abba"));

function countUnique(arr) {
  if (arr.length < 1) {
    return 0;
  }
  if (arr.length == 1) {
    return 1;
  }
  let right = 0;
  let left = 1;
  let count = 1;
  while (left < arr.length) {
    if (arr[right] !== arr[left]) {
      count++;
    }
    right++;
    left++;
  }
  return count;
}
console.log(countUnique([1, 1, 1, 2, 2, 3, 4, 4, 7, 7, 7, 12, 13]));

function countDupes(arr) {
  if (arr.length <= 1) {
    return false;
  }
  let i = 0;
  let j = 1;
  while (j < arr.length) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
      continue;
    }
    j++;
  }
  return arr.length - 1 - i;
}
console.log(countDupes([1, 2, 3]));

function tuplesWithAverageN(arr, n) {
  let i = 0;
  let j = arr.length - 1;
  let tuples = [];
  while (j > i) {
    const sum = arr[i] + arr[j];
    const avg = sum / 2;
    if (avg > n) {
      j--;
    } else if (avg < n) {
      i++;
    } else {
      tuples.push([i, j]);
      i++;
      j--;
    }
  }
  return tuples.length;
}

function isSubsequence(s1, s2) {
  if (s2.length < s1.length) return false;
  let j = 1;
  for (let i = s2.length; i > 0; i--) {
    if (s2[i] === s1[s1.length - j]) {
      j++;
    }
    if (j >= s1.length) {
      return true;
    }
  }
  return false;
}

//sliding window

function naiveMaxSubArraySumOfUptoN(arr, n) {
  if (arr.length < n) {
    return false;
  }
  if (arr.length === n) {
    return arr.reduce((acc, elem) => acc + elem, 0);
  }
  let max = -Infinity; //can have negative integers
  let sum = 0;
  for (let i = 0; i < arr.length - n; i++) {
    for (let j = 0; j < n; j++) {
      sum += arr[i + j];
    }
    max = Math.max(sum, max);
  }
}
function maxSubArraySumOfUptoN(arr, n) {
  if (arr.length < n) {
    return false;
  }
  if (arr.length === n) {
    return arr.reduce((acc, elem) => acc + elem, 0);
  }
  let max = 0;
  for (let i = 0; i < n; i++) {
    max += arr[i];
  }
  let sum = max;
  for (let i = n; i < arr.length; i++) {
    sum += arr[i] - arr[i - n];
    max = Math.max(sum, max);
  }
  return max;
}

function naiveMinSubArrayWithSumN(arr, n) {
  if (arr.length < 1) return null;
  if (arr.length === 1 && arr[0] < n) return null;
  const sums = {};
  let min = Infinity;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    const diff = sum - n;
    if (sums.hasOwnProperty(sum) === false) {
      sums[sum] = [i];
    } else {
      sums[sum].push(i);
    }
    if (sums.hasOwnProperty(diff)) {
    }
  }
  if (sums.hasOwnProperty(n)) {
    for (const j of sums[n]) {
      if (j < min) {
        min = j;
      }
    }
  }
  return min === Infinity ? 0 : min;
}
function minSubArrayWithSumN(arr, n) {
  let i = 0;
  let j = 0;
  let sum = 0;
  let min = Infinity;
  while (i < arr.length) {
    if (sum >= n) {
      min = Math.min(min, j - i);
      sum -= arr[i];
      i++;
    } else {
      if (j >= arr.length) break;
      sum += arr[j];
      j++;
    }
  }
  return min === Infinity ? 0 : min;
}
function longestDistinctSubstring(s) {
  if (s.length < 1) {
    return 0;
  }
  if (s.length === 1) {
    return 1;
  }
  let lastSeen = {};
  let start = 0;
  let longest = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (lastSeen[char]) {
      start = lastSeen[char] + 1;
    }
    longest = Math.max(longest, i - start);
    lastSeen[char] = i;
  }
  return longest;
}
console.log(longestDistinctSubstring("thecatinthehat"));

/**Search - Binary */
function binarySearch(arr, n) {
  let i = 0;
  let j = arr.length - 1;
  let mid = Math.round(arr.length / 2);
  while (n !== arr[mid] && j >= i) {
    if (n < arr[mid]) {
      j = mid;
    } else if (n > arr[mid]) {
      i = mid;
    }
    mid = Math.round((i + j) / 2);
  }
  return arr[mid] === n ? mid : -1;
}
console.log(binarySearch([1, 3, 5, 8, 13, 21, 34, 55], 5));
/**substring naive */

function isSubstring(str1, str2) {
  let count = 0;
  let indices = [];
  for (let i = 0; i < str2.length; i++) {
    for (let j = 0; j < str1.length; j++) {
      const char = str2[i + j];
      if (str1[j] !== char) break;
      if (j === str1.length - 1) {
        count++;
        indices.push([i, i + j]);
      }
    }
  }
  return { count, indices };
}
console.log(isSubstring("lol", "lorie loled and loled"));

//sorting
/**Bubble */
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swaps = 0;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        swaps++;
      }
    }
    if (swaps === 0) break;
  }
  return arr;
}
console.log(
  bubble([
    1, -1, -34, 32, 123, 20, 57, 89, 98, 0, 12, 3, 4, -2, -10, 36, 128, 120,
  ])
);

function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      if (arr[j + 1] < arr[j]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
}
console.log(
  insertion([
    1, -1, -34, 32, 123, 20, 57, 89, 98, 0, 12, 3, 4, -2, -10, 36, 128, 120,
  ])
);
const merge = function (arr1, arr2) {
  let i = 0;
  let j = 0;
  let composite = [];
  while (j < arr2.length && i < arr1.length) {
    if (arr2[j] < arr1[i]) {
      composite.push(arr2[j]);
      j++;
    } else {
      composite.push(arr1[i]);
      i++;
    }
  }
  return [...composite, ...arr1.slice(i), ...arr2.slice(j)];
};
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const mid = Math.round(arr.length / 2);
  const part1 = mergeSort(arr.slice(0, mid));
  const part2 = mergeSort(arr.slice(mid));
  return merge(part1, part2);
}

console.log(
  mergeSort([
    1, -1, -34, 32, 123, 20, 57, 89, 98, 0, 12, 3, 4, -2, -10, 36, 128, 120,
  ])
);
