import { test as setup, expect } from "@playwright/test";
import { credentials } from "../data/test-users";

const authFile = ".auth/user.json";

/**
 * Runs once before the suite and saves the signed-in browser state, so individual tests don't
 * each pay for a login. Fill in the selectors for your own sign-in page the first time.
 */
setup("authenticate", async ({ page }) => {
  const user = credentials.standard;

  await page.goto("/login");
  await page.getByLabel(/email|username/i).fill(user.email);
  await page.getByLabel(/password/i).fill(user.password);
  await page.getByRole("button", { name: /log ?in|sign ?in/i }).click();

  // Wait for a real signed-in signal before saving state, not just a navigation.
  await expect(page.getByRole("button", { name: /log ?out|sign ?out|account/i })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
