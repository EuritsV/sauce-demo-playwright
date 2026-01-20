import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { log } from 'node:console';

test('fazer login com sucesso', async({page}) =>{
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login('standard_user', 'secret_sauce');

    // assertios para validar se o produto aparece
    await expect(page.locator('.title')).toHaveText('Products')
})
test('teste falha de login', async({page}) =>{
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login('standard_user', 'password123');

    // assertios para validar se o produto aparece
    // await expect(page.locator('.error-button')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    await expect(page.locator('.error-button')).toBeVisible();
})

