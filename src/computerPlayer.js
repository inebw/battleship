import Gameboard from "./gameboard";
import Player from "./player";

export default class ComputerPlayer extends Player {
  constructor() {
    super();
    this.isCPU = true;
    this.allMoves = new Set();
    this.visited = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) this.allMoves.add([i, j]);
    }
  }

  play(opponent, isHit = false) {
    if (isHit) return this.sendAdjacentCords(opponent);
    return this.sendRandomCords(opponent);
  }

  sendRandomCords(opponent) {
    let randomInt = Gameboard.getRandomInteger(0, this.allMoves.size - 1);
    let getCords = Array.from(this.allMoves.values());
    this.allMoves.delete(getCords[randomInt]);
    let x = getCords[randomInt][0];
    let y = getCords[randomInt][1];
    while (
      (opponent.myBoard.board[x][y] === 1 ||
        opponent.myBoard.board[x][y] === "!") &&
      this.allMoves.size > 0
    ) {
      randomInt = Gameboard.getRandomInteger(0, this.allMoves.size - 1);
      getCords = Array.from(this.allMoves.values());
      this.allMoves.delete(getCords[randomInt]);
      x = getCords[randomInt][0];
      y = getCords[randomInt][1];
    }
    this.visited.push([x, y]);
    return [x, y];
  }

  sendAdjacentCords(opponent) {
    const neigbors = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
    const [x, y] = this.visited[this.visited.length - 1];

    for (let i = 0; i < neigbors.length; i += 1) {
      const row = x + neigbors[i][0];
      const col = y + neigbors[i][1];
      if (!Gameboard.isOutOfBounds(row, col)) {
        const val = opponent.myBoard.board[row][col];
        if (val !== 0 && val !== 1 && val !== "!") {
          this.visited.push([row, col]);
          return [row, col];
        }
      }
    }
    return this.sendRandomCords(opponent);
  }
}
