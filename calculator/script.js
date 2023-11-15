"use strict";
let numbers = document.querySelectorAll(".data-numbers");
let operators = document.querySelectorAll(".data-operator");
let currentValue = document.querySelector(".display-current");
let previousValue = document.querySelector(".display-previous");
let clear = document.getElementById("CLEAR");
let allClear = document.getElementById("ALL-CLEAR");
let decimal = document.getElementById("DECIMAL");
let equal = document.getElementById("EQUAL");

// variables
let firstNum = "";
let secondNum = "";
let operator = "";

// functions that handles the math logic
function add(a, b) {
  return Number(a) + Number(b);
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

function calc(a, b, op) {
  switch (op) {
    case "+":
      return add(b, a);
    case "-":
      return subtract(b, a);
    case "*":
      return multiply(b, a);
    case "/":
      return divide(b, a);
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

allClear.addEventListener("click", function () {
  firstNum = "";
  secondNum = "";
  operator = "";
  currentValue.textContent = firstNum;
  previousValue.textContent = firstNum;
});

equal.addEventListener("click", function () {
  console.log(calc(firstNum, secondNum, operator));
  previousValue.textContent = "";
  currentValue.textContent = calc(firstNum, secondNum, operator);
});

// TODO: Fix clear button issues
clear.addEventListener("click", function () {
  console.log("clear clicked");
  firstNum = firstNum.substring(0, -1);
  console.log(firstNum);
  currentValue.textContent = firstNum;
});
