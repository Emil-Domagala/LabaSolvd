import { it, expect, vi, describe, beforeEach } from 'vitest';
import { SinglyLinkedList } from './Emil_Domagala_Homework9';

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  it('inserts nodes correctly and updates length', () => {
    expect(list.length).toBe(0);
    list.insert(1);
    expect(list.head?.value).toBe(1);
    expect(list.length).toBe(1);
    list.insert(2);
    expect(list.length).toBe(2);
    expect(list.head?.next?.value).toBe(2);
  });

  it('removes head node correctly', () => {
    list.insert(1);
    list.insert(2);
    list.remove(1);
    expect(list.head?.value).toBe(2);
    expect(list.length).toBe(1);
  });

  it('removes middle or tail nodes correctly', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);
    list.remove(2);
    expect(list.length).toBe(2);
    expect(list.head?.next?.value).toBe(3);

    // Remove tail
    list.remove(3);
    expect(list.length).toBe(1);
    expect(list.head?.next).toBeNull();
  });

  it('does nothing when removing a non-existent value', () => {
    list.insert(1);
    list.remove(42);
    expect(list.length).toBe(1);
    expect(list.head?.value).toBe(1);
  });

  it('searches for existing and non-existing values', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);

    const node = list.search(2);
    expect(node).not.toBeNull();
    expect(node?.value).toBe(2);

    expect(list.search(42)).toBeNull();
  });

  it('detects no cycle when list is acyclic', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);
    expect(list.isCycle()).toBe(false);
  });

  it('detects cycle when present', () => {
    list.insert(1);
    list.insert(2);
    list.insert(3);

    // create cycle manually: tail.next = head
    let tail = list.head;
    while (tail?.next) tail = tail.next;
    tail!.next = list.head; // cycle

    expect(list.isCycle()).toBe(true);
  });

  it('returns false for isCycle on empty list', () => {
    expect(list.isCycle()).toBe(false);
  });
});
