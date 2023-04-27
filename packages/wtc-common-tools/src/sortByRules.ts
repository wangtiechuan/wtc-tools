export interface SortRule<T> {
  property: keyof T;
  ascending: boolean;
}

export function sortByRules<T>(arr: T[], rules: SortRule<T>[]): T[] {
  return arr.sort((a, b) => {
    for (const rule of rules) {
      const property = rule.property;
      const ascending = rule.ascending;

      const aValue = a[property];
      const bValue = b[property];

      if (aValue === bValue) {
        continue;
      }

      if (ascending) {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    }

    return 0;
  });
}

export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(Math.random() * arr.length)]; // 随机选择基准值
  const left = [],
    right = [],
    equal = [];
  for (let num of arr) {
    if (num < pivot) {
      left.push(num);
    } else if (num > pivot) {
      right.push(num);
    } else {
      equal.push(num);
    }
  }
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}