import Gameboard from "./gameboard"

export default class Player {
    constructor() {
        this.myBoard = new Gameboard()
        this.isCPU = false;
    }
}
