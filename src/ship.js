export default class Ship {
    constructor(length = 1) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits += 1
    }

    isSunk() {
        return this.hits === this.length;
    }
}

