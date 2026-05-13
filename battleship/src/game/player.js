import {Gameboard} from "./gameboard.js";
import {Ship} from "./ship.js";

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
        const result = opponent.gameboard.receiveAttack(x, y);
        return {coordinates: [x,y], result: result};
    }

    placeRandomFleet(ships) {
        let index = 0;
        ships.forEach(ship => {
            while(true) {
                const coordinates = this.getRandomCoordinates();
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
                const newShip = new Ship(ships[index].length);
                if (this.gameboard.placeShip(coordinates[0], coordinates[1], newShip, orientation)) {
                    index++;
                    break;
                }
            }
        });
    }

    getRandomCoordinates() {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
}