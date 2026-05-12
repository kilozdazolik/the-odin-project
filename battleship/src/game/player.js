import {Gameboard} from "./gameboard.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }


}

export class ComputerPlayer extends Player {
    constructor(name) {
        super(name);
    }

    takeTurn(opponent) {
        let [x, y] = this.getRandomCoordinates();
        while (opponent.gameboard.matrix[y][x] === "hit" || opponent.gameboard.matrix[y][x] === "miss") {
            [x, y] = this.getRandomCoordinates();
        }
        return opponent.gameboard.receiveAttack(x, y);
    }

    getRandomCoordinates() {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
}