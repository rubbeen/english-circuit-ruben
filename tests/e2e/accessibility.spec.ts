import { expect, test } from '@playwright/test';

test('flujo principal tiene foco, nombres y estructura accesibles', async ({ page }) => {
  await page.goto('/#/'); const skip = page.getByRole('link', { name: 'Saltar al contenido' }); await expect(skip).toBeAttached(); await skip.focus(); await expect(skip).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('#main-content')).toBeFocused();
  await page.goto('/#/leccion/w01-l01');
  await expect(page.getByRole('heading', { level: 1, name: 'Hello!' })).toBeVisible();
  expect(await page.getByRole('button').all()).not.toHaveLength(0);
  for (const button of await page.getByRole('button').all()) expect(await button.getAttribute('aria-label') || await button.textContent()).toBeTruthy();
});
