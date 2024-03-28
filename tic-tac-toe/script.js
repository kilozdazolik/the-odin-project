"use strict";

const startButton = document.querySelector("#start-button");
const boardHTML = document.querySelector(".gameboard");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    boardHTML.innerHTML = "";

    gameboard.forEach((value, index) => {
      let squareHTML = `<div class="square" data-index="${index}">${value}</div>`;
      boardHTML.innerHTML += squareHTML;
    });
  };

  return { render };
})();

const getPlayer = (name, mark) => {
  return { name, mark };
};

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    players = [
      getPlayer(player1Input.value, "X"),
      getPlayer(player2Input.value, "O"),
    ];

    currentPlayer = 0;
    gameOver = false;
    Gameboard.render();
  };
  return {
    start,
  };
})();

startButton.addEventListener("click", () => {
  // Draw the gameboard
  Game.start();
});

//TODO: Handle click events
