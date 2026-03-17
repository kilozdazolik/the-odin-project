import {UserInterface} from "./userInterface.js";

const ui = new UserInterface();
ui.createBoard();

const playerOneGrid = document.querySelector(".player-one");
playerOneGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        console.log("Player One clicked on:", coordinates);
    }
});

const playerTwoGrid = document.querySelector(".player-two");
playerTwoGrid.addEventListener("click", (event) => {
    const coordinates = ui.getCellCoordinates(event);
    if (coordinates) {
        console.log("Player Two clicked on:", coordinates);
    }   
});