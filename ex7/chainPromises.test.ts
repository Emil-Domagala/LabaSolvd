import { describe, test, expect } from 'vitest';
import { t7_3 } from './Emil_Domagala_Homework7';

describe('chainPromises', () => {
  test('should chain multiple async functions in order', async () => {
    const fn1 = () => Promise.resolve('A');
    const fn2 = (prev: string) => Promise.resolve(prev + 'B');
    const fn3 = (prev: string) => Promise.resolve(prev + 'C');

    const result = await t7_3.chainPromises([fn1, fn2, fn3]);
    expect(result).toBe('ABC');
  });

  test('should reject if any function in the chain fails', async () => {
    const fn1 = () => Promise.resolve('start');
    const fn2 = () => Promise.reject('something failed');
    const fn3 = () => Promise.resolve('this should not run');

    try {
      await t7_3.chainPromises([fn1, fn2, fn3]);
      throw new Error('Shouldnt reach this point');
    } catch (e) {
      expect(e).toBe('something failed');
    }
  });

  test('should return undefined for empty input array', async () => {
    const result = await t7_3.chainPromises([]);
    expect(result).toBe(undefined);
  });

  test('should pass values correctly between chained functions', async () => {
    const fn1 = () => Promise.resolve(2);
    const fn2 = (n: number) => Promise.resolve(n * 3);
    const fn3 = (n: number) => Promise.resolve(n - 1);

    const result = await t7_3.chainPromises([fn1, fn2, fn3]);
    expect(result).toBe(5);
  });

  test('should handle a single function correctly', async () => {
    const fn1 = () => Promise.resolve('only one');

    const result = await t7_3.chainPromises([fn1]);
    expect(result).toBe('only one');
  });
});
