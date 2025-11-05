export default function createGraph(player) {
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('main-graph-container');

    const allShips = player.myBoard.myShips;
    const container = document.createElement('div')
    container.classList.add('graph-container');

    const title = document.createElement('h3');
    title.classList.add('graph-title');
    title.textContent = player.isCPU ? 'Computer Ships' : 'Your Ships'
    mainContainer.appendChild(title)
    
    mainContainer.appendChild(container)

    for (let i = 0; i < allShips.length; i += 1) {
        const graph = document.createElement('div')
        graph.classList.add('graph');
        for (let j = 0; j < allShips[i].cords.length; j += 1) {
            const graphCell = document.createElement('div')
            graphCell.classList.add('graph-cell', `ship${allShips[i].length}`)
            graphCell.id = `${allShips[i].cords[j][0]}-${allShips[i].cords[j][1]}-graph-${player.isCPU? 'cpu' : 'real'}`
            graph.appendChild(graphCell)
        }
        container.appendChild(graph)
    } 
    return mainContainer
}