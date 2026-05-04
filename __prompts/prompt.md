Quiero crear una PWA que ha de ser un Dashboard interactivo con los datos que se encuentran en estos csv que se encuentran en /csv.

[CAMPEON DE CONFERENCIA](../csv/FANTASY-ESPN-CAMPEON-DE-CONFERENCIA.csv)

[CLASIFICACIÓN GLOBAL](../csv/FANTASY-ESPN-CLASIFICACION-GLOBAL.csv)

[CAMPEON](../csv/FANTASY-ESPN-CAMPEONES.csv)

[CLASIFICACIÓN GLOBAL](../csv/FANTASY-ESPN-CLASIFICACION-GLOBAL.csv)

[JOKIC LEAGUE](../csv/FANTASY-ESPN-JOKIC-LEAGUE.csv)

[MVP PLAYOFF](../csv/FANTASY-ESPN-MVP-PLAYOFF.csv)

[MVP](../csv/FANTASY-ESPN-MVP.csv)



Los participantes son:

JOSE, TOTTI, COLLERA, KELE, CHALLEN, JOTA, MUSTI, MARCOS, ILDKRAFT, IVÁN, RACRACK, ÁNGEL, CRISTIAN, JAVI, YERCA, MELKART, FOCHY

Las temporadas que se ha jugado son:

2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026



Las hojas del google sheet deberán tenr su representación gráfica y són:

-CLASIFICACIÓN GLOBAL

-CAMPEONES

-CAMPEÓN DE CONFERENCIA

-MVP

-MVP PLAYOFF

- JOKIC LEAGUE



El dashboard deberá tener una vista global, filtrado por participante y/o por temporada para saber los logros de cada uno de los participantes.



Necesito que me generes un megapront para incluir a Antigravity para que pueda planificar y ejecutar todo el proceso. El mega prompt debe incluir:

- Análisis profundo de los datos para poder trabajar con ellos correctamente

- Cargar datos de los csv a Stitch

- Diseño de la interfaz en Stitch (lo tengo conectado mediante MCP) 

- Maquetación de la PWA completa con todas las funcionalidades requeridas

- Implementación de todo lo anterior en Antigravity, con validaciones de funcionamiento y dodo lo necesario

Prepara el megaprompt incluyendo este texto y todo lo anterior. Recuerda que debe ser lo mas detallado posible para que Antigravity pueda planificar y ejecutar todo el proceso correctamente.    

--------------------------------------------------------------------------------------------------------------------------------

ROL: Actúa como Senior Full-Stack Developer, Data Architect y Experto en Automatización con MCP.

OBJETIVO: Diseñar, desarrollar y desplegar una PWA (Progressive Web App) que funcione como un Dashboard interactivo para los datos históricos de una liga de Fantasy ESPN, integrando Stitch como backend de datos.

1. ANÁLISIS DE DATOS Y ESTRUCTURA:

Archivos Fuente: Debes procesar 7 archivos CSV ubicados en /csv: FANTASY-ESPN-CAMPEON-DE-CONFERENCIA.csv, FANTASY-ESPN-CLASIFICACION-GLOBAL.csv, FANTASY-ESPN-CAMPEONES.csv, FANTASY-ESPN-JOKIC-LEAGUE.csv, FANTASY-ESPN-MVP-PLAYOFF.csv, FANTASY-ESPN-MVP.csv.

Entidades Principales: Participantes (17 nombres específicos) y Temporadas (2018-2026).

Lógica de Cruce: El campo clave entre todos los CSV es el nombre del participante (asegurar normalización de tildes y mayúsculas) y el año de la temporada.

2. CARGA DE DATOS A STITCH (VÍA MCP):

Utiliza la conexión MCP para interactuar con Stitch.

Crea una base de datos denominada Fantasy_History.

Diseña colecciones para cada CSV. Realiza un script de carga que:

Valide que los nombres de los participantes coincidan con la lista oficial.

Transforme los valores numéricos de clasificación a enteros.

Maneje nulos en temporadas donde un participante no jugó.

3. DISEÑO E IMPLEMENTACIÓN DE LA INTERFAZ (UI/UX):

Framework: React o Vue.js (tú eliges el más eficiente para PWA).

Estética: Dashboard oscuro tipo "Sports Analytics", profesional y responsivo.

