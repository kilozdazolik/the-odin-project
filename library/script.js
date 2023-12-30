"use strict";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const lotr = new Book("Lord of The Rings", "J.R.R. Tolkien", 200, false);

const myLibrary = [lotr];
