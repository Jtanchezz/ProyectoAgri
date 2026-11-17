import { test, expect } from '@playwright/test';
import { mkdtemp, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

test.beforeEach(async ({ page }) => { await page.goto('./'); });

test('Pages sirve el HTML sin compilación ni solicitudes de recursos externos', async ({ page }) => {
  const requests=[];
  page.on('request', request => requests.push({ url: request.url(), type: request.resourceType() }));
  const response=await page.reload();
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(/\/ProyectoAgri\/$/);
  await expect(page.locator('script[src], link[rel="stylesheet"]')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(async images => {
    images.forEach(img => img.loading='eager');
    await Promise.all(images.map(img=>img.decode()));
  });
  for (const service of ['second','cold','market']) {
    await page.locator(`#tab-${service}`).click();
    await page.locator('#service-panel img').evaluate(img=>img.decode());
  }
  for (const screen of ['market','second','cold','home']) {
    await page.locator(`#screen-tab-${screen}`).click();
    await page.locator('#phone-content img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  }
  expect(requests.filter(request=>/^https?:/.test(request.url))).toEqual([
    {url:'http://127.0.0.1:4175/ProyectoAgri/',type:'document'},
  ]);
});

test('el único index.html funciona fuera del repositorio y sin internet', async ({ page, context }) => {
  const directory=await mkdtemp(join(tmpdir(),'agrolink-standalone-'));
  const destination=join(directory,'index.html');
  await copyFile(new URL('../index.html',import.meta.url),destination);
  await context.setOffline(true);
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto(pathToFileURL(destination).href);
  await expect(page.getByRole('heading',{level:1})).toContainText('Del campo');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(()=>document.fonts.check('16px "DM Sans"') && document.fonts.check('16px Fraunces'))).toBe(true);
  await page.locator('img').evaluateAll(async images => {
    images.forEach(img=>img.loading='eager');
    await Promise.all(images.map(img=>img.decode()));
  });
  await page.locator('#transaction-value').fill('2000');
  await page.locator('#transaction-value').press('Tab');
  await expect(page.locator('#comparison')).toContainText('Q2,500');
  await page.locator('#screen-tab-market').click();
  await expect(page.locator('#market-results .product-card')).toHaveCount(2);
  await page.locator('#market-results img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  await page.locator('#growth-tab').click();
  await expect(page.locator('#projections')).toContainText('80,000');
  expect(errors).toEqual([]);
});

test('la portada, los recursos y las anclas cargan sin errores', async ({ page }) => {
  const errors=[];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  await expect(page.getByRole('heading', { level:1 })).toContainText('Del campo');
  await expect(page.locator('.hero-visual img')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(async images => {
    images.forEach(img => img.loading='eager');
    await Promise.all(images.map(img => img.decode()));
  });
  const broken = await page.locator('img').evaluateAll(images => images.filter(img => img.complete && img.naturalWidth===0).map(img=>img.src));
  expect(broken).toEqual([]);
  const missingAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(a => a.hash && !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash));
  expect(missingAnchors).toEqual([]);
  expect(errors).toEqual([]);
  await page.screenshot({ path:'test-results/portada-escritorio.png' });
  await page.locator('#prototipo').screenshot({ path:'test-results/prototipo.png' });
  await page.screenshot({ path:'test-results/escritorio.png', fullPage:true });
});

test('servicios y navegación por teclado', async ({ page }) => {
  const tab=page.locator('#tab-market');
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-second')).toHaveAttribute('aria-selected','true');
  await expect(page.locator('#service-panel')).toContainText('Imperfectos por fuera');
  await page.keyboard.press('End');
  await expect(page.locator('#tab-cold')).toHaveAttribute('aria-selected','true');
  await expect(page.locator('#service-panel')).toContainText('Más tiempo fresco');
  await page.locator('[data-open-screen="cold"]').click();
  await expect(page.locator('#cold-form')).toBeVisible();
});

test('el simulador mantiene cifras y proporciones correctas', async ({ page }) => {
  await expect(page.locator('#comparison')).toContainText('Q1,250');
  await expect(page.locator('#comparison')).toContainText('Q1,600');
  await page.locator('#transaction-value').fill('2000');
  await page.locator('#transaction-value').press('Tab');
  await expect(page.locator('#comparison')).toContainText('Q2,500');
  await expect(page.locator('#comparison')).toContainText('Q3,600');
  await expect(page.locator('#comparison')).toContainText('Q3,200');
  await expect(page.locator('#comparison')).toContainText('Q400');
  await page.locator('#transaction-value').fill('30000');
  await page.locator('#transaction-value').press('Tab');
  await expect(page.locator('#transaction-value')).toHaveValue('20000');
  await expect(page.locator('#comparison')).toContainText('Q25,000');
});

test('el catálogo filtra y prepara pedidos sin compras reales', async ({ page }) => {
  await page.locator('#screen-tab-market').click();
  await expect(page.locator('#market-results .product-card')).toHaveCount(2);
  await page.locator('[data-filter="Tubérculos"]').click();
  await expect(page.locator('#market-results .product-card')).toHaveCount(1);
  await expect(page.locator('#market-results')).toContainText('Papa blanca');
  await page.locator('#market-search').fill('mango');
  await expect(page.locator('#market-results')).toContainText('No encontramos');
  await page.locator('#market-search').fill('');
  await page.locator('#market-results [data-order="papa"]').click();
  await page.locator('#order-form input').fill('3');
  await expect(page.locator('#order-total')).toContainText('Q660');
  await page.locator('#order-form button').click();
  await expect(page.locator('#dialog-body')).toContainText('Pedido preparado');
  await expect(page.locator('#dialog-body')).toContainText('Q660');
  await expect(page.locator('#dialog-body')).toContainText('No se envió');
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
});

test('la publicación y Second Chance muestran condiciones explícitas', async ({ page }) => {
  await page.locator('#screen-tab-market').click();
  await page.locator('#publish-crop').click();
  await page.locator('#crop-form [name="producto"]').fill('Brócoli');
  await page.locator('#crop-form [name="cantidad"]').fill('20');
  await page.locator('#crop-form [name="precio"]').fill('150');
  await page.locator('#crop-form [name="fecha"]').fill('2030-12-01');
  await page.locator('#crop-form button').click();
  await expect(page.locator('#dialog-body')).toContainText('Brócoli');
  await expect(page.locator('#dialog-body')).toContainText('Q150.00');
  await expect(page.locator('#dialog-body')).toContainText('no se ha publicado');
  await page.keyboard.press('Escape');
  await page.locator('#screen-tab-second').click();
  await page.locator('#phone-content [data-order="tomate"]').click();
  await expect(page.locator('.condition-box')).toContainText('pendiente');
  await expect(page.locator('.condition-box')).toContainText('Tamaños variados');
});

test('Cold valida campos y muestra la solicitud correcta', async ({ page }) => {
  await page.locator('#screen-tab-cold').click();
  await page.locator('#cold-form button').click();
  await expect(page.locator('dialog')).not.toBeVisible();
  await page.locator('#cold-form [name="ubicacion"]').selectOption('Sacatepéquez');
  await page.locator('#cold-form [name="producto"]').fill('Brócoli');
  await page.locator('#cold-form [name="volumen"]').fill('250');
  await page.locator('#cold-form [name="dias"]').fill('7');
  await page.locator('#cold-form button').click();
  await expect(page.locator('#dialog-body')).toContainText('250 kg');
  await expect(page.locator('#dialog-body')).toContainText('7 días');
  await expect(page.locator('#dialog-body')).toContainText('Sacatepéquez');
  await expect(page.locator('#dialog-body')).toContainText('No se ha reservado');
});

test('las proyecciones cambian de vista sin inventar metas faltantes', async ({ page }) => {
  await expect(page.locator('#projections')).toContainText('2,000 M');
  await page.locator('#growth-tab').click();
  await expect(page.locator('#projections')).toContainText('80,000');
  await expect(page.locator('#projections')).toContainText('25,000');
  await expect(page.locator('#projections')).toContainText('Por definir');
  await page.locator('#finance-tab').click();
  await expect(page.locator('#projections')).toContainText('96,000');
});

test('el contacto prepara un archivo sin transmitir los datos', async ({ page }) => {
  const transmitted=[];
  page.on('request',req=>{if(req.method()==='POST')transmitted.push(req.url());});
  await page.getByRole('link',{name:'Quiero comprar'}).click();
  await expect(page.locator('#contact-role')).toHaveValue('comprador');
  await page.locator('#contact-form [name="nombre"]').fill('Prueba AgroLink');
  await page.locator('#contact-form [name="email"]').fill('prueba@example.com');
  await page.locator('#contact-form [name="mensaje"]').fill('Necesitamos 20 cajas de tomate por semana.');
  await page.locator('#contact-form [type="checkbox"]').check();
  await page.locator('#contact-form button').click();
  await expect(page.locator('#contact-result')).toContainText('No se ha enviado');
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('link',{name:'Descargar mi solicitud'}).click();
  const download=await downloadPromise;
  expect(download.suggestedFilename()).toBe('solicitud-agrolink.txt');
  expect(transmitted).toEqual([]);
});

test('móvil y tableta no desbordan y el menú funciona', async ({ page }) => {
  for(const width of [320,390,768,1024]){
    await page.setViewportSize({width,height:844});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
    expect(overflow,`Desbordamiento a ${width}px`).toBe(false);
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Abrir menú'}).click();
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.locator('#main-nav a[href="#servicios"]').click();
  await expect(page.locator('#main-nav')).not.toBeVisible();
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(async images => {
    images.forEach(img => img.loading='eager');
    await Promise.all(images.map(img => img.decode()));
  });
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:'test-results/portada-movil.png'});
  await page.screenshot({path:'test-results/movil.png',fullPage:true});
});
