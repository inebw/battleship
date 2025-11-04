import "./styles.css";
import Player from "./player";
import ComputerPlayer from "./computerPlayer";

function createBoard(player, isCpu = true) {
  player.myBoard.addShip(6);
  player.myBoard.addShip(5);
  player.myBoard.addShip(4);
  player.myBoard.addShip(3);
  player.myBoard.addShip(2);
  const board = document.createElement("div");
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

const realPlayer = new Player();
const cpuPlayer = new ComputerPlayer();

const container = document.querySelector(".container");
const computerBoard = createBoard(cpuPlayer);
const playerBoard = createBoard(realPlayer, false);
container.appendChild(playerBoard);
container.appendChild(computerBoard);

const allcell = document.querySelectorAll(".cell");
allcell.forEach((element) => {
  element.addEventListener("click", () => {
    const uniqueid = element.id;
    const row = parseInt(uniqueid.slice(0, 1), 10);
    const col = parseInt(uniqueid.slice(2, 3), 10);
    const playerName = uniqueid.slice(4);
    if (playerName === "real") {
      return;
    }
    attack(row, col, cpuPlayer);
    const cpuCords = cpuPlayer.play(realPlayer);
    const loader = document.createElement('div')
    loader.classList.add('loader');
    playerBoard.appendChild(loader)
    setTimeout(() => {
        attack(cpuCords[0], cpuCords[1], realPlayer);
        loader.remove()
    }, 1000)
    // console.log(cpuPlayer.myBoard.areShipsDestroyed())
  });
});

function attack(x, y, player) {
  const currCell = player.myBoard.board[x][y];
  if (currCell !== 0 && currCell !== "!" && currCell !== 1) {
    const anotherCell = document.getElementById(
      `${x}-${y}-${player.isCPU ? "cpu" : "real"}`,
    );
    if (player.myBoard.board[x][y]) {
      anotherCell.classList.add(`ship${player.myBoard.board[x][y].length}`);
    }
  }
  player.myBoard.receiveAttack(x, y);
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const currId = `${i}-${j}-${player.isCPU ? "cpu" : "real"}`;
      if (player.myBoard.board[i][j] === "!") {
        const cell = document.getElementById(currId);
        cell.style.backgroundColor = "grey";
      }
    }
  }
}
