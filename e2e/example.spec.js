import { test, expect } from "@playwright/test";

test("should navigate to the dashbaord page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h3")).toContainText("Create Your Job Profile");

  await page.goto("/dashboard");
  await expect(page.locator("h3")).toContainText(
    "Generate Your Personalized Cover Letter"
  );
});
