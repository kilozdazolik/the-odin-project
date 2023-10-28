"use strict";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const numbers = document.querySelectorAll(".data-number");
const operands = document.querySelectorAll(".data-operand");
const displayFirstNum = document.getElementById("display-first");
const displaySecondNum = document.getElementById("display-second");

numbers.forEach(function (currentNum) {
  currentNum.addEventListener("click", function () {
    displayFirstNum.textContent += currentNum.textContent;
    console.log("clicked");
  });
});

operands.forEach(function (currentOperand) {
  currentOperand.addEventListener("click", function () {
    displaySecondNum.textContent = displayFirstNum.textContent;
    displayFirstNum.textContent = "";
  });
});
