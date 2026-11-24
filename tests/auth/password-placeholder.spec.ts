import { test, expect } from "../../fixtures/test.fixture";

// Precondition: user is not logged in.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("ORA-TC-2: Verify password field placeholder text on login page", () => {
  test("password field shows 'Password' placeholder that hides once the user types", async ({ page, loginPage }) => {
    // Step 1 — navigate to the login page
    await loginPage.open();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInputByName).toBeVisible();

    const password = loginPage.passwordInputByName;

    // Step 2 — placeholder before any input
    await expect(password).toHaveValue("");
    await expect(password).toHaveAttribute("type", "password");
    await expect(password).toHaveAttribute("placeholder", "Password");
    expect(await password.evaluate((el) => el.matches(":placeholder-shown"))).toBe(true);

    // Description — placeholder disappears once the user begins typing
    await password.fill("a");
    expect(await password.evaluate((el) => el.matches(":placeholder-shown"))).toBe(false);

    // ...and returns when the field is cleared
    await password.fill("");
    expect(await password.evaluate((el) => el.matches(":placeholder-shown"))).toBe(true);
  });
});
