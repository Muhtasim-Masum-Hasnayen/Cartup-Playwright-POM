const { expect } = require('@playwright/test');
const { pause } = require('../utils/helpers');

class SearchResultsPage {
  constructor(page, delay) {
    this.page = page;
    this.delay = delay;
  }

  async verifySearchResults(term) {
    await expect(this.page).toHaveURL(/cartup\.com/i);
    await expect(this.page.locator('body')).toContainText(/items found|sort by|filter/i, { timeout: 15000 });
    await pause(this.page, this.delay);
  }

  async openFirstProduct() {
    // Prefer product links. Exclude navigation links where possible.
    const productLinks = this.page.locator('a[href*="/product/"]');
    await expect(productLinks.first()).toBeVisible({ timeout: 15000 });
    await productLinks.first().click();
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await pause(this.page, this.delay);
  }

  async openSecondProduct() {
    const productLinks = this.page.locator('a[href*="/product/"]');
    const count = await productLinks.count();
    if (count < 2) {
      throw new Error('Less than two product links were found in the current search results.');
    }

    await productLinks.nth(1).click();
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await pause(this.page, this.delay);
  }
}

module.exports = { SearchResultsPage };
