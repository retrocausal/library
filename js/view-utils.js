export default {
  create(name) {
    const element = document.createElement(name);
    return element;
  },
  set(element, name, value) {
    element.setAttribute(name, value);
  },
  addClass(element, className) {
    element.classList.add(className);
  },
  removeClass(element, className) {
    element.classList.remove(className);
  },
};
