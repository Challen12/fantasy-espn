# Log de Prompts

## Prompt 1 - 2026-05-03
**Cambios aplicados:** 
- Inicialización del proyecto.
- Análisis de archivos CSV para extraer la estructura de datos (Campeones, Conferencias, Jokic League, MVP, MVP Playoff, Clasificación Global).
- Planificación de la arquitectura de la PWA.
- Identificación de discrepancias con Stitch (Stitch no es una base de datos, sino un generador de UI). Se propondrá una alternativa en el plan de implementación.

## Prompt 2 - 2026-05-03
**Cambios aplicados:**
- Sincronización del proyecto con GitHub (git add, commit, push).

## Prompt 3 - 2026-05-03
**Cambios aplicados:**
- Explicación y resolución del problema de despliegue en GitHub Pages.

## Prompt 4 - 2026-05-03
**Cambios aplicados:**
- Resincronización del repositorio con los últimos logs de prompts para activar el deploy final.

## Prompt 5 - 2026-05-03
**Cambios aplicados:**
- Instalación y configuración de Tailwind CSS en el proyecto Vite.
- Extracción de las variables de diseño y clases desde el archivo de exportación de Stitch (`code.html` y `DESIGN.md`).
- Reescritura completa de los componentes de la interfaz de usuario en `App.jsx` aplicando Tailwind CSS para igualar exactamente el prototipo exportado.
- Inserción del nuevo logotipo (`Logo-hd.png`) en el header de la aplicación.

## Prompt 6 - 2026-05-03
**Cambios aplicados:**
- Creación de un plugin personalizado de Vite (`watchCsvPlugin`) en `vite.config.js` que escucha los cambios en los archivos `.csv` de la carpeta `csv/`.
- Automatización del script de ingestión (`ingest_data.js`): al guardar cualquier CSV, los datos JSON se regeneran automáticamente y actualizan la aplicación en caliente (HMR).
- Ejecución manual de la ingestión para forzar la actualización inicial de la Jokic League (temporada 2026).

## Prompt 7 - 2026-05-03
**Cambios aplicados:**
- Corrección de la ruta del logotipo en la cabecera. Se actualizó el nombre de archivo a minúsculas (`logo-hd.png`) y se antepuso dinámicamente `import.meta.env.BASE_URL` en `App.jsx` para que la imagen se resuelva correctamente bajo la ruta base configurada (`/fantasy-espn/`) durante el entorno de desarrollo y producción.

## Prompt 8 - 2026-05-03
**Cambios aplicados:**
- Eliminación de elementos visuales innecesarios (usuario, campana, escudo del menú lateral).
- Aplicación de filtros condicionales: el selector de jugador solo aparece en "Perfil de Jugador" y el de temporada en "Archivo de Temporada".
- Incorporación de nuevas tarjetas en "Panel Global" con listados de Campeones y Campeones de Conferencia sin incluir filtros.
- División de la sección "Premios e Historia" en 5 tablas separadas y responsivas ordenadas cronológicamente.
- Traducción completa de los textos estáticos de la interfaz al español.
- Desarrollo de un script en Node (`generate_avatars.js`) que automáticamente dibuja y exporta avatares SVG profesionales y de estética neón para cada participante a la carpeta `/public/avatars/`.
- Vinculación de las nuevas imágenes de avatares en la UI (Perfil, Salón de la Fama y Premios).

## Prompt 9 - 2026-05-03
**Cambios aplicados:**
- Sincronización del proyecto con el repositorio remoto de GitHub (git add, commit, push) para asegurar el despliegue de las últimas novedades.

## Prompt 10 - 2026-05-04
**Cambios aplicados:**
- Añadida tarjeta resumen y lista de años de "Jokic League" en la pantalla de Perfil de Jugador.
- Personalizado el Tooltip del gráfico de "Top 10 Puntuación Global" para que los valores se muestren en el verde corporativo al hacer hover.
- Ajustado el ancho de la columna del Eje Y del gráfico para evitar que los nombres de los participantes se recorten.

## Prompt 11 - 2026-05-04
**Cambios aplicados:**
- Creación de un contexto `HoverContext` y un componente envoltorio `PlayerTrigger` para manejar interacciones de hover/touch sobre los nombres de los participantes.
- Implementación de `HoverCard`, una tarjeta flotante global con posición dinámica, para mostrar de un vistazo rápido el avatar y total de logros del participante (Puntos, Ranking, Campeonatos, Conferencias, MVPs, Playoff y Jokic).
- Integración de `PlayerTrigger` en múltiples componentes (Dashboard, Perfil, Archivo de Temporadas y Premios) y creación de un Custom Tick en el gráfico de barras para soportar la tarjeta interactiva.

## Prompt 12 - 2026-05-04
**Cambios aplicados:**
- Añadida una función centralizada `getAvatarUrl` en `App.jsx` para gestionar las URLs de los avatares dinámicamente.
- Modificado todo el código de `App.jsx` para usar esta función en lugar de interpolar directamente con la extensión `.svg`.
- Añadida excepción para que cuando el usuario sea "CHALLEN", la aplicación cargue la extensión `.png` referenciando a `challen.png` en su lugar.

## Prompt 13 - 2026-05-04
**Cambios aplicados:**
- Retirado el wrapper `PlayerTrigger` de la cabecera de la vista Perfil de Jugador para evitar mostrar la tarjeta flotante innecesariamente.
- Implementado el estado `showAllPoints` en el componente Global Dashboard para alternar el límite de datos enviados a `Recharts`.
- Añadido un botón toggle interactivo y animaciones de altura (`transition-all duration-500 ease-in-out`) en el contenedor del gráfico para revelar la parte inferior de la clasificación de forma elegante.

## Prompt 14 - 2026-05-04
**Cambios aplicados:**
- Utilizadas las librerías `sharp` y `png-to-ico` mediante un script temporal de Node.js para escalar imágenes localmente.
- Generadas versiones optimizadas en las resoluciones nativas PWA: `pwa-192x192.png` y `pwa-512x512.png` a partir del diseño de `logo-hd.png`.
- Generado `favicon.ico` para asegurar compatibilidad universal en navegadores.
- Generado `favicon.svg` incrustando en formato Base64 el diseño original para maximizar la calidad en resoluciones retina sin perder sus degradados y colores.
