"use strict";

const canvas = document.querySelector(".canvas");
const rangeInput = document.querySelector("#size");
const rangeValueDisplay = document.querySelector("#range-value");
const colorPicker = document.querySelector("#color-picker");
const btnRainbow = document.querySelector("#rainbow");
const btnReset = document.querySelector("#reset");

let selectedColor = "#00FFFF";

function createGrid(size) {
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    canvas.appendChild(cell);

    cell.addEventListener("mouseover", () => {
      if (selectedColor === "rainbow") {
        cell.style.backgroundColor = generateRandomColor();
      } else {
        cell.style.backgroundColor = selectedColor;
      }
    });
  }
}

function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

rangeInput.addEventListener("input", () => {
  const value = rangeInput.value;
  rangeValueDisplay.textContent = value;

  createGrid(value);
});

colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
});

btnRainbow.addEventListener("click", () => {
  selectedColor = "rainbow";
});

btnReset.addEventListener("click", () => {
  canvas.innerHTML = "";
  createGrid(rangeInput.value);
});

createGrid(16);
