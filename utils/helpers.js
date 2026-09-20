async function pause(page, ms) {
  if (ms > 0) {
    await page.waitForTimeout(ms);
  }
}

async function firstVisible(locator) {
  const count = await locator.count();
  for (let i = 0; i < count; i++) {
    const item = locator.nth(i);
    if (await item.isVisible().catch(() => false)) {
      return item;
    }
  }
  return null;
}

module.exports = { pause, firstVisible };
