import { task5_3 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should return an array with the same length as the input array', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = task5_3.customShuffle(arr);
  expect(shuffled.length).toBe(arr.length);
});

test('should return an array with the same elements as the input array', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = task5_3.customShuffle(arr);
  expect(shuffled.sort()).toEqual(arr.sort());
});

test('should return shuffled array', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = task5_3.customShuffle(arr);
  expect(shuffled).not.toEqual(arr);
});
