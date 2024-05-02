"use strict";

const books = document.querySelector(".home__books");
const book = document.querySelector(".book");
const dialog = document.querySelector(".navbar__dialog");
const showButton = document.getElementById("showDialog");
const confirmBtn = document.getElementById("confirmBtn");
const rating = document.querySelector(".rating");
const readCheckbox = document.getElementById("read");
const fileInput = document.getElementById("fileInput");
const stars = document.querySelectorAll(".star");

class Book {
  id = 0;
  constructor(title, author, pages, read, rating, imgURL) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.imgURL = imgURL;
  }
}

class Library {
  #books = [];

  constructor() {
    confirmBtn.addEventListener("click", this._addBook.bind(this));
    this._uploadDummyData();
  }

  _addBook(e, title, author, pages, read, rating, imgURL) {
    e.preventDefault();

    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    read = readCheckbox.checked;
    rating = 0;
    imgURL = document.getElementById("book-img").value;

    const book = new Book(title, author, pages, read, rating, imgURL);
    this.#books.push(book);
    this._renderBook(book);
    console.log(this.#books);
  }

  _renderBook(book) {
    const bookHTML = `
    <div class="book" data-index="${book.id}">
        <img
        src="${book.imgURL || "img/book/default.jpg"}"
        alt="${book.title || "Default Picture of Book"}"
          class="img"
        />
        <div class="overlay">
          <p class="overlay-text">Delete</p>
        </div>
      <div class="book-text">
        <h3 class="heading-tertiary">${book.title}</h3>
        <p class="book-author">${book.author}</p>
      </div>
      ${
        book.read
          ? `<div class="book-rating"></div>`
          : `<div class="book-rating" style="visibility:hidden"></div>`
      }
    </div>
  `;

    books.insertAdjacentHTML("beforeend", bookHTML);
  }

  _displayBook() {
    this.#books.forEach((book) => {
      this._renderBook(book);
    });
  }

  _removeBook(i) {
    this.#books.splice(i, 1);
    this._displayBook();
  }

  _uploadDummyData() {
    const lotr1 = new Book(
      "The Fellowship of the Ring",
      "J.R.R. Tolkien",
      423,
      true,
      5,
      "https://musicart.xboxlive.com/7/8a8d5100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
    );

    const lotr2 = new Book(
      "The Two Towers",
      "J.R.R. Tolkien",
      352,
      true,
      4,
      "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"
    );

    const lotr3 = new Book(
      "The Return of the King",
      "J.R.R. Tolkien",
      416,
      false,
      0,
      "https://musicart.xboxlive.com/7/8d8d5100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
    );

    this.#books.push(lotr1, lotr2, lotr3);

    this._displayBook();
  }
}

books.addEventListener("click", (e) => {
  const targetBook = e.target.closest(".book");
  if (targetBook) {
    const id = targetBook.getAttribute("data-index");
    library._removeBook(id);
  }
});

showButton.addEventListener("click", () => {
  dialog.showModal();
});

const library = new Library();
