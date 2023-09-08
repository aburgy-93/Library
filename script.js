"use strict";

const books = document.querySelector(".books");
const addBook = document.querySelector(".add-button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const editBtn = document.querySelector(".edit");

// Opening and closing the modal

addBook.addEventListener("click", function (e) {
  e.preventDefault;

  modal.style.display = "block";
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault;

  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  e.preventDefault;
  if (e.target === modal) {
    document.querySelector(".modal").style.display = "none";
  }
});

// Creating a new Book Object

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
  this.id = Math.floor(Math.random() * 1000000);
}

// Adding the book object to the Library

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
}

//Getting the form data

const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault;

  // Putting form data into data variable
  const data = new FormData(e.target);

  let newBook = {};
  // Need to understand this better
  for (let [name, value] of data) {
    if (name === "book-read") {
      newBook["book-read"] = true;
    } else {
      newBook[name] = value || "";
    }
  }

  if (!newBook["book-read"]) {
    newBook["book-read"] = false;
  }

  addBookToLibrary(
    newBook["book-title"],
    newBook["book-author"],
    newBook["book-pages"],
    newBook["book-read"]
  );
});

let myLibrary = [];

// Local storage

function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem("library")) || [];
  saveAndRenderBooks();
}

// Creating a book element

function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
}

// Displaying the card

function createReadElement(bookItem, book) {
  const read = document.createElement("div");
  read.setAttribute("class", "book-read");
  read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.setAttribute("class", "card-book read-checked");
      book.read = true;
      saveAndRenderBooks();
    } else {
      bookItem.setAttribute("class", "card-book read-unchecked");
      book.read = false;
      saveAndRenderBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute("class", "card-book read-checked");
  }
  read.appendChild(input);
  return read;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}

// function fillOutEditForm(book) {
//   modal.style.display = "block";
//   document.querySelector(".form-title").textContent = "Edit Book";
//   document.querySelector(".form-add-button").textContent = "Edit";
//   document.querySelector("#book-title").value = book.title || "";
//   document.querySelector("#book-author").value = book.author || "";
//   document.querySelector("#book-pages").value = book.pages || "";
//   document.querySelector("#book-read").checked = book.read;
// }

function createBookItem(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card-book");
  bookItem.appendChild(createBookElement("h1", `${book.title}`, "book-title"));
  bookItem.appendChild(
    createBookElement("h1", `Author: ${book.author}`, "book-author")
  );
  bookItem.appendChild(
    createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
  );

  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "Delete", "delete"));
  bookItem.appendChild(createBookElement("button", "Edit", "edit"));

  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });

  // bookItem.querySelector(".edit").addEventListener("click ", () => {
  //   fillOutEditForm(book);
  // });

  books.insertAdjacentElement("afterbegin", bookItem);
}

function renderBooks() {
  books.textContent = "";
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
}

function saveAndRenderBooks() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  renderBooks();
}

addLocalStorage();
git;
