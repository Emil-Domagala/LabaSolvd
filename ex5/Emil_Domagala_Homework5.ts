class Task5_1 {
  customFilterUnique<T, K>(arr: T[], cb: (item: T) => K): T[] {
    const seen = new Set<K>();

    return arr.filter((item) => {
      const key = cb(item);
      if (seen.has(key)) {
        return false;
      } else {
        seen.add(key);
        return true;
      }
    });
  }
}

export const task5_1 = new Task5_1();

class Task5_2 {
  chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk: T[] = [];
      for (let j = i; j < i + size && j < arr.length; j++) {
        chunk.push(arr[j]);
      }
      result.push(chunk);
    }

    return result;
  }
}

export const task5_2 = new Task5_2();

class Task5_3 {
  customShuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    const len = copy.length;
    for (let i = len - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (len - 1));
      const temp = copy[i];
      copy[i] = copy[random];
      copy[random] = temp;
    }
    return copy;
  }
}

export const task5_3 = new Task5_3();

class Task5_4 {
  getArrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set(arr2);
    const result: T[] = [];
    for (const item of arr1) {
      if (set.has(item)) {
        result.push(item);
      }
    }
    return result;
  }
  getArrayUnion<T>(arr1: T[], arr2: T[]): T[] {
    /* I understand this assigment that i need to take all unique elements from array 1 and array 2 
    and then combine them into one big array while getting rid of all duplicates
    */
    const map1 = new Map<T, number>();
    const map2 = new Map<T, number>();

    for (const item of arr1) {
      map1.set(item, (map1.get(item) || 0) + 1);
    }
    for (const item of arr2) {
      map2.set(item, (map2.get(item) || 0) + 1);
    }

    const resSet = new Set<T>();

    const addOnlyUnique = (val: number, key: T) => (val === 1 ? resSet.add(key) : null);

    map1.forEach((val, key) => addOnlyUnique(val, key));
    map2.forEach((val, key) => addOnlyUnique(val, key));

    return Array.from(resSet);
  }
}

export const task5_4 = new Task5_4();

class Task5_5 {
  measureArrayPerformance<T>(arr: T[], fn: (arr: T[]) => any) {
    const start = performance.now();
    fn(arr);
    const end = performance.now();
    return end - start;
  }
}

export const task5_5 = new Task5_5();

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = [1, 2, 3, 3, 3];
const arrObj = [{ val: 1 }, { val: 2 }, { val: 2 }, { val: 3 }, { val: 4 }, { val: 5 }, { val: 6 }, { val: 7 }];

// @ts-ignore
const customFilterUniqueFn = (arr) => task5_1.customFilterUnique(arr, (item) => item.val);
// @ts-ignore
const chunkArrayFn = (arr) => task5_2.chunkArray(arr, 3);
// @ts-ignore
const getArrayIntersectionFn = (arr) => task5_4.getArrayIntersection(arr, arr2);
// @ts-ignore
const getArrayUnionFn = (arr) => task5_4.getArrayUnion(arr, arr2);

const customFilterUniqueM = task5_5.measureArrayPerformance(arrObj, customFilterUniqueFn);
const chunkArrayM = task5_5.measureArrayPerformance(arr, chunkArrayFn);
const customShuffleM = task5_5.measureArrayPerformance(arr, (arr) => task5_3.customShuffle(arr));
const getArrayIntersectionM = task5_5.measureArrayPerformance(arr, getArrayIntersectionFn);
const getArrayUnionM = task5_5.measureArrayPerformance(arr, getArrayUnionFn);

const mapM = task5_5.measureArrayPerformance(arr, (arr) => arr.map((x) => x * 2));
const filterM = task5_5.measureArrayPerformance(arr, (arr) => arr.filter((x) => x % 2 === 0));
const reduceM = task5_5.measureArrayPerformance(arr, (arr) => arr.reduce((a, b) => a + b, 0));

console.log('customFilterUniqueM', customFilterUniqueM);
console.log('chunkArrayM', chunkArrayM);
console.log('customShuffleM', customShuffleM);
console.log('getArrayIntersectionM', getArrayIntersectionM);
console.log('getArrayUnionM', getArrayUnionM);
console.log('mapM', mapM);
console.log('filterM', filterM);
console.log('reduceM', reduceM);
