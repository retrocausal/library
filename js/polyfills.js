Function.prototype.tie = function (knot, ...params) {
  const func = this;
  return function (...args) {
    return func.apply(knot, ...args, ...params);
  };
};
Array.prototype.deflate = function (depth = 1) {
  let array = this.slice(0);
  function flatten(arr) {
    let elements = [];
    for (const elem of arr) {
      if (elem instanceof Array) {
        elements.push(...elem);
      } else elements.push(elem);
    }
    return elements;
  }
  do {
    array = flatten(array);
    depth--;
  } while (depth);
  return array;
};
const obj1 = {
  name: "Ayn Rand",
  title: "Author",
};
function greet() {
  console.log(`Hi I am ${this.name}, and I am a/an ${this.title}`);
}
greet();
greet.tie(obj1)();
const nestedArr = [1, 2, [3, 4, [5, 6]]];
console.log(nestedArr.deflate());
// expected output: [1, 2, 3, 4, [5, 6]]

const moreNested = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(moreNested, moreNested.deflate(20));
// expected output: [1, 2, 3, 4, 5, 6]
