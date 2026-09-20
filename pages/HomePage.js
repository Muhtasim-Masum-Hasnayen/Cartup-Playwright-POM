const { expect } = require('@playwright/test');
const { pause, firstVisible } = require('../utils/helpers');

class HomePage {
  constructor(page, delay) {
    this.page = page;
    this.delay = delay;

    this.searchInput = page.getByPlaceholder(/search/i).first();
    this.cartLink = page.getByRole('link', { name: /cart/i }).first();
    this.cartButton = page.getByRole('button', { name: /cart/i }).first();
    this.accountButton = page.getByRole('button', { name: /account|profile/i }).first();
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await pause(this.page, this.delay);
  }

  async search(term) {
    const input = this.searchInput;
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill(term);
    await pause(this.page, this.delay);
    await input.press('Enter');
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await pause(this.page, this.delay);
  }

  async openCart() {
    let cart = await firstVisible(this.cartLink);
    if (!cart) cart = await firstVisible(this.cartButton);

    if (!cart) {
      cart = this.page.locator('a[href*="/cart"], button').filter({ hasText: /cart/i }).first();
    }

    await expect(cart).toBeVisible({ timeout: 15000 });
    await cart.click();
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await pause(this.page, this.delay);
  }

  async logout() {
    // Cartup may expose logout through a profile/account menu.
    const profileCandidates = [
      this.page.getByRole('button', { name: /account|profile|user/i }),
      this.page.getByRole('link', { name: /account|profile/i }),
      this.page.locator('[aria-label*="account" i], [aria-label*="profile" i]')
    ];

    let profile = null;
    for (const candidate of profileCandidates) {
      profile = await firstVisible(candidate);
      if (profile) break;
    }

    if (profile) {
      await profile.click();
      await pause(this.page, this.delay);
    }

    const logout = this.page.getByRole('button', { name: /log\s*out|sign\s*out/i })
      .or(this.page.getByRole('link', { name: /log\s*out|sign\s*out/i }));

    await expect(logout.first()).toBeVisible({ timeout: 10000 });
    await logout.first().click();
    await pause(this.page, this.delay);
  }
}

module.exports = { HomePage };
