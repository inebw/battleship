export default class Ship {
    constructor(length = 1) {
        this.length = length;
        this.hits = 0;
        this.cords = [];
        this.isHorizontal = true;
    }

    hit() {
        this.hits += 1
    }

    isSunk() {
        return this.hits === this.length;
    }
}

