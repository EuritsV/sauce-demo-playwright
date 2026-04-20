import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Footer', () => {

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    // Footer existe nas páginas autenticadas — não na página de login
    await productsPage.navigate();
  });

  test('twitter link is visible', async ({ page }) => {
    await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
  });

  test('facebook link is visible', async ({ page }) => {
    await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
  });

  test('linkedin link is visible', async ({ page }) => {
    await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
  });

  test('copyright text is visible', async ({ page }) => {
    // Regex para não depender do ano exacto
    await expect(page.locator('.footer_copy')).toContainText(/© \d{4} Sauce Labs/);
  });

});
