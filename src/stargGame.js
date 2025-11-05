import Player from "./player";
import ComputerPlayer from "./computerPlayer";
import createBoard from "./createBoard";
import createGraph from "./createGraph";

export default function startGame() {
  const container = document.querySelector(".container");
  const graphs = document.querySelector(".graphs");
  const resetContainer = document.querySelector(".reset");
  const info = document.querySelector(".info");
  container.innerHTML = "";
  resetContainer.innerHTML = "";
  info.innerHTML = "";
  graphs.innerHTML = "";

  const realPlayer = new Player();
  const cpuPlayer = new ComputerPlayer();

  const computerBoard = createBoard(cpuPlayer);
  const computerGraph = createGraph(cpuPlayer);

  const playerBoard = createBoard(realPlayer, false);
  const playerGraph = createGraph(realPlayer);
  graphs.appendChild(playerGraph);
  graphs.appendChild(computerGraph);

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

    if (currCell === 1) {
      const graphCell = document.getElementById(
        `${x}-${y}-graph-${player.isCPU ? "cpu" : "real"}`,
      );
      graphCell.style.opacity = 0.2;
      if (player.myBoard.areShipsDestroyed()) {
        gameWon(player.isCPU ? realPlayer : cpuPlayer);
        return 0;
      }
      return 1;
    }
    return 2;
  }

  function cpuTurn(isHit = false) {
    info.textContent = "Computer is attacking your ships";
    const cpuCords = cpuPlayer.play(realPlayer, isHit);
    console.log(cpuCords);
    const loader = document.createElement("div");
    loader.classList.add("loader");
    playerBoard.appendChild(loader);
    setTimeout(() => {
      loader.remove();
      const attackValue = attack(cpuCords[0], cpuCords[1], realPlayer);
      if (attackValue === 2) start();
      else if (attackValue === 1) cpuTurn(true);
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
    info.textContent = "It's your turn to attack";
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
    graphs.innerHTML = "";
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
