"use strict";
export class Gameboard {
    matrix = [];

    constructor() {
        this.createGrid();
        this.ships = [];
        this.missedShots = [];
    }

    createGrid() {
        this.matrix = Array.from({ length: 10 }, () => Array(10).fill(0));
    }

    getCells(x, y, ship, orientation) {
        return Array.from({ length: ship.length }, (_, i) =>
            orientation === "horizontal"
                ? [y, x + i]
                : [y + i, x]
        );
    }

    checkBoundary(x, y, ship, orientation) {
        return orientation === "horizontal"
            ? x + ship.length <= 10
            : y + ship.length <= 10;
    }

    detectCollision(x, y, ship, orientation) {
        return this.getCells(x, y, ship, orientation)
            .every(([row, col]) => this.matrix[row][col] === 0);
    }

    placeShip(x, y, ship, orientation) {
        if (!this.checkBoundary(x, y, ship, orientation)) return false;
        if (!this.detectCollision(x, y, ship, orientation)) return false;

        this.getCells(x, y, ship, orientation)
            .forEach(([row, col]) => this.matrix[row][col] = ship);

        this.ships.push(ship);

        return true;
    }

    receiveAttack(x,y) {
        if (this.matrix[y][x] === 0) {
            this.missedShots.push([y, x]);
            this.matrix[y][x] = "miss"
            return "miss";
        }
        if (typeof this.matrix[y][x] === "object") {
        this.matrix[y][x].hit();
        this.matrix[y][x] = "hit";
        }
        return "hit";
    }
}