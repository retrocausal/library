function id(x) {
  return x; // (A)
}
function f(a) {
  let b = a + 1;
  return id(b); // (B)
}
console.log(f(2)); // (C)
