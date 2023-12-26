"use strict";

const addMore = document.querySelector(".add-more");
const books = document.querySelector(".books");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const lotr = new Book("Lord of The Rings", "J.R.R. Tolkien", 200, false);

const myLibrary = [lotr];

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  books.innerHTML = "";

  myLibrary.forEach((book) => {
    createCard(book.title, book.author);
  });
}

function createCard(title, author) {
  const numberOfBooks = books.querySelectorAll(".book").length;
  if (numberOfBooks < 6) {
    const cardHTML = `        
    <div class="book">
      <h1 class="book__title">${title}</h1>
      <h2 class="book__author">${author}</h2>
    </div>
    <div class="add-more">+</div>
  `;
    books.innerHTML += cardHTML;
  } else {
    const cardHTML = `        
    <div class="book">
      <h1 class="book__title">${title}</h1>
      <h2 class="book__author">${author}</h2>
    </div>
  `;
    books.innerHTML += cardHTML;
  }
}

addMore.addEventListener("click", function () {
  const title = prompt("Please write the title:", "");
  const author = prompt("Please write the author:", "");
  const newBook = new Book(title, author, 100, false);

  addBookToLibrary(newBook);
});
