import { t6_4 } from './Emil_Domagala_Homework6';
import { expect, test, vi } from 'vitest';

test('Should call function after delay', async () => {
  vi.useFakeTimers();
  const mockFunc = vi.fn();
  const debouncedFunc = t6_4.debunce(mockFunc, 1000);

  expect(mockFunc).not.toHaveBeenCalled();

  debouncedFunc();
  expect(mockFunc).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1500);
  expect(mockFunc).toHaveBeenCalled();
  vi.useRealTimers();
});

test('Should call function only once', async () => {
  vi.useFakeTimers();
  const mockFunc = vi.fn();
  const debouncedFunc = t6_4.debunce(mockFunc, 1000);

  expect(mockFunc).not.toHaveBeenCalled();
  vi.advanceTimersByTime(500);
  debouncedFunc();
  vi.advanceTimersByTime(500);
  debouncedFunc();
  vi.advanceTimersByTime(1500);

  expect(mockFunc).toHaveBeenCalledTimes(1);
});
