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
// QUEUE

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

// Tree

export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue: (TreeNode<T> | null)[] = [this.root];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!curr.left) {
        curr.left = newNode;
        return;
      } else if (!curr.right) {
        curr.right = newNode;
        return;
      } else {
        queue.push(curr.left);
        queue.push(curr.right);
      }
    }
  }

  // DFS Search (returns first match)
  search(value: T): TreeNode<T> | null {
    if (!this.root) return null;

    const stack: TreeNode<T>[] = [this.root];
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (curr.value === value) return curr;
      if (curr.right) stack.push(curr.right);
      if (curr.left) stack.push(curr.left);
    }

    return null;
  }

  // In-order Traversal (Left -> Root -> Right)
  inOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    return result;
  }

  // Pre-order Traversal (Root -> Left -> Right)
  preOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  // Post-order Traversal (Left -> Right -> Root)
  postOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    return result;
  }

  isBST(node: TreeNode<number> | null, min: number = -Infinity, max: number = Infinity): boolean {
    if (!node) return true;

    if (node.value <= min || node.value >= max) return false;

    return this.isBST(node.left, min, node.value) && this.isBST(node.right, node.value, max);
  }
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
