import { Stack } from './Emil_Domagala_Homework9';
import { test, expect, vi, describe, beforeEach } from 'vitest';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should be empty initially', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.getMin()).toBeUndefined();
    expect(stack.getMax()).toBeUndefined();
  });

  test('should push elements and update min/max correctly', () => {
    stack.push(10);
    stack.push(5);
    stack.push(20);

    expect(stack.isEmpty()).toBe(false);
    expect(stack.getMin()).toBe(5);
    expect(stack.getMax()).toBe(20);
    expect(stack.peek()).toBe(20);
  });

  test('should not allow duplicate values', () => {
    stack.push(10);
    stack.push(10); // duplicate
    expect(stack.peek()).toBe(10);
    expect(stack.getMin()).toBe(10);
    expect(stack.getMax()).toBe(10);
  });

  test('should pop elements and update min/max', () => {
    stack.push(10);
    stack.push(5);
    stack.push(20);

    expect(stack.pop()).toBe(20); // max removed
    expect(stack.getMax()).toBe(10);

    expect(stack.pop()).toBe(5); // min removed
    expect(stack.getMin()).toBe(10);

    expect(stack.pop()).toBe(10); // last element
    expect(stack.isEmpty()).toBe(true);
  });

  test('should return undefined when popping from empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });

  test('should handle string values', () => {
    const stringStack = new Stack<string>();
    stringStack.push('banana');
    stringStack.push('apple');
    stringStack.push('pear');

    expect(stringStack.getMin()).toBe('apple'); // lexicographically smallest
    expect(stringStack.getMax()).toBe('pear');
  });
});
