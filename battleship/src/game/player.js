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
}