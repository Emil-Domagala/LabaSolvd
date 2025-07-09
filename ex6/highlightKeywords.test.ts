import { t6_2 } from './Emil_Domagala_Homework6';
import { expect, test} from 'vitest';

test('should return output', () => {
  const template = 'Learn ${0} tagged custom ${1} for ${2} manipulation.';
  const keywords = ['tagged', 'custom', 'manipulation'];
  const expected = `Learn <span class="highlight">${keywords[0]}</span> tagged custom <span class="highlight">${keywords[1]}</span> for <span class="highlight">${keywords[2]}</span> manipulation.`;

  expect(t6_2.highlightKeywords(keywords, template)).toBe(expected);
});

test('should return error', () => {
  const template = 'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.';
  const keywords = ['tagged', 'custom'];
  try {
    t6_2.highlightKeywords(keywords, template);
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
});
