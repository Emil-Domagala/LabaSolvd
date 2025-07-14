import { t7_1 } from './Emil_Domagala_Homework7';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('should settle when all promises are resolved successfully', async () => {
  const prom1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  const prom2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));

  const promise = t7_1.promiseAll([prom1, prom2]);

  vi.advanceTimersByTime(1000);

  let settled = false;
  promise.then(
    () => (settled = true),
    () => (settled = true),
  );

  await Promise.resolve();

  expect(settled).toBe(false);

  vi.advanceTimersByTime(1000);
  await expect(promise).resolves.toEqual([1, 2]);
});
test('if any promise failed should fail', async () => {
  const prom1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  const prom2 = new Promise((_, rejected) => setTimeout(() => rejected(2), 1500));

  const promise = t7_1.promiseAll([prom1, prom2]);

  vi.advanceTimersByTime(2500);

  await expect(promise).rejects.toBe(2);
});
