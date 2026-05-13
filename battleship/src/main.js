"use strict";

import {UserInterface} from "./userInterface.js";
import {ComputerPlayer, Player} from "./game/player.js";
import {Ship} from "./game/ship.js";
import {ships} from "./constants.js";

const ui = new UserInterface();
const playerOne = new Player("Player One");
const playerTwo = new ComputerPlayer("Player Two");

let currentOrientation = "horizontal";
let currentShipIndex = 0;
let isGameOver = false;

ui.createBoard();

const playerOneGrid = document.querySelector(".player-one");
const playerTwoGrid = document.querySelector(".player-two");

playerTwo.placeRandomFleet(ships.map(s => new Ship(s.length)));

playerOneGrid.addEventListener("mouseover", (event) => {
    const cell = event.target.closest(".cell");
    if (cell && currentShipIndex < ships.length) {
        ui.drawShipHover(ui.getCellCoordinates(event), ships[currentShipIndex].length, currentOrientation, event.currentTarget);
    }
});

playerOneGrid.addEventListener("mouseout", (event) => {
    ui.clearShipHover(event.currentTarget);
});

playerOneGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (currentShipIndex >= ships.length) return;
    let ship = new Ship(ships[currentShipIndex].length);
    if (ui.placeShipOnGrid(playerOne, coordinates, ship, currentOrientation, event.currentTarget)) {
        currentShipIndex++;
    }
});

playerOneGrid.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    ui.clearShipHover(event.currentTarget);
    currentOrientation = toggleOrientation(currentOrientation);
    console.log("Orientation changed to:", currentOrientation);

    if (currentShipIndex < ships.length) {
    ui.drawShipHover(ui.getCellCoordinates(event), ships[currentShipIndex].length, currentOrientation, event.currentTarget);
    }
});

playerTwoGrid.addEventListener("click", (event) => {
    if (isGameOver) return;
    if(currentShipIndex >= ships.length) {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        const result = playerTwo.gameboard.receiveAttack(coordinates[0], coordinates[1]);
        if(result !== undefined) {
                    if(playerOne.gameboard.allShipsSunk()){
            console.log("Player Two wins!");
            isGameOver = true;
        } 
        else if (playerTwo.gameboard.allShipsSunk()) {
            console.log("Player One wins!");
            isGameOver = true;
        }
        else {
            ui.drawAttackResult(coordinates, result, event.currentTarget);
                const attackData = playerTwo.takeTurn(playerOne);
            if (attackData) {
                console.log("Computer attacked Player One and got a:", attackData.result);
                ui.drawAttackResult(attackData.coordinates, attackData.result, playerOneGrid);    
            } 
        }
        }
        console.log("Player Two attacked at:", coordinates, "Result:", result);

    }
    }
});


function toggleOrientation(orientation) {
    return orientation === "horizontal" ? "vertical" : "horizontal";
}