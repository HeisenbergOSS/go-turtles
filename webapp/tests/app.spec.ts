import { test, expect } from "@playwright/test";

test.describe("Turtles All The Way Down App E2E Flow", () => {
  test("should load top-level facts and allow drilling down", async ({
    page,
  }) => {
    // 1. Navigate to the app's homepage.
    await page.goto("/");

    // 2. Check for the main title to ensure the page loaded.
    await expect(
      page.getByRole("heading", { name: "Turtles All The Way Down" }),
    ).toBeVisible();

    // 3. Check that a top-level fact from our API is rendered.
    // We use a locator to find the card by the text it contains.
    const mmrFact = page.getByText("MMR Vaccine is Highly Effective");
    await expect(mmrFact).toBeVisible();

    // 4. Check that the child fact is initially hidden.
    const measlesStudy = page.getByText("Measles Efficacy Study");
    await expect(measlesStudy).not.toBeVisible();

    // 5. Click the "Show Evidence" button within the MMR fact card.
    // We locate the button relative to the fact card itself.
    await mmrFact
      .locator("..")
      .getByRole("button", { name: /Show Evidence/ })
      .click();

    // 6. Now, assert that the child fact is visible.
    await expect(measlesStudy).toBeVisible();
  });

  test("should perform a search and display results", async ({ page }) => {
    // 1. Navigate to the app's homepage.
    await page.goto("/");

    // 2. Fill the search input with a term.
    const searchInput = page.getByPlaceholder("Search for facts...");
    await searchInput.fill("autism");

    // 3. Click the search button.
    await page.getByRole("button", { name: "Search" }).click();

    // 4. Assert that the search result is now visible.
    const autismResult = page.getByText("Vaccines Do Not Cause Autism");
    await expect(autismResult).toBeVisible();

    // 5. Assert that the original top-level fact is no longer visible.
    const mmrFact = page.getByText("MMR Vaccine is Highly Effective");
    await expect(mmrFact).not.toBeVisible();

    // 6. Click the "Clear" button to return to the default view.
    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(mmrFact).toBeVisible();
  });
});
