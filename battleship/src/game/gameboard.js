"use strict"

export class Gameboard {
     matrix = [];

    constructor() {
        this.createGrid();
    }

    createGrid() {
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = [];    
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
}