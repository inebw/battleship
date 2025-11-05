export default function createBoard(player, isCpu = true) {
  const allShips = [6, 5, 4, 4, 3, 3, 2, 2];
  for (let i = 0; i < allShips.length; i += 1)
    player.myBoard.addShip(allShips[i]);

  const board = document.createElement("div");
  const playerName = document.createElement("h2");

  playerName.classList.add("player-name");
  if (player.name === "Player 1" || player.name === "Player 2")
    playerName.textContent = `Attack ${player.name} board`
  else
    playerName.textContent = isCpu ? `Attack Computer board` : 'Your Board';

  board.appendChild(playerName);

  if (player.name === "Player 1" || player.name === "Player 2")
    board.classList.add(`board-p${player.name.slice(player.name.length - 1)}`);
  else
    board.classList.add(`${isCpu ? "cpu" : "real-player"}`);

  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      if (player.myBoard.board[i][j] !== 0 && isCpu === false) {
        cell.classList.add(`ship${player.myBoard.board[i][j].length}`);
      }

      cell.classList.add("cell");
      if (player.name === "Player 1" || player.name === "Player 2") {
        const pName = `p${player.name.slice(player.name.length - 1)}`
        cell.id = `${i}-${j}-${pName}`;
        cell.classList.add(pName)
      } else {
        cell.id = `${i}-${j}-${isCpu ? "cpu" : "real"}`;
      }

      row.appendChild(cell);
    }
    board.appendChild(row);
  }

  return board;
}
