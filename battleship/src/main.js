"use strict";

import {UserInterface} from "./userInterface.js";
import {Player} from "./game/player.js";
import {Ship} from "./game/ship.js";

const ui = new UserInterface();
const playerOne = new Player("Player One");
const playerTwo = new Player("Player Two");
const shipTest = new Ship(3);

let currentOrientation = "horizontal";

ui.createBoard();

const playerOneGrid = document.querySelector(".player-one");

playerOneGrid.addEventListener("mouseover", (event) => {
    const cell = event.target.closest(".cell");
    if (cell) {
        for (let i = 0; i < shipTest.length; i++) {
            const x = currentOrientation === "horizontal" ? Number(cell.dataset.x) + i : Number(cell.dataset.x);
            const y = currentOrientation === "horizontal" ? Number(cell.dataset.y) : Number(cell.dataset.y) + i;
            const hoverCell = playerOneGrid.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`); 
            if (hoverCell) {
                hoverCell.classList.add("hovered");
            }
        } 
    }
});


playerOneGrid.addEventListener("mouseout", (event) => {
    clearHover();
});

playerOneGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        const wasPlaced = playerOne.gameboard.placeShip(coordinates[0], coordinates[1], shipTest, currentOrientation);

        if (wasPlaced) {
            for (let i = 0; i < shipTest.length; i++) {
                const x = currentOrientation === "horizontal" ? coordinates[0] + i : coordinates[0];
                const y = currentOrientation === "horizontal" ? coordinates[1] : coordinates[1] + i;
                const cell = playerOneGrid.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                if (cell) {
                    cell.classList.add("placed-ship");
                }
            }
            console.log("Sikerült a lerakás!");
        } else {
            console.log("Ide nem rakhatod!");
        }
    }
});

playerOneGrid.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    clearHover();
    if (currentOrientation === "horizontal") {
        currentOrientation = "vertical";
        console.log("Orientation changed to vertical");
    } else {
        currentOrientation = "horizontal";
    }

    drawShipHover(ui.getCellCoordinates(event));
});

const playerTwoGrid = document.querySelector(".player-two");
playerTwoGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        console.log("Player Two clicked on:", coordinates);
    }   
});