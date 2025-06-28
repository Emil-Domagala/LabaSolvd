import { task5_5 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should call the provided function with the array', () => {
  const arr = [1, 2, 3];
  const mockFn = vi.fn();

  task5_5.measureArrayPerformance(arr, mockFn);

  expect(mockFn).toHaveBeenCalledWith(arr);
});

test('should return the time difference between performance.now() calls', () => {
  const arr = [1, 2, 3];
  const mockFn = vi.fn();

  const mockNow = vi.spyOn(performance, 'now');
  mockNow.mockReturnValueOnce(100).mockReturnValueOnce(150);

  const duration = task5_5.measureArrayPerformance(arr, mockFn);

  expect(duration).toBe(50);
});

test('should return a number', () => {
  const arr = Array(1000).fill(0);
  const fn = (a: number[]) => a.map((x) => x * 2);

  const result = task5_5.measureArrayPerformance(arr, fn);

  expect(typeof result).toBe('number');
  expect(result).toBeGreaterThanOrEqual(0);
});
