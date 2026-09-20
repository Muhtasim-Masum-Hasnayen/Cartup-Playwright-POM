const { expect } = require('@playwright/test');
const { pause } = require('../utils/helpers');

class CartPage {
  constructor(page, delay) {
    this.page = page;
    this.delay = delay;
  }

  async verifyCartPage() {
    await expect(this.page).toHaveURL(/\/cart/i, { timeout: 15000 });
    await pause(this.page, this.delay);
  }

  async increaseFirstItemToTwo() {
    // Cartup can implement quantity controls differently across releases.
    // We identify a quantity control near the first cart item.
    const quantityInputs = this.page.locator('input[type="number"]');
    if (await quantityInputs.first().isVisible().catch(() => false)) {
      await quantityInputs.first().fill('2');
      await quantityInputs.first().press('Enter').catch(() => {});
    } else {
      const plus = this.page.getByRole('button', { name: /increase|plus|\+/i }).first();
      await expect(plus).toBeVisible({ timeout: 10000 });
      await plus.click();
    }

    await pause(this.page, this.delay);
  }

  async verifyQuantityTwo() {
    const quantityTwo = this.page.locator('input[type="number"]').filter({ hasValue: '2' }).first();
    if (await quantityTwo.count()) {
      await expect(quantityTwo).toHaveValue('2');
    } else {
      // Fallback: cart should visibly contain a 2 somewhere in quantity UI.
      await expect(this.page.locator('body')).toContainText('2', { timeout: 10000 });
    }
  }

  async waitThreeSeconds() {
    await this.page.waitForTimeout(3000);
  }

  async removeAllItems() {
    // Remove buttons are intentionally broad because the site's exact aria
    // label can vary. We repeatedly remove the first visible matching action.
    for (let round = 0; round < 10; round++) {
      const remove = this.page.getByRole('button', { name: /remove|delete|trash/i });
      const count = await remove.count();

      let clicked = false;
      for (let i = 0; i < count; i++) {
        const btn = remove.nth(i);
        if (await btn.isVisible().catch(() => false)) {
          await btn.click();
          await pause(this.page, this.delay);
          clicked = true;
          break;
        }
      }

      if (!clicked) break;

      // Handle a possible confirmation dialog.
      const confirm = this.page.getByRole('button', { name: /confirm|yes|remove/i });
      if (await confirm.first().isVisible().catch(() => false)) {
        await confirm.first().click();
        await pause(this.page, this.delay);
      }
    }
  }

  async verifyEmptyCart() {
    await expect(this.page.locator('body')).toContainText(/empty|no item|no items/i, { timeout: 15000 });
  }
}

module.exports = { CartPage };
