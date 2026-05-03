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