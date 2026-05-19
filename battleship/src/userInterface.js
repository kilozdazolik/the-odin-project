"use strict"

export class UserInterface {
    createBoard() {
        let playerBoard = document.getElementById("playerBoard");
        if (!playerBoard) {
            playerBoard = document.createElement("div");
            playerBoard.id = "playerBoard";
            const app = document.getElementById("app");
            if (!app) {
                return;
            }
            app.appendChild(playerBoard);
        }

        playerBoard.textContent = "";

        const playerOneGrid = document.createElement("div");
        const playerTwoGrid = document.createElement("div");
        this.renderGrid(playerOneGrid, "player-one");
        this.renderGrid(playerTwoGrid, "player-two");

        playerBoard.appendChild(playerOneGrid);
        playerBoard.appendChild(playerTwoGrid);
    }

    createButton(text, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", onClick);
        return button;
    }

    renderGrid(container, className) {
        container.classList.add(className);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = j;
                cell.dataset.y = i;
                container.appendChild(cell);
            }
        }
    }

    renderBoard(gameboard,element) {
        gameboard.matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellElement = element.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                if (cell === "hit") {
                    cellElement.classList.add("hit");
                } else if (cell === "miss") {
                    cellElement.classList.add("miss");
                } else if (typeof cell === "object") {
                    cellElement.classList.add("placed-ship");
                }
            });
        });
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

    drawSunkShip(ship, element) {
        ship.coordinates.forEach(([y, x]) => {
            const cell = element.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if (cell) {
                cell.classList.remove("hit");
                cell.classList.add("sunk");
            }
        });
    }

    setGridVisible(grid, isVisible) {
        if (!grid) return;
        grid.style.visibility = isVisible ? "visible" : "hidden";
        grid.style.pointerEvents = isVisible ? "auto" : "none";
    }

    syncPlacedShipClasses(gameboard, grid, shouldShowShips) {
        gameboard.matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellElement = grid.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                if (!cellElement) return;
          
                if (typeof cell === "object" && shouldShowShips) {
                    cellElement.classList.add("placed-ship");
                } else {
                    cellElement.classList.remove("placed-ship");
                }
            });
        });
    }

    initializeHUD(handlers) {
        const infoPanel = document.querySelector(".info");
        this.infoPanel = infoPanel;
        
        const modeLabel = document.createElement("label");
        modeLabel.textContent = "Enemy: ";
        
        this.modeSelect = document.createElement("select");
        this.modeSelect.add(new Option("AI", "ai"));
        this.modeSelect.add(new Option("Player Two", "pvp"));
        this.modeSelect.addEventListener("change", (e) => handlers.onModeChange(e.target.value));
        modeLabel.appendChild(this.modeSelect);
        infoPanel.appendChild(modeLabel);

        this.instructionsText = document.createElement("p");
        this.currentShipText = document.createElement("p");
        this.turnText = document.createElement("p");
        
        this.continueTurnButton = this.createButton("Continue", handlers.onContinue);
        this.continueTurnButton.style.display = "none";

        infoPanel.append(this.instructionsText, this.currentShipText, this.turnText, this.continueTurnButton);

        this.startButton = this.createButton("Start Game", handlers.onStart);
        infoPanel.appendChild(this.startButton);
        
        infoPanel.appendChild(this.createButton("Reset Game", handlers.onReset));
    }

    lockMenu() {
        if (this.startButton) this.startButton.disabled = true;
        if (this.modeSelect) this.modeSelect.disabled = true;
    }

    updateHUDText({ instructions, shipText, turnText }) {
        if (instructions !== undefined) this.instructionsText.textContent = instructions;
        if (shipText !== undefined) this.currentShipText.textContent = shipText;
        if (turnText !== undefined) this.turnText.textContent = turnText;
    }

    toggleContinueButton(show) {
        if (this.continueTurnButton) this.continueTurnButton.style.display = show ? "inline-block" : "none";
    }

    setGridPointers(p1Events, p2Events) {
        const p1 = document.querySelector(".player-one");
        const p2 = document.querySelector(".player-two");
        if (p1) p1.style.pointerEvents = p1Events;
        if (p2) p2.style.pointerEvents = p2Events;
    }

    showBothGrids() {
        this.setGridVisible(document.querySelector(".player-one"), true);
        this.setGridVisible(document.querySelector(".player-two"), true);
    }

    hideBothGrids() {
        this.setGridVisible(document.querySelector(".player-one"), false);
        this.setGridVisible(document.querySelector(".player-two"), false);
    }

    appendGameOverText(msg = "Game Over!") {
        const text = document.createElement("p");
        text.textContent = msg;
        if (this.infoPanel) this.infoPanel.appendChild(text);
    }

    bindGridEvents(callbacks) {
        const grids = [document.querySelector(".player-one"), document.querySelector(".player-two")];
        grids.forEach((grid) => {
            if (!grid) return;
            grid.addEventListener("mouseover", (e) => callbacks.onMouseOver(e, grid));
            grid.addEventListener("mouseout", (e) => callbacks.onMouseOut(e, grid));
            grid.addEventListener("click", (e) => callbacks.onClick(e, grid));
            grid.addEventListener("contextmenu", (e) => callbacks.onRightClick(e, grid));
        });
    }

    getGridElements() {
        return {
            playerOne: document.querySelector(".player-one"),
            playerTwo: document.querySelector(".player-two")
        };
    }
}


    
