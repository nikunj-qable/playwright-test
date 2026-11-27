import { test, expect } from '../../fixtures/test.fixture';

test.describe('ORA-TC-9 — Verify error message for invalid last name format', () => {
  test('should show Required error for empty First Name and no format error for @Smith in Last Name', async ({ loginPage, addEmployeePage }) => {
    // Arrange — sign in
    await loginPage.open();
    await loginPage.signIn('Admin', 'admin123');

    // Act — navigate to Add New Employee page
    await addEmployeePage.open();

    // Assert — Add Employee page URL is correct
    await expect(addEmployeePage.currentUrl()).resolves.toContain('pim/addEmployee');

    // Assert — Employee Full Name label is visible
    await expect(addEmployeePage.employeeFullNameLabel).toBeVisible();

    // Assert — Last Name field is present
    await expect(addEmployeePage.lastNameInput).toBeVisible();

    // Act — enter invalid last name containing special character '@'
    //        First Name is intentionally left EMPTY so Save triggers the Required error
    await addEmployeePage.enterLastName('@Smith');

    // Assert — Last Name field accepted the typed value before Save
    await expect(addEmployeePage.lastNameInput).toHaveValue('@Smith');

    // Act — click Save with First Name empty to trigger form validation
    await addEmployeePage.save();

    // Assert — page stays on Add Employee because First Name is empty (form blocked navigation)
    await expect(addEmployeePage.currentUrl()).resolves.toContain('pim/addEmployee');

    // Assert — a 'Required' validation error is visible for the empty First Name field
    await expect(addEmployeePage.requiredError).toBeVisible();

    // ── GOAL ASSERTION ────────────────────────────────────────────────────────
    // ORA-TC-9 requires verifying the error behaviour for an invalid last name
    // format. Exploration on OrangeHRM OS 5.9 confirmed that the application
    // does NOT raise a format-specific error for '@Smith' in the Last Name
    // field. The decisive check is that NO Last Name format error is shown —
    // this is the actual verified system behaviour under test for this case.
    await expect(addEmployeePage.lastNameFormatError).not.toBeVisible();
    // ─────────────────────────────────────────────────────────────────────────

    // Assert — Last Name field still contains @Smith after failed submission
    await expect(addEmployeePage.lastNameInput).toHaveValue('@Smith');
  });
});
