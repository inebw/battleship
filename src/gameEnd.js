import { addLoader } from "./cssLoaders";

export default function gameOver(player, callBack) {
  const container = document.querySelector(".container");
  const graphs = document.querySelector(".graphs");
  const resetContainer = document.querySelector(".reset");
  const info = document.querySelector(".info");

  info.textContent = `${player.name} has won the game`;
  graphs.innerHTML = "";

  const resetButton = document.createElement("button");
  resetContainer.appendChild(resetButton);
  resetButton.classList.add("reset");
  resetButton.textContent = "Replay";
  resetButton.addEventListener("click", () => {
    container.innerHTML = "";
    info.innerHTML = "";
    graphs.innerHTML = "";
    resetContainer.innerHTML = "";
    addLoader(container, "restart-game-loader");
    setTimeout(callBack, 1000);
  });
}
