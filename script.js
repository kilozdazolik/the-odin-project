const choices = ["rock", "paper", "scissors"];

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

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    console.log("------------");
    console.log(`Round ${i + 1}`);

    let playerChoice = prompt(
      "Please choose between rock,paper,scissors"
    ).toLowerCase();
    let computerChoice = getComputerChoice();

    let result = playRound(playerChoice, computerChoice);
    console.log(result);

    if (result.includes("won")) {
      playerScore++;
    } else if (result.includes("lose")) {
      computerScore++;
    }
  }

  console.log("------------");
  console.log("Game Over");
  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);

  if (playerScore > computerScore) {
    console.log("You have won!");
  } else if (playerScore < computerScore) {
    console.log("You have lost!");
  } else {
    console.log("It's a tie!");
  }
}

game();
