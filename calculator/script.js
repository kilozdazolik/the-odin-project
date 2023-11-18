("use strict");

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

// Handles giving decimal pointer to a number.
function handleDecimal() {
  if (!currentVal.includes(".")) {
    currentVal += ".";
    displayCurrent.textContent = currentVal;
  }
}

// Handles the equal btn
function handleEqual() {
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
}
// Handles keyboard inputs
function handleKeyboard(e) {
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0"
  ) {
    handleNum(e.key);
    displayCurrent.textContent = currentVal;
  } else {
    e.preventDefault();
  }

  if (e.key === "+" || e.key === "-" || e.key === "x") {
    handleOp(e.key);
    displayPrevious.textContent = previousVal + " " + operator;
    displayCurrent.textContent = currentVal;
  }

  let op = "";
  if (e.key === "/") {
    op = "÷";
    handleOp(op);
    displayPrevious.textContent = previousVal + " " + operator;
    displayCurrent.textContent = currentVal;
  }

  if (e.key === "*") {
    op = "x";
    handleOp(op);
    displayPrevious.textContent = previousVal + " " + operator;
    displayCurrent.textContent = currentVal;
  }

  if (e.key === ".") {
    handleDecimal();
  }

  if (e.key === "Enter") {
    handleEqual();
  }
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
        displayCurrent.textContent = "Error";
        return undefined;
      }
    default:
      return num2;
  }
}

// Handles each number
numbers.forEach(function (num) {
  num.addEventListener("click", function (e) {
    handleNum(e.target.textContent);
    displayCurrent.textContent = currentVal;
  });
});

// Handles each operator
operators.forEach(function (op) {
  op.addEventListener("click", function (e) {
    handleOp(e.target.textContent);
    displayPrevious.textContent = previousVal + " " + operator;
    displayCurrent.textContent = currentVal;
  });
});

// Handle equal button click
equal.addEventListener("click", function () {
  handleEqual();
});

// Handle decimals
decimal.addEventListener("click", function () {
  handleDecimal();
});

// Handles clearing the display
allClear.addEventListener("click", function () {
  handleAllClear();
});

// Handles deleting the last item
clear.addEventListener("click", function () {
  handleClear();
});

// Handles keyboard event
document.addEventListener("keydown", function (e) {
  handleKeyboard(e);
});

//todo: refactor some of the code
