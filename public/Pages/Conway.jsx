import { useEffect, useRef } from "react";
import "../../src/assets/Conway.css";
import { initConway } from "../../src/assets/script.js";

function Conway() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initConway();
    }
  }, []);
  return (
    <div className="app-container">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <h1 className="gradient-title">Juego de la Vida de Conway</h1>
        <p className="subtitle">Autómata celular interactivo · Simulador visual</p>
      </header>

      {/* ===== TOOLBAR ===== */}
      <div className="toolbar glass-panel">
        <button id="toggleGame" className="btn btn-accent">▶ Iniciar</button>
        <button id="resetBtn" className="btn btn-danger">⟲ Reiniciar</button>
        <button id="previousGenerationBtn" className="btn">◀ Retroceder</button>
        <button id="nextGenerationBtn" className="btn">▶ Avanzar</button>

        <span className="toolbar-divider" />

        <button id="generateRandomBtn" className="btn btn-success">⚄ Aleatorio</button>
        <button id="addRandomBtn" className="btn">＋ Añadir</button>

        <span className="toolbar-divider" />

        <div className="speed-group">
          <span className="speed-label">Velocidad (ms)</span>
          <button id="minSpeed" className="btn btn-speed btn-ghost">min</button>
          <button id="decreaseSpeed" className="btn btn-speed">−</button>
          <input
            type="number"
            id="speedInput"
            className="speed-input"
            defaultValue={50}
            min={50}
            step={50}
            readOnly
          />
          <button id="increaseSpeed" className="btn btn-speed">+</button>
          <button id="maxSpeed" className="btn btn-speed btn-ghost">máx</button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">

        {/* ----- CANVAS VIEWER ----- */}
        <section className="canvas-viewer glass-panel">
          <canvas id="gameCanvas" />
          <button className="help-btn" type="button" aria-label="Ayuda">?</button>
          <div className="help-popup">
            <h4>Controles del Ratón</h4>
            <ul>
              <li><span className="key">Clic</span> Alternar celda</li>
              <li><span className="key">Arrastrar</span> Dibujar / borrar</li>
              <li><span className="key">Clic + Arrastrar</span> Dibuja continuo</li>
            </ul>
          </div>
        </section>

        {/* ----- SIDE PANEL ----- */}
        <aside className="side-panel">

          {/* A. ESTADÍSTICAS */}
          <div className="stats-grid">
            <div className="stat-card stat-indigo">
              <span className="stat-label">Generaciones</span>
              <span className="stat-value" id="generationCounter">0</span>
            </div>
            <div className="stat-card stat-green">
              <span className="stat-label">Celdas Vivas</span>
              <span className="stat-value" id="aliveCounter">0</span>
            </div>
            <div className="stat-card stat-orange">
              <span className="stat-label">Densidad Pobl.</span>
              <span className="stat-value" id="populationDensity">0</span>
            </div>
            <div className="stat-card stat-yellow">
              <span className="stat-label">Log₁₀</span>
              <span className="stat-value" id="logBase10">0</span>
            </div>
            <div className="stat-card stat-indigo">
              <span className="stat-label">Media Vivas</span>
              <span className="stat-value" id="meanAliveCells">0</span>
            </div>
            <div className="stat-card stat-orange">
              <span className="stat-label">Varianza</span>
              <span className="stat-value" id="variance">0</span>
            </div>
            <div className="stat-card stat-green stat-span-2">
              <span className="stat-label">Total Celdas Vivas</span>
              <span className="stat-value" id="totalAliveCells">0</span>
            </div>
          </div>

          {/* B. SELECTOR DE PINCEL */}
          <div className="brush-selector glass-card">
            <div className="section-label">Herramienta</div>
            <div className="brush-bar">
              <button className="brush-btn active" type="button">🖊 Dibujar</button>
              <button className="brush-btn" type="button">🧹 Borrar</button>
            </div>
          </div>

          {/* C. TOGGLES RÁPIDOS */}
          <div className="toggles-section glass-card">
            <div className="toggle-row">
              <span>Mundo Toroidal</span>
              <label className="switch">
                <input type="checkbox" id="toroidalCheck" />
                <span className="slider round" />
              </label>
            </div>
          </div>

          {/* D. ACORDEONES */}

          {/* Parámetros del Grid */}
          <details className="accordion">
            <summary>⚙ Parámetros del Grid</summary>
            <div className="accordion-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inputRows">Filas</label>
                  <input
                    type="number"
                    id="inputRows"
                    className="form-input"
                    min={50}
                    defaultValue={50}
                    step={50}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputCols">Columnas</label>
                  <input
                    type="number"
                    id="inputCols"
                    className="form-input"
                    min={50}
                    defaultValue={100}
                    step={50}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputCellSize">Tamaño de celda (px)</label>
                <input
                  type="number"
                  id="inputCellSize"
                  className="form-input"
                  min={2}
                  defaultValue={10}
                />
              </div>
              <button id="updateSizeBtn" className="btn btn-accent btn-full">Aplicar Tamaño</button>
            </div>
          </details>

          {/* Reglas B/S */}
          <details className="accordion">
            <summary>📐 Reglas B / S</summary>
            <div className="accordion-body">
              <div className="form-label">Notación de Nacimiento / Supervivencia</div>
              <div className="rules-display">
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="ruleB">B (Nacimiento)</label>
                  <input
                    className="rules rules-input"
                    type="number"
                    id="ruleB"
                    defaultValue={3}
                  />
                </div>
                <span className="rules-separator">/</span>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="ruleS">S (Supervivencia)</label>
                  <input
                    className="rules rules-input"
                    type="number"
                    id="ruleS"
                    defaultValue={23}
                  />
                </div>
              </div>
            </div>
          </details>

          {/* Personalización */}
          <details className="accordion">
            <summary>🎨 Personalización</summary>
            <div className="accordion-body">
              <div className="color-picker-row">
                <label htmlFor="celdaVivaColor">Celdas Vivas</label>
                <input
                  type="color"
                  id="celdaVivaColor"
                  name="celdaVivaColor"
                  defaultValue="#000000"
                />
              </div>
              <div className="color-picker-row">
                <label htmlFor="celdaMuertaColor">Celdas Muertas</label>
                <input
                  type="color"
                  id="celdaMuertaColor"
                  name="celdaMuertaColor"
                  defaultValue="#FFFFFF"
                />
              </div>
            </div>
          </details>

          {/* Importar / Exportar */}
          <details className="accordion">
            <summary>💾 Importar / Exportar</summary>
            <div className="accordion-body">
              <div className="export-import-row">
                <button id="exportBtn" className="btn btn-accent">⬇ Exportar</button>
                <input type="file" id="importFile" style={{ display: 'none' }} />
                <button id="importBtn" className="btn">⬆ Importar</button>
              </div>
            </div>
          </details>

        </aside>
      </main>
    </div>
  );
}

export default Conway;