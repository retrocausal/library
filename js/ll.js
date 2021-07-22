class Node {
  constructor(value, unidirectional = false) {
    this.value = value;
    this.unidirectional = unidirectional;
  }
  set next(node) {
    if (node instanceof Node === false && node !== null) {
      throw new Error("Not a Node");
    }
    this._next = node;
  }
  get next() {
    return this._next;
  }
  set prev(node) {
    if (this.unidirectional) {
      throw new Error("Cant set prev on a singly linked list");
    }
    if (node instanceof Node === false) {
      throw new Error("Not a Node");
    }
    this._prev = node;
  }
  get prev() {
    return this._prev;
  }
}

export function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}
SinglyLinkedList.prototype = {
  node(value) {
    return new Node(value, true);
  },
  push(value) {
    const node = this.node(value);
    node.next = null;
    switch (this.size) {
      case 0:
        this.head = node;
        this.tail = this.head;
        break;
      default:
        this.tail.next = node;
        this.tail = node;
        break;
    }
    this.size++;
    return this;
  },
  unshift(value) {
    const node = this.node(value);
    switch (this.size) {
      case 0:
        this.head = node;
        this.tail = this.head;
        break;
      default:
        node.next = this.head;
        this.head = node;
        break;
    }
    this.size++;
    return this;
  },
  get(index) {
    if (index >= this.size || index < 0) {
      return false;
    } else if (index === 0) {
      return this.head;
    } else if (index === this.size - 1) {
      return this.tail;
    } else {
      let i = 0;
      let current = this.head;
      while (i < index) {
        current = current.next;
        i++;
      }
      return current;
    }
  },
  insert(index, value) {
    let temp, node;
    switch (index > this.size || index < 0) {
      case true:
        throw new Error("Index out of bounds");
      default:
        switch (index) {
          case 0:
            this.unshift(value);
            break;
          case this.size:
            this.push(value);
            break;
          default:
            temp = this.get(index - 1);
            node = this.node(value);
            node.next = temp.next;
            temp.next = node;
            this.size++;
            break;
        }
        break;
    }
    return this;
  },
  shift() {
    let node;
    switch (this.size) {
      case 0:
        throw new Error("List is empty");
      case 1:
        node = this.head;
        this.head = null;
        this.tail = null;
        break;
      default:
        node = this.head;
        this.head = this.head.next;
        node.next = null;
        break;
    }
    this.size--;
    return node;
  },
  pop() {
    let node;
    switch (this.size) {
      case 0:
        throw new Error("List is empty");
      case 1:
        node = this.head;
        this.head = null;
        this.tail = null;
        break;
      default:
        node = this.tail;
        this.tail = this.get(this.size - 2);
        this.tail.next = null;
        break;
    }
    this.size--;
    return node;
  },
  remove(index) {
    if (index >= this.size || index < 0) {
      throw new Error("Index out of bounds");
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.size - 1) {
      return this.pop();
    } else {
      const node = this.get(index);
      const prev = this.get(index - 1);
      prev.next = node.next;
      node.next = null;
      this.size--;
      return node;
    }
  },
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;
    let i = 0;
    while (i < this.size) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      i++;
    }
    current = this.head;
    this.head = this.tail;
    this.tail = current;
    return this;
  },
};
const sll = new SinglyLinkedList();
sll.push(1).unshift(2).push(3).unshift(4);
console.log(sll, sll.reverse());

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  node(value) {
    return new Node(value);
  }
  push(value) {
    const node = this.node(value);
    switch (this.size) {
      case 0:
        this.head = node;
        this.tail = this.head;
        break;

      default:
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        break;
    }
    this.size++;
    return this;
  }
  unshift(value) {
    const node = this.node(value);
    switch (this.size) {
      case 0:
        this.head = node;
        this.tail = this.head;
        break;
      default:
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
        break;
    }
    this.size++;
    return this;
  }
  pop() {
    let node;
    switch (this.size) {
      case 0:
        throw new Error("List is Empty");
      case 1:
        node = this.head;
        this.head = null;
        this.tail = null;
        break;
      default:
        node = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        node.prev = null;
        break;
    }
    this.size--;
    return node;
  }
  shift() {
    let node;
    switch (this.size) {
      case 0:
        throw new Error("List is Empty");
      case 1:
        node = this.head;
        this.head = null;
        this.tail = null;
        break;
      default:
        node = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        node.next = null;
        break;
    }
    this.size--;
    return node;
  }
  get(index) {
    if (index >= this.size || index < 0) {
      throw new Error("Index out of bounds");
    } else if (index === 0) {
      return this.head;
    } else if (index === this.size - 1) {
      return this.tail;
    } else {
      const tailDiff = this.size - index;
      const headDiff = index;
      let current;
      let i = 0;
      if (headDiff < tailDiff) {
        current = this.head;
        while (i < index) {
          current = current.next;
          i++;
        }
      } else {
        i = this.size;
        current = this.tail;
        while (i > index) {
          current = current.prev;
          i--;
        }
      }
      return current;
    }
  }
  insert(index, value) {
    if (index > this.size || index < 0) {
      throw new Error("Index out of bounds");
    } else if (index === 0) {
      return this.unshift(value);
    } else if (index === this.size) {
      return this.push(value);
    } else {
      const replace = this.get(index);
      const node = this.node(value);
      node.prev = replace.prev;
      node.next = replace;
      replace.prev = node;
      this.size++;
      return this;
    }
  }
  remove(index) {
    if (index >= this.size || index < 0) {
      throw new Error("Index out of bounds");
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.size - 1) {
      return this.pop();
    } else {
      const prev = this.get(index - 1);
      const node = prev.next;
      prev.next = node.next;
      node.next.prev = prev;
      node.prev = null;
      node.next = null;
      this.size--;
      return node;
    }
  }

  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;
    let i = 0;
    while (i < this.size) {
      next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
      i++;
    }
    current = this.tail;
    this.tail = this.head;
    this.head = current;
    return this;
  }
}

export const Stack = (function () {
  const struct = new SinglyLinkedList();
  let head = struct.head;
  function Stack() {
    this.size = 0;
  }
  Stack.prototype = {
    push(value) {
      struct.unshift(value);
      head = struct.head;
      this.size = struct.size;
      return this;
    },
    pop() {
      const node = struct.shift();
      head = struct.head;
      this.size = struct.size;
      return node ? node.value : false;
    },
    get head() {
      if (this.size < 1) {
        return null;
      }
      return head.value;
    },
    set head(v) {
      return false;
    },
  };
  return Stack;
})();

export const Queue = (function () {
  const struct = new SinglyLinkedList();
  let first = null;
  function Queue() {
    this.size = 0;
  }
  Queue.prototype = {
    get first() {
      return first;
    },
    set first(v) {
      return false;
    },
    enqueue(v) {
      struct.push(v);
      first = struct.head;
      this.size++;
      return this;
    },
    dequeue() {
      const node = struct.shift();
      first = struct.head;
      this.size = struct.size;
      return node ? node.value : false;
    },
  };
  return Queue;
})();

const s1 = new Stack();
s1.push("hello");
s1.push("world");
s1.push("I");
s1.push("Am");
s1.push("Legend");
console.log(s1);
s1.pop();
s1.pop();
s1.pop();
s1.pop();
s1.pop();
console.log(s1);
