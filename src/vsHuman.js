import Player from "./player";
import createBoard from "./createBoard";
import createGraph from "./createGraph";

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
  graph1.classList.add("graph1");
  const graph2 = createGraph(player2);
  graph2.classList.add("graph2");
  graphs.appendChild(graph1);
  graphs.appendChild(graph2);

  container.appendChild(player1Board);
  container.appendChild(player2Board);

  function addLoader(loaderContainer, isLoader3 = true) {
    const loader = document.createElement("div");
    if (isLoader3)
      loader.classList.add("loader3");
    else
      loader.classList.add("loader4");
    loaderContainer.appendChild(loader);
  }

  function removeLoader() {
    const loader = document.querySelector(".loader3");
    if (loader) loader.remove();
  }

  function play() {
    const uniqueid = this.id;
    const row = parseInt(uniqueid.slice(0, 1), 10);
    const col = parseInt(uniqueid.slice(2, 3), 10);
    const opponent = uniqueid.slice(4) === "p1" ? player1 : player2;
    const player = uniqueid.slice(4) === "p1" ? player2 : player1;
    const attackval = attack(row, col, opponent);
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
    const opponentNumber = `${opponent.name.slice(opponent.name.length - 1)}`;
    const opponentContainer = document.querySelector(
      `.board-p${opponentNumber}`,
    );
    const opponentGraph = document.querySelector(`.graph${opponentNumber}`);
    opponentContainer.classList.add("hidden");
    opponentGraph.classList.add("hidden");
    addLoader(container);
    setTimeout(() => {
      removeLoader();
      info.textContent = `It's your turn: ${opponent.name}`;
      const playernumber = opponentNumber === "1" ? "2" : "1";
      const playerContainer = document.querySelector(`.board-p${playernumber}`);
      const playerGraph = document.querySelector(`.graph${playernumber}`);
      playerContainer.classList.remove("hidden");
      playerGraph.classList.remove("hidden");
      turn(opponent, player);
    }, 1000);
  }

  function turnOffPlayerBoardEVentListner(player) {
    const allCells = document.querySelectorAll(
      `.p${player.name.slice(player.name.length - 1)}`,
    );
    allCells.forEach((element) => {
      element.removeEventListener("click", play);
    });
  }

  function turnOnPlayerBoardEventListner(player) {
    const allCells = document.querySelectorAll(
      `.p${player.name.slice(player.name.length - 1)}`,
    );
    allCells.forEach((element) => {
      element.addEventListener("click", play);
    });
  }

  function turn(player, opponent) {
    turnOffPlayerBoardEVentListner(player);

    turnOnPlayerBoardEventListner(opponent);
  }

  function gameWon(player) {
    info.textContent = `${player.name} has won the game`;
    graphs.innerHTML = "";
    const resetButton = document.createElement("button");
    resetContainer.appendChild(resetButton);
    resetButton.classList.add("reset");
    resetButton.textContent = "Replay";
    turnOffPlayerBoardEVentListner(player2);
    turnOffPlayerBoardEVentListner(player1)
    resetButton.addEventListener("click", () => {
      container.innerHTML = "";
      info.innerHTML = "";
      graphs.innerHTML = "";
      resetContainer.innerHTML = "";
      addLoader(container, false);
      setTimeout(() => {
        vsHuman();
      }, 1000);
    });
  }

  function attack(x, y, player) {
    let cellValue = player.myBoard.board[x][y];
    if (cellValue === "!" || cellValue === 1) return 0;
    if (cellValue !== 0) {
      const currCell = document.getElementById(
        `${x}-${y}-p${player.name.slice(player.name.length - 1)}`,
      );
      if (player.myBoard.board[x][y])
        currCell.classList.add(`ship${player.myBoard.board[x][y].length}`);
    }

    player.myBoard.receiveAttack(x, y);
    cellValue = player.myBoard.board[x][y];

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const currId = `${i}-${j}-p${player.name.slice(player.name.length - 1)}`;
        if (player.myBoard.board[i][j] === "!") {
          const cell = document.getElementById(currId);
          cell.style.backgroundColor = "#e5e5e5";
        }
      }
    }

    if (cellValue === 1) {
      const graphCell = document.getElementById(
        `${x}-${y}-graph-p${player.name.slice(player.name.length - 1)}`,
      );
      graphCell.style.opacity = 0.2;
      if (player.myBoard.areShipsDestroyed()) {
        gameWon(player.name === "Player 1" ? player2 : player1);
        return 0;
      }
      return 1;
    }
    return 2;
  }

  function initialize() {
    player1Board.classList.add("hidden");
    graph1.classList.add("hidden");
    info.textContent = "It's your turn Player 1";
    turn(player1, player2);
  }

  initialize();
}
