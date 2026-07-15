import { expect, test } from '@playwright/test';

test('continúa en una lección visitada al perder conexión', async ({ page, context }) => {
  await page.goto('/#/leccion/w01-l01'); await expect(page.getByRole('heading', { name: 'Hello!' })).toBeVisible();
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null); await page.reload(); await expect(page.getByRole('heading', { name: 'Hello!' })).toBeVisible(); await context.setOffline(true); await page.reload();
  await expect(page.getByRole('heading', { name: 'Hello!' })).toBeVisible();
  await page.locator('fieldset').first().getByText('hola', { exact: true }).click();
  await context.setOffline(false); await page.reload(); await expect(page.getByText(/Sincronizado|Pendiente/).first()).toBeVisible();
});
