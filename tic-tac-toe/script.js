"use strict";

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Function to display the current board state in the console
  const render = () => {
    for (let i = 0; i < 9; i += 3) {
      console.log(board[i] + " | " + board[i + 1] + " | " + board[i + 2]);
      if (i < 6) console.log("---------");
    }
    console.log("_________________");
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

  return { render, updateBoard, checkWin };
})();

// Function to create a player object with their name and mark
const getPlayer = (name, mark) => {
  return { name, mark };
};

const Game = (() => {
  let currentPlayer;
  let player1;
  let player2;

  const start = () => {
    // Get players name
    player1 = getPlayer(prompt("name"), "X");
    player2 = getPlayer(prompt("name"), "O");

    console.log(`Players selected! ${player1} vs ${player2}. Loading game...`);
    Gameboard.render();
    currentPlayer = player1;
    playTurn();
  };

  const playTurn = () => {
    let totalMoves = 0;

    const index = prompt(
      `${currentPlayer.name}'s turn (${currentPlayer.mark}): Enter cell index (0-8):`
    );
    if (index >= 0 && index < 9) {
      if (Gameboard.updateBoard(index, currentPlayer.mark)) {
        totalMoves++;
        Gameboard.render();

        // Check for player win
        if (Gameboard.checkWin(currentPlayer.mark)) {
          console.log(`${currentPlayer.name} wins!`);
          return;
        }

        // Check for draw
        if (totalMoves === 9) {
          console.log(`It's a draw!`);
          return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        playTurn();
      } else {
        console.log("Cell already taken. Try again.");
        playTurn();
      }
    } else {
      console.log("Invalid input. Please enter a number between 0 and 8.");
      playTurn();
    }
  };

  return { start };
})();

Game.start();
