import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

const BACKPACK = 'sauce-labs-backpack';

test.describe('Cart', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await productsPage.navigate();
    await productsPage.addToCart(BACKPACK);
    await cartPage.goToCart();
  });

  test('shows correct cart contents', async () => {
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.descriptionLabel).toBeVisible();
    await expect(cartPage.itemName).toBeVisible();
    await expect(cartPage.itemPrice).toBeVisible();
  });

  test('remove item from cart', async () => {
    await cartPage.removeItem(BACKPACK);
    await expect(cartPage.itemName).toBeHidden();
    await expect(cartPage.cartBadge).toBeHidden();
  });

  test('continue shopping keeps cart items', async () => {
    await cartPage.continueShopping();
    await expect(cartPage.cartBadge).toHaveText('1');
  });

  test('proceed to checkout navigates to checkout form', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
  });

});
