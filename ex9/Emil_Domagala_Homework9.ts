export class Stack<T extends number | string> {
  private values: T[] = [];
  private minVal: T | undefined = undefined;
  private maxVal: T | undefined = undefined;
  constructor() {}

  push(value: T): void {
    if (this.values.includes(value)) return;
    this.values.push(value);
    this.minVal = this.minVal === undefined ? value : this.minVal > value ? value : this.minVal;
    this.maxVal = this.maxVal === undefined ? value : this.maxVal < value ? value : this.maxVal;
  }
  peek(): T | undefined {
    return this.values[this.values.length - 1];
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    // Get last element
    const lastValue = this.values.pop();
    // If last element wasnt min or max just return it
    if (lastValue !== this.minVal && lastValue !== this.maxVal) return lastValue;
    // if after deleting lat element nothing left reset min and max
    if (this.isEmpty()) {
      this.minVal = undefined;
      this.maxVal = undefined;
      return lastValue;
    }

    // If last element was min then find new min
    if (lastValue === this.minVal) {
      this.minVal = undefined;
      this.values.forEach((i) => (this.minVal = this.minVal === undefined ? i : this.minVal > i ? i : this.minVal));
    }
    // If last element was max then find new max
    if (lastValue === this.maxVal) {
      this.maxVal = undefined;
      this.values.forEach((i) => (this.maxVal = this.maxVal === undefined ? i : this.maxVal < i ? i : this.maxVal));
    }
    return lastValue;
  }
  getMin(): T | undefined {
    return this.minVal;
  }
  getMax(): T | undefined {
    return this.maxVal;
  }
  isEmpty(): boolean {
    return this.values.length === 0;
  }
}

export class Queue<T> {
  private values: T[] = [];
  constructor() {}
  enqueue(value: T): void {
    this.values.push(value);
  }
  dequeue(): T | undefined {
    return this.values.shift();
  }
  isEmpty(): boolean {
    return this.values.length === 0;
  }
  peek(): T | undefined {
    return this.values[0];
  }
}

export class BinaryTree<T> {
  value: T;
  left: BinaryTree<T> | null;
  right: BinaryTree<T> | null;
}
export class Graph<T> {
  private value: T;
  private edges: Graph<T>[];
  constructor(value: T) {
    this.value = value;
    this.edges = [];
  }
  getValue(): T {
    return this.value;
  }
  setValue(value: T): void {
    this.value = value;
  }
  addEdge(edge: Graph<T>): void {
    this.edges.push(edge);
  }
  getEdges(): Graph<T>[] {
    return this.edges;
  }
}

// LINKED LIST

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;
  length: number = 0;
  constructor() {}
  insert(value: T): void {
    const newNode = new Node(value);
    // If no head create it
    if (!this.head) {
      this.head = newNode;
      this.length++;
      return;
    }
    let curr = this.head;
    // Find last node
    while (curr.next) {
      curr = curr.next;
    }
    // Insert new node at the end
    curr.next = newNode;
    this.length++;
  }
  remove(value: T): void {
    if (!this.head) return;
    // If deleted node is head drop link and setup new head
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    // If deleted node is in the middle drop link from prev
    let curr: Node<T> | null = this.head;
    let prev: Node<T> | null = null;
    while (curr) {
      if (curr.value === value) {
        prev!.next = curr.next;
        curr.next = null;
        this.length--;
        return;
      }
      prev = curr;
      curr = curr.next;
    }
  }
  search(value: T): Node<T> | null {
    if (!this.head) return null;

    let curr: Node<T> | null = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }

    return null;
  }
  isCycle(): boolean {
    if (!this.head) return false;

    let slow = this.head;
    let fast: Node<T> | null = this.head;

    while (fast && fast.next) {
      slow = slow.next!;
      fast = fast.next.next;
      if (slow === fast) return true;
    }

    return false;
  }
}
