import View from "./view-utils.js";
class Library {
  constructor() {
    this.listConfig = {
      keys: ["title", "author", "lender", "borrower", "actions"],
    };
    this._books = [
      {
        title: "A brief history of time",
        author: "Stephen Hawking",
        lender: "user1",
        borrower: false,
        actions: [],
        requestedBy: false,
      },
      {
        title: "Tao of physics",
        author: "Fritjof Capra",
        lender: "user1",
        borrower: "user2",
        actions: [],
        requestedBy: false,
      },
      {
        title: "Adventures of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        lender: "user2",
        borrower: "user1",
        actions: [],
        requestedBy: "user3",
      },
    ];
    this.grid = document.getElementById("library");
    this.handleAction = this.handleAction.bind(this);
    this.add = this.add.bind(this);
  }
  get books() {
    const books =
      sessionStorage.getItem("books") || JSON.stringify(this._books);
    return JSON.parse(books);
  }

  set user(session) {
    this._user = session;
    this.list();
  }
  get user() {
    return this._user;
  }

  getActions(book) {
    let actions = [];
    const isLender = book.lender === this.user.name;
    if (!isLender) {
      const isBorrower = book.borrower === this.user.name;
      if (isBorrower) {
        actions.push("return");
      } else {
        const isBorrowed = book.borrower || false;
        if (isBorrowed) {
          actions.push("request");
        } else {
          actions.push("borrow");
        }
      }
    }
    return actions;
  }

  commit(index, book) {
    const newList = this.books.slice(0, this.books.length);
    if (index) {
      const committable = Object.assign(this.books[index], { ...book });
      newList.splice(index, 1, committable);
    } else {
      newList.push(book);
    }
    sessionStorage.setItem("books", JSON.stringify(newList));
  }

  handleAction(e) {
    const name = e.target.name || "";
    const [action, cellId, rowId] = name.split("#");
    const [, index] = rowId.split("-");
    const book = this.books[index] ? { ...this.books[index] } : false;
    let peer;
    let actor;
    if (book) {
      switch (action) {
        case "borrow":
          book.borrower = this.user.name;
          peer = document.querySelectorAll(`#${rowId}-borrower`)[0];
          if (peer) {
            actor = View.create("BUTTON");
            View.addClass(actor, "actor");
            View.set(actor, "name", `return#${cellId}#${rowId}`);
            actor.textContent = "Return";
            actor.onclick = this.handleAction;
            peer.textContent = `${this.user.name}`;
            document.querySelector(`#${cellId}`).innerHTML = "";
            document.querySelector(`#${cellId}`).appendChild(actor);
          }
          break;
        case "request":
          book.requestedBy = this.user.name;
          document.querySelector(
            `#${cellId}`
          ).innerHTML = `Requested by ${this.user.name}`;
          break;
        case "return":
          peer = document.querySelectorAll(`#${rowId}-borrower`)[0];
          book.borrower = false;
          if (peer) {
            actor = View.create("BUTTON");
            View.addClass(actor, "actor");
            View.set(actor, "name", `borrow#${cellId}#${rowId}`);
            actor.textContent = "Borrow";
            actor.onclick = this.handleAction;
            peer.textContent = "";
            document.querySelector(`#${cellId}`).innerHTML = "";
            document.querySelector(`#${cellId}`).appendChild(actor);
          }
          break;
        default:
          break;
      }
    }
    this.commit(index, book);
  }

  renderAction(action, book, cellId, rowId) {
    let actor = "";
    switch (action) {
      case "borrow":
        actor = View.create("BUTTON");
        View.addClass(actor, "actor");
        View.set(actor, "name", `borrow#${cellId}#${rowId}`);
        actor.textContent = "Borrow";
        actor.onclick = this.handleAction;
        break;
      case "request":
        if (book.requestedBy === false) {
          actor = View.create("BUTTON");
          View.addClass(actor, "actor");
          View.set(actor, "name", `request#${cellId}#${rowId}`);
          actor.textContent = "request";
          actor.onclick = this.handleAction;
        } else {
          actor = View.create("SPAN");
          actor.textContent = "requested by " + book.requestedBy;
        }
        break;
      case "return":
        actor = View.create("BUTTON");
        View.addClass(actor, "actor");
        View.set(actor, "name", `return#${cellId}#${rowId}`);
        actor.textContent = "Return";
        actor.onclick = this.handleAction;
        break;
      default:
        actor = View.create("SPAN");
        break;
    }
    if (!this.user.name) {
      View.set(actor, "disabled", true);
    }
    return actor;
  }

  add(e) {
    e.preventDefault();
    const book = Object.fromEntries(new FormData(e.target).entries());
    e.target.reset();
    if (
      this.books.filter(
        (b) => b.title.toLowerCase() === book.title.toLowerCase()
      ).length > 0
    ) {
      throw new Error("already exists");
    }
    book.lender = this.user.name;
    book.requestedBy = false;
    this.commit(false, book);
    this.list();
  }
  list() {
    this.grid.innerHTML = "";
    const table = View.create("DIV");
    View.addClass(table, "table");
    const tHead = View.create("DIV");
    View.addClass(tHead, "head");
    this.listConfig.keys.forEach((key) => {
      const cell = View.create("DIV");
      View.addClass(cell, "cell");
      cell.textContent = `${key}`;
      tHead.appendChild(cell);
    });
    table.appendChild(tHead);
    this.books.forEach((book, index) => {
      const row = View.create("DIV");
      View.addClass(row, "row");
      const rowId = `book-${index}`;
      View.set(row, "id", rowId);
      this.listConfig.keys.forEach((key) => {
        const cell = View.create("DIV");
        View.addClass(cell, "cell");
        const cellId = `book-${index}-${key}`;
        View.set(cell, "id", cellId);
        if (key !== "actions") {
          cell.textContent = `${book[key] || "--"}`;
        } else {
          const actions = this.getActions(book);
          actions.forEach((action) =>
            cell.appendChild(this.renderAction(action, book, cellId, rowId))
          );
        }
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
    if (this.user.name) {
      const Form = View.create("FORM");
      View.set(Form, "id", `add-new-book`);
      View.set(Form, "novalidate", true);
      Form.onsubmit = this.add;
      const row = View.create("DIV");
      View.addClass(row, "row");
      Form.appendChild(row);
      this.listConfig.keys.forEach((key) => {
        const cell = View.create("DIV");
        View.addClass(cell, "cell");
        if (key === "title" || key === "author") {
          const input = View.create("INPUT");
          View.set(input, "type", "text");
          View.set(input, "name", key);
          View.addClass(input, "add-input");
          cell.appendChild(input);
        } else if (key === "lender") {
          const text = View.create("SPAN");
          text.textContent = this.user.name;
          cell.appendChild(text);
        } else {
          if (key === "actions") {
            const submit = View.create("BUTTON");
            View.set(submit, "name", "add");
            View.addClass(submit, "actor");
            submit.textContent = "Add book";
            cell.appendChild(submit);
          }
        }
        row.appendChild(cell);
      });
      table.appendChild(Form);
    }
    this.grid.appendChild(table);
  }
}
export default new Library();
