const btnRock = document.querySelector("#rock");
const btnPaper = document.querySelector("#paper");
const btnScissors = document.querySelector("#scissors");
const btnNewGame = document.querySelector("#new-game");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const div = document.querySelector("#div");

const choices = ["rock", "paper", "scissors"];
let pScore = 0;
let cScore = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a Tie!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return `You won! ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function handleButtonClick(playerSelection) {
  let p = div.querySelector("p"); // Get the existing <p> element in the div
  if (!p) {
    p = document.createElement("p"); // Create a new <p> element if it doesn't exist
    div.appendChild(p);
  }

  let result = playRound(playerSelection, getComputerChoice());
  p.textContent = result;

  if (result.includes("won")) {
    updateScore("player");
  } else if (result.includes("lose")) {
    updateScore("computer");
  }

  if (checkGameEnd()) {
    endGame();
  }
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore.textContent = ++pScore;
  } else if (winner === "computer") {
    computerScore.textContent = ++cScore;
  }
}

function checkGameEnd() {
  return pScore === 5 || cScore === 5;
}

function endGame() {
  if (pScore === 5) {
    div.appendChild(document.createTextNode("Player wins the game!"));
  } else {
    div.appendChild(document.createTextNode("Computer wins the game!"));
  }
  disableButtons();
  btnNewGame.style.display = "block";
}

function disableButtons() {
  btnRock.disabled = true;
  btnPaper.disabled = true;
  btnScissors.disabled = true;
}

function enableButtons() {
  btnRock.disabled = false;
  btnPaper.disabled = false;
  btnScissors.disabled = false;
}

btnRock.addEventListener("click", function () {
  handleButtonClick("rock");
});

btnPaper.addEventListener("click", function () {
  handleButtonClick("paper");
});

btnScissors.addEventListener("click", function () {
  handleButtonClick("scissors");
});

btnNewGame.addEventListener("click", function () {
  enableButtons();
  pScore = 0;
  cScore = 0;
  playerScore.textContent = pScore;
  computerScore.textContent = cScore;
  div.innerHTML = "";
  btnNewGame.style.display = "none";
});
