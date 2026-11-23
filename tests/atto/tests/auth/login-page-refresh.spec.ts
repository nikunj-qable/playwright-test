import { test, expect } from "../../fixtures/test.fixture";

test.describe("TC-16: Login Page Loads Correctly on Page Refresh", () => {
  test("login page reloads cleanly, clears fields, and remains functional", async ({ loginPage, page }) => {
    // Arrange — open the login page (unauthenticated)
    await loginPage.open();

    // Assert initial state
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButtonLocator).toBeVisible();
    expect(await loginPage.currentUrl()).toContain("/auth/login");

    // Act — type a username before refresh
    await loginPage.enterUsername("Admin");
    await expect(loginPage.usernameField).toHaveValue("Admin");

    // Act — simulate page refresh by navigating to the same URL
    await loginPage.open();

    // Assert — URL is still on the login page
    expect(await loginPage.currentUrl()).toContain("/auth/login");

    // Assert — username field is cleared after refresh
    await expect(loginPage.usernameField).toHaveValue("");

    // Assert — login form is still displayed (no crash/error page)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.loginButtonLocator).toBeVisible();

    // Act — confirm form accepts input after refresh
    await loginPage.enterUsername("Admin");
    await loginPage.enterPassword("admin123");

    // Assert — fields accepted the input
    await expect(loginPage.usernameField).toHaveValue("Admin");
    await expect(loginPage.passwordField).toHaveValue("admin123");

    // Assert — login button is visible and enabled
    await expect(loginPage.loginButtonLocator).toBeVisible();
    await expect(loginPage.loginButtonLocator).toBeEnabled();

    // Act — click Login to prove button is functional
    await loginPage.submitLogin();

    // Assert — dashboard loaded, confirming successful login after refresh
    await expect(page).toHaveURL(/\/dashboard\/index/);
  });
});