Vistas Requeridas:

Dashboard Global: Resumen histórico con "Hall of Fame" (Contador de títulos totales, MVPs acumulados, ranking histórico de puntos).

Filtros Dinámicos: Implementar Selectores de Temporada y Participante que actualicen los datos en tiempo real sin recargar la página.

Gráficos: Representación visual de la evolución de la "Clasificación Global" por año y distribución de títulos por participante.

Secciones Específicas: Pestañas dedicadas para "Jokic League" y "Premios Individuales (MVP)".

4. FUNCIONALIDADES PWA:

Configura manifest.json y Service Workers para permitir instalación en móviles y uso offline de los datos cacheados.

Iconografía personalizada basada en temática Fantasy.

5. PLAN DE EJECUCIÓN PARA ANTIGRAVITY:

Fase de Validación: Lee los archivos /csv y genera un reporte de la estructura de cada uno para confirmar que no hay discrepancias.

Fase de Ingesta: Ejecuta las llamadas MCP a Stitch para crear el esquema y subir los datos.

Fase de Desarrollo: Escribe el código de la aplicación (Frontend + Conexión a Stitch).

Fase de Validación de Funcionamiento: Simula una consulta: "Logros de JOTA en la temporada 2022" y verifica que el Dashboard muestre la info correcta de todos los CSV correspondientes.

Fase de Despliegue: Entrega los archivos listos para producción.

CONTEXTO DE PARTICIPANTES:
JOSE, TOTTI, COLLERA, KELE, CHALLEN, JOTA, MUSTI, MARCOS, ILDKRAFT, IVÁN, RACRACK, ÁNGEL, CRISTIAN, JAVI, YERCA, MELKART, FOCHY.

COMIENZA: Analiza los CSV y propón la estructura de las tablas en Stitch antes de proceder con el código.
------

Respuestas a    tus preguntas
1. Ejecuta como tu lo dices con un JSON
2. Son 6 archivos, básate en los archivos que hay en /csv y nada mas
3. La Clasificación Global es un archivo que tiene la clasificación global de todos los participantes en cada temporada sumando todos los puntos, es el histórico de puntos sumados de todos los años.

Sabiendo esto, ejecuta el plan

----------

Genial, la visual está de lujo, ahora vamos a terminar de perfilas funcionaldiades y lógica.

Asume el rol de un desarrollador experto en javascript, html, css y tailwind css.

1. Elimina el icono de usuario y campana de la parte superior derecha de la aplicación ya que no se utilizan
2. Elimina el shield y el texto "COMMISH ADMIN EST. 2015" del lateral izquierdo de la aplicación.
2. En la vista "Global Dashboard" añade tarjetas con todas las clasificaciones disponibles. Siendo el panel general de información más relevante de la liga. En esta pantalla no debe haber filtros solo los datos globales siendo el dato más importante el que se encuentra en /csv/FANTASY-ESPN-CLASIFICACION-GLOBAL.csv. El segundo dato más importante son los campeones, y es el que se encuentra en /csv/FANTASY-ESPN-CAMPEONES.csv y el tercer dato más importante es el campeón de conferencia que se encuentra en /csv/FANTASY-ESPN-CAMPEON-DE-CONFERENCIA.csv.
3. En la vista "Player Profile" deben aparecer los filtros solo de jugador, el que empieza con select player y que interactue con el contenido de la vista mostrando todos los datos del jugador seleccionado.
4. En la parte Season Archive debe aparecer el filtro de temporada con todos los años disponibles. Al seleccionar el filtro debe modificarse la visualización mostrando los datos de la temporada seleccionada.
5. En Adwards & Story debe incluirse la tabla detallada de MVPs, MVP Playoff, Jokic League y Campeones de Conferencia. Los datos deben estar correctamente ordenados cronológicamente y relacionados con su temporada correspondiente. Debe aparecer el nombre del ganador, la temporada y el tipo de premio. El diseño debe ser elegante y acorde a la estética general de la aplicación.Separa las tarjetas por tipo de premio.

    - Campeones
    - Campeones de Conferencia
    - MVP   
    - MVP Playoff
    - Jokic League
