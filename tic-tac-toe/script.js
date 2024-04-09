"use strict";

const startBtn = document.querySelector("#start-button");
const playerInputOne = document.querySelector("#player1");
const playerInputTwo = document.querySelector("#player2");
const gameBoardEl = document.querySelector(".gameboard");
const containerEl = document.querySelector(".container");
const squareEl = document.querySelector(".square");
const messageEl = document.querySelector(".message");

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Function to display the current board state in the console
  const render = () => {
    gameBoardEl.innerHTML = "";
    containerEl.innerHTML = "";

    board.forEach((_, i) => {
      const square = document.createElement("div");
      square.className = "square";
      square.setAttribute("data-index", i);
      square.addEventListener("click", (e) => Game.playTurn(e));
      gameBoardEl.insertAdjacentElement("beforeEnd", square);
    });
    /* CONSOLE
    for (let i = 0; i < 9; i += 3) {
      console.log(board[i] + " | " + board[i + 1] + " | " + board[i + 2]);
      if (i < 6) console.log("---------");
    }
    console.log("_________________");
    */
  };

  // Function to update a specific cell on the board with a player's mark
  // Checks if the cell is empty before updating
  const updateBoard = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  // Function to check if the current player has achieved a winning condition
  const checkWin = (mark) => {
    const winCombs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombs.length; i++) {
      const [a, b, c] = winCombs[i];
      if (board[a] === mark && board[b] === mark && board[c] === mark) {
        return true; // Current player wins
      }
    }
    return false; // No winning combination found
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { render, updateBoard, checkWin, resetBoard };
})();

// Function to create a player object with their name and mark
const getPlayer = (name, mark) => {
  return { name, mark };
};

const Game = (() => {
  let currentPlayer;
  let players = [];

  const start = () => {
    // Reset
    startBtn.textContent = "Restart Game";
    Gameboard.resetBoard();

    // Get players name
    if (playerInputOne.value === "" || playerInputTwo.value === "") {
      alert("Give me a name!");
      return;
    }

    players[0] = getPlayer(playerInputOne.value, "X");
    players[1] = getPlayer(playerInputTwo.value, "O");

    Gameboard.render();
    currentPlayer = players[0];

    playTurn();
  };

  const playTurn = (e) => {
    let totalMoves = 0;

    const square = e.target;
    const index = square.getAttribute("data-index");

    if (index >= 0 && index < 9) {
      if (Gameboard.updateBoard(index, currentPlayer.mark)) {
        square.textContent = currentPlayer.mark;

        // Check for player win
        if (Gameboard.checkWin(currentPlayer.mark)) {
          messageEl.textContent = `${currentPlayer.name} wins!`;
          return;
        }

        // Check for draw
        if (++totalMoves === 9) {
          console.log(`It's a draw!`);
          return;
        }

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        playTurn();
      } else if (board[i]) {
        return;
      }
    }
  };

  return { start, playTurn };
})();

startBtn.addEventListener("click", function () {
  Game.start();
});
