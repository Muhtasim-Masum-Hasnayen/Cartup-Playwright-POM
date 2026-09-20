const { expect } = require('@playwright/test');
const { pause } = require('../utils/helpers');

class AuthPage {
  constructor(page, delay) {
    this.page = page;
    this.delay = delay;

    this.emailPhone = page
      .getByLabel(/email\s*\/?\s*phone number/i)
      .first()
      .or(page.getByPlaceholder(/email\s*\/?\s*phone/i).first());

this.password = page.locator(
  'input[type="password"][name="password"]'
).first();

    this.continueButton = page
      .getByRole('button', { name: /^continue$/i })
      .first();

    this.signInButton = page
      .getByRole('button', { name: /sign in/i })
      .first();
  }

  // ==========================================
  // OPEN LOGIN PAGE
  // ==========================================

  async openLogin() {
    await this.page.goto('/auth/login');

    await this.page.waitForLoadState('domcontentloaded');

    await pause(this.page, this.delay);
  }

  // ==========================================
  // OPEN SIGNUP PAGE
  // ==========================================

  async openSignup() {
    await this.page.goto('/auth/signup');

    await this.page.waitForLoadState('domcontentloaded');

    await pause(this.page, this.delay);
  }

  // ==========================================
  // SIGN UP
  // ==========================================

  async signup(emailOrPhone, password) {

    // Step 1: Enter email / phone
    await expect(this.emailPhone).toBeVisible({
      timeout: 15000
    });

    await this.emailPhone.fill(emailOrPhone);

    await pause(this.page, this.delay);

    // Step 2: Click Continue
    await this.continueButton.click();

    await pause(this.page, this.delay);

    // ==========================================
    // OTP STEP
    // ==========================================

    console.log('');
    console.log('==========================================');
    console.log('[OTP STEP]');
    console.log('Cartup has sent an OTP.');
    console.log('Enter the OTP manually in the browser.');
    console.log('==========================================');
    console.log('');

    /*
      Playwright will pause here.

      Enter the OTP manually in the browser.

      After entering OTP:
      - Click Continue / Verify if necessary
      - Then resume Playwright from VS Code
    */

    await this.page.pause();

    // ==========================================
    // AFTER OTP
    // ==========================================

    await pause(this.page, this.delay);

    console.log('[SIGNUP] OTP step completed.');
    console.log('[SIGNUP] Checking account setup form...');

    // ------------------------------------------
    // Find password fields
    // ------------------------------------------

    const passwordFields = this.page.locator(
      'input[type="password"]'
    );

    const passwordCount = await passwordFields.count();

    console.log(
      `[SIGNUP] Password fields found: ${passwordCount}`
    );

    // ------------------------------------------
    // Fill password
    // ------------------------------------------

    if (passwordCount >= 1) {

      await passwordFields
        .nth(0)
        .fill(password);

      await pause(this.page, this.delay);

    }

    // ------------------------------------------
    // Fill confirm password if available
    // ------------------------------------------

    if (passwordCount >= 2) {

      await passwordFields
        .nth(1)
        .fill(password);

      await pause(this.page, this.delay);

    }

    // ==========================================
    // CHECKBOXES
    // ==========================================

    const checkboxes = this.page.locator(
      'input[type="checkbox"]'
    );

    const checkboxCount = await checkboxes.count();

    console.log(
      `[SIGNUP] Checkboxes found: ${checkboxCount}`
    );

    for (let i = 0; i < checkboxCount; i++) {

      const checkbox = checkboxes.nth(i);

      const visible = await checkbox
        .isVisible()
        .catch(() => false);

      if (!visible) {
        continue;
      }

      const checked = await checkbox
        .isChecked()
        .catch(() => false);

      if (!checked) {

        await checkbox.check();

        await pause(this.page, 300);
      }
    }

    // ==========================================
    // FIND SAVE & CONTINUE
    // ==========================================

    const saveContinueButton = this.page
      .getByRole('button', {
        name: /save\s*&\s*continue|continue|sign up|register|create account/i
      })
      .first();

    await expect(saveContinueButton).toBeVisible({
      timeout: 15000
    });

    // ==========================================
    // WAIT FOR BUTTON TO BECOME ENABLED
    // ==========================================

    console.log(
      '[SIGNUP] Waiting for Save & Continue button...'
    );

    await expect(saveContinueButton).toBeEnabled({
  timeout: 15000
});

// Cartup / PrimeVue password strength popup can cover the button.
// Move focus away from the password field first.
await this.page.locator('body').click({
  position: { x: 10, y: 10 }
});

await pause(this.page, 500);

// Wait for the password strength overlay to disappear.
const passwordPanel = this.page.locator(
  '.p-password-panel'
);

if (await passwordPanel.count()) {
  await passwordPanel.first()
    .waitFor({
      state: 'hidden',
      timeout: 5000
    })
    .catch(() => {});
}

// Make sure the button is still enabled.
await expect(saveContinueButton).toBeEnabled({
  timeout: 15000
});

// Now click Save & Continue.
await saveContinueButton.click();

await pause(this.page, this.delay);

console.log('[SIGNUP] Registration completed.');
  }

  // ==========================================
  // LOGIN
  // ==========================================

  async login(emailOrPhone, password) {

    await expect(this.emailPhone).toBeVisible({
      timeout: 15000
    });

    // Enter email / phone
    await this.emailPhone.fill(emailOrPhone);

    await pause(this.page, this.delay);

    // Enter password
    await this.password.fill(password);

    await pause(this.page, this.delay);

    // Click Sign In
    await this.signInButton.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    ).catch(() => {});

    await pause(this.page, this.delay);

    // Login should not remain on login page
    await expect(this.page).not.toHaveURL(
      /\/auth\/login/i,
      {
        timeout: 15000
      }
    );
  }
}

module.exports = {
  AuthPage
};