6. Todo el contenido debe estar en español. Tradúcelo, respeta únicamente los nombres que hacen referencia a los participantes y nombres propios como "Jokic League".
7. Ten en cuenta que esta aplicación debe funcionar en dispositivos móviles por lo que debe ser responsive y adaptarse a diferentes tamaños de pantalla. Por lo tanto, asegúrate de que la aplicación sea responsive y se adapte a diferentes tamaños de pantalla, optimizando la experiencia de usuario para dispositivos móviles.
8. Genera avatares de prueba para cada participante. Para ello, crea una carpeta en la raiz de la aplicación llamada public y dentro de ella crea una carpeta avatars. Dentro de ella crea los avatares de cada participante.

### Corrección de errores y funcionalidades en Dashboard y Perfil
Puntos clave del prompt:
- Añadir la tarjeta de "Jokic League" ganadas en el perfil de jugador.
- Cambiar el color de texto en el tooltip del Top 10 Puntuación global a verde corporativo.
- Ajustar el ancho de la columna de nombres en el gráfico para que no se recorten.

---
Actúa como un desarrollador experto en react.js
Vamos a seguir fixeando errores y añadiendo funcionalidades:
1. En la pantalla de Perfil de Jugador añade una tarjeta donde especifique las "Jokic League" que ha ganado el jugador en concreto como se muestran el resto de trofeos
2. En el Panel Global en la tarjeta de Top 10 Puntuación global, al hacer hover el texto de los puntos ha de verse en el verde corporativo. Ajusta la columna de nombres para que aparezcan completos ya que algunos se cortan

### Tarjeta interactiva flotante de logros
Puntos clave del prompt:
- Crear una tarjeta resumen con todos los títulos de cada categoría de cada participante.
- Mostrar dicha tarjeta al hacer hover o tap en el nombre del participante en Panel Global, Perfil, Archivo y Premios.
- Mostrar también el avatar en dicha tarjeta.

---
Actúa como un desarrollador experto en react.js
Vamos a añadir otra funcionalidad que me parece interesante. Me gustaría que al hacer "hover" o pulsar en pantallas táctiles en los nombres de los participantes, aparezca una tarjeta con un resumen de todos los títulos conseguidos de cada categoría. Un resumen directo sin años, solo con los totales. Esta funcionalidad debe estar en "Panel Global", "Perfil de Jugador", "Archivo de temporada", "Premios e Historia". En esa tarjeta debe aparecer también el avatar.

### Cambio de avatar de Challen
Puntos clave del prompt:
- Reemplazar el avatar SVG de Challen por el archivo PNG proporcionado (`challen.png`).
- Implementar un sistema para que la app cargue de manera dinámica el formato correcto según el usuario.

---
Cambia el avatar del usuario Challen (CHALLEN.SVG) por este: challen.png

### Ajustes menores en Perfil y Global Dashboard
Puntos clave del prompt:
- Desactivar la tarjeta flotante (`PlayerTrigger`) en la cabecera de la vista 'Perfil de Jugador'.
- Añadir un botón toggle en el gráfico del Top 10 del Panel Global para expandir/contraer la clasificación a todos los participantes.

---
Actúa como un desarrollador experto en react.js
Vamos a fixear otro par de cosas
1. En la vista de "Perfil de jugador" no tiene que funcionar el hover al hacer hover o tap en el nombre ya que estás en la propia ficha del jugador.
2. En la vista Panel Global, en la sección Top 10 puntuación Global, realiza un botón que despliegue el resto de participantes con sus puntuaciones, para así poder ver el completo histórico de jugadores, con un efecto toggle que descubra la parte de la clasificación que falta

### Generación de Favicon y PWA icons
Puntos clave del prompt:
- A partir del diseño en `logo-hd.png`, generar los diferentes formatos que necesita la aplicación PWA (`favicon.ico`, `favicon.svg`, `pwa-192x192.png`, `pwa-512x512.png`).
- No se pide alterar la funcionalidad sino mantener el mismo estilo estético de la aplicación.

---
Basándote en el archivo logo-hd.png genera un nuevo favicon.ico, favicon.svg, pwa-192x192.png, pwa-512x512.pmg respetando el diseño de logo-hd.png para que todo quede en el mismo estilo estético. No hay ningún cambio de funcionalidad, solo modificar el icono de aplicación como indico

