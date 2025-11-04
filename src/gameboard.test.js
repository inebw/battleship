import Gameboard from "./gameboard";

const gameboard = new Gameboard();

// isOutOfBound(x, y) checks if the coordinates
// are within the board
test("check coordinates is outside board 1", () => {
  expect(Gameboard.isOutOfBounds(-1, 2)).toBe(true);
});

test("check coordinates is outside board 2", () => {
  expect(Gameboard.isOutOfBounds(10, 2)).toBe(true);
});

test("check coordinates is outside board 3", () => {
  expect(Gameboard.isOutOfBounds(1, 10)).toBe(true);
});

test("check coordinates is within board 1", () => {
  expect(Gameboard.isOutOfBounds(2, 2)).toBe(false);
});

test("check coordinates is within board 2", () => {
  expect(Gameboard.isOutOfBounds(0, 9)).toBe(false);
});

test("check coordinates is within board 3", () => {
  expect(Gameboard.isOutOfBounds(9, 0)).toBe(false);
});

// checkPath(x, y) checks if the cell is empty and also
// the adjacent cells are empty
gameboard.board[0][0] = 1;

test("cell is not empty", () => {
  expect(gameboard.checkPath(0, 0)).toBe(false);
});

test("adjacent cell is not empty 1", () => {
  expect(gameboard.checkPath(1, 0)).toBe(false);
});

test("adjacent cell is not empty 2", () => {
  expect(gameboard.checkPath(1, 1)).toBe(false);
});

test("adjacent cell is not empty 3", () => {
  expect(gameboard.checkPath(0, 1)).toBe(false);
});

test("adjacent cell is empty 1", () => {
  expect(gameboard.checkPath(2, 0)).toBe(true);
});

test("adjacent cell is empty 2", () => {
  expect(gameboard.checkPath(0, 2)).toBe(true);
});

test("adjacent cell is empty 3", () => {
  expect(gameboard.checkPath(2, 2)).toBe(true);
});

// getPathHorizontally(x, y, lenght) checks if a ship can
// be placed in the given cordinate with a ceratin lenght
// on the board horizontally
test("build path horizontally when empty forwards", () => {
  expect(gameboard.getPathHorizontally(2, 2, 5)).toEqual([2, 2]);
});

test("build path horizontally when empty backwards 1", () => {
  expect(gameboard.getPathHorizontally(7, 0, 5)).toEqual([3, 0]);
});
test("build path horizontally when empty backwards 2", () => {
  expect(gameboard.getPathHorizontally(9, 0, 5)).toEqual([5, 0]);
});

test("build path horizontally when not empty 1", () => {
  expect(gameboard.getPathHorizontally(0, 1, 5)).toBe(false);
});

test("build path horizontally when not empty 2", () => {
  expect(gameboard.getPathHorizontally(1, 1, 5)).toBe(false);
});

// getPathVertically(x, y, lenght) does the samething as
// getPathHorizontally - just vertically
test("build path Vertically when empty forwards", () => {
  expect(gameboard.getPathVertically(2, 2, 5)).toEqual([2, 2]);
});

test("build path Vertically when empty backwards 1", () => {
  expect(gameboard.getPathVertically(7, 7, 5)).toEqual([7, 3]);
});

test("build path Vertically when empty backwards 2", () => {
  expect(gameboard.getPathVertically(9, 9, 5)).toEqual([9, 5]);
});

test("build path Vertically when not empty 1", () => {
  expect(gameboard.getPathVertically(0, 1, 5)).toBe(false);
});

test("build path Vertically when not empty 2", () => {
  expect(gameboard.getPathVertically(1, 1, 5)).toBe(false);
});

// receiveAttack(x, y) function takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends
// the ‘hit’ function to the correct ship, or records the
// coordinates of the missed shot.
test("hit an empty cell", () => {
  gameboard.receiveAttack(1, 1);
  expect(gameboard.board[1][1]).toBe("!");
});

test("hit an ship cell and ship is not sunk", () => {
  // Adding ship of length 5 to the board
  gameboard.buildPath(4, 4, 5);

  // Store results before attack
  const four3 = gameboard.board[4][3];
  const four5 = gameboard.board[4][5];
  const three4 = gameboard.board[3][4];
  const five4 = gameboard.board[5][4];

  // Attack coords 4 , 4
  gameboard.receiveAttack(4, 4);

  // Check if the diagonal coords are marked 
  expect(gameboard.board[3][3]).toBe("!");
  expect(gameboard.board[5][3]).toBe("!");
  expect(gameboard.board[3][5]).toBe("!");
  expect(gameboard.board[5][5]).toBe("!");

  // There should be no change to the adjacent cells
  expect(gameboard.board[4][3]).toBe(four3);
  expect(gameboard.board[4][5]).toBe(four5);
  expect(gameboard.board[3][4]).toBe(three4);
  expect(gameboard.board[5][4]).toBe(five4);

});



test("hit an ship cell and ship is sunk", () => {
  // Adding ship of length 1 to the board
  gameboard.buildPath(8, 1, 1);
  gameboard.receiveAttack(8, 1);
  expect(gameboard.board[8][0]).toBe("!");
  expect(gameboard.board[8][2]).toBe("!");
  expect(gameboard.board[7][0]).toBe("!");
  expect(gameboard.board[7][1]).toBe("!");
  expect(gameboard.board[7][2]).toBe("!");
  expect(gameboard.board[9][0]).toBe("!");
  expect(gameboard.board[9][1]).toBe("!");
  expect(gameboard.board[9][2]).toBe("!");
});

// areShipsDestroyed() returns true if all ships on
// the board are destroyed else false
test("when all ships are not destroyed", () => {
  expect(gameboard.areShipsDestroyed()).toBe(false)
});

test("when all ships are destroyed", () => {
  gameboard.receiveAttack(5, 4);
  gameboard.receiveAttack(6, 4);
  gameboard.receiveAttack(7, 4);
  gameboard.receiveAttack(8, 4);
  expect(gameboard.areShipsDestroyed()).toBe(true)
});