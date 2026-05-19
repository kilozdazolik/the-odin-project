import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }
}

export class ComputerPlayer extends Player {
    constructor(name) {
        super(name);
        this.targetQueue = [];
        this.sunkShipsCount = 0;
    }

    takeTurn(opponent) {
        let x, y;

        const currentSunkCount = opponent.gameboard.ships.filter(s => s.isSunk()).length;
        if (currentSunkCount > this.sunkShipsCount) {
            this.targetQueue = [];
            this.sunkShipsCount = currentSunkCount;
        }

        if (this.targetQueue.length > 0) {
            let validTargetFound = false;
            while (this.targetQueue.length > 0 && !validTargetFound) {
                [x, y] = this.targetQueue.shift();
                if (this.isValidTarget(x, y, opponent)) {
                    validTargetFound = true;
                }
            }

            if (!validTargetFound) {
                [x, y] = this.getParityCoordinates(opponent);
            }
        } else {
            [x, y] = this.getParityCoordinates(opponent);
        }

        const result = opponent.gameboard.receiveAttack(x, y);

        if (result === "hit") {
            this.addNeighborsToQueue(x, y, opponent);
        }

        return { coordinates: [x, y], result: result };
    }

    isValidTarget(x, y, opponent) {
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;
        const cell = opponent.gameboard.matrix[y][x];
        return cell !== "hit" && cell !== "miss";
    }

    getParityCoordinates(opponent) {
        let x, y;
        let found = false;
        let attempts = 0;

        while (!found && attempts < 200) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            if ((x + y) % 2 === 0) {
                if (this.isValidTarget(x, y, opponent)) {
                    found = true;
                }
            }
            attempts++;
        }

        if (!found) {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (!this.isValidTarget(x, y, opponent));
        }

        return [x, y];
    }

    addNeighborsToQueue(x, y, opponent) {
        const potentialTargets = [
            [x, y - 1], // up
            [x, y + 1], // down
            [x - 1, y], // left
            [x + 1, y]  // right
        ];

        // randomize
        potentialTargets.sort(() => Math.random() - 0.5);

        potentialTargets.forEach(([nx, ny]) => {
            if (this.isValidTarget(nx, ny, opponent)) {
                this.targetQueue.push([nx, ny]);
            }
        });
    }

    placeRandomFleet(shipConfigs) {
        shipConfigs.forEach((config) => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
                const newShip = new Ship(config.length);
                
                if (this.gameboard.placeShip(x, y, newShip, orientation)) {
                    placed = true;
                }
            }
        });
    }
}