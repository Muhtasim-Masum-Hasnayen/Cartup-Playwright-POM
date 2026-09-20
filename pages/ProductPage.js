const { expect } = require('@playwright/test');
const { pause, firstVisible } = require('../utils/helpers');

class ProductPage {
  constructor(page, delay) {
    this.page = page;
    this.delay = delay;
  }

  async verifyProductPage() {
    await expect(this.page.locator('h1').first()).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByRole('button', { name: /add to cart/i }).first()).toBeVisible({ timeout: 15000 });
    await pause(this.page, this.delay);
  }

  async selectAvailableVariantIfNeeded() {
    // Many Cartup products have size/color choices. Click the first visible
    // option when such choices exist; otherwise continue.
    const variantButtons = this.page.locator('button').filter({ hasText: /^(S|M|L|XL|2XL|39|40|41|42|43|44)$/ });
    const count = await variantButtons.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = variantButtons.nth(i);
      if (await button.isVisible().catch(() => false)) {
        await button.click();
        await pause(this.page, 300);
        break;
      }
    }
  }

  async addToCart() {
    await this.selectAvailableVariantIfNeeded();

    const add = this.page.getByRole('button', { name: /add to cart/i }).first();
    await expect(add).toBeVisible({ timeout: 15000 });
    await add.click();
    await pause(this.page, this.delay);

    // Give the UI a chance to show a success toast/cart update.
    const success = this.page.getByText(/added to cart|successfully added/i).first();
    await success.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }
}

module.exports = { ProductPage };
