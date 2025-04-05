import "../../src/assets/script.js";

function Conway() {
  return (
    <>
      <div className="contenedor-principal">
        <div className="titulo">
          <h1>Juego de la Vida de Conway</h1>
        </div>
        <div className="juego-conway">
          <canvas id="gameCanvas" />
          <br /><br />
        </div>
        <div className="botones">
          <div className="botones-control">
            <button id="generateRandomBtn">Generar Aleatorio</button>
            <button id="addRandomBtn">Añadir Aleatorios</button>
            <button id="toggleGame">Iniciar</button>
            <button id="resetBtn">Reiniciar</button>
          </div>
          <div className="botones-personalizados">
            <div className="botones-personalizados-velocidad">
              <label htmlFor="speedInput">Velocidad (ms): </label>
              <button id="minSpeed">min</button>
              <button id="decreaseSpeed">−</button>
              <input type="number" id="speedInput" defaultValue={50} min={50} step={50} readOnly />
              <button id="increaseSpeed">+</button>
              <button id="maxSpeed">máx</button>
            </div>
            <div className="botones-personalizados-colores">
              <label htmlFor="celdaVivaColor">Celdas Vivas:</label>
              <input type="color" id="celdaVivaColor" name="celdaVivaColor" defaultValue="#000000" />
              <label htmlFor="celdaViva">Celdas Muertas:</label>
              <input type="color" id="celdaMuertaColor" name="celdaMuertaColor" defaultValue="#FFFFFF" />
            </div>
          </div>
        </div>
        <div class="contadores">
          <h3>
            Generaciones: <span id="generationCounter">0</span>
          </h3>
          <h3>
            Celdas Vivas: <span id="aliveCounter">0</span>
          </h3>
        </div>
      </div>
    </>

  )
}

export default Conway