import { t6_6 } from './Emil_Domagala_Homework6';
import { expect, test, vi } from 'vitest';

test('should return correct output', () => {
  const add = (a: number, b: number) => a + b;
  const curriedAdd = t6_6.curry(add, 2);
  const step1 = curriedAdd(1);
  const step2 = step1(2);
  expect(step2).toBe(3);
});
