"use strict";

const numbers = document.querySelectorAll(".data-numbers");
const operators = document.querySelectorAll(".data-operator");
const displayPrevious = document.querySelector(".display-previous");
const displayCurrent = document.querySelector(".display-current");
const clear = document.querySelector(".data-c");
const allClear = document.querySelector(".data-ac");
const decimal = document.querySelector(".data-decimal");
const equal = document.querySelector(".data-equal");

let currentVal = "";
let previousVal = "";
let operator = "";

// Handle number click
function handleNum(num) {
  if (currentVal.length <= 12) {
    currentVal += num;
  }
}

// Handle operator button click
function handleOp(op) {
  if (previousVal && operator) {
    // Evaluate the previous pair of numbers
    const result = calc(
      parseFloat(previousVal),
      parseFloat(currentVal),
      operator
    );
    previousVal = result.toString();
    currentVal = "";
    displayPrevious.textContent = previousVal + " " + op;
  } else {
    // First operator encountered
    previousVal = currentVal;
    currentVal = "";
    displayPrevious.textContent = previousVal + " " + op;
  }
  operator = op;
}

// Handle clearing the last element of the current string
function handleClear() {
  currentVal = currentVal.slice(0, -1);
  displayCurrent.textContent = currentVal;
}

// Handle cleaning the display
function handleAllClear() {
  currentVal = "";
  previousVal = "";
  operator = "";
  displayCurrent.textContent = "";
  displayPrevious.textContent = "";
}

// Evaluate a pair of numbers based on the operator
function calc(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "÷":
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        displayCurrent.textContent = "I can't :(";
        return undefined;
      }
    default:
      return num2; // Default to the second number
  }
}

numbers.forEach(function (num) {
  num.addEventListener("click", function (e) {
    handleNum(e.target.textContent);
    displayCurrent.textContent = currentVal;
  });
});

operators.forEach(function (op) {
  op.addEventListener("click", function (e) {
    handleOp(e.target.textContent);
    displayPrevious.textContent = previousVal + " " + operator;
    displayCurrent.textContent = currentVal;
  });
});

// Handle equal button click
equal.addEventListener("click", function () {
  if (previousVal && operator) {
    const result = calc(
      parseFloat(previousVal),
      parseFloat(currentVal),
      operator
    );
    displayPrevious.textContent = "";
    displayCurrent.textContent = result.toString();
    previousVal = "";
    currentVal = result.toString();
  }
});

allClear.addEventListener("click", function () {
  handleAllClear();
});

clear.addEventListener("click", function () {
  handleClear();
});

/* 
TODO: 
Decimal
Keyboard support
Finish the styling
*/
