import { test, expect } from "../../fixtures/test.fixture";
import { DashboardPage } from "../../pages/dashboard.page";

// Start unauthenticated so the login flow itself is exercised.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("ORA-TC-3: Login with valid username and valid password - successful login", () => {
  test("valid credentials log the user in and redirect to the Dashboard with no errors", async ({ page, loginPage }) => {
    const dashboardPage = new DashboardPage(page);

    // Step 1 — login page shows username and password fields
    await loginPage.open();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    // Step 2 — enter a valid username
    await loginPage.enterUsername("Admin");
    await expect(loginPage.usernameInput).toHaveValue("Admin");

    // Step 3 — enter the valid password; it is masked and accepted
    await loginPage.enterPassword("admin123");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
    await expect(loginPage.passwordInput).toHaveValue("admin123");

    // Step 4 — click Login; user is redirected to the Dashboard
    await loginPage.submitLogin();
    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(dashboardPage.dashboardHeading).toBeVisible();

    // No error messages are displayed
    await expect(page.getByText("Invalid credentials")).toHaveCount(0);
    await expect(page.locator(".oxd-alert--error")).toHaveCount(0);
  });
});
