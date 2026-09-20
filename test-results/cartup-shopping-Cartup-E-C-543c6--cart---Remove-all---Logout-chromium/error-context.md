# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cartup-shopping.spec.js >> Cartup E-Commerce End-to-End Shopping Flow >> Sign up -> Login -> Search -> Add products -> Update cart -> Remove all -> Logout
- Location: tests\cartup-shopping.spec.js:10:3

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1  | async function pause(page, ms) {
  2  |   if (ms > 0) {
> 3  |     await page.waitForTimeout(ms);
     |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  4  |   }
  5  | }
  6  | 
  7  | async function firstVisible(locator) {
  8  |   const count = await locator.count();
  9  |   for (let i = 0; i < count; i++) {
  10 |     const item = locator.nth(i);
  11 |     if (await item.isVisible().catch(() => false)) {
  12 |       return item;
  13 |     }
  14 |   }
  15 |   return null;
  16 | }
  17 | 
  18 | module.exports = { pause, firstVisible };
  19 | 
```