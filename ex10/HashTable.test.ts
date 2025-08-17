import { describe, expect, test } from 'vitest';
import { HashTable_10 } from './Emil_Domagala_Homework10';

describe('HashTable_10 basic tests', () => {
  test('insert and get value works correct', () => {
    const ht = new HashTable_10(10);

    ht.set({ key: 'apple', val: 'red' });
    ht.set({ key: 'banana', val: 'yellow' });

    expect(ht.get('apple')).toBe('red');
    expect(ht.get('banana')).toBe('yellow');
    expect(ht.get('cherry')).toBeUndefined();
  });

  test('update existing key should overvrite value', () => {
    const ht = new HashTable_10(10);
    ht.set({ key: 'dog', val: 'bark' });
    ht.set({ key: 'dog', val: 'woof' });

    expect(ht.get('dog')).toBe('woof');
  });

  test('deletes should delete key if found and return true and false if key not found', () => {
    const ht = new HashTable_10(10);

    ht.set({ key: 'car', val: 'blue' });
    ht.set({ key: 'bike', val: 'green' });

    expect(ht.delete('car')).toBe(true);
    expect(ht.get('car')).toBeUndefined();

    expect(ht.delete('plane')).toBe(false);
  });

  test('handle collision correctly', () => {
    const ht = new HashTable_10(1);

    ht.set({ key: 'a', val: '1' });
    ht.set({ key: 'b', val: '2' });
    ht.set({ key: 'c', val: '3' });

    // all should still be retrievable
    expect(ht.get('a')).toBe('1');
    expect(ht.get('b')).toBe('2');
    expect(ht.get('c')).toBe('3');
  });
});
