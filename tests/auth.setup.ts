import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../data/testData.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(testData.validUser.username, testData.validUser.password);

  // Guarda cookies + localStorage num ficheiro
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});