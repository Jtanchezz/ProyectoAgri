import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: {
  port: { type: 'string', default: '5173' },
  dist: { type: 'boolean', default: false },
} });
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Puerto no válido.');
const file = new URL(values.dist ? '../dist/index.html' : '../index.html', import.meta.url);
const pages = new Set(['/', '/index.html', '/ProyectoAgri/', '/ProyectoAgri/index.html']);

createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (!pages.has(pathname)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Archivo no encontrado.');
    return;
  }
  try {
    const html = await readFile(file);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : html);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No se encontró index.html. Para previsualizar dist, ejecuta npm run build.');
  }
}).listen(port, '127.0.0.1', () => console.log(`AgroLink: http://127.0.0.1:${port}/ProyectoAgri/`));
