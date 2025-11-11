export default function attack(x, y, player) {
  // Marks the cell white if no-ship is found or if a ship is hit
  // then marks all the adjancent cells
  function paintBoard() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const currId = `${i}-${j}-${player.id}`;
        if (player.myBoard.board[i][j] === "!") {
          const cell = document.getElementById(currId);
          cell.style.backgroundColor = "#e5e5e5";
        }
      }
    }
  }
  // For Human Players: Reveals the ship's color if ship is found
  // For CPU: If cpu hits a ship it adds opacity
  // For Both: Updates their ship graphs status
  function gotAttacked() {
    const currCell = document.getElementById(`${x}-${y}-${player.id}`);
    if (player.myBoard.board[x][y]) {
      if (player.id === 'Pr') {
        currCell.style.animation = "attackCellCPU 0.6s";
        currCell.style.animationFillMode = "forwards";
      } else {
        currCell.classList.add(`ship${player.myBoard.board[x][y].length}`);
        currCell.style.animation = "attackCell 0.6s";
      }
      const graphCell = document.getElementById(`${x}-${y}-graph-${player.id}`);
      graphCell.style.opacity = 0.2;
    }
  }

  let cellValue = player.myBoard.board[x][y];
  if (cellValue === "!" || cellValue === 1) return 0;
  if (cellValue !== 0) gotAttacked(x, y, player);

  player.myBoard.receiveAttack(x, y);
  cellValue = player.myBoard.board[x][y];
  paintBoard(player);

  if (cellValue === 1) return 1;

  return 2;
}
