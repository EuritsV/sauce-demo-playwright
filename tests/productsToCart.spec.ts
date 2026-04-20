import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

const BACKPACK = 'sauce-labs-backpack';

test.describe('Products', () => {

  let productsPage: ProductsPage;

  // storageState já está activo — só precisamos de navegar para a página
  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test('add product to cart', async () => {
    await productsPage.addToCart(BACKPACK);
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('remove product from cart', async () => {
    await productsPage.addToCart(BACKPACK);
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.removeFromCart(BACKPACK);
    await expect(productsPage.cartBadge).toBeHidden();
  });

});
