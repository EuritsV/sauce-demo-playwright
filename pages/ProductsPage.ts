import { type Locator, type Page } from '@playwright/test';

// Page Object Model para a página de produtos do Sauce Demo
export class ProductsPage {

  // 'page' representa o browser tab — precisamos dele para navegar e interagir
  readonly page: Page;

  // Locator do ícone do carrinho (badge com número de itens)
  readonly cartBadge: Locator;

  // Apenas o path — o baseURL do playwright.config.ts é concatenado automaticamente
  private readonly url = '/inventory.html';

  constructor(page: Page) {
    this.page = page;

    // Usa data-test attribute — mais estável que role ou texto, pois não muda com redesign
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  // Navega diretamente para a página de produtos (útil para testes que não precisam do login flow)
  async navigate() {
    await this.page.goto(this.url);
  }

  // Retorna o locator do botão "Add to cart" de um produto específico pelo nome
  // Assim um único método serve para qualquer produto, sem duplicar código
  private addToCartButton(productName: string): Locator {
    return this.page.locator(`[data-test="add-to-cart-${productName}"]`);
  }

  // Retorna o locator do botão "Remove" de um produto específico pelo nome
  private removeButton(productName: string): Locator {
    return this.page.locator(`[data-test="remove-${productName}"]`);
  }

  // Adiciona um produto ao carrinho
  // Exemplo de uso: await productsPage.addToCart('sauce-labs-backpack')
  async addToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  // Remove um produto do carrinho
  // Exemplo de uso: await productsPage.removeFromCart('sauce-labs-backpack')
  async removeFromCart(productName: string) {
    await this.removeButton(productName).click();
  }

  // Retorna o número de itens no carrinho como número inteiro
  // Útil para assertions nos testes: expect(await productsPage.getCartCount()).toBe(1)
  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }
}
