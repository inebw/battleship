import startGame from "./stargGame";

export default function homescreen() {
  const mainContainer = document.querySelector('.container')

  const container = document.createElement('div')
  container.classList.add('home-screen-container')
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  mainContainer.appendChild(container)

  function addLoader() {
    homeContainer.innerHTML = "";
    const loader = document.createElement('div')
    loader.classList.add('loader2')
    homeContainer.appendChild(loader);
  }

  function showChoices() {
    homeContainer.innerHTML = "";
    const vsComputerButton = document.createElement("button");
    vsComputerButton.textContent = "vs Computer";
    vsComputerButton.classList.add("vs-computer");
    homeContainer.appendChild(vsComputerButton);
    vsComputerButton.addEventListener('click', () => {
        addLoader()
        setTimeout(startGame, 1000)
    })

    const vsHumanButton = document.createElement("button");
    vsHumanButton.textContent = "vs Human";
    vsHumanButton.classList.add("vs-human");
    homeContainer.appendChild(vsHumanButton);
  }


  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = "Welcome to Battleship!";
  container.appendChild(welcomeMessage);

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.classList.add("start-button");
  homeContainer.appendChild(startButton);

  container.appendChild(homeContainer);

  startButton.addEventListener("click", () => {
    addLoader()
    setTimeout(showChoices, 500)
  });
}
