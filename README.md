# Cartup Playwright POM Automation

Professional end-to-end UI automation project for **Cartup Bangladesh** using **Playwright + JavaScript + Page Object Model (POM)**.

## Automated scenario

1. Open Cartup
2. Create a new account
3. Handle real OTP manually at the security checkpoint
4. Login using the created credentials
5. Search `Shoes for men`
6. Open a product
7. Add it to cart
8. Open cart
9. Increase quantity to 2
10. Search `Formal shirt for men`
11. Add two different shirt products
12. Open cart
13. Keep cart open for 3 seconds
14. Remove all products
15. Verify cart is empty
16. Logout

## Why OTP is manual

Cartup's customer registration flow uses an OTP verification step. This project does **not** attempt to bypass or automate a real OTP/security control.

When the signup flow reaches OTP, Playwright pauses the browser. Enter the real OTP in the browser and continue. After that, the automation resumes.

For repeated portfolio runs, you can reuse an existing test account by setting:

```env
USE_EXISTING_ACCOUNT=true
CARTUP_EMAIL=your-email@example.com
CARTUP_PASSWORD=your-password
```

Then the test skips registration and starts from login.

## Requirements

- Node.js 18+
- VS Code
- Google Chrome/Chromium installed by Playwright

## Setup

Open this folder in VS Code terminal:

```bash
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env`.

### First run: signup + OTP

Put your test email or phone in `.env`:

```env
CARTUP_EMAIL=your-test-email@example.com
CARTUP_PASSWORD=Cartup@12345
USE_EXISTING_ACCOUNT=false
ACTION_DELAY_MS=700
HEADLESS=false
```

Run:

```bash
npm run test:cartup
```

The browser will open visibly. At the OTP step, enter the real OTP and resume the test.

### Later runs: existing account

Change:

```env
USE_EXISTING_ACCOUNT=true
```

and keep the same credentials.

Run:

```bash
npm run test:cartup
```

## Medium-speed execution

The default action delay is **700 ms**. This is intentionally medium speed: slow enough to watch the actions but not excessively slow.

Change it in `.env` if needed:

```env
ACTION_DELAY_MS=500
```

or:

```env
ACTION_DELAY_MS=1000
```

## Reports

After a run:

```bash
npm run report
```

The Playwright HTML report will open with test steps, screenshots/video for failures, and traces when available.

## Project structure

```text
Cartup-Playwright-POM/
├── pages/
│   ├── AuthPage.js
│   ├── CartPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   └── SearchResultsPage.js
├── tests/
│   └── cartup-shopping.spec.js
├── utils/
│   ├── helpers.js
│   └── testData.js
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## QA portfolio highlights

This project demonstrates:

- End-to-end testing
- Page Object Model
- Reusable page classes
- Explicit assertions
- Dynamic product selection
- Cart quantity validation
- Empty-cart validation
- Authentication flow
- OTP security checkpoint handling
- Screenshot on failure
- Video on failure
- Trace on failure
- HTML reporting
- Environment-based test data
- Medium-speed headed execution
- GitHub-ready project structure

## Important note

E-commerce websites change frequently. If Cartup changes a locator, page structure, authentication flow, or cart UI, a locator may need a small update. The project intentionally prefers semantic locators and product URLs over brittle CSS/XPath selectors where possible.
