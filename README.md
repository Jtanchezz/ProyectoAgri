# AgroLink Guatemala

Sitio de una sola página con todo el frontend en `index.html`: contenido, CSS, JavaScript, favicon, fotografías y tipografías. No necesita Vite, compilación, carpetas de recursos ni conexión a internet para mostrar el diseño y usar las interacciones. Los enlaces bibliográficos sí requieren internet.

## Publicar en GitHub Pages

El archivo `index.html` de la raíz se publica directamente. `.nojekyll` evita el procesamiento con Jekyll.

En el repositorio `Jtanchezz/ProyectoAgri`, abre **Settings → Pages → Build and deployment** y selecciona:

- **Source:** Deploy from a branch.
- **Branch:** main.
- **Folder:** / (root).

Guarda la configuración y sube los cambios:

```sh
git add .
git commit -m "Integrar frontend en index.html para GitHub Pages"
git push origin main
```

Después del despliegue de Pages, la dirección prevista es `https://jtanchezz.github.io/ProyectoAgri/`. La disponibilidad del sitio depende de la configuración y del despliegue en GitHub; editar los archivos locales no publica los cambios por sí solo.

También puedes copiar únicamente `index.html` a otro alojamiento estático o abrirlo con doble clic. No depende de rutas absolutas como `/src/` o `/images/`.

Referencia: [configuración de la fuente de publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Vista previa local opcional

Se puede abrir `index.html` directamente en el navegador. Para utilizar el servidor de desarrollo opcional, requiere Node.js 20+; no hace falta instalar dependencias:

```sh
npm run dev
```

La vista previa se sirve en `http://127.0.0.1:5173/`. La ruta `http://127.0.0.1:5173/ProyectoAgri/` permite reproducir el prefijo del repositorio en Pages.

```sh
npm run build
npm run preview
```

`npm run build` copia el HTML autónomo y `.nojekyll` a `dist/`. No transforma ni separa los estilos o el JavaScript. Este paso es opcional y no es necesario para publicar desde `main / (root)`.

## Funcionalidades

- Tres servicios con pestañas accesibles y navegación por teclado.
- Simulador en quetzales: ingreso tradicional × 1.25 para el productor, precio tradicional × 1.8 y precio AgroLink × 1.6. Los márgenes cubren funciones distintas y no se presentan como beneficio neto de AgroLink.
- Prototipo móvil con Inicio, Market, Second Chance y Cold.
- Catálogo con búsqueda, filtros, cálculo de pedidos y condición sanitaria explícita.
- Vista previa de publicaciones de cosechas y solicitudes de refrigeración.
- Alternancia entre proyecciones financieras y metas de usuarios.
- Contacto con validación y descarga de una solicitud en texto.
- Fuentes documentales enlazadas, navegación móvil y soporte para movimiento reducido.

## Alcance de la demostración

No se proporcionó un archivo Figma: las cuatro pantallas se implementaron a partir de la descripción del encargo.

No hay servidor de pedidos, registro de usuarios, cobros, disponibilidad en tiempo real ni recepción de contactos. Los formularios del prototipo muestran resúmenes locales. El formulario de interés genera un archivo descargable; no transmite ni almacena información personal. Para recibir solicitudes reales hay que conectar un destino autorizado y ajustar los mensajes de confirmación y privacidad.

WhatsApp se presenta como canal complementario previsto. No se inventó un número de teléfono. Tampoco se asignaron cargos individuales a los fundadores, porque el encargo solo definió la estructura de roles.

Las cifras financieras y el caso comparativo son hipótesis. El año 1 distingue productores registrados de productores activos; el año 3 no inventa una meta de usuarios. La brecha entre inversión e ingresos se identifica como ilustrativa y no como un cálculo contable auditado.

## Archivos

- `index.html`: único archivo necesario para todo el frontend. Edita aquí el contenido, los estilos y el comportamiento. Los recursos integrados se encuentran en las declaraciones `@font-face` y `IMAGE_ASSETS`.
- `.nojekyll`: indica a GitHub Pages que publique los archivos directamente.
- `public/`: originales de las fotografías y el favicon, conservados como referencia; el sitio no los solicita.
- `scripts/`: servidor estático y copia opcional a `dist/`, ambos sin dependencias.
- `tests/site.spec.js`: recorridos funcionales con Playwright.

## Comprobaciones

```sh
npm install
npm test
```

La configuración usa Google Chrome instalado (`channel: 'chrome'`). Las once pruebas usan un servidor estático en `/ProyectoAgri/`, verifican que no haya solicitudes de recursos externos, y comprueban una copia aislada de `index.html` sin conexión. También cubren anclas, teclado, cálculos, filtros, pedidos, formularios, proyecciones, descarga sin transmisión de datos y ausencia de desbordamiento horizontal a 320, 390, 768 y 1024 px. La portada también se comprueba a 1440 px. Las capturas quedan en `test-results/`.

## Fuentes y recursos visuales

Las fuentes estadísticas y bibliográficas están enlazadas en el acordeón del pie de página. Se consultaron FAO, UNFPA, MAGA, MICOOPE, ProducePay y el artículo de Greg Satell. La proyección demográfica se enlaza a la reproducción de WPP 2024 en PopulationPyramid.

- Fotografía de cultivos en Guatemala: [AlimentAcción, Università degli Studi di Milano](https://lastatalenews.unimi.it/alimentaccion-verso-sicurezza-alimentare-comunita-rurali-indigene-maya). Uso documental para esta maqueta; confirmar derechos de publicación comercial antes de usarla en un sitio público. La institución no se presenta como aliada de AgroLink.
- Mercado: [fotografía de Unsplash](https://images.unsplash.com/photo-1542838132-92c53300491e).
- Tomates: [fotografía de Unsplash](https://images.unsplash.com/photo-1546094096-0df4bcaaa337).
- Papas: [fotografía de Unsplash](https://images.unsplash.com/photo-1518977676601-b53f82aba655).
- Tipografías: Fraunces y DM Sans de Google Fonts, integradas en el HTML en formato WOFF2 (caracteres latinos, incluido español). Sus licencias SIL Open Font License se conservan en un comentario del mismo archivo.

Los productos y sus precios se identifican como ejemplos, sin inventario ni certificación sanitaria real.
