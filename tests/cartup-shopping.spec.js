const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { AuthPage } = require('../pages/AuthPage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const data = require('../utils/testData');

test.describe('Cartup E-Commerce End-to-End Shopping Flow', () => {
  test('Sign up -> Login -> Search -> Add products -> Update cart -> Remove all -> Logout', async ({ page }) => {
    test.setTimeout(180000);

    const home = new HomePage(page, data.actionDelay);
    const auth = new AuthPage(page, data.actionDelay);
    const search = new SearchResultsPage(page, data.actionDelay);
    const product = new ProductPage(page, data.actionDelay);
    const cart = new CartPage(page, data.actionDelay);

    let loginId = data.credentials.email || data.credentials.phone;

    // 1. Open Cartup
    await home.open();
    await expect(page).toHaveURL(/cartup\.com/i);

    // 2. Sign up (optional manual OTP checkpoint)
    if (!data.useExistingAccount) {
      if (!loginId) {
        throw new Error(
          'Set CARTUP_EMAIL or CARTUP_PHONE in .env before running the signup flow.'
        );
      }

      await auth.openSignup();
      await auth.signup(loginId, data.credentials.password);

      // Registration may leave us logged in or on an auth page.
      // We deliberately navigate to login to validate the credentials.
    }

    // 3. Login with the created/existing credentials
    await auth.openLogin();
    await auth.login(loginId, data.credentials.password);

    // 4. Search "Shoes for men"
    await home.search(data.searchTerms.shoes);
    await search.verifySearchResults(data.searchTerms.shoes);

    // 5. Open first shoe and add to cart
    await search.openFirstProduct();
    await product.verifyProductPage();
    await product.addToCart();

    // 6. Open cart and increase shoe quantity to 2
    await home.openCart();
    await cart.verifyCartPage();
    await cart.increaseFirstItemToTwo();
    await cart.verifyQuantityTwo();

    // 7. Return to home and search "Formal shirt for men"
    await home.open();
    await home.search(data.searchTerms.shirts);
    await search.verifySearchResults(data.searchTerms.shirts);

    // 8. Add shirt #1
    await search.openFirstProduct();
    await product.verifyProductPage();
    await product.addToCart();

    // 9. Return to search results and add a different shirt
    await page.goBack();
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await page.goBack().catch(() => {});
    await pause(page, data.actionDelay);

    // More reliable than browser history: perform the search again.
    await home.open();
    await home.search(data.searchTerms.shirts);
    await search.verifySearchResults(data.searchTerms.shirts);
    await search.openSecondProduct();
    await product.verifyProductPage();
    await product.addToCart();

    // 10. Open cart again
    await home.openCart();
    await cart.verifyCartPage();

    // 11. Keep cart visible for exactly 3 seconds
    await cart.waitThreeSeconds();

    // 12. Remove everything
    await cart.removeAllItems();
    await cart.verifyEmptyCart();

    // 13. Logout
    await home.logout();

    // Final sanity check: auth page or login UI should be visible.
    await expect(
      page.getByRole('heading', { name: /sign in|login/i }).first()
        .or(page.getByText(/email\/phone number/i).first())
    ).toBeVisible({ timeout: 15000 });
  });
});
