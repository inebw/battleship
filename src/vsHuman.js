import Player from "./player";
import createBoard from "./createBoard";
import createGraph from "./createGraph";
import attack from "./attack";
import gameOver from "./gameEnd";
import { addLoader, removeLoader } from "./cssLoaders";

export default function vsHuman() {
  const container = document.querySelector(".container");
  const graphs = document.querySelector(".graphs");
  const resetContainer = document.querySelector(".reset");
  const info = document.querySelector(".info");
  container.innerHTML = "";
  resetContainer.innerHTML = "";
  info.innerHTML = "";
  graphs.innerHTML = "";

  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");

  const player1Board = createBoard(player1);
  const player2Board = createBoard(player2);

  const graph1 = createGraph(player1);
  graph1.classList.add("graphP1");
  const graph2 = createGraph(player2);
  graph2.classList.add("graphP2");
  graphs.appendChild(graph1);
  graphs.appendChild(graph2);

  container.appendChild(player1Board);
  container.appendChild(player2Board);

  function play() {
    const uniqueid = this.id;
    const row = parseInt(uniqueid.slice(0, 1), 10);
    const col = parseInt(uniqueid.slice(2, 3), 10);
    const opponent = uniqueid.slice(4) === "P1" ? player1 : player2;
    const player = uniqueid.slice(4) === "P1" ? player2 : player1;
    const attackval = attack(row, col, opponent);
    if (attackval === 1) {
      if (opponent.myBoard.areShipsDestroyed()) {
        turnOffPlayerBoardEVentListner(player2);
        turnOffPlayerBoardEVentListner(player1);
        gameOver(player, vsHuman);
      }
    }
    if (attackval === 2) switchButtonAdder(opponent, player);
  }

  function switchButtonAdder(opponent, player) {
    turnOffPlayerBoardEVentListner(opponent);
    graph1.classList.add("hidden");
    graph2.classList.add("hidden");
    info.textContent = "You missed! Click on switch to change Player";
    const switchButton = document.createElement("button");
    switchButton.classList.add("switch-button");
    switchButton.textContent = "Switch Player";
    resetContainer.appendChild(switchButton);
    switchButton.addEventListener("click", () => {
      switchPlayer(opponent, player);
    });
  }

  function switchPlayer(opponent, player) {
    info.textContent = "";
    resetContainer.innerHTML = "";
    const opponentContainer = document.querySelector(`.board-${opponent.id}`);
    const opponentGraph = document.querySelector(`.graph${opponent.id}`);
    opponentContainer.classList.add("hidden");
    opponentGraph.classList.add("hidden");
    addLoader(container, "switch-player-loader");
    setTimeout(() => {
      removeLoader("switch-player-loader");
      info.textContent = `It's your turn: ${opponent.name}`;
      const playerContainer = document.querySelector(`.board-${player.id}`);
      const playerGraph = document.querySelector(`.graph${player.id}`);
      playerContainer.classList.remove("hidden");
      playerGraph.classList.remove("hidden");
      turn(opponent, player);
    }, 1000);
  }

  function turnOffPlayerBoardEVentListner(player) {
    const allCells = document.querySelectorAll(`.${player.id}`);
    allCells.forEach((element) => {
      element.removeEventListener("click", play);
    });
  }

  function turnOnPlayerBoardEventListner(player) {
    const allCells = document.querySelectorAll(`.${player.id}`);
    allCells.forEach((element) => {
      element.addEventListener("click", play);
    });
  }

  function turn(player, opponent) {
    turnOffPlayerBoardEVentListner(player);

    turnOnPlayerBoardEventListner(opponent);
  }

  function initialize() {
    player1Board.classList.add("hidden");
    graph1.classList.add("hidden");
    info.textContent = "It's your turn Player 1";
    turn(player1, player2);
  }

  initialize();
}
