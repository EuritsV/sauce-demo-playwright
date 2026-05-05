# sauce-demo-playwright
 
E2E test automation suite for [Sauce Demo](https://www.saucedemo.com/) built with **Playwright + TypeScript**.
 
## What this project covers
 
Sauce Demo is a sample e-commerce application used to practise test automation. This suite validates the core user journeys end-to-end:
 
| Test file | Scenarios covered |
|---|---|
| `login.spec.ts` | Valid login, invalid credentials, locked-out user |
| `logout.spec.ts` | Successful logout and session termination |
| `productsToCart.spec.ts` | Add and remove products from the catalogue |
| `cart.spec.ts` | Cart state, item count, product details |
| `checkout.spec.ts` | Full checkout flow from cart to order confirmation |
| `footer.spec.ts` | Footer links and social media navigation |
 
## Tech stack
 
- [Playwright](https://playwright.dev/) — E2E framework
- TypeScript — strongly-typed test code
- **Page Object Model (POM)** — all pages encapsulated under `pages/`
- **storageState authentication** — login runs once via `auth.setup.ts`, state is reused across tests (faster, no repeated login)
- **GitHub Actions** — CI pipeline runs on every push
## Multi-browser coverage
 
Tests run in parallel across **Chromium, Firefox and WebKit** (Safari engine).
 
## Project structure
 
```
├── .github/workflows/   # CI pipeline
├── data/                # Test data
├── pages/               # Page Object Model classes
├── tests/               # Spec files
│   ├── auth.setup.ts    # Authentication setup (storageState)
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── footer.spec.ts
│   └── productsToCart.spec.ts
├── playwright.config.ts
└── tsconfig.json
```
 
## How to run
 
```bash
# Install dependencies
npm install
 
# Install browsers
npx playwright install
 
# Run all tests
npx playwright test
 
# Run with UI mode
npx playwright test --ui
 
# Run on a specific browser
npx playwright test --project=chromium
```
 
## CI
 
Tests run automatically on every push via GitHub Actions. See `.github/workflows/` for the pipeline configuration.
