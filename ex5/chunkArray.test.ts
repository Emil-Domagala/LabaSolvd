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

test('should return correct chunks when size is 1', () => {
  const arr = [1, 2, 3, 4];
  const arrRes = [[1], [2], [3], [4]];
  const chunks = task5_2.chunkArray(arr, 1);
  expect(chunks).toEqual(arrRes);
});

test('should return all items into one chunk array when size > arr.length', () => {
  const arr = [1, 2, 3, 4];
  const arrRes = [[1, 2, 3, 4]];
  const chunks = task5_2.chunkArray(arr, 10);
  expect(chunks).toEqual(arrRes);
});

test('should return correct chunks when arr is empty', () => {
  const chunks = task5_2.chunkArray([], 3);
  expect(chunks).toEqual([]);
});

test('should throw error when decinal passed', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  expect(() => task5_2.chunkArray(arr, 3.5)).toThrowError('Size must not be decimal');
});

test('should throw error when size is less than 1', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  expect(() => task5_2.chunkArray(arr, -2)).toThrowError('Size must be greater than 1');
});
