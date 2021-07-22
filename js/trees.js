import { Queue } from "./ll.js";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  node(value) {
    return new Node(value);
  }
  find(value) {
    if (this.size < 1) {
      return false;
    }
    let current = this.root;
    while (current instanceof Node) {
      if (value > current.value && current.right instanceof Node) {
        current = current.right;
      } else if (value < current.value && current.left instanceof Node) {
        current = current.left;
      } else {
        if (current.value === value) return current;
        break;
      }
    }
    return false;
  }
  insert(value) {
    if (this.size < 1) {
      this.root = this.node(value);
    } else {
      let current = this.root;
      while (current instanceof Node) {
        if (current.value > value && current.left instanceof Node === false) {
          current.left = this.node(value);
          break;
        } else if (current.value > value && current.left instanceof Node) {
          current = current.left;
        } else if (
          current.value < value &&
          current.right instanceof Node === false
        ) {
          current.right = this.node(value);
          break;
        } else if (current.value < value && current.right instanceof Node) {
          current = current.right;
        } else {
          break;
        }
      }
    }
    this.size++;
  }
  get bfs() {
    const nodeQueue = new Queue();
    nodeQueue.enqueue(this.root);
    let nodes = [];
    while (nodeQueue.size > 0) {
      if (nodeQueue.first.value.left instanceof Node) {
        nodeQueue.enqueue(nodeQueue.first.value.left);
      }
      if (nodeQueue.first.value.right instanceof Node) {
        nodeQueue.enqueue(nodeQueue.first.value.right);
      }
      nodes.push(nodeQueue.dequeue().value);
    }
    return nodes;
  }
  get preOrderedDfs() {
    let nodes = [];
    const traverse = (node) => {
      nodes.push(node.value);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root);
    return nodes;
  }
  get postOrderedDfs() {
    let nodes = [];
    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      nodes.push(node.value);
    };
    traverse(this.root);
    return nodes;
  }
  get orderedDfs() {
    let nodes = [];
    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }
      nodes.push(node.value);
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(this.root);
    return nodes;
  }
}

const bst = new BinarySearchTree();
const bst2 = new BinarySearchTree();
["abc", "ambassador", "bcd", "cde", "def", "efg"].map((str) =>
  bst2.insert(str)
);
bst.insert(10);
bst.insert(100);
bst.insert(1);
bst.insert(11);
bst.insert(2);
bst.insert(3);
bst.insert(65);
bst.insert(-1);
bst.insert(0);
console.log(
  bst,
  bst.find(-12),
  bst.bfs,
  bst.preOrderedDfs,
  bst.postOrderedDfs,
  bst.orderedDfs
);

console.log(
  bst2,
  bst2.find(-12),
  bst2.bfs,
  bst2.preOrderedDfs,
  bst2.postOrderedDfs,
  bst2.orderedDfs
);
