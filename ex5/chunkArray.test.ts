import { task5_2 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should return correct chunks', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrRes = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
  const chunks = task5_2.chunkArray(arr, 3);
  expect(chunks).toEqual(arrRes);
});

test('should return correct chunks when arr is empty', () => {
  const chunks = task5_2.chunkArray([], 3);
  expect(chunks).toEqual([]);
});
