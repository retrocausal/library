class MaxBinaryHeap {
  constructor(type) {
    this.nodes = [];
    this.size = 0;
  }
  parent(index) {
    return Math.floor(Math.abs((index - 1) / 2));
  }
  children(index) {
    return [Math.round(2 * index + 1), Math.round(2 * index + 2)];
  }
  sort() {
    let child = this.nodes.length - 1;
    let parent = this.parent(child);
    do {
      if (this.nodes[parent] < this.nodes[child]) {
        const temp = this.nodes[parent];
        this.nodes[parent] = this.nodes[child];
        this.nodes[child] = temp;
        child = parent;
        parent = this.parent(child);
      } else {
        break;
      }
    } while (child > 0);
  }
  insert(value) {
    this.nodes.push(value);
    this.sort();
    return this;
  }
  extractMax() {
    const root = this.nodes[0];
    this.nodes[0] = this.nodes.pop();
    let parent = 0;
    let children = this.children(parent);
    do {
      if (
        this.nodes[parent] < this.nodes[children[0]] &&
        this.nodes[parent] < this.nodes[children[1]]
      ) {
        const maxChildIndex =
          this.nodes[children[0]] > this.nodes[children[1]]
            ? children[0]
            : children[1];
        const temp = this.nodes[maxChildIndex];
        this.nodes[maxChildIndex] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = maxChildIndex;
        children = this.children(parent);
      } else if (this.nodes[parent] < this.nodes[children[1]]) {
        const temp = this.nodes[children[1]];
        this.nodes[children[1]] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = children[1];
        children = this.children(parent);
      } else if (this.nodes[parent] < this.nodes[children[0]]) {
        const temp = this.nodes[children[0]];
        this.nodes[children[0]] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = children[0];
        children = this.children(parent);
      } else {
        break;
      }
    } while (
      children[0] < this.nodes.length &&
      children[1] < this.nodes.length
    );
    return root;
  }
}
class MinBinaryHeap {
  constructor(type) {
    this.nodes = [];
    this.size = 0;
  }
  parent(index) {
    return Math.floor(Math.abs((index - 1) / 2));
  }
  children(index) {
    return [Math.round(2 * index + 1), Math.round(2 * index + 2)];
  }
  bubbleDown() {
    let parent = 0;
    let children = this.children(parent);
    do {
      if (
        this.nodes[parent] > this.nodes[children[0]] &&
        this.nodes[parent] > this.nodes[children[1]]
      ) {
        const minChildIndex =
          this.nodes[children[0]] < this.nodes[children[1]]
            ? children[0]
            : children[1];
        const temp = this.nodes[minChildIndex];
        this.nodes[minChildIndex] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = minChildIndex;
        children = this.children(parent);
      } else if (this.nodes[parent] > this.nodes[children[1]]) {
        const temp = this.nodes[children[1]];
        this.nodes[children[1]] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = children[1];
        children = this.children(parent);
      } else if (this.nodes[parent] > this.nodes[children[0]]) {
        const temp = this.nodes[children[0]];
        this.nodes[children[0]] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = children[0];
        children = this.children(parent);
      } else {
        break;
      }
    } while (
      children[0] < this.nodes.length &&
      children[1] < this.nodes.length
    );
  }

  sort() {
    let child = this.nodes.length - 1;
    let parent = this.parent(child);
    do {
      if (this.nodes[child] < this.nodes[parent]) {
        const temp = this.nodes[child];
        this.nodes[child] = this.nodes[parent];
        this.nodes[parent] = temp;
        child = parent;
        parent = this.parent(child);
      } else {
        break;
      }
    } while (child > 0);
  }

  insert(value) {
    this.nodes.push(value);
    this.sort();
    return this;
  }
  extractMin() {
    const root = this.nodes[0];
    this.nodes[0] = this.nodes.pop();
    this.bubbleDown();
    return root;
  }
}

class PriorityQ {
  constructor() {
    this.nodes = [];
  }
  node(value, priority) {
    return { value, priority };
  }
  parent(index) {
    return Math.floor(Math.abs((index - 1) / 2));
  }
  children(index) {
    return [index * 2 + 1, index * 2 + 2];
  }
  sort() {
    let child = this.nodes.length - 1;
    let parent = this.parent(child);
    do {
      if (this.nodes[child].priority > this.nodes[parent].priority) {
        break;
      }
      const temp = this.nodes[child];
      this.nodes[child] = this.nodes[parent];
      this.nodes[parent] = temp;
      child = parent;
      parent = this.parent(child);
    } while (child > 0);
  }

  bubbleDown() {
    let parent = 0;
    let children = this.children(parent);
    while (
      this.nodes[children[0]] &&
      this.nodes[children[1]] &&
      children[0] < this.nodes.length &&
      children[1] < this.nodes.length
    ) {
      if (
        this.nodes[parent].priority > this.nodes[children[0]].priority &&
        this.nodes[parent].priority > this.nodes[children[1]].priority
      ) {
        const minChildIndex =
          this.nodes[children[0]].priority < this.nodes[children[1]].priority
            ? children[0]
            : children[1];
        const temp = this.nodes[minChildIndex];
        this.nodes[minChildIndex] = this.nodes[parent];
        this.nodes[parent] = temp;
        parent = minChildIndex;
        children = this.children(parent);
      } else {
        if (this.nodes[parent].priority > this.nodes[children[0]].priority) {
          const temp = this.nodes[children[0]];
          this.nodes[children[0]] = this.nodes[parent];
          this.nodes[parent] = temp;
          parent = children[0];
          children = this.children(parent);
        } else if (
          this.nodes[parent].priority > this.nodes[children[1]].priority
        ) {
          const temp = this.nodes[children[1]];
          this.nodes[children[1]] = this.nodes[parent];
          this.nodes[parent] = temp;
          parent = children[1];
          children = this.children(parent);
        } else {
          break;
        }
      }
    }
  }
  enqueue({ value, priority }) {
    this.nodes.push(this.node(value, priority));
    if (this.nodes.length > 1) {
      this.sort();
    }
    return this;
  }
  dequeue() {
    const root = this.nodes[0];
    this.nodes[0] = this.nodes.pop();
    this.bubbleDown();
    return root;
  }
}

const maxbh = new MaxBinaryHeap();
//[100, 2, -1, -10, 200, 24, 12, 36, 48, 120, 28, 128, -9, 99]
[41, 39, 33, 18, 27, 12, 55].map((v) => maxbh.insert(v));
console.log(maxbh.nodes);
maxbh.extractMax();
console.log(maxbh.nodes);
const minbh = new MinBinaryHeap();
//[100, 2, -1, -10, 200, 24, 12, 36, 48, 120, 28, 128, -9, 99]
[41, 39, 33, 18, 27, 12, 55].map((v) => minbh.insert(v));
console.log(minbh.nodes);
minbh.extractMin();
console.log(minbh.nodes);
/**
 *                       -10
 *              -1                -9
 *         36        28         2     12
        100  48  200  120   128  24  99
        
 */

const pq = new PriorityQ();
[
  { value: 1, priority: 41 },
  { value: 2, priority: 39 },
  { value: 3, priority: 33 },
  { value: 4, priority: 18 },
  { value: 5, priority: 27 },
  { value: 6, priority: 12 },
  { value: 6, priority: 55 },
].map((o) => pq.enqueue(o));
console.log(pq.nodes.map((p) => p.priority));
pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));

pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));

pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));

pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));

pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));
pq.dequeue();
console.log(pq.nodes.map((p) => p.priority));
