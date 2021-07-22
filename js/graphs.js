import { Queue } from "./ll.js";
class Graph {
  constructor() {
    this.list = {};
  }
  addVertex(vertex) {
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  addEdge(v1, v2) {
    this.list[v1] ? this.list[v1].push(v2) : (this.list[v1] = [v2]);
    this.list[v2] ? this.list[v2].push(v1) : (this.list[v2] = [v1]);
  }
  removeEdge(v1, v2) {
    if (this.list[v1]) {
      this.list[v1] = this.list[v1].filter((v) => v !== v2);
    }
    if (this.list[v2]) {
      this.list[v2] = this.list[v2].filter((v) => v !== v1);
    }
  }
  removeVertex(v) {
    if (this.list[v] instanceof Array) {
      this.list[v].forEach((vertex) => {
        if (this.list[vertex]) {
          this.list[vertex] = this.list[vertex].filter((vtx) => vtx !== v);
        }
      });
      delete this.list[v];
    }
  }
  dfs(node) {
    let traversal = [];
    let seen = {};
    const process = (vertex) => {
      if (!this.list[vertex] || this.list[vertex].length < 1) return false;
      traversal.push(vertex);
      seen[vertex] = true;
      this.list[vertex].forEach((vtx) => {
        if (seen.hasOwnProperty(vtx) === false) {
          process(vtx);
        }
      });
    };
    process(node);
    return traversal;
  }
}
