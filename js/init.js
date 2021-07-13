import User from "./user.js";
import Library from "./books.js";
const sessionMgmt = (function () {
  const loginForm = document.querySelector("#login");
  const logoutAction = document.querySelector("#logout");
  const userName = document.querySelector("#user");
  function lock() {
    loginForm.reset();
    loginForm.classList.remove("hide");
    loginForm.classList.add("show");
    logoutAction.classList.remove("show");
    logoutAction.classList.add("hide");
    userName.textContent = "User !";
    Library.user = {};
  }
  function unlock() {
    const session = JSON.parse(sessionStorage.getItem("libuser") || "{}");
    loginForm.classList.remove("show");
    loginForm.classList.add("hide");
    logoutAction.classList.remove("hide");
    logoutAction.classList.add("show");
    userName.textContent = `${session.name || ""} !!!`;
    Library.user = { ...session };
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const entries = Object.fromEntries(new FormData(e.target).entries());
    sessionStorage.setItem("libuser", JSON.stringify(new User(entries.name)));
    sessionMgmt.unlock();
  });
  logoutAction.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("libuser");
    sessionMgmt.lock();
  });

  return { lock, unlock };
})();
document.addEventListener("DOMContentLoaded", function (e) {
  const session = JSON.parse(sessionStorage.getItem("libuser") || "{}");
  if (session.name) {
    sessionMgmt.unlock();
  } else {
    sessionMgmt.lock();
  }
});
