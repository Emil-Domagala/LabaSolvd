// STACK (LIFO) - stores unique numbers or strings
// push: O(n) time (because of includes), O(1) space
// pop: O(n) time (may scan for min/max), O(1) space
// getMin/getMax: O(1) time, O(1) space
export class Stack<T extends number | string> {
  private values: T[] = [];
  private minVal: T | undefined = undefined;
  private maxVal: T | undefined = undefined;

  push(value: T): void {
    if (this.values.includes(value)) return; // O(n) check for duplicates
    this.values.push(value);
    this.minVal = this.minVal === undefined ? value : this.minVal > value ? value : this.minVal;
    this.maxVal = this.maxVal === undefined ? value : this.maxVal < value ? value : this.maxVal;
  }

  peek(): T | undefined {
    return this.values[this.values.length - 1];
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const lastValue = this.values.pop();

    // If popped value was min or max, recalc in O(n)
    if (lastValue === this.minVal) {
      this.minVal = undefined;
      this.values.forEach((v) => {
        this.minVal = this.minVal === undefined ? v : this.minVal > v ? v : this.minVal;
      });
    }
    if (lastValue === this.maxVal) {
      this.maxVal = undefined;
      this.values.forEach((v) => {
        this.maxVal = this.maxVal === undefined ? v : this.maxVal < v ? v : this.maxVal;
      });
    }
    if (this.values.length === 0) {
      this.minVal = undefined;
      this.maxVal = undefined;
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

// QUEUE (FIFO)
// enqueue: O(1), dequeue: O(n) (shift operation)
// peek: O(1)
export class Queue<T> {
  private values: T[] = [];
  enqueue(value: T): void {
    this.values.push(value);
  }
  dequeue(): T | undefined {
    return this.values.shift(); // O(n) because shift reindexes array
  }
  isEmpty(): boolean {
    return this.values.length === 0;
  }
  peek(): T | undefined {
    return this.values[0];
  }
}

// BINARY TREE
// insert/search: O(n) in worst case (not balanced)
// traversals: O(n) time and O(n) space for recursion stack and result
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    // Level order insert: O(n)
    const queue: (TreeNode<T> | null)[] = [this.root];
    while (queue.length) {
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

  search(value: T): TreeNode<T> | null {
    if (!this.root) return null;
    const stack: TreeNode<T>[] = [this.root];
    while (stack.length) {
      const curr = stack.pop()!;
      if (curr.value === value) return curr;
      if (curr.right) stack.push(curr.right);
      if (curr.left) stack.push(curr.left);
    }
    return null;
  }

  inOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    return result;
  }

  preOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  postOrder(node: TreeNode<T> | null = this.root, result: T[] = []): T[] {
    if (!node) return result;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    return result;
  }

  static isBST(node: TreeNode<number> | null, min = -Infinity, max = Infinity): boolean {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return this.isBST(node.left, min, node.value) && this.isBST(node.right, node.value, max);
  }
}

// GRAPH using adjacency list
// addVertex/addEdge: O(1)
// DFS/BFS: O(V + E) time and space
// Shortest path BFS (unweighted): O(V + E)
// Shortest path Dijkstra (weighted): O(V^2) naive implementation
type Edge<T> = { node: T; weight: number };

export class Graph<T> {
  private adjacencyList: Map<T, Edge<T>[]> = new Map();

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: T, vertex2: T, weight = 1, directed = false): void {
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);

    this.adjacencyList.get(vertex1)!.push({ node: vertex2, weight });
    if (!directed) {
      this.adjacencyList.get(vertex2)!.push({ node: vertex1, weight });
    }
  }

  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  getNeighbors(vertex: T): Edge<T>[] {
    return this.adjacencyList.get(vertex) || [];
  }

  dfs(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];
    const dfsRecursive = (v: T) => {
      if (visited.has(v)) return;
      visited.add(v);
      result.push(v);
      for (const neighbor of this.getNeighbors(v)) {
        dfsRecursive(neighbor.node);
      }
    };
    dfsRecursive(start);
    return result;
  }

  bfs(start: T): T[] {
    const visited = new Set<T>();
    const result: T[] = [];
    const queue: T[] = [start];
    visited.add(start);
    while (queue.length) {
      const vertex = queue.shift()!;
      result.push(vertex);
      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }
    return result;
  }

  shortestPathBFS(start: T, end: T): T[] | null {
    const queue: T[] = [start];
    const visited = new Set<T>([start]);
    const prev = new Map<T, T | null>();
    prev.set(start, null);

    while (queue.length) {
      const vertex = queue.shift()!;
      if (vertex === end) break;

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          prev.set(neighbor.node, vertex);
          queue.push(neighbor.node);
        }
      }
    }

    if (!prev.has(end)) return null;

    const path: T[] = [];
    for (let at: T | null = end; at !== null; at = prev.get(at)!) {
      path.push(at);
    }
    return path.reverse();
  }

  shortestPathDijkstra(start: T, end: T): { distance: number; path: T[] } | null {
    const distances = new Map<T, number>();
    const prev = new Map<T, T | null>();
    const visited = new Set<T>();

    for (const vertex of this.getVertices()) {
      distances.set(vertex, Infinity);
      prev.set(vertex, null);
    }
    distances.set(start, 0);

    while (visited.size < this.adjacencyList.size) {
      let current: T | null = null;
      let minDistance = Infinity;

      for (const [vertex, distance] of distances) {
        if (!visited.has(vertex) && distance < minDistance) {
          current = vertex;
          minDistance = distance;
        }
      }

      if (current === null) break;
      visited.add(current);

      for (const neighbor of this.getNeighbors(current)) {
        const alt = distances.get(current)! + neighbor.weight;
        if (alt < distances.get(neighbor.node)!) {
          distances.set(neighbor.node, alt);
          prev.set(neighbor.node, current);
        }
      }
    }

    if (distances.get(end) === Infinity) return null;

    const path: T[] = [];
    for (let at: T | null = end; at !== null; at = prev.get(at)!) {
      path.push(at);
    }
    return { distance: distances.get(end)!, path: path.reverse() };
  }
}

// SINGLY LINKED LIST
// insert: O(n), remove/search: O(n), isCycle: O(n)
export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;
  length: number = 0;

  insert(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.length++;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
    this.length++;
  }

  remove(value: T): void {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    let curr = this.head;
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
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }
    return null;
  }

  isCycle(): boolean {
    if (!this.head) return false;
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next!;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }
}
