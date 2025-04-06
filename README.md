# JuegoDeLaVidaConway
Repositorio donde se guardará mi práctica para la Materia de Cellular Automata. La práctica consiste en crear el Juego de la Vida de Conway con algunas especificaciones.

## 🎮 Funcionalidades del Proyecto

### Interfaz y Control del Juego

- ✔ Iniciar/Pausar → Un solo botón cambia entre "Iniciar" y "Pausar".
- ✔ Reiniciar → Borra la cuadrícula, reinicia el conteo de generaciones y pausa el juego.
- ✔ Contador de Generaciones → Muestra cuántas generaciones han pasado en la simulación.

### Manipulación de la Cuadrícula

- ✔ Dibujar con el Mouse → Se pueden activar/desactivar células arrastrando el mouse.
- ✔ El juego se pausa automáticamente al dibujar y se reanuda al soltar el mouse.
- ✔ El juego NO se pausa al agregar células aleatorias.

### Generación de Patrones Aleatorios

- ✔ "Generar Aleatorio" → Borra la cuadrícula, genera un nuevo patrón aleatorio, reinicia el conteo de generaciones y pausa el juego.
- ✔ "Añadir Aleatorios" → Agrega células vivas solo en los espacios vacíos, sin borrar las existentes, y NO pausa el juego.

### Control de Velocidad

- ✔ Se puede aumentar o disminuir la velocidad con los botones + y - (en incrementos de 50ms).
- ✔ Velocidad mínima de 50ms y máxima de 500ms.
- ✔ Botones "Velocidad Mínima" y "Velocidad Máxima" ajustan la velocidad instantáneamente.
- ✔ Si el juego está corriendo, la velocidad cambia en tiempo real sin pausarlo.

### Historial de Generaciones

- ✔ Historial de Generaciones → Se guarda el estado de las últimas 10 generaciones.
- ✔ Retroceder y Avanzar Generaciones → Permite ir hacia atrás o hacia adelante en las generaciones guardadas.
- ✔ Reiniciar Historial → El historial se limpia cuando se reinicia el juego.

### Importación y Exportación

- ✔ Exportar → Permite exportar el estado del juego (cuadrícula, número de generaciones, celdas vivas) a un archivo JSON.
- ✔ Importar → Permite importar un archivo JSON previamente exportado para restaurar el estado del juego.

### Estadísticas y Cálculos

- ✔ Contador de Celdas Vivas → Muestra el número de celdas vivas en la generación actual.
- ✔ Total Acumulado de Celdas Vivas → Lleva el total acumulado de celdas vivas en todas las generaciones.
- ✔ Densidad Poblacional → Calcula la densidad de celdas vivas como la proporción de celdas vivas en relación con el total de celdas, multiplicado por el número de generaciones.
- ✔ Media de Celdas Vivas → Calcula la media de celdas vivas en todas las generaciones.
- ✔ Varianza → Calcula la varianza de las celdas vivas entre las generaciones.
- ✔ Logaritmo Base 10 → Calcula el logaritmo base 10 del número de celdas vivas en cada generación.

## 🎯 ¿Qué hace especial a este proyecto?

- 🚀 Fluidez total → Puedes modificar la cuadrícula sin interrumpir la simulación.
- 🎨 Interactividad total → Puedes dibujar, agregar células aleatorias y cambiar la velocidad sin restricciones molestas.
- 📊 Optimización → Uso eficiente de la memoria y la lógica para mantener un buen rendimiento.
- 🗃 Historial de generaciones → Mantén un registro de las últimas generaciones y navega a través de ellas.
- ⚙️ Personalización → Cambia los colores de las celdas vivas y muertas y ajusta la velocidad de la simulación según tus preferencias.