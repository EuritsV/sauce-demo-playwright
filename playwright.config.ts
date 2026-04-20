import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // WebKit no Windows é mais lento a iniciar — 60s evita timeouts prematuros
  timeout: 60000,

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 1. Corre o login uma vez (em Chrome) e guarda a sessão em ficheiro
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // 2. Testes de login — browser limpo, sem sessão guardada
    {
      name: 'login:chrome',
      testMatch: '**/login.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'login:firefox',
      testMatch: '**/login.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'login:webkit',
      testMatch: '**/login.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },

    // 3. Todos os testes autenticados — reutilizam a sessão guardada pelo setup
    {
      name: 'auth:chrome',
      testMatch: [
        '**/productsToCart.spec.ts',
        '**/cart.spec.ts',
        '**/checkout.spec.ts',
        '**/logout.spec.ts',
        '**/footer.spec.ts',
      ],
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    },
    {
      name: 'auth:firefox',
      testMatch: [
        '**/productsToCart.spec.ts',
        '**/cart.spec.ts',
        '**/checkout.spec.ts',
        '**/logout.spec.ts',
        '**/footer.spec.ts',
      ],
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json' },
    },
    {
      name: 'auth:webkit',
      testMatch: [
        '**/productsToCart.spec.ts',
        '**/cart.spec.ts',
        '**/checkout.spec.ts',
        '**/logout.spec.ts',
        '**/footer.spec.ts',
      ],
      dependencies: ['setup'],
      use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
    },
  ],
});
