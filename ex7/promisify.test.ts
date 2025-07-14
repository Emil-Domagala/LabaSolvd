import { t7_4 } from './Emil_Domagala_Homework7';
import { test, expect, vi } from 'vitest';

test('resolves with correct result', async () => {
  function callbackFn(value: number, cb: (err: any, res?: any) => void) {
    setTimeout(() => cb(null, value * 2), 100);
  }

  const promisedFn = t7_4.promisify(callbackFn);

  vi.useFakeTimers();
  const promise = promisedFn(10);
  vi.advanceTimersByTime(100);

  await expect(promise).resolves.toBe(20);
  vi.useRealTimers();
});

test('rejects with error', async () => {
  function callbackFn(value: number, cb: (err: any, res?: any) => void) {
    setTimeout(() => cb('error occurred'), 100);
  }

  const promisedFn = t7_4.promisify(callbackFn);

  vi.useFakeTimers();
  const promise = promisedFn(10);
  vi.advanceTimersByTime(100);

  await expect(promise).rejects.toBe('error occurred');
  vi.useRealTimers();
});

test('works with immediate callback (sync)', async () => {
  function callbackFn(value: number, cb: (err: any, res?: any) => void) {
    if (value > 0) cb(null, 'ok');
    else cb('fail');
  }

  const promisedFn = t7_4.promisify(callbackFn);

  await expect(promisedFn(5)).resolves.toBe('ok');
  await expect(promisedFn(0)).rejects.toBe('fail');
});
