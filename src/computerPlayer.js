import Gameboard from "./gameboard";
import Player from "./player";

export default class ComputerPlayer extends Player {
  constructor() {
    super();
    this.isCPU = true;
    this.allMoves = new Set();
    this.visited = new Set();
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) this.allMoves.add([i, j])
    }
  }

  play(opponent) {
    let randomInt = Gameboard.getRandomInteger(0, this.allMoves.size - 1)
    let getCords = Array.from(this.allMoves.values())
    this.allMoves.delete(getCords[randomInt])
    let x = getCords[randomInt][0]
    let y = getCords[randomInt][1]
    while(opponent.myBoard.board[x][y] === '!' && this.allMoves.size > 0) {
        randomInt = Gameboard.getRandomInteger(0, this.allMoves.size - 1)
        getCords = Array.from(this.allMoves.values())
        this.allMoves.delete(getCords[randomInt])
        x = getCords[randomInt][0]
        y = getCords[randomInt][1]
    }
    return [x, y]
  }
}
