window.onload = function() {
    // 📌 Configuración del Canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const rows = 50, cols = 50;
    const cellSize = 10;
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    // 📌 Variables principales
    let speed = parseInt(document.getElementById("speedInput").value); // Velocidad inicial desde el input
    let grid = Array.from({ length: rows }, () => Array(cols).fill(0)); // Matriz para almacenar el estado del juego
    let running = false; // Indica si el juego está corriendo
    let intervalId = null; // Referencia del intervalo de actualización
    let isDrawing = false; // Indica si el usuario está dibujando en el canvas
    let drawState = null; // Estado de la celda al hacer clic (1 o 0)
    let wasRunning = false; // Indica si el juego estaba corriendo antes de dibujar
    let generationCount = 0; // Contador de generaciones

    // 📌 Referencias a los botones
    const toggleGameButton = document.getElementById("toggleGame");

    // 🎨 Dibuja la cuadrícula en el Canvas
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                ctx.fillStyle = grid[y][x] === 1 ? "black" : "white"; // Celda viva (negra) o muerta (blanca)
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeStyle = "gray";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    // 🔄 Calcula la siguiente generación basada en las reglas del Juego de la Vida
    function getNextGeneration() {
        let newGrid = grid.map(arr => [...arr]); // Copia la matriz actual

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let neighbors = 0;

                // Recorre los 8 vecinos de cada celda
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue; // Ignora la propia celda
                        let ny = y + i, nx = x + j;

                        if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                            neighbors += grid[ny][nx]; // Suma los vecinos vivos
                        }
                    }
                }

                // Aplica las reglas del Juego de la Vida
                if (grid[y][x] === 1 && (neighbors < 2 || neighbors > 3)) newGrid[y][x] = 0; // Muerte por sobrepoblación o aislamiento
                if (grid[y][x] === 0 && neighbors === 3) newGrid[y][x] = 1; // Nace una nueva célula
            }
        }

        grid = newGrid;
        generationCount++; // Incrementa el contador de generaciones
        document.getElementById("generationCounter").innerText = generationCount; // Actualiza la interfaz
    }

    // ⏳ Ejecuta la actualización del juego en cada iteración
    function update() {
        getNextGeneration();
        drawGrid();
    }

    // ▶️⏸️ Función para alternar entre "Iniciar" y "Pausar"
    function toggleGame() {
        if (!running) {
            running = true;
            intervalId = setInterval(update, speed);
            toggleGameButton.innerText = "Pausar";
        } else {
            running = false;
            clearInterval(intervalId);
            toggleGameButton.innerText = "Iniciar";
        }
    }

    // ⏹️ Pausa el juego
    function stopGame() {
        running = false;
        clearInterval(intervalId);
        toggleGameButton.innerText = "Iniciar";
    }

    // 🔄 Reinicia el juego y el contador de generaciones
    function resetGame() {
        stopGame();
        grid = Array.from({ length: rows }, () => Array(cols).fill(0));
        generationCount = 0;
        document.getElementById("generationCounter").innerText = generationCount;
        drawGrid();
    }

    // 🎲 Genera una cuadrícula completamente aleatoria, reinicia el contador y pausa el juego
    function generateRandomGrid() {
        stopGame();
        grid = Array.from({ length: rows }, () => Array(cols).fill(0));

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                grid[y][x] = Math.random() > 0.7 ? 1 : 0; // 30% de probabilidad de célula viva
            }
        }

        generationCount = 0; // Reiniciar el contador de generaciones
        document.getElementById("generationCounter").innerText = generationCount;
        drawGrid();
    }

    // 🎲 Añade nuevas células vivas sin afectar las ya existentes, y pausa el juego
    function addRandomCells() {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x] === 0 && Math.random() > 0.9) { 
                    grid[y][x] = 1; // Solo añade células en los espacios vacíos
                }
            }
        }
        drawGrid();
    }

    // ⚡ Cambia la velocidad asegurando que esté entre 50 y 500 ms
    function changeSpeed(newSpeed) {
        speed = Math.max(50, Math.min(500, newSpeed)); // Limita la velocidad
        document.getElementById("speedInput").value = speed;

        if (running) {
            clearInterval(intervalId);
            intervalId = setInterval(update, speed);
        }
    }

    // 📌 Event Listeners para los botones principales
    toggleGameButton.addEventListener("click", toggleGame);
    document.getElementById("resetBtn").addEventListener("click", resetGame);
    document.getElementById("generateRandomBtn").addEventListener("click", generateRandomGrid);
    document.getElementById("addRandomBtn").addEventListener("click", addRandomCells);

    // 📌 Event Listeners para los botones de velocidad
    document.getElementById("increaseSpeed").addEventListener("click", () => changeSpeed(speed + 50));
    document.getElementById("decreaseSpeed").addEventListener("click", () => changeSpeed(speed - 50));
    document.getElementById("minSpeed").addEventListener("click", () => changeSpeed(50));
    document.getElementById("maxSpeed").addEventListener("click", () => changeSpeed(500));

    // 🎨 🖱️ Dibujo interactivo en el Canvas
    canvas.addEventListener("mousedown", function(event) {
        if (running) {
            wasRunning = true;
            toggleGame(); // Pausa el juego automáticamente
        } else {
            wasRunning = false;
        }

        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        drawState = grid[y][x] === 1 ? 0 : 1;
        grid[y][x] = drawState;
        drawGrid();
    });

    canvas.addEventListener("mousemove", function(event) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        grid[y][x] = drawState;
        drawGrid();
    });

    canvas.addEventListener("mouseup", function() {
        isDrawing = false;
        if (wasRunning) {
            toggleGame();
        }
    });

    drawGrid(); // Dibuja la cuadrícula inicial
};