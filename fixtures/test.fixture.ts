import { test as base, expect } from "@playwright/test";

/**
 * The single entry point every spec imports. Register page objects here as you create them, so
 * a spec receives ready-made objects instead of constructing them:
 *
 *   import { test, expect } from "../../fixtures/test.fixture";
 *   test("...", async ({ loginPage }) => { await loginPage.open(); });
 */
export interface Fixtures {
  // loginPage: LoginPage;
}

export const test = base.extend<Fixtures>({
  // loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
});

export { expect };
