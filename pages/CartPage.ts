import { type Locator, type Page } from '@playwright/test';

export class CartPage {

  readonly page: Page;

  // Badge com número de itens no carrinho (visível no topo em todas as páginas)
  readonly cartBadge: Locator;

  // Título da página do carrinho — "Your Cart"
  readonly pageTitle: Locator;

  // Label "Description" — cabeçalho da coluna de produtos no carrinho
  readonly descriptionLabel: Locator;

  // Nome e preço do produto listado no carrinho
  readonly itemName: Locator;
  readonly itemPrice: Locator;

  // Botões de ação dentro da página do carrinho
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  // Campos do formulário de checkout (aparecem após clicar em "Checkout")
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  // erro proposital para mostrar como lidar com elementos que não existem na página do carrinho, mas são necessários para o fluxo de checkout. Esses campos só aparecem após clicar em "Checkout", então eles são definidos aqui para serem usados posteriormente no teste de checkout.
  readonly emptyFistNameInput: Locator;
  readonly emptyLastNameInput: Locator;
  readonly emptyPostalCodeInput: Locator;

  // Ícone do carrinho no header — clicável para abrir o carrinho
  readonly cartLink: Locator;

  // Path relativo — o baseURL do playwright.config.ts é concatenado automaticamente
  private readonly url = '/cart.html';

  constructor(page: Page) {
    this.page = page;

    // data-test attributes são os locators mais estáveis — não quebram com redesign visual
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.pageTitle = page.locator('[data-test="title"]');
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Postal Code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.emptyFistNameInput = page.locator('[data-test="error-first-name"]');
    this.emptyLastNameInput = page.locator('[data-test="error-last-name"]');
    this.emptyPostalCodeInput = page.locator('[data-test="error-postal-code"]');  
  }

  // Navega diretamente para o carrinho sem precisar clicar no ícone
  async navigate() {
    await this.page.goto(this.url);
  }

  // Clica no ícone do carrinho para abrir a página do carrinho
  async goToCart() {
    await this.cartLink.click();
  }

  // Clica em "Checkout" para avançar para o formulário de checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // Clica em "Continue Shopping" para voltar à página de produtos
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  // Remove um produto específico pelo nome — mesmo padrão do ProductsPage
  // Exemplo: await cartPage.removeItem('sauce-labs-backpack')
  async removeItem(productName: string) {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }
  // Preenche o formulário de checkout com os dados fornecidos
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
  async fillCheckoutFormWithEmptyFields() {
    await this.firstNameInput.fill('');
    await this.lastNameInput.fill('');
    await this.postalCodeInput.fill('');
    await this.continueButton.click();
  }
}
