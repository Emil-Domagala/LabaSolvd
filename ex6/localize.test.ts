import { t6_1 } from './Emil_Domagala_Homework6';
import { expect, test } from 'vitest';


test('should return correct translation', () => {
  expect(t6_1.localize('en', 'greet')).toBe('Hello');
  expect(t6_1.localize('fr', 'intro')).toBe('Bienvenue sur notre site web');
});
