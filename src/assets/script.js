window.onload = function () {
    // 📌 Configuración del Canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const rows = 50, cols = 100;
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
    let aliveCount = 0; //Contador de celdas vivas
    let totalAliveCells = 0; // Variable para almacenar la suma total de celdas vivas
    let maxGenerations = 10; // Definir el máximo de generaciones a guardar en el historia

    // 📌 Variables para el historial de generaciones
    let history = []; // Historial de generaciones
    let historyIndex = -1; // Índice de la generación actual en el historial

    // 📌 Referencias a los botones
    const toggleGameButton = document.getElementById("toggleGame");

    // 📌 Referencias a los inputs de color
    const celdaVivaColorInput = document.getElementById("celdaVivaColor");
    const celdaMuertaColorInput = document.getElementById("celdaMuertaColor");

    // 🎨 Dibuja la cuadrícula en el Canvas
    function drawGrid() {
        // Leemos el valor actual de los colores
        const aliveColor = document.getElementById("celdaVivaColor").value;
        const deadColor = document.getElementById("celdaMuertaColor").value;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                ctx.fillStyle = grid[y][x] === 1 ? aliveColor : deadColor; // Celda viva (negra) o muerta (blanca)
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeStyle = "gray";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    // 🎨 Función para actualizar los colores de las celdas inmediatamente
    function updateCellColors() {
        const aliveColor = celdaVivaColorInput.value;  // Color de las celdas vivas
        const deadColor = celdaMuertaColorInput.value; // Color de las celdas muertas

        // Vuelve a dibujar la cuadrícula con los nuevos colores
        drawGrid(aliveColor, deadColor);
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
        getNextGeneration(); // Calcula la siguiente generación
        saveToHistory(); // Guardamos el estado de la generación en el historial
        drawGrid(); // Dibuja la cuadrícula


        // Actualiza el contador de celdas vivas
        const aliveCount = countAliveCells(); // Llama a la función que cuenta las celdas vivas
        document.getElementById("aliveCounter").innerText = aliveCount; // Muestra el contador de celdas vivas en la interfaz
        updateStatistics(aliveCount);
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
        aliveCount = 0;
        totalAliveCells = 0;
        history = []; // Limpiamos el historial
        historyIndex = -1; // Restablecemos el índice del historial
        document.getElementById("generationCounter").innerText = generationCount;
        document.getElementById("aliveCounter").innerText = aliveCount;
        document.getElementById("populationDensity").innerText = 0;
        document.getElementById("meanAliveCells").innerText = 0;
        document.getElementById("variance").innerText = 0;
        document.getElementById("logBase10").innerText = 0;
        document.getElementById("totalAliveCells").innerText = 0;
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
        totalAliveCells = 0;
        document.getElementById("generationCounter").innerText = generationCount;
        drawGrid();

        // Actualizamos el contador de celdas vivas
        const aliveCount = countAliveCells();
        document.getElementById("aliveCounter").innerText = aliveCount; // Muestra el contador de celdas vivas
        updateStatistics(aliveCount);
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

        // Actualizamos el contador de celdas vivas
        const aliveCount = countAliveCells();
        document.getElementById("aliveCounter").innerText = aliveCount; // Muestra el contador de celdas vivas
        updateStatistics(aliveCount);
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

    // 🧮 Función para contar las celdas vivas
    function countAliveCells() {
        let aliveCount = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x] === 1) {
                    aliveCount++; // Incrementa el contador si la celda está viva
                }
            }
        }

        return aliveCount; // Devuelve el número total de celdas vivas
    }

    // Función para guardar el estado de la generación en el historial
    function saveToHistory() {
        if (historyIndex < history.length - 1) {
            // Si estamos en medio del historial, eliminamos las generaciones "futuras"
            history = history.slice(0, historyIndex + 1);
        }

        // Guardamos el estado completo (cuadrícula, generaciones y totalAliveCells)
        history.push({
            grid: JSON.parse(JSON.stringify(grid)),
            generationCount: generationCount,
            totalAliveCells: totalAliveCells
        });

        historyIndex++; // Incrementamos el índice del historial

        // Limitar el historial a las últimas 10 generaciones
        if (history.length > maxGenerations) {
            history.shift(); // Elimina la generación más antigua (el primer elemento del array)
            historyIndex--; // Reducimos el índice para reflejar el cambio
        }
    }

    // 🔄 Retroceder una generación
    function previousGeneration() {
        if (historyIndex > 0) {
            historyIndex--; // Retrocedemos en el historial
            const previousState = history[historyIndex]; // Obtenemos el estado anterior

            // Restauramos la cuadrícula, las generaciones y el totalAliveCells
            grid = JSON.parse(JSON.stringify(previousState.grid));
            generationCount = previousState.generationCount;
            totalAliveCells = previousState.totalAliveCells; // Restauramos el total de celdas vivas

            document.getElementById("generationCounter").innerText = generationCount;
            document.getElementById("aliveCounter").innerText = countAliveCells(); // Calculamos de nuevo las celdas vivas
            drawGrid(); // Redibujamos el canvas

            // Actualizamos las estadísticas
            updateStatistics();
            stopGame(); // Pausa el juego al retroceder
        }
    }

    // 🔄 Avanzar una generación
    function nextGeneration() {
        if (historyIndex < history.length - 1) {
            historyIndex++; // Avanzamos en el historial
            const nextState = history[historyIndex]; // Obtenemos el siguiente estado

            // Restauramos la cuadrícula, las generaciones y el totalAliveCells
            grid = JSON.parse(JSON.stringify(nextState.grid));
            generationCount = nextState.generationCount;
            totalAliveCells = nextState.totalAliveCells; // Restauramos el total de celdas vivas

            document.getElementById("generationCounter").innerText = generationCount;
            document.getElementById("aliveCounter").innerText = countAliveCells(); // Calculamos de nuevo las celdas vivas
            drawGrid(); // Redibujamos el canvas

            // Actualizamos las estadísticas
            updateStatistics();
            stopGame(); // Pausa el juego al avanzar
        } else {
            // Si no hay generaciones futuras, calculamos una nueva
            getNextGeneration();
            saveToHistory();
            drawGrid();

            // Actualizamos el contador de celdas vivas
            const aliveCount = countAliveCells();
            document.getElementById("aliveCounter").innerText = aliveCount;
            updateStatistics();
            stopGame(); // Pausa el juego al avanzar
        }
    }

    // 📌 Exporta el estado del canvas a un archivo JSON
    function exportCanvas() {
        const data = {
            grid: grid, // El estado actual de la cuadrícula
            generationCount: generationCount, // Contador de generaciones
            aliveCount: countAliveCells() // Número de celdas vivas
        };

        // Solicitar al usuario el nombre del archivo
        const fileName = prompt("¿Cómo quieres nombrar el archivo?", "conway_grid.json");

        // Si el usuario no introduce un nombre, usamos un valor por defecto
        const name = fileName ? fileName : "conway_grid.json";

        // Crear un objeto Blob con el contenido de los datos
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

        // Crear un enlace para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name; // Usar el nombre proporcionado por el usuario
        link.click(); // Descargar el archivo
    }

    // 📌 Función para importar el archivo de datos JSON
    function importCanvas(event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado

        if (!file) return;

        const reader = new FileReader();

        // Leer el contenido del archivo como texto
        reader.onload = function (e) {
            const data = JSON.parse(e.target.result); // Convertir el JSON a un objeto

            // Establecer el estado de la cuadrícula, el contador de generaciones y el número de celdas vivas
            grid = data.grid;
            generationCount = data.generationCount;
            const aliveCount = data.aliveCount; // Celdas vivas recuperadas del archivo

            // Actualizar la interfaz con los nuevos valores
            document.getElementById("generationCounter").innerText = generationCount;
            document.getElementById("aliveCounter").innerText = aliveCount;

            drawGrid(); // Redibujar el canvas con los nuevos datos
        };

        reader.readAsText(file); // Leer el archivo como texto
    }

    // 📌 Función para abrir el explorador de archivos al hacer clic en el botón Importar
    document.getElementById('importBtn').addEventListener('click', function () {
        document.getElementById('importFile').click(); // Disparar el clic en el input de archivo
    });

    // 📌 Función para calcular la densidad poblacional
    function calculatePopulationDensity(aliveCount) {
        const totalCells = rows * cols;
        return (aliveCount / totalCells);
    }

    // 📌 Función para calcular el logaritmo base 10 del número de celdas vivas
    function calculateLogBase10(aliveCount) {
        if (aliveCount === 0) return 0;
        return Math.log10(aliveCount); // Retorna 0 si aliveCount es 0
    }

    // 📌 Función para calcular la media de celdas vivas
    function calculateMeanAliveCells() {
        if (generationCount === 0) return 0;
        return totalAliveCells / generationCount;
    }

    // 📌 Función para calcular la varianza
    function calculateVariance(aliveCount) {
        const mean = calculateMeanAliveCells();
        const squaredDifferences = generationCount.map(count => Math.pow(count - mean, 2));
        const variance = squaredDifferences.reduce((acc, diff) => acc + diff, 0) / squaredDifferences.length;
        return variance;
    }

    // 📌 Función para mostrar las estadísticas actualizadas en la interfaz
    function updateStatistics() {
        const aliveCount = countAliveCells();
        totalAliveCells += aliveCount;
        document.getElementById("populationDensity").innerText = calculatePopulationDensity(aliveCount).toFixed(4);
        document.getElementById("logBase10").innerText = calculateLogBase10(aliveCount).toFixed(4);
        document.getElementById("totalAliveCells").innerText = totalAliveCells; // Muestra el total acumulado de celdas vivas
        document.getElementById("meanAliveCells").innerText = calculateMeanAliveCells().toFixed(4);
        document.getElementById("variance").innerText = calculateVariance().toFixed(4);
    }

    // 📌 Event Listener para los botones de exportación e importación
    document.getElementById('exportBtn').addEventListener('click', exportCanvas);
    document.getElementById('importFile').addEventListener('change', importCanvas);

    // 📌 Event Listeners para los botones principales
    toggleGameButton.addEventListener("click", toggleGame);
    document.getElementById("resetBtn").addEventListener("click", resetGame);
    document.getElementById("generateRandomBtn").addEventListener("click", generateRandomGrid);
    document.getElementById("addRandomBtn").addEventListener("click", addRandomCells);

    // 📌 Event Listeners para los botones de retroceder y avanzar generaciones
    document.getElementById("previousGenerationBtn").addEventListener("click", previousGeneration);
    document.getElementById("nextGenerationBtn").addEventListener("click", nextGeneration);

    // 📌 Event Listeners para los botones de velocidad
    document.getElementById("increaseSpeed").addEventListener("click", () => changeSpeed(speed + 50));
    document.getElementById("decreaseSpeed").addEventListener("click", () => changeSpeed(speed - 50));
    document.getElementById("minSpeed").addEventListener("click", () => changeSpeed(50));
    document.getElementById("maxSpeed").addEventListener("click", () => changeSpeed(500));

    // 📌 Event listeners para los inputs de color
    celdaVivaColorInput.addEventListener("input", updateCellColors);
    celdaMuertaColorInput.addEventListener("input", updateCellColors);

    // 🎨 🖱️ Dibujo interactivo en el Canvas
    canvas.addEventListener("mousedown", function (event) {
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

        // Actualizamos el contador de celdas vivas
        const aliveCount = countAliveCells();
        document.getElementById("aliveCounter").innerText = aliveCount; // Muestra el contador de celdas vivas
    });

    canvas.addEventListener("mousemove", function (event) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        grid[y][x] = drawState;
        drawGrid();

        // Actualizamos el contador de celdas vivas
        const aliveCount = countAliveCells();
        document.getElementById("aliveCounter").innerText = aliveCount; // Muestra el contador de celdas vivas
    });

    canvas.addEventListener("mouseup", function () {
        isDrawing = false;
        if (wasRunning) {
            toggleGame();
        }
    });

    drawGrid(); // Dibuja la cuadrícula inicial
};