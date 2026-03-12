"use strict"

export class Gameboard {
    constructor() {
        this.createGrid;
    }

    createGrid() {
        const matrix = [];
        for (let i = 0; i < 10; i++) {
            matrix[i] = [];
            for (let j = 0; j < 10; j++) {
                matrix[i][j] = 0;
            }
        }
    }
}