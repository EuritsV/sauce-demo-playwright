import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const BACKPACK = 'sauce-labs-backpack';

test.describe('Checkout', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Cada teste começa já no formulário de checkout (passo 1)
  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await productsPage.navigate();
    await productsPage.addToCart(BACKPACK);
    await cartPage.goToCart();
    await cartPage.proceedToCheckout(); // ← leva ao formulário /checkout-step-one.html
  });

  test('shows error for empty fields', async () => {
    await checkoutPage.fillCheckoutForm('', '', '');
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('shows error when only first name is missing', async () => {
    await checkoutPage.fillCheckoutForm('', 'Doe', '12345');
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('shows error when last name is missing', async () => {
    await checkoutPage.fillCheckoutForm('John', '', '12345');
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('shows error when postal code is missing', async () => {
    await checkoutPage.fillCheckoutForm('John', 'Doe', '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  test('complete checkout with valid information', async () => {
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');

    // Passo 2 — overview
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    await expect(checkoutPage.itemName).toBeVisible();
    await expect(checkoutPage.itemPrice).toBeVisible();
    await expect(checkoutPage.totalPrice).toBeVisible();

    await checkoutPage.finishCheckout();

    // Passo 3 — confirmação
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.confirmationMessage).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
    await expect(checkoutPage.backHomeButton).toBeVisible();
  });

});
