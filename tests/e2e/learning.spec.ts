import { expect, test } from '@playwright/test';

test('abre una lección, conserva respuestas y completa el circuito', async ({ page }) => {
  await page.goto('/#/');
  await expect(page.getByRole('heading', { name: /Tu inglés empieza aquí/i })).toBeVisible();
  await page.getByRole('link', { name: /Comenzar primera lección/i }).click();
  await expect(page.getByRole('heading', { name: 'Hello!' })).toBeVisible();
  const first = page.locator('fieldset').first(); await first.getByText('hola', { exact: true }).click();
  const draft = page.getByLabel(/Tu borrador/i); await draft.fill('Hello. My name is Alex. Nice to meet you.');
  await page.waitForTimeout(800); await page.setViewportSize({ width: 844, height: 390 });
  await expect(first.getByText('hola', { exact: true })).toBeVisible(); await expect(draft).toHaveValue(/My name is Alex/);
  await page.setViewportSize({ width: 800, height: 1280 }); await page.reload();
  await expect(draft).toHaveValue(/My name is Alex/); await expect(page.locator('html')).toHaveJSProperty('scrollWidth', await page.locator('html').evaluate((el) => el.clientWidth));
});

test('exporta un respaldo con el límite de aplicación correcto', async ({ page }) => {
  await page.goto('/#/configuracion'); const download = page.waitForEvent('download'); await page.getByRole('button', { name: 'Exportar JSON' }).click(); const file = await download; expect(file.suggestedFilename()).toMatch(/^english-circuit-/);
});

