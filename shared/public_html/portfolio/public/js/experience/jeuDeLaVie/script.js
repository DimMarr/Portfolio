const gridElement = document.getElementById('grid');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const speedSlider = document.getElementById('speed');
const speedValueDisplay = document.getElementById('speedValue');

let grid = {};
let isPlaying = false;
let simulationSpeed = parseInt(speedSlider.value);

// Création de la grille
function createGrid(rows, cols) {
    gridElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => toggleCell(cell));

            // Si la souris est enfoncée, dessiner
            cell.addEventListener('mouseover', e => {
                if (e.buttons === 1) {
                    toggleCell(cell);
                }
            });
            fragment.appendChild(cell);
            grid[`${row},${col}`] = false; // Cellule morte par défaut
        }
    }
    gridElement.appendChild(fragment);
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
    if (isPlaying) return; // Évite de démarrer plusieurs simulations
    isPlaying = true;

    function step() {
        const newGrid = { ...grid };
        const cellsToUpdate = []; // Tableau pour stocker les cellules à mettre à jour

        for (const key in grid) {
            const [row, col] = key.split(',').map(Number);
            const aliveNeighbors = countAliveNeighbors(row, col);

            if (grid[key] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                newGrid[key] = false; // Meurt
                cellsToUpdate.push(key); // Ajoute la cellule à la liste des mises à jour
            } else if (!grid[key] && aliveNeighbors === 3) {
                newGrid[key] = true; // Naît
                cellsToUpdate.push(key); // Ajoute la cellule à la liste des mises à jour
            }
        }

        updateGrid(newGrid, cellsToUpdate); // Met à jour seulement les cellules concernées

        if (isPlaying) {
            setTimeout(() => requestAnimationFrame(step), simulationSpeed); // Utilise la vitesse du slider
        }
    }

    requestAnimationFrame(step);
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

// Mettre à jour uniquement les cellules concernées
function updateGrid(newGrid, cellsToUpdate) {
    grid = newGrid; // Met à jour l'état de la grille

    cellsToUpdate.forEach(key => {
        const [row, col] = key.split(',').map(Number);
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        // Mise à jour de l'état de la cellule
        if (grid[key]) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

// Pause la simulation
function pause() {
    isPlaying = false;
}

function init() {
    isPlaying = false;
    grid = {};
    createGrid(100, 150); // Ajuster la taille de la grille ici
}

// Événements
playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', init);
speedSlider.addEventListener('input', () => {
    simulationSpeed = parseInt(speedSlider.value);
    speedValueDisplay.textContent = `${simulationSpeed} ms`;
});

// Initialiser la grille
init();
