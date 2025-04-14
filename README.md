# JuegoDeLaVidaConway
Repositorio donde se guardará mi práctica para la Materia de Cellular Automata. La práctica consiste en crear el Juego de la Vida de Conway con algunas especificaciones.

## 🎮 Funcionalidades del Proyecto

### Interfaz y Control del Juego

- ✔ Iniciar/Pausar → Un solo botón cambia entre "Iniciar" y "Pausar". Se desactivan los inputs de reglas mientras el juego está corriendo.
- ✔ Reiniciar → Borra la cuadrícula, reinicia el conteo de generaciones y pausa el juego.
- ✔ Contador de Generaciones → Muestra cuántas generaciones han pasado en la simulación.
- ✔ Contador de Celdas Vivas → Muestra el número total de celdas vivas en la simulación.
- ✔ Contador de Total de Celdas Vivas → Muestra la suma total de celdas vivas a través de todas las generaciones.

### Manipulación de la Cuadrícula

- ✔ Dibujar con el Mouse → Se pueden activar/desactivar celdas arrastrando el mouse.
- ✔ El juego se pausa automáticamente al dibujar: El juego se detiene automáticamente cuando se empieza a dibujar, y se reanuda cuando se suelta el mouse.
- ✔ El juego NO se pausa al agregar celdas aleatorias: La adición de celdas aleatorias no interrumpe la ejecución del juego.

### Generación de Patrones Aleatorios

- ✔ "Generar Aleatorio" → Borra la cuadrícula, genera un nuevo patrón aleatorio, reinicia el conteo de generaciones y pausa el juego.
- ✔ "Añadir Aleatorios" → Agrega células vivas solo en los espacios vacíos, sin borrar las existentes, y NO pausa el juego.

### Control de Velocidad

- ✔ Aumentar/Disminuir la velocidad → Se puede aumentar o disminuir la velocidad con los botones + y - (en incrementos de 50ms).
- ✔ Velocidad mínima de 50ms y máxima de 500ms.
- ✔ Botones "Velocidad Mínima" y "Velocidad Máxima" → Ajustan la velocidad instantáneamente.
- ✔ El cambio de velocidad se aplica sin pausar el juego → Si el juego está corriendo, la velocidad cambia en tiempo real sin necesidad de pausarlo.

## Modo Toroidal

- ✔ Modo Toroidal Activado/Desactivado → Cuando el modo toroidal está activado, las celdas en los bordes del canvas se comportan como si estuvieran conectadas al lado opuesto (por ejemplo, la celda (0, 49) tiene como vecino la celda (49, 49)).
- ✔ Cambio dinámico del borde → El borde del canvas cambia a 1px cuando el modo toroidal está activado y a 3px cuando está desactivado.

## Reglas B/S Personalizadas

- ✔ Entrada de Reglas B/S → Los usuarios pueden personalizar las reglas B/S (por ejemplo, B3/S23 para las reglas predeterminadas) mediante inputs de número.
- ✔ Desactivación de inputs mientras el juego está corriendo → Los inputs de reglas B/S están desactivados mientras el juego está corriendo y se activan nuevamente cuando el juego está pausado.

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
- 🌐 Exportar/Importar → Permite guardar y restaurar el estado completo del juego en cualquier momento.