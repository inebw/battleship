import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) row.push(0);
      this.board.push(row);
    }

    this.myShips = [];
    this.destroyedShips = 0;
  }

  // Adds the ship to the board on random coordinates
  addShip(length) {
    const x = Gameboard.getRandomInteger(0, 9);
    const y = Gameboard.getRandomInteger(0, 9);
    const directionChoice = Gameboard.getRandomInteger(0, 1);

    if (directionChoice) {
      const horizontalPath = this.getPathHorizontally(x, y, length);
      if (horizontalPath) {
        this.buildPath(horizontalPath[0], horizontalPath[1], length);
        return;
      }
    }

    const verticalPath = this.getPathVertically(x, y, length);
    if (verticalPath) {
      this.buildPath(verticalPath[0], verticalPath[1], length, false);
      return;
    }

    this.addShip(length);
  }

  // Add the ship object to the board when
  buildPath(x, y, length, isHorizontal = true) {
    const ship = new Ship(length);
    this.myShips.push(ship);
    for (let i = 0; i < length; i += 1) {
      if (isHorizontal) {
        this.board[x + i][y] = ship;
        ship.cords.push([x + i, y]);
      } else {
        this.board[x][y + i] = ship;
        ship.cords.push([x, y + i]);
        ship.isHorizontal = false;
      }
    }
  }

  // Gets the coordinates if available horizontally
  // or returns false
  getPathHorizontally(x, y, length) {
    let forwards = true;
    for (let i = 0; i < length; i += 1)
      if (!this.checkPath(x + i, y)) forwards = false;
    if (forwards) return [x, y];

    let backwards = true;
    for (let i = 0; i < length; i += 1)
      if (!this.checkPath(x - i, y)) backwards = false;
    if (backwards) return [x - (length - 1), y];

    return false;
  }

  getPathVertically(x, y, length) {
    let downwards = true;
    for (let i = 0; i < length; i += 1)
      if (!this.checkPath(x, y + i)) downwards = false;
    if (downwards) return [x, y];

    let upwards = true;
    for (let i = 0; i < length; i += 1)
      if (!this.checkPath(x, y - i)) upwards = false;
    if (upwards) return [x, y - (length - 1)];

    return false;
  }

  // Checks the cell is available
  checkPath(x, y) {
    if (Gameboard.isOutOfBounds(x, y) || this.board[x][y] !== 0) return false;

    const allNeighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let i = 0; i < allNeighbors.length; i += 1) {
      const row = x + allNeighbors[i][0];
      const col = y + allNeighbors[i][1];
      if (!Gameboard.isOutOfBounds(row, col)) {
        if (this.board[row][col] !== 0) return false;
      }
    }

    return true;
  }

  // Check if a coordinate is out of the board
  static isOutOfBounds(x, y) {
    return x > 9 || x < 0 || y > 9 || y < 0;
  }

  // Attack the board on the given coordinates
  receiveAttack(x, y) {
    // Missed Shot or cell already used
    if (this.board[x][y] === 0) {
      this.board[x][y] = "!";
      return;
    }
    if (this.board[x][y] === "!" || this.board[x][y] === 1) return

    this.hitShip(x, y);
  }

  // If ship is attacked, mark it appropriately
  hitShip(x, y) {
    const ship = this.board[x][y];
    ship.hit();
    this.board[x][y] = 1;
    this.markDiagonally(x, y);
    if (ship.isSunk()) {
      this.markAllAdjacent(ship);
      this.destroyedShips += 1;
    }
  }

  // Mark all adjacent cells if the ship is sunk
  markAllAdjacent(ship) {
    const { cords, isHorizontal } = ship;
    const neigbors = {
      left: [-1, 0],
      top: [0, -1],
      bottom: [0, 1],
      right: [1, 0],
    };
    const startCell = cords[0];
    const endCell = cords[cords.length - 1];

    if (isHorizontal) {
      const startCellRow = startCell[0] + neigbors.left[0];
      const startCellCol = startCell[1] + neigbors.left[1];
      if (!Gameboard.isOutOfBounds(startCellRow, startCellCol))
        this.board[startCellRow][startCellCol] = "!";

      const endCellRow = endCell[0] + neigbors.right[0];
      const endCellCol = endCell[1] + neigbors.right[1];
      if (!Gameboard.isOutOfBounds(endCellRow, endCellCol))
        this.board[endCellRow][endCellCol] = "!";
    }
    if (!isHorizontal || cords.length === 1) {
      const startCellRow = startCell[0] + neigbors.top[0];
      const startCellCol = startCell[1] + neigbors.top[1];
      if (!Gameboard.isOutOfBounds(startCellRow, startCellCol))
        this.board[startCellRow][startCellCol] = "!";

      const endCellRow = endCell[0] + neigbors.bottom[0];
      const endCellCol = endCell[1] + neigbors.bottom[1];
      if (!Gameboard.isOutOfBounds(endCellRow, endCellCol))
        this.board[endCellRow][endCellCol] = "!";
    }
  }

  // Mark all diagonal cells if the ship is not sunk
  markDiagonally(x, y) {
    const allNeighbors = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (let i = 0; i < allNeighbors.length; i += 1) {
      const row = x + allNeighbors[i][0];
      const col = y + allNeighbors[i][1];
      if (!Gameboard.isOutOfBounds(row, col)) {
        this.board[row][col] = "!";
      }
    }
  }

  areShipsDestroyed() {
    return this.destroyedShips === this.myShips.length;
  }

  static getRandomInteger(min, max) {
    return (
      Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
      Math.ceil(min)
    );
  }
}
