"use strict";
let numbers = document.querySelectorAll(".data-numbers");
let operators = document.querySelectorAll(".data-operator");
let currentValue = document.querySelector(".display-current");
let previousValue = document.querySelector(".display-previous");
const equal = document.getElementById("EQUAL");

// variables
let firstNum = "";
let secondNum = "";
let operator = "";

// functions that handles the math logic
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

function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function handleNum(num) {
  if (firstNum.length <= 12) {
    firstNum += num;
  }
}

function handleOp(operandor) {
  operator = operandor;
  secondNum = firstNum;
  firstNum = "";
}

numbers.forEach(function (num) {
  num.addEventListener("click", function (e) {
    handleNum(e.target.textContent);
    currentValue.textContent = firstNum;
  });
});

operators.forEach(function (operandor) {
  operandor.addEventListener("click", function (e) {
    handleOp(e.target.textContent);
    previousValue.textContent = secondNum + " " + operator;
    currentValue.textContent = firstNum;
  });
});

equal.addEventListener("click", function () {
  previousValue.textContent = "";
  currentValue.textContent = operate(firstNum, secondNum, operator);
});
