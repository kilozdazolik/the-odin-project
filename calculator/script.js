"use strict";
// code here will run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
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
  //TODO: Fix displaying issues
  function handleNum(num) {
    if (operator) {
      currentValue.textContent = "";
      operator = "";
    }

    let clickedNumber = parseFloat(num.textContent);
    firstNum += clickedNumber;
    currentValue.textContent = firstNum;
  }

  function handleOp(operandor) {
    if (!operator) {
      operator = operandor.textContent;
      previousValue.textContent = parseFloat(currentValue.textContent);
      secondNum = parseFloat(previousValue.textContent);
      currentValue.textContent += operandor.textContent;
    }
  }

  numbers.forEach(function (num) {
    num.addEventListener("click", function () {
      handleNum(num);
    });
  });

  operators.forEach(function (operandor) {
    operandor.addEventListener("click", function () {
      handleOp(operandor);
    });
  });

  equal.addEventListener("click", function () {
    previousValue.textContent = "";
    currentValue.textContent = operate(firstNum, secondNum, operator);
  });
});
