import vsComputer from "./vsComputer";
import vsHuman from "./vsHuman";
import { addLoader } from "./cssLoaders";

export default function homescreen() {
  const mainContainer = document.querySelector(".container");
  mainContainer.innerHTML = "";

  const graphs = document.querySelector(".graphs");
  const resetContainer = document.querySelector(".reset");
  const info = document.querySelector(".info");
  resetContainer.innerHTML = "";
  info.innerHTML = "";
  graphs.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("home-screen-container");
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  mainContainer.appendChild(container);



  function showChoices() {
    homeContainer.innerHTML = "";
    const vsComputerButton = document.createElement("button");
    vsComputerButton.textContent = "vs Computer";
    vsComputerButton.classList.add("vs-computer");
    homeContainer.appendChild(vsComputerButton);
    vsComputerButton.addEventListener("click", () => {
      addLoader(homeContainer, "homescreen-loader", true);
      setTimeout(vsComputer, 1000);
    });

    const vsHumanButton = document.createElement("button");
    vsHumanButton.textContent = "vs Human";
    vsHumanButton.classList.add("vs-human");
    homeContainer.appendChild(vsHumanButton);
    vsHumanButton.addEventListener("click", () => {
      addLoader(homeContainer, "homescreen-loader", true);
      setTimeout(vsHuman, 1000);
    });
  }

  const logo = document.querySelector("body>h1");
  logo.addEventListener("click", () => {
    resetContainer.innerHTML = "";
    info.innerHTML = "";
    graphs.innerHTML = "";
    addLoader(mainContainer, "homescreen-loader", true);
    setTimeout(homescreen, 1000);
  });

  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = "Welcome to Battleship!";
  container.appendChild(welcomeMessage);

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.classList.add("start-button");
  homeContainer.appendChild(startButton);

  container.appendChild(homeContainer);

  startButton.addEventListener("click", () => {
    addLoader(homeContainer, "homescreen-loader", true);
    setTimeout(showChoices, 500);
  });
}
