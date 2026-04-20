import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

const BACKPACK = 'sauce-labs-backpack';

test.describe('Logout', () => {

  // Abre o menu hamburger e clica em logout — presente em todas as páginas autenticadas
  async function logout(page: any) {
    // Clica no <button id="react-burger-menu-btn">, não no <img data-test="open-menu"> que está dentro
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
  }

  test('logout from products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigate();

    await logout(page);

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('logout from cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.navigate();
    await productsPage.addToCart(BACKPACK);
    await cartPage.goToCart();

    await logout(page);

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

});
