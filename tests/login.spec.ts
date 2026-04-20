import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../data/testData.json';

// Agrupa todos os testes de login num bloco descritivo
test.describe('Login validations', () => {

  let loginPage: LoginPage;

  // Executa antes de cada teste — evita repetir loginPage.navigate() em todos
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('login with valid credentials', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    // Após login válido, verifica que a página de produtos é apresentada
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('login with wrong password', async () => {
    await loginPage.login(testData.wrongPassword.username, testData.wrongPassword.password);

    // Verifica a mensagem de erro exacta — mais forte que só verificar visibilidade
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('login with wrong username', async () => {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('login with empty credentials', async () => {
    await loginPage.login(testData.emptyUser.username, testData.emptyUser.password);

    // Com username vazio, o Sauce Demo mostra este erro específico
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

});
