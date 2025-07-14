import { t6_3 } from './Emil_Domagala_Homework6';
import { expect, test } from 'vitest';

test('should return correct output', () => {
  const str = `
  line1
  line2
  line3`;
  const expected = `1. 
2.   line1
3.   line2
4.   line3`;
  expect(t6_3.multiline(str)).toBe(expected);
});
