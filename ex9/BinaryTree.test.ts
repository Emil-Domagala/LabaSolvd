import { test, expect, vi, describe, beforeEach } from 'vitest';
import { BinaryTree, TreeNode } from './Emil_Domagala_Homework9';

describe('BinaryTree', () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    tree = new BinaryTree<number>();
  });

  test('should start with null root', () => {
    expect(tree.root).toBeNull();
  });

  test('should insert nodes in level order', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.root?.value).toBe(1);
    expect(tree.root?.left?.value).toBe(2);
    expect(tree.root?.right?.value).toBe(3);
  });

  test('should search for existing node', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    const found = tree.search(2);
    expect(found?.value).toBe(2);
  });

  test('should return null when searching non-existent value', () => {
    tree.insert(1);
    expect(tree.search(99)).toBeNull();
  });

  test('should perform in-order traversal', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.inOrder()).toEqual([2, 1, 3]);
  });

  test('should perform pre-order traversal', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.preOrder()).toEqual([1, 2, 3]);
  });

  test('should perform post-order traversal', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.postOrder()).toEqual([2, 3, 1]);
  });

  test('should validate BST correctly', () => {
    const bstRoot = new TreeNode(10);
    bstRoot.left = new TreeNode(5);
    bstRoot.right = new TreeNode(15);
    expect(BinaryTree.isBST(bstRoot)).toBe(true);

    const invalidRoot = new TreeNode(10);
    invalidRoot.left = new TreeNode(12); // invalid: left > root
    expect(BinaryTree.isBST(invalidRoot)).toBe(false);
  });
});
