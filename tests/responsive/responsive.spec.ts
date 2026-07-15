import { expect, test } from '@playwright/test';

const viewports = [[360,640],[360,800],[390,844],[412,915],[480,800],[600,960],[768,1024],[800,1280],[844,390],[960,600],[1024,600],[1024,768],[1280,800],[1366,768],[1440,900],[1920,1080]] as const;
const routes = ['/#/', '/#/ruta', '/#/leccion/w01-l01', '/#/configuracion'];

for (const [width,height] of viewports) {
  test(`${width}x${height} no tiene overflow horizontal`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await page.goto(route); await page.waitForLoadState('networkidle');
      const dimensions = await page.locator('html').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));
      expect(dimensions.scroll, `${route} overflow en ${width}x${height}`).toBeLessThanOrEqual(dimensions.client);
      await expect(page.locator('main')).toBeVisible();
    }
  });
}

test('texto ampliado y tema oscuro siguen siendo utilizables', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/#/');
  await page.addStyleTag({ content: 'html{font-size:200%!important}' });
  expect(await page.locator('html').evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' }); await expect(page.getByRole('main')).toBeVisible();
});

