import { task5_4 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should not duplicates items in return array', () => {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [3, 4, 5, 6, 7];
  const expectedRes = [1, 2, 3, 4, 5, 6, 7];
  const union = task5_4.getArrayUnion(arr1, arr2);
  expect(union.sort()).toEqual(expectedRes);
});

test('ahould return correct union', () => {
  const arr1 = [1, 1, 2, 3, 3, 4];
  const arr2 = [3, 4, 5];
  const expectedRes = [2, 3, 4, 5];
  const union = task5_4.getArrayUnion(arr1, arr2);
  expect(union.sort()).toEqual(expectedRes);
});
test('if no unique elements then empty', () => {
  const arr1 = [1, 1, 2, 2];
  const arr2 = [2, 2, 3, 3];
  const expectedRes = [];
  const union = task5_4.getArrayUnion(arr1, arr2);
  expect(union).toEqual(expectedRes);
});
