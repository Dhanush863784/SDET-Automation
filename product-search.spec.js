const { test, expect } = require('@playwright/test');

/**
 * Flow: Product Search
 * Target: https://automationexercise.com/
 *
 * Searches for "dress" on the Products page and verifies the results
 * are displayed and relevant.
 */

const SEARCH_TERM = 'dress';

test('User can search for products and see relevant results', async ({ page }) => {
  test.setTimeout(90000);

  // 1. Open the website
  await page.goto('https://automationexercise.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // 2. Click "Products"
  await page.getByRole('link', { name: 'Products' }).click();

  // 3. Verify that the Products page is displayed
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

  // 4. Enter "dress" in the product search box
  const searchInput = page.locator('#search_product');
  await searchInput.fill(SEARCH_TERM);

  // 5. Click the search button
  await page.locator('#submit_search').click();

  // 6. Verify that the search results contain products related to "dress"
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

  const resultNames = page.locator('.features_items .productinfo p');
  await expect(resultNames.first()).toBeVisible();

  const count = await resultNames.count();
  expect(count).toBeGreaterThan(0);

  const allNames = (await resultNames.allTextContents()).map((t) => t.toLowerCase());
  const hasRelevantMatch = allNames.some((name) => name.includes(SEARCH_TERM));
  expect(hasRelevantMatch).toBe(true);
});
