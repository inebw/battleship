import Gameboard from "./gameboard";
import Player from "./player";

export default class ComputerPlayer extends Player {
  constructor() {
    super();
    this.isCPU = true;
    this.visited = new Set();
  }

  play(opponent) {
    let x = Gameboard.getRandomInteger(0, 9);
    let y = Gameboard.getRandomInteger(0, 9);
    while (
      this.visited.has([x, y].toString()) ||
      opponent.myBoard.board[x][y] === '!' ||
      opponent.myBoard.board[x][y] === 1
    ) {
      x = Gameboard.getRandomInteger(0, 9);
      y = Gameboard.getRandomInteger(0, 9);
    }
    opponent.myBoard.receiveAttack(x, y);
    this.visited.add([x, y].toString());
    console.log([x, y].toString())
    return [x, y];
  }
}
