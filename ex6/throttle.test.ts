import { t6_4 } from './Emil_Domagala_Homework6';
import { expect, test, vi } from 'vitest';

test('should be called only once b4 debounce', async () => {
  vi.useFakeTimers();
  const mockFunc = vi.fn();
  const debouncedFunc = t6_4.debunce(mockFunc, 1000);
  debouncedFunc();
  vi.advanceTimersByTime(50);
  debouncedFunc();
  vi.advanceTimersByTime(50);
  debouncedFunc();
  vi.advanceTimersByTime(1000);
  expect(mockFunc).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});
test('should be possible to call again  after debounce', async () => {
  vi.useFakeTimers();
  const mockFunc = vi.fn();
  const debouncedFunc = t6_4.debunce(mockFunc, 1000);
  debouncedFunc();
  vi.advanceTimersByTime(1100);
  debouncedFunc();
  vi.advanceTimersByTime(1000);
  expect(mockFunc).toHaveBeenCalledTimes(2);
  vi.useRealTimers();
});
