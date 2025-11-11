import Player from "./player";
import ComputerPlayer from "./computerPlayer";
import createBoard from "./createBoard";
import createGraph from "./createGraph";
import attack from "./attack";

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

  const computerBoard = createBoard(cpuPlayer, false);
  const computerGraph = createGraph(cpuPlayer);

  const playerBoard = createBoard(realPlayer, true);
  const playerGraph = createGraph(realPlayer);
  graphs.appendChild(playerGraph);
  graphs.appendChild(computerGraph);

  container.appendChild(playerBoard);
  container.appendChild(computerBoard);

  function cpuTurn(isHit = false) {
    info.textContent = "Computer is attacking your ships";
    const cpuCords = cpuPlayer.play(realPlayer, isHit);
    const loader = document.createElement("div");
    loader.classList.add("loader");
    playerBoard.appendChild(loader);
    setTimeout(() => {
      loader.remove();
      const attackValue = attack(cpuCords[0], cpuCords[1], realPlayer);
      if (attackValue === 2) start();
      else if (attackValue === 1) {
        if (realPlayer.myBoard.areShipsDestroyed()) {
          gameWon(cpuPlayer);
          return;
        }
        cpuTurn(true);
      }
    }, 1000);
  }

  function playerTurn() {
    const uniqueid = this.id;
    const row = parseInt(uniqueid.slice(0, 1), 10);
    const col = parseInt(uniqueid.slice(2, 3), 10);
    const playerName = uniqueid.slice(4);
    if (playerName === "Pr") {
      return;
    }
    const attackVal = attack(row, col, cpuPlayer);
    if (attackVal === 2) {
      unStart();
      cpuTurn();
    } else if (attackVal === 1) {
      if (cpuPlayer.myBoard.areShipsDestroyed()) gameWon(realPlayer);
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
    info.textContent = `${player.isCPU ? "Computer" : "Human"} has won the game`;
    graphs.innerHTML = "";
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
