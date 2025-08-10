import { it, expect, vi, describe, beforeEach } from 'vitest';
import { Graph } from './Emil_Domagala_Homework9';

describe('Graph', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
  });

  it('adds vertices', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    expect(graph.getVertices()).toEqual(['A', 'B']);
  });

  it('adds undirected edges', () => {
    graph.addEdge('A', 'B', 2);
    expect(graph.getNeighbors('A')).toEqual([{ node: 'B', weight: 2 }]);
    expect(graph.getNeighbors('B')).toEqual([{ node: 'A', weight: 2 }]);
  });

  it('adds directed edges', () => {
    graph.addEdge('A', 'B', 3, true);
    expect(graph.getNeighbors('A')).toEqual([{ node: 'B', weight: 3 }]);
    expect(graph.getNeighbors('B')).toEqual([]); // no reverse edge
  });

  it('returns empty neighbors for non-existent vertex', () => {
    expect(graph.getNeighbors('X')).toEqual([]);
  });

  it('performs DFS correctly', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'D');
    expect(graph.dfs('A')).toEqual(['A', 'B', 'C', 'D']);
  });

  it('performs BFS correctly', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'D');
    expect(graph.bfs('A')).toEqual(['A', 'B', 'D', 'C']);
  });

  describe('shortestPathBFS', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('A', 'D');
    });

    it('finds shortest path in unweighted graph', () => {
      expect(graph.shortestPathBFS('A', 'C')).toEqual(['A', 'B', 'C']);
    });

    it('returns null if no path exists', () => {
      graph.addVertex('X');
      expect(graph.shortestPathBFS('A', 'X')).toBeNull();
    });
  });

  describe('shortestPathDijkstra', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B', 2);
      graph.addEdge('B', 'C', 2);
      graph.addEdge('A', 'C', 5);
    });

    it('finds shortest path in weighted graph', () => {
      expect(graph.shortestPathDijkstra('A', 'C')).toEqual({
        distance: 4,
        path: ['A', 'B', 'C'],
      });
    });

    it('returns null if no path exists', () => {
      graph.addVertex('X');
      expect(graph.shortestPathDijkstra('A', 'X')).toBeNull();
    });

    it('handles case where start and end are the same', () => {
      expect(graph.shortestPathDijkstra('A', 'A')).toEqual({
        distance: 0,
        path: ['A'],
      });
    });
  });
});
