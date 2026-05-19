export class Ship {
    #length;
    #hits = 0;
    coordinates = [];

    get length() {
        return this.#length;
    }

    constructor(length) {
        this.#length = length;
    }

    hit() {
    if (!this.isSunk()) {
        this.#hits++;
    }
    }

    isSunk() {
        return this.#hits >= this.#length;
    }
}