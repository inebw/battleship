export default function createBoard(player, cpuMode = false) {
  const allShips = [6, 5, 4, 4, 3, 3, 2, 2];
  for (let i = 0; i < allShips.length; i += 1)
    player.myBoard.addShip(allShips[i]);

  const board = document.createElement("div");
  const playerName = document.createElement("h2");

  playerName.classList.add("player-name");
  if (player.name === "Player 1" || player.name === "Player 2")
    playerName.textContent = `Attack ${player.name} board`;
  else playerName.textContent = player.isCPU ? `Attack Computer board` : "Your Board";

  board.appendChild(playerName);

  if (player.name === "Player 1" || player.name === "Player 2")
    board.classList.add(`board-p${player.name.slice(player.name.length - 1)}`);
  else board.classList.add(`${player.isCPU ? "cpu" : "real-player"}`);

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      if (player.myBoard.board[i][j] !== 0 && cpuMode) {
        cell.classList.add(`ship${player.myBoard.board[i][j].length}`);
      }

      cell.classList.add("cell");
      cell.id = `${i}-${j}-${player.id}`;
      cell.classList.add(player.id);

      row.appendChild(cell);
    }
    board.appendChild(row);
  }

  return board;
}
