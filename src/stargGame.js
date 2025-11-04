import Player from "./player";
import ComputerPlayer from "./computerPlayer";

export default function startGame() {
  const container = document.querySelector(".container");
  const resetContainer = document.querySelector(".reset");
  const info = document.querySelector(".info");
  container.innerHTML = "";
  resetContainer.innerHTML = "";
  info.innerHTML = "";

  function createBoard(player, isCpu = true) {
    const allShips = [6, 5, 4, 4, 3, 3, 2, 2];
    for (let i = 0; i < allShips.length; i += 1)
      player.myBoard.addShip(allShips[i]);
    const board = document.createElement("div");
    const playerName = document.createElement("h2");
    playerName.classList.add("player-name");
    playerName.textContent = `${player.isCPU ? "Computer" : "Human"}`;
    board.appendChild(playerName);
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
        cell.id = `${i}-${j}-${isCpu ? "cpu" : "real"}`;
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
    return board;
  }

  function createGraph(player, isCPU = true) {
    const allShips = [6, 5, 4, 4, 3, 3, 2, 2];
    const container = document.createElement("div");
    container.classList.add("graph");

    for (let i = 0; i < allShips.length; i += 1) {
      const row = document.createElement("div");
      row.classList.add("graph-row");
    }
  }

  const realPlayer = new Player();
  const cpuPlayer = new ComputerPlayer();

  const computerBoard = createBoard(cpuPlayer);
  const playerBoard = createBoard(realPlayer, false);
  container.appendChild(playerBoard);
  container.appendChild(computerBoard);

  function attack(x, y, player) {
    let currCell = player.myBoard.board[x][y];
    if (currCell === "!" || currCell === 1) return 0;
    if (currCell !== 0 && currCell !== "!" && currCell !== 1) {
      const anotherCell = document.getElementById(
        `${x}-${y}-${player.isCPU ? "cpu" : "real"}`,
      );
      if (player.myBoard.board[x][y]) {
        anotherCell.classList.add(`ship${player.myBoard.board[x][y].length}`);
        if (!player.isCPU) anotherCell.style.opacity = 0.2;
      }
    }
    player.myBoard.receiveAttack(x, y);
    currCell = player.myBoard.board[x][y];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const currId = `${i}-${j}-${player.isCPU ? "cpu" : "real"}`;
        if (player.myBoard.board[i][j] === "!") {
          const cell = document.getElementById(currId);
          cell.style.backgroundColor = "#e5e5e5";
        }
      }
    }
    if (player.myBoard.areShipsDestroyed()) {
        gameWon(player.isCPU ? realPlayer : cpuPlayer);
        return 0
    }
    if (currCell === 1) return 1;
    return 2;
  }

  function cpuTurn() {
    info.textContent = 'Computer is playing'
    const cpuCords = cpuPlayer.play(realPlayer);
    const loader = document.createElement("div");
    loader.classList.add("loader");
    playerBoard.appendChild(loader);
    setTimeout(() => {
      loader.remove();
      const attackValue = attack(cpuCords[0], cpuCords[1], realPlayer);
      if (attackValue === 2) start();
      else if (attackValue === 1) cpuTurn();
    }, 1000);
  }

  function playerTurn() {
    const uniqueid = this.id;
    const row = parseInt(uniqueid.slice(0, 1), 10);
    const col = parseInt(uniqueid.slice(2, 3), 10);
    const playerName = uniqueid.slice(4);
    if (playerName === "real") {
      return;
    }
    if (attack(row, col, cpuPlayer) === 2) {
      unStart();
      cpuTurn();
    }
  }

  function start() {
    info.textContent = "It's your turn"
    const allcell = document.querySelectorAll(".cell");
    allcell.forEach((element) => {
      element.addEventListener("click", playerTurn);
    });
  }

  function unStart() {
    const allcell = document.querySelectorAll(".cell");
    allcell.forEach((element) => {
      element.removeEventListener("click", playerTurn);
    });
  }

  function gameWon(player) {
    const info = document.querySelector(".info");
    info.textContent = `${player.isCPU ? "Computer" : "Human"} has won the game`;

    const resetContainer = document.querySelector(".reset");
    const resetButton = document.createElement("button");
    resetContainer.appendChild(resetButton);
    resetButton.classList.add("reset");
    resetButton.textContent = "Replay";
    unStart();
    resetButton.addEventListener("click", () => {
      startGame();
    });
  }

  start();
}
