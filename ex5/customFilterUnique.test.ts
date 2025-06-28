import { task5_1 } from './Emil_Domagala_Homework5';
import { expect, test, beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('should correctly filter unique items', () => {
  const arr = [{ val: 1 }, { val: 2 }, { val: 1 }];
  const expectedRes = [{ val: 1 }, { val: 2 }];
  const filtered = task5_1.customFilterUnique(arr, (item) => item.val);
  expect(filtered).toEqual(expectedRes);
});
