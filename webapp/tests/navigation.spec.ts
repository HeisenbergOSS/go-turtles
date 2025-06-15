// webapp/tests/navigation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('App Navigation', () => {
  
  test('should allow navigating from the homepage to the login page', async ({ page }) => {
    // 1. Start at the root of the site.
    await page.goto('/');

    // 2. Find a link with the name "Login" and click it.
    await page.getByRole('link', { name: 'Login' }).click();

    // 3. Assert that the URL is now /login.
    await expect(page).toHaveURL('/login');

    // 4. Assert that the new page has a heading with the text "Login".
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

});