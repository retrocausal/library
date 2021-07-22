import User from "./user.js";
import Library from "./books.js";
const sessionMgmt = (function () {
  const loginForm = document.querySelector("#login");
  const logoutAction = document.querySelector("#logout");
  const userName = document.querySelector("#user");
  function lock() {
    loginForm.reset();
    loginForm.classList.remove("hide");
    loginForm.classList.add("show");
    logoutAction.classList.remove("show");
    logoutAction.classList.add("hide");
    userName.textContent = "User !";
    Library.user = {};
  }
  function unlock() {
    const session = JSON.parse(sessionStorage.getItem("libuser") || "{}");
    loginForm.classList.remove("show");
    loginForm.classList.add("hide");
    logoutAction.classList.remove("hide");
    logoutAction.classList.add("show");
    userName.textContent = `${session.name || ""} !!!`;
    Library.user = { ...session };
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const entries = Object.fromEntries(new FormData(e.target).entries());
    sessionStorage.setItem("libuser", JSON.stringify(new User(entries.name)));
    sessionMgmt.unlock();
  });
  logoutAction.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("libuser");
    sessionMgmt.lock();
  });

  return { lock, unlock };
})();
document.addEventListener("DOMContentLoaded", function (e) {
  const session = JSON.parse(sessionStorage.getItem("libuser") || "{}");
  if (session.name) {
    sessionMgmt.unlock();
  } else {
    sessionMgmt.lock();
  }
});
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swaps = false;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swaps = true;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    if (i > 0 && swaps === false) break;
  }
  return arr;
}

function insertion(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] < arr[j]) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
}

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let merger = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merger.push(arr1[i]);
      i++;
    } else {
      merger.push(arr2[j]);
      j++;
    }
  }
  return [...merger, ...arr1.slice(i), ...arr2.slice(j)];
}

function mergeAndSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.round(arr.length / 2);
  const part1 = mergeAndSort(arr.slice(mid));
  const part2 = mergeAndSort(arr.slice(0, mid));
  return merge(part1, part2);
}

const i1 = [
  1, -1, -34, 32, 123, 20, 57, 89, 98, 0, 12, 3, 4, -2, -10, 36, 128, 120,
];
const s1 = ["abc", "bcd", "cde", "def", "efg", "ambassador"];

function naiveSubArraySum(array, length) {
  let max = -Infinity;
  let set = [];
  for (let i = 0; i < array.length - length; i++) {
    let sum = 0;
    for (let j = i; j < i + length; j++) {
      sum += array[j];
    }
    if (sum > max) {
      set.length = 0;
      for (let index = i; index < i + length; index++) {
        set.push(index);
      }
      max = sum;
    }
  }
  return { max, set };
}
function maxSubArraySum(array, length) {
  let set = [];
  let max = 0;
  for (let i = 0; i < length; i++) {
    max += array[i];
  }
  let sum = max;
  for (let j = length; j < array.length; j++) {
    sum = sum + array[j] - array[j - length];
    if (sum > max) {
      max = sum;
      set.length = 0;
      for (let index = j - length + 1; index <= j; index++) {
        set.push(index);
      }
    }
  }
  return { max, set };
}

const subsetSum = (function () {
  function recurse(
    array = [],
    sum = 0,
    currSum = 0,
    sets = new Set(),
    subset = [],
    index = 0
  ) {
    if (array.length <= index) {
      return sets;
    }
    if (currSum === sum) {
      sets.add(subset);
      return sets;
    }
    const newSum = currSum + array[index];
    if (newSum <= sum) {
      recurse(array, sum, newSum, sets, [...subset, array[index]], index + 1);
    }
    return recurse(array, sum, currSum, sets, [...subset], index + 1);
  }

  function force(array = [], sum = 0) {
    let sets = [[]];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const newSubSets = sets.map((s) => [...s, element]);
      sets = [...sets, ...newSubSets];
    }
    const subsets = sets.filter(
      (s) =>
        s.reduce((acc, e) => {
          acc = acc + e;
          return acc;
        }, 0) === sum
    );
    return subsets;
  }

  function consecutives(array = [], sum = 0) {
    let seen = {};
    let total = 0;
    let count = 0;
    let sets = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      total += element;
      const diff = total - sum;
      if (seen[total]) {
        seen[total].count++;
        seen[total].indices.push(i);
      } else {
        seen[total] = { count: 1, indices: [i] };
      }
      if (seen[diff]) {
        count += seen[diff].count || 0;
        for (let j = 0; j < seen[diff].indices.length; j++) {
          let set = [];
          for (let index = seen[diff].indices[j] + 1; index <= i; index++) {
            const element = array[index];
            set.push(element);
          }
          sets.push(set);
        }
      }
    }
    if (seen[sum]) {
      count += seen[sum].count || 0;
      for (let j = 0; j < seen[sum].indices.length; j++) {
        let set = [];
        for (let index = 0; index < seen[sum].indices[j]; index++) {
          const element = array[index];
          set.push(element);
        }
        sets.push(set);
      }
    }
    return { count, sets };
  }

  return function (approach, array, sum) {
    let subSets = [];
    switch (approach) {
      case "recursive":
        subSets = recurse(array, sum);
        break;
      case "force":
        subSets = force(array, sum);
        break;
      default:
        subSets = consecutives(array, sum);
        break;
    }
    return subSets;
  };
})();
const i2 = [
  5, 3, 60, 2, 6, 10, 14, 24, 23, 123, 120, 256, 128, 127, 68, 48, 32, 41, 16,
];
const i3 = [7, 2, 1, 5, 7, 20];

function minConsecutiveSubArrayWithSum(arr = [], sum = 0) {
  if (arr.length < 1) {
    return false;
  }
  let total = 0;
  let start = 0;
  let end = 0;
  let sets = [];
  while (start < arr.length) {
    if (total < sum) {
      total += arr[end];
      if (end > arr.length - 1) {
        break;
      } else {
        end++;
      }
    } else {
      if (total === sum) {
        let set = [];
        for (let i = start; i < end; i++) {
          set.push(i);
        }
        sets.push(set);
      }
      total -= arr[start];
      start++;
    }
  }
  return {
    sets,
    minSubSet: sets.reduce((acc, set) => {
      if ((acc || []).length > set.length) {
        acc = set;
      }
      return acc;
    }, sets[0]),
  };
}
console.log(minConsecutiveSubArrayWithSum([2, 3, 1, 2, 4, 3], 7));
console.log(naiveSubArraySum(i1, 4));
console.log(maxSubArraySum(i1, 4));
console.log(subsetSum("recursive", i2, 128));
console.log(subsetSum("force", i2, 128));
console.log(subsetSum("", i2, 128));
console.log(bubble(i1.slice(0)), bubble(s1));
console.log(insertion(i1.slice(0)), insertion(s1));
console.log(mergeAndSort(i1.slice(0)), mergeAndSort(s1));
