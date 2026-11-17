import { mkdir, copyFile } from 'node:fs/promises';

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
for (const name of ['index.html', '.nojekyll']) {
  await copyFile(new URL(`../${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}
console.log('Sitio listo: dist/index.html. El HTML original también se puede publicar directamente.');
