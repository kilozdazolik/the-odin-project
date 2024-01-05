"use strict";

const books = document.querySelector(".home__books");
const book = document.querySelector(".book");
const dialog = document.querySelector(".navbar__dialog");
const showButton = document.getElementById("showDialog");
const confirmBtn = document.getElementById("confirmBtn");
const rating = document.querySelector(".rating");
const readCheckbox = document.getElementById("read");
const fileInput = document.getElementById("fileInput");

const myLibrary = [];

// Dummy data
myLibrary.push(
  new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true, 5)
);
myLibrary.push(new Book("The Two Towers", "J.R.R. Tolkien", 352, true, 4));
myLibrary.push(
  new Book("The Return of the King", "J.R.R. Tolkien", 416, false, 0)
);

function Book(title, author, pages, read, rating, imgURL) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.rating = rating;
  this.imgURL = imgURL;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = readCheckbox.checked;
  const rating = getRating();
  const imgURL = document.getElementById("book-img").value;

  const newBook = new Book(title, author, pages, read, rating, imgURL);
  myLibrary.push(newBook);
  console.log(myLibrary);

  displayBooks();
}

function displayBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const starIcons = Array.from({ length: 5 }, (_, index) => {
      const fillColor =
        index < book.rating
          ? "var(--primary-color-dark)"
          : "var(--default-color-very-light)";
      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="${fillColor}"
          class="w-6 h-6 rating-icon"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clip-rule="evenodd"
          />
        </svg>
      `;
    }).join("");

    const bookHTML = `
      <div class="book" data-index="${index}">
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
            ? `<div class="book-rating">${starIcons}</div>`
            : `<div class="book-rating" style="visibility:hidden">${starIcons}</div>`
        }
      </div>
    `;

    books.insertAdjacentHTML("beforeend", bookHTML);
  });
  console.log("added");
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  console.log("removed");
}

function toggleRatingVisibility() {
  if (readCheckbox.checked) {
    document.querySelector(".rating").style.visibility = "visible";
  } else {
    document.querySelector(".rating").style.visibility = "hidden";
  }
}

function rateBook(rating) {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, index) => {
    if (index + 1 <= rating) {
      star.classList.add("clicked");
    } else {
      star.classList.remove("clicked");
    }
  });
}

function getRating() {
  const clickedStars = document.querySelectorAll(".star.clicked").length;
  return clickedStars;
}

readCheckbox.addEventListener("change", toggleRatingVisibility);

showButton.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", addBookToLibrary);

books.addEventListener("click", (event) => {
  const targetBook = event.target.closest(".book");
  if (targetBook) {
    const id = targetBook.getAttribute("data-index");
    removeBook(id);
  }
});

displayBooks();
