import { t7_2 } from './Emil_Domagala_Homework7';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('promiseAllSettled works', async () => {
  const p1 = Promise.resolve(1);
  const p2 = Promise.reject('fail');
  const p3 = Promise.resolve(3);

  const result = await t7_2.promiseAllSettled([p1, p2, p3]);

  expect(result).toEqual([
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason: 'fail' },
    { status: 'fulfilled', value: 3 },
  ]);
});
