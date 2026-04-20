import { type Locator, type Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Exposto como público para que os testes possam fazer assertions sobre o erro
  readonly errorMessage: Locator;

  private readonly url = '/';

  constructor(page: Page) {
    this.page = page;

    // data-test attributes — mais estáveis que #id ou placeholder text
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    // data-test="error" é o <h3> com o texto — "error-button" é só o ícone X de fechar
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
