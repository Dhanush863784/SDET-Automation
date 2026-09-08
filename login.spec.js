const { test, expect } = require('@playwright/test');

/**
 * Flow: Login
 * Target: https://automationexercise.com/
 *
 * Credentials are pulled from environment variables — never hardcoded.
 * Set them before running, e.g.:
 *   TEST_EMAIL=you@example.com TEST_PASSWORD=yourPassword npx playwright test
 *
 * NOTE: The account used must already be registered on automationexercise.com.
 * This site has no seeded demo account, so the email/password must belong to
 * a real account created via the "Signup" flow beforehand.
 */

const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

test.beforeAll(() => {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
      'TEST_EMAIL and TEST_PASSWORD environment variables must be set before running this test.'
    );
  }   
});

test('User can log in with a valid registered email and password', async ({ page }) => {
  // 1. Open the website
  await page.goto('https://automationexercise.com/',{ waitUntil:'domcontentloaded',
  timeout:60000});
 

  // 2. Click "Signup / Login"
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByText('Login to your account')).toBeVisible();

  // 3. Enter a valid registered email address
  const emailInput = page.locator('input[data-qa="login-email"]');
  await emailInput.fill(TEST_EMAIL);

  // 4. Enter the valid password
  const passwordInput = page.locator('input[data-qa="login-password"]');
  await passwordInput.fill(TEST_PASSWORD);

  // 5. Click "Login"
  await page.locator('button[data-qa="login-button"]').click();

  // 6. Verify that the user is logged in and "Logout" is visible
  await expect(page.getByText('Logged in as')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});