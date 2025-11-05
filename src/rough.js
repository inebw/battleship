// import Player from "./player";
// import createBoard from "./createBoard";
// import createGraph from "./createGraph";

// export default function vsHuman() {
//   const container = document.querySelector(".container");
//   const graphs = document.querySelector(".graphs");
//   const resetContainer = document.querySelector(".reset");
//   const info = document.querySelector(".info");
//   container.innerHTML = "";
//   resetContainer.innerHTML = "";
//   info.innerHTML = "";
//   graphs.innerHTML = "";

//   const player1 = new Player("Player 1");
//   const player2 = new Player("Player 2");

//   const player1Board = createBoard(player1);
//   const player2Board = createBoard(player2);

//   const graph1 = createGraph(player1);
//   graph1.classList.add("graph1");
//   const graph2 = createGraph(player2);
//   graph2.classList.add("graph2");
//   graphs.appendChild(graph1);
//   graphs.appendChild(graph2);

//   container.appendChild(player1Board);
//   container.appendChild(player2Board);

//   function addLoader(loaderContainer) {
//     const loader = document.createElement('div')
//     loader.classList.add('loader3')
//     loaderContainer.appendChild(loader)
//   }

//   function play() {
//     const uniqueid = this.id;
//     const row = parseInt(uniqueid.slice(0, 1), 10);
//     const col = parseInt(uniqueid.slice(2, 3), 10);
//     const opponent = uniqueid.slice(4) === "p1" ? player1 : player2;
//     const player = uniqueid.slice(4) === "p1" ? player2 : player1;
//     const attackVal = attack(row, col, opponent)
//     if (attackVal === 0) turn(player, opponent)
//     if (attackVal=== 2) {
//       turn(opponent, player);
//     }
//   }

//   function turnOffPlayerBoardEVentListner(player) {
//     const allCells = document.querySelectorAll(
//       `.p${player.name.slice(player.name.length - 1)}`,
//     );
//     allCells.forEach((element) => {
//       element.removeEventListener("click", play);
//     });
//   }

//   function turnOnPlayerBoardEventListner(player) {
//     const allCells = document.querySelectorAll(
//       `.p${player.name.slice(player.name.length - 1)}`,
//     );
//     allCells.forEach((element) => {
//       element.addEventListener("click", play);
//     });
//   }

//   function turn(player, opponent) {
//     turnOffPlayerBoardEVentListner(player);
//     const playernumber = `${player.name.slice(player.name.length - 1)}`
//     const playerContainer = document.querySelector(`.p${playernumber}`)
//     const playerGraph = document.querySelector(`.graph${playernumber}`)
//     playerContainer.classList.add('hidden');
//     playerGraph.classList.add('hidden');


//     turnOnPlayerBoardEventListner(opponent);
//     const opponentNumber = playernumber === "1" ? "2" : "1"
//     const opponentContainer = document.querySelector(`.p${opponentNumber}`)
//     const opponentGraph = document.querySelector(`.graph${opponentNumber}`)
//     opponentContainer.classList.remove('hidden');
//     opponentGraph.classList.remove('hidden');

//   }

//   function gameWon(player) {
//     info.textContent = `${player.name} has won the game`;
//     graphs.innerHTML = "";
//     const resetButton = document.createElement("button");
//     resetContainer.appendChild(resetButton);
//     resetButton.classList.add("reset");
//     resetButton.textContent = "Replay";
//     turnOffPlayerBoardEVentListner(player);
//     resetButton.addEventListener("click", () => {
//       vsHuman();
//     });
//   }

//   function attack(x, y, player) {
//     console.log(x, y, player)
//     let cellValue = player.myBoard.board[x][y];
//     if (cellValue === "!" || cellValue === 1) return 0;
//     if (cellValue !== 0) {
//       const currCell = document.getElementById(`${x}-${y}-p${player.name.slice(player.name.length - 1)}`);
//       if (player.myBoard.board[x][y])
//         currCell.classList.add(`ship${player.myBoard.board[x][y].length}`);
//     }

//     player.myBoard.receiveAttack(x, y);
//     cellValue = player.myBoard.board[x][y];

//     for (let i = 0; i < 10; i += 1) {
//       for (let j = 0; j < 10; j += 1) {
//         const currId = `${i}-${j}-p${player.name.slice(player.name.length - 1)}`;
//         if (player.myBoard.board[i][j] === "!") {
//           const cell = document.getElementById(currId);
//           cell.style.backgroundColor = "#e5e5e5";
//         }
//       }
//     }

//     if (cellValue === 1) {
//       const graphCell = document.getElementById(`${x}-${y}-graph-p${player.name.slice(player.name.length - 1)}`);
//       graphCell.style.opacity = 0.2;
//       if (player.myBoard.areShipsDestroyed()) {
//         gameWon(player.name === "Player 1" ? player2 : player1);
//         return 0;
//       }
//       return 1;
//     }
//     return 2;
//   }

//   turn(player1, player2)
// }
