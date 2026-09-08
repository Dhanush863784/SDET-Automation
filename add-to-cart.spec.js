const { test, expect } = require('@playwright/test');

/**
 * Flow: Add Product to Cart
 * Target: https://automationexercise.com/
 *
 * Runs as a guest — no login/credentials are required to add a product
 * to the cart on this site.
 */

test('User can add a product to the cart and see it in the cart', async ({ page }) => {
  test.setTimeout(90000);

  // 1. Open the website
  await page.goto('https://automationexercise.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // 2. Click "Products"
  await page.getByRole('link', { name: 'Products' }).click();

  // 3. Verify the Products page is displayed
  await expect(
    page.getByRole('heading', { name: 'All Products' })
  ).toBeVisible();

  // 4. Select the first product
  const firstProductCard = page
    .locator('.features_items .product-image-wrapper')
    .first();

  await expect(firstProductCard).toBeVisible();

  // Capture the product name so we can verify the same item in the cart
  const productName = (
    await firstProductCard.locator('.productinfo p').innerText()
  ).trim();

  // Hover to reveal the "Add to cart" button
  await firstProductCard.hover();

  // 5. Click "Add to cart"
  const addToCartButton = firstProductCard
    .locator('.add-to-cart')
    .first();

  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // 6. Verify that the product was added to the cart
  await expect(page.getByText('Added!')).toBeVisible();

  // 7. Open the cart
  await page.getByRole('link', { name: 'View Cart' }).click();

  // 8. Verify the selected product is displayed in the cart
  const cartProductName = page
    .locator('.cart_info .cart_description h4 a')
    .first();

  await expect(cartProductName).toBeVisible();
  await expect(cartProductName).toHaveText(productName);
});