import { test, expect } from '@playwright/test';
// 1. Import our new, centralized mock handler
import { mockedApi } from './mocks';

test.describe('Turtles App E2E Flow (with graphql-mocks)', () => {

  // 2. Use the mock handler for all GraphQL requests in this test suite.
  // The '**/query' is a glob pattern that will catch our API endpoint.
  test.beforeEach(async ({ page }) => {
    await page.route('**/query', mockedApi);
  });

  test('should load top-level facts and allow drilling down', async ({ page }) => {
    await page.goto('/');

    // Assert that the mocked data is visible
    const mmrFact = page.getByText('MMR Vaccine is Highly Effective');
    await expect(mmrFact).toBeVisible();

    // The rest of the test logic remains EXACTLY the same!
    const childFact = page.getByText('Child Fact Title');
    await expect(childFact).not.toBeVisible();

    await mmrFact.locator('..').getByRole('button', { name: /Show Evidence/ }).click();
    
    // Now, assert that the child fact, returned by our mocked `fact` query, is visible.
    await expect(childFact).toBeVisible();
  });

  test('should perform a search using the mocked API', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search for facts...').fill('autism');
    await page.getByRole('button', { name: 'Search' }).click();

    // Assert that the specific mocked search result is now visible
    const autismResult = page.getByText('Vaccines Do Not Cause Autism');
    await expect(autismResult).toBeVisible();

    // Assert that the original top-level facts are no longer visible
    const mmrFact = page.getByText('MMR Vaccine is Highly Effective');
    await expect(mmrFact).not.toBeVisible();
  });

});