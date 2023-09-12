"use strict";

const books = document.querySelector(".books");
const addBook = document.querySelector(".add-button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const editBtn = document.querySelector(".edit");
const editModal = document.querySelector(".edit-modal");
const editCloseModal = document.querySelector(".close-edit-modal");
const editLibraryCard = document.querySelector(".edit-form-add-button");
const editBookTitle = document.querySelector("#edit-book-title");
const editBookAuthor = document.querySelector("#edit-book-author");
const editBookPages = document.querySelector("#edit-book-pages");

// Opening and closing the modal

addBook.addEventListener("click", function (e) {
  e.preventDefault();

  modal.style.display = "block";
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  modal.style.display = "none";
});

editCloseModal.addEventListener("click", function (e) {
  e.preventDefault();

  editModal.style.display = "none";
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

function createEl(el, img, className) {
  const element = document.createElement(el);
  element.src = img;
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

let libraryCard;

function formModule(index) {
  libraryCard = myLibrary[index];
  editModal.style.display = "block";
}

const clearInputs = function () {
  editBookTitle.value = " ";
  editBookAuthor.value = " ";
  editBookPages.value = " ";
};

editLibraryCard.addEventListener("click", function (e) {
  e.preventDefault();
  libraryCard.title = document.querySelector("#edit-book-title").value;
  libraryCard.author = document.querySelector("#edit-book-author").value;
  libraryCard.pages = document.querySelector("#edit-book-pages").value;
  console.log(libraryCard);
  saveAndRenderBooks();
  clearInputs();
  editModal.style.display = "none";
});

function createBookItem(book, index) {
  const bookItem = document.createElement("div");
  const bookDivHeader = document.createElement("div");
  const bookContentDiv = document.createElement("div");
  const bookBtnDiv = document.createElement("div");
  const collapseBtn = document.createElement("div");

  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card-book");
  bookDivHeader.setAttribute("class", "bookDivHeader");
  bookContentDiv.setAttribute("class", "bookContentDiv");
  bookBtnDiv.setAttribute("class", "btnDiv");
  collapseBtn.setAttribute("class", "collapsible-up-btn");

  bookItem.appendChild(bookDivHeader);

  bookDivHeader.appendChild(
    createBookElement("h1", `${book.title}`, "book-title")
  );
  bookDivHeader.appendChild(collapseBtn);
  collapseBtn.appendChild(
    createEl("img", "chevron-up-outline.svg", "collapsible-up")
  );

  bookItem.appendChild(bookContentDiv);

  bookContentDiv.appendChild(
    createBookElement("h1", `Author: ${book.author}`, "book-author")
  );
  bookContentDiv.appendChild(
    createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
  );

  bookContentDiv.appendChild(createReadElement(bookItem, book));

  bookItem.appendChild(bookBtnDiv);
  bookBtnDiv.appendChild(createBookElement("button", "Delete", "delete"));
  bookBtnDiv.appendChild(createBookElement("button", "Edit", "edit"));

  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });

  bookItem.querySelector(".edit").addEventListener("click", () => {
    formModule(index);
  });

  // collapsible cards
  bookItem
    .querySelector(".collapsible-up-btn")
    .addEventListener("click", (e) => {
      console.log(e.target, index);
    });

  books.insertAdjacentElement("afterbegin", bookItem);
}

// collapseUpBtn.addEventListener("click", function () {
//   console.log("clicked");
// });

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
