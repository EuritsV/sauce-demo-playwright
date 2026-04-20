import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {

  readonly page: Page;

  // Título da página — muda conforme o passo: "Checkout: Your Information", "Checkout: Overview", "Checkout: Complete!"
  readonly pageTitle: Locator;

  // Passo 1 — /checkout-step-one.html — formulário de informação
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Mensagem de erro ao submeter formulário inválido
  readonly errorMessage: Locator;

  // Passo 2 — /checkout-step-two.html — resumo da encomenda
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly totalPrice: Locator;
  readonly finishButton: Locator;

  // Passo 3 — /checkout-complete.html — confirmação
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  private readonly stepOneUrl = '/checkout-step-one.html';
  private readonly stepTwoUrl = '/checkout-step-two.html';
  private readonly stepCompleteUrl = '/checkout-complete.html';

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');

    // Formulário — getByPlaceholder é estável para inputs com placeholder definido
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Postal Code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Mesmo padrão do LoginPage — erro aparece num <h3 data-test="error">
    this.errorMessage = page.locator('[data-test="error"]');

    // Overview
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete
    this.confirmationMessage = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Navega directamente para o formulário (útil para testes que não precisam do fluxo completo)
  async navigate() {
    await this.page.goto(this.stepOneUrl);
  }

  // Preenche e submete o formulário — passa strings vazias para testar validação
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  // Clica em Finish na página de overview
  async finishCheckout() {
    await this.finishButton.click();
  }
}
