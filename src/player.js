import Gameboard from "./gameboard"

export default class Player {
    constructor(name = 'Human') {
        this.myBoard = new Gameboard()
        this.isCPU = false;
        this.name = name;
    }
}
