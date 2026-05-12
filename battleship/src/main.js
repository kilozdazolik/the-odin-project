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
        ui.drawShipHover(ui.getCellCoordinates(event), shipTest.length, currentOrientation, event.currentTarget);
    }
});

playerOneGrid.addEventListener("mouseout", (event) => {
    ui.clearShipHover(event.currentTarget);
});

playerOneGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    ui.placeShipOnGrid(playerOne, coordinates, shipTest, currentOrientation, event.currentTarget);
});

playerOneGrid.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    ui.clearShipHover(event.currentTarget);
    currentOrientation = toggleOrientation(currentOrientation);
    console.log("Orientation changed to:", currentOrientation);

    ui.drawShipHover(ui.getCellCoordinates(event), shipTest.length, currentOrientation, event.currentTarget);
});

const playerTwoGrid = document.querySelector(".player-two");
playerTwoGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        console.log("Player Two clicked on:", coordinates);
    }   
});

function toggleOrientation(orientation) {
    return orientation === "horizontal" ? "vertical" : "horizontal";
}