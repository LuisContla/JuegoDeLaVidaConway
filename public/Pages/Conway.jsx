import "../../src/assets/script.js";

function Conway() {
    return (
        <>
          <h1>Juego de la Vida de Conway</h1>
          <canvas id="gameCanvas" />
          <br />
          <button id="generateRandomBtn">Generar Aleatorio</button>
          <button id="addRandomBtn">Añadir Aleatorios</button>
          <button id="toggleGame">Iniciar</button>
          <button id="resetBtn">Reiniciar</button>
          <label htmlFor="speedInput">Velocidad (ms): </label>
          <button id="minSpeed">min</button>
          <button id="decreaseSpeed">−</button>
          <input type="number" id="speedInput" defaultValue={50} min={50} step={50} readOnly />
          <button id="increaseSpeed">+</button>
          <button id="maxSpeed">máx</button>
          <h3>
            Generaciones: <span id="generationCounter">0</span>
          </h3>
        </>
    
      )
}

export default Conway