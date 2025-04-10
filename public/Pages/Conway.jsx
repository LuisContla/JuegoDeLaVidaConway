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
            <button id="previousGenerationBtn">Retroceder Generación</button>
            <button id="nextGenerationBtn">Avanzar Generación</button>
            <label htmlFor="toroidalToggle">Toroidal:</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
          <div className="botones-velocidad">
            <label htmlFor="speedInput">Velocidad (ms): </label>
            <button id="minSpeed">min</button>
            <button id="decreaseSpeed">−</button>
            <input type="number" id="speedInput" defaultValue={50} min={50} step={50} readOnly />
            <button id="increaseSpeed">+</button>
            <button id="maxSpeed">máx</button>
          </div>
          <div className="botones-colores">
            <label htmlFor="celdaVivaColor">Celdas Vivas:</label>
            <input type="color" id="celdaVivaColor" name="celdaVivaColor" defaultValue="#000000" />
            <label htmlFor="celdaViva">Celdas Muertas:</label>
            <input type="color" id="celdaMuertaColor" name="celdaMuertaColor" defaultValue="#FFFFFF" />
          </div>
        </div>
        <div className="inputs-reglas">
          <label htmlFor="ruleB">B</label>
          <input type="number" />
          <label htmlFor="ruleS">/S</label>
          <input type="number" name="" id="" />
        </div>
        <div className="contadores">
          <h3>Generaciones:<br /><span id="generationCounter">0</span></h3>
          <h3>Celdas Vivas:<br /><span id="aliveCounter">0</span></h3>
          <h3>Densidad Poblacional:<br /><span id="populationDensity">0</span></h3>
          <h3>Logaritmo Base 10:<br /><span id="logBase10">0</span></h3>
          <h3> Media de Celdas Vivas:<br /><span id="meanAliveCells">0</span></h3>
          <h3>Varianza:<br /><span id="variance">0</span></h3>
          <h3>Total de Celdas Vivas:<br /><span id="totalAliveCells">0</span></h3>
        </div>
        <div className="export-import-controls">
          <button id="exportBtn">Exportar</button>
          <input type="file" id="importFile" style={{ display: 'none' }} />
          <button id="importBtn">Importar</button>
        </div>
      </div>
    </>

  )
}

export default Conway