const gridElement = document.getElementById('grid');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let grid = {};
let isPlaying = false;

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

        if (isPlaying) requestAnimationFrame(step); // Continue l'animation si "Play" est actif
    }

    requestAnimationFrame(step);
}

// Pause la simulation
function pause() {
    isPlaying = false;
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
    const fragment = document.createDocumentFragment();

    Object.keys(grid).forEach(key => {
        const [row, col] = key.split(',').map(Number);
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        if (grid[key]) {
            if (!cell.classList.contains('alive')) {
                cell.classList.add('alive');
            }
        } else {
            if (cell.classList.contains('alive')) {
                cell.classList.remove('alive');
            }
        }

        fragment.appendChild(cell);
    });

    gridElement.appendChild(fragment);
}

// Réinitialiser la grille
function reset() {
    isPlaying = false;
    grid = {};
    createGrid(100, 150); // Ajuster la taille de la grille ici
}

// Événements
playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

// Initialiser la grille
createGrid(100, 150);
