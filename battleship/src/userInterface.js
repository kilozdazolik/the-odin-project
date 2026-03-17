"use strict"

export class UserInterface {
    createBoard() {
        const playerBoard = document.getElementById("playerBoard");

        const playerOneGrid = document.createElement("div");
        const playerTwoGrid = document.createElement("div");
        this.renderGrid(playerOneGrid, "player-one");
        this.renderGrid(playerTwoGrid, "player-two");

        playerBoard.appendChild(playerOneGrid);
        playerBoard.appendChild(playerTwoGrid);
    }

    renderGrid(container, className) {
        container.classList.add(className);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = i;
                cell.dataset.y = j;
                container.appendChild(cell);
            }
        }
    }

    getCellCoordinates(event) {
        const playerOneGrid = document.querySelector(".player-one");
        const playerTwoGrid = document.querySelector(".player-two");

        if (!playerOneGrid.contains(event.target) && !playerTwoGrid.contains(event.target)) {
            return null;
        }

        const x = Number(event.target.dataset.x)
        const y = Number(event.target.dataset.y)

        if (isNaN(x) || isNaN(y)) {
            return null;
        }

        return [x,y];
    }

}