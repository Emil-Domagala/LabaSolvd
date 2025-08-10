import { test, expect, vi, describe, beforeEach } from 'vitest';
import { Queue } from './Emil_Domagala_Homework9';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('should be empty initially', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBeUndefined();
  });

  test('should enqueue elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.isEmpty()).toBe(false);
    expect(queue.peek()).toBe(1);
  });

  test('should dequeue elements in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should return undefined when dequeueing from empty queue', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  test('should peek without removing the first element', () => {
    queue.enqueue(5);
    queue.enqueue(10);

    expect(queue.peek()).toBe(5);
    expect(queue.dequeue()).toBe(5);
    expect(queue.peek()).toBe(10);
  });

  test('should handle string values', () => {
    const stringQueue = new Queue<string>();

    stringQueue.enqueue('apple');
    stringQueue.enqueue('banana');

    expect(stringQueue.peek()).toBe('apple');
    expect(stringQueue.dequeue()).toBe('apple');
    expect(stringQueue.dequeue()).toBe('banana');
  });
});
