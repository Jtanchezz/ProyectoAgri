# AgroLink Guatemala

Sitio de una sola página construido con JavaScript, CSS y Vite. El contenido está en español y el diseño se adapta a móviles, tabletas y escritorio.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+.

```sh
npm install
npm run dev
```

La vista previa se sirve en `http://127.0.0.1:5173`.

```sh
npm run build
npm run preview
```

`dist/` contiene los archivos para un alojamiento estático. La compilación no necesita credenciales ni servicios externos.

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

- `src/main.js`: contenido, componentes y comportamiento.
- `src/style.css`: identidad visual y adaptación responsiva.
- `public/images/`: fotografías locales.
- `public/favicon.svg`: marca gráfica.
- `tests/site.spec.js`: recorridos funcionales con Playwright.

## Comprobaciones

```sh
npm test
```

La configuración usa Google Chrome instalado (`channel: 'chrome'`). Las nueve pruebas verifican recursos, anclas, teclado, cálculos, filtros, pedidos, formularios, proyecciones, descarga sin transmisión de datos y ausencia de desbordamiento horizontal a 320, 390, 768 y 1024 px. La portada también se comprueba a 1440 px. Las capturas quedan en `test-results/`.

## Fuentes y recursos visuales

Las fuentes estadísticas y bibliográficas están enlazadas en el acordeón del pie de página. Se consultaron FAO, UNFPA, MAGA, MICOOPE, ProducePay y el artículo de Greg Satell. La proyección demográfica se enlaza a la reproducción de WPP 2024 en PopulationPyramid.

- Fotografía de cultivos en Guatemala: [AlimentAcción, Università degli Studi di Milano](https://lastatalenews.unimi.it/alimentaccion-verso-sicurezza-alimentare-comunita-rurali-indigene-maya). Uso documental para esta maqueta; confirmar derechos de publicación comercial antes de usarla en un sitio público. La institución no se presenta como aliada de AgroLink.
- Mercado: [fotografía de Unsplash](https://images.unsplash.com/photo-1542838132-92c53300491e).
- Tomates: [fotografía de Unsplash](https://images.unsplash.com/photo-1546094096-0df4bcaaa337).
- Papas: [fotografía de Unsplash](https://images.unsplash.com/photo-1518977676601-b53f82aba655).
- Tipografías: Fraunces y DM Sans mediante Google Fonts, con alternativas locales de sistema.

Los productos y sus precios se identifican como ejemplos, sin inventario ni certificación sanitaria real.
