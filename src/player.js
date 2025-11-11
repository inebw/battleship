import Gameboard from "./gameboard"

export default class Player {
    constructor(name = 'Player') {
        this.myBoard = new Gameboard()
        this.isCPU = false;
        this.name = name;
        this.id = `${this.name.slice(0, 1)}${this.name.slice(this.name.length-1)}`
    }
}
