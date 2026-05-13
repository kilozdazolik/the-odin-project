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

    drawShipHover(coordinates, shipLength, orientation, element) {
        for (let i = 0; i < shipLength; i++) {
            const x = orientation === "horizontal" ? coordinates[0] + i : coordinates[0];
            const y = orientation === "horizontal" ? coordinates[1] : coordinates[1] + i;
            const hoverCell = element.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if (hoverCell) {
                hoverCell.classList.add("hovered");
            }
        }
    }

    clearShipHover(element) {
        const hoveredCells = element.querySelectorAll(".hovered");
        hoveredCells.forEach(cell => cell.classList.remove("hovered"));
    }
    
    placeShipOnGrid(player, coordinates, ship, orientation, element) {
        if (coordinates) {
        const wasPlaced = player.gameboard.placeShip(coordinates[0], coordinates[1], ship, orientation);

        if (wasPlaced) {
            for (let i = 0; i < ship.length; i++) {
                const x = orientation === "horizontal" ? coordinates[0] + i : coordinates[0];
                const y = orientation === "horizontal" ? coordinates[1] : coordinates[1] + i;
                const cell = element.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                if (cell) {
                    cell.classList.add("placed-ship");
                }
            }
            console.log("Sikerült a lerakás!");
        } else {
            console.log("Ide nem rakhatod!");
        }
        return wasPlaced;
        }
    }

    drawAttackResult(coordinates, result, element) {
        const cell = element.querySelector(`.cell[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`);
        if (cell) {
            cell.classList.add(result);
        }
    }
}


    
