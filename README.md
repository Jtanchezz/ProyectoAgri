# AgroLink Guatemala

Página de producto con portada, servicios, explicación de uso, mockup interactivo de la app y contacto. Todo el frontend está en `index.html`: contenido, CSS, JavaScript, favicon, fotografías y tipografías. No necesita Vite, compilación, carpetas de recursos ni conexión a internet para mostrar el diseño y usar las interacciones. Los enlaces de créditos fotográficos sí requieren internet.

La página se centra en la experiencia del usuario. Se retiraron el modelo de negocio, presupuesto, proyecciones, entrevistas, hoja de ruta, análisis de competencia, estadísticas del trabajo escrito y estructura organizacional.

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
- Explicación breve de cómo publicar una cosecha, conectar con compradores y coordinar la entrega.
- Prototipo móvil con Inicio, Market, Second Chance y Cold.
- Catálogo con búsqueda, filtros, cálculo de pedidos y condición sanitaria explícita.
- Vista previa de publicaciones de cosechas y solicitudes de refrigeración.
- Contacto con validación y descarga de una solicitud en texto.
- Navegación móvil, créditos fotográficos y soporte para movimiento reducido.

## Alcance de la demostración

No se proporcionó un archivo Figma: las cuatro pantallas se implementaron a partir de la descripción del encargo.

No hay servidor de pedidos, registro de usuarios, cobros, disponibilidad en tiempo real ni recepción de contactos. Los formularios del prototipo muestran resúmenes locales. El formulario de interés genera un archivo descargable; no transmite ni almacena información personal. Para recibir solicitudes reales hay que conectar un destino autorizado y ajustar los mensajes de confirmación y privacidad.

WhatsApp se presenta como canal complementario previsto. No se inventó un número de teléfono. Los precios del catálogo sirven únicamente para explorar el mockup.

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

La configuración usa Google Chrome instalado (`channel: 'chrome'`). Las nueve pruebas usan un servidor estático en `/ProyectoAgri/`, verifican que no haya solicitudes de recursos externos y comprueban una copia aislada de `index.html` sin conexión. También cubren anclas, teclado, filtros, pedidos, formularios, descarga sin transmisión de datos y ausencia de desbordamiento horizontal a 320, 390, 768 y 1024 px. La portada también se comprueba a 1440 px. Las capturas quedan en `test-results/`.

## Fuentes y recursos visuales

El pie de página conserva únicamente los créditos fotográficos. Las referencias del trabajo escrito se retiraron junto con sus secciones.

- Fotografía de cultivos en Guatemala: [AlimentAcción, Università degli Studi di Milano](https://lastatalenews.unimi.it/alimentaccion-verso-sicurezza-alimentare-comunita-rurali-indigene-maya). Uso documental para esta maqueta; confirmar derechos de publicación comercial antes de usarla en un sitio público. La institución no se presenta como aliada de AgroLink.
- Mercado: [fotografía de Unsplash](https://images.unsplash.com/photo-1542838132-92c53300491e).
- Tomates: [fotografía de Unsplash](https://images.unsplash.com/photo-1546094096-0df4bcaaa337).
- Papas: [fotografía de Unsplash](https://images.unsplash.com/photo-1518977676601-b53f82aba655).
- Tipografías: Fraunces y DM Sans de Google Fonts, integradas en el HTML en formato WOFF2 (caracteres latinos, incluido español). Sus licencias SIL Open Font License se conservan en un comentario del mismo archivo.

Los productos y sus precios se identifican como ejemplos, sin inventario ni certificación sanitaria real.
