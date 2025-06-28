import { task5_4 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should return correct intersection', () => {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [3, 4, 5, 6, 7];
  const expectedRes = [3, 4, 5];
  const intersection = task5_4.getArrayIntersection(arr1, arr2);
  expect(intersection).toEqual(expectedRes);
});

test('should return empty if no intersection', () => {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [6, 7];
  const intersection = task5_4.getArrayIntersection(arr1, arr2);
  expect(intersection).toEqual([]);
});
