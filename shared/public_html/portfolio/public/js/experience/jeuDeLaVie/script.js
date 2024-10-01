const gridElement = document.getElementById('grid');
const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');

let grid = {};
let intervalId = null;

// Création de la grille
function createGrid(rows, cols) {
    gridElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => toggleCell(cell));
            gridElement.appendChild(cell);
            grid[`${row},${col}`] = false; // Cellule morte par défaut
        }
    }
}

// Basculer l'état d'une cellule
function toggleCell(cell) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    grid[`${row},${col}`] = !grid[`${row},${col}`];
    cell.classList.toggle('alive');
}

// Lancer la simulation
function play() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        const newGrid = { ...grid };
        for (const key in grid) {
            const [row, col] = key.split(',').map(Number);
            const aliveNeighbors = countAliveNeighbors(row, col);
            if (grid[key] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                newGrid[key] = false; // Meurt
            } else if (!grid[key] && aliveNeighbors === 3) {
                newGrid[key] = true; // Naît
            }
        }
        updateGrid(newGrid);
    }, 100);
}

// Compter les voisins vivants
function countAliveNeighbors(row, col) {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (!(r === row && c === col) && grid[`${r},${c}`]) {
                count++;
            }
        }
    }
    return count;
}

// Mettre à jour la grille
function updateGrid(newGrid) {
    grid = newGrid;
    Object.keys(grid).forEach(key => {
        const cell = document.querySelector(`[data-row="${key.split(',')[0]}"][data-col="${key.split(',')[1]}"]`);
        if (grid[key]) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

// Réinitialiser la grille
function reset() {
    clearInterval(intervalId);
    intervalId = null;
    grid = {};
    createGrid(50, 100); // Ajuster la taille de la grille ici
}

// Événements
playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);

// Initialiser la grille
createGrid(100, 150);