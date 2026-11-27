import { test, expect } from '../../fixtures/test.fixture';
import { LoginPage } from '../../pages/login.page';
import { AddEmployeePage } from '../../pages/add-employee.page';
import { EmployeeListPage } from '../../pages/employee-list.page';

test.describe('ORA-TC-7 — Verify employee appears in Employee List after saving', () => {
  test('newly added employee Bob Green appears in the Employee List', async ({ page, loginPage, addEmployeePage, employeeListPage }) => {
    // Arrange — sign in as HR administrator
    await loginPage.open();
    await loginPage.signIn('Admin', 'admin123');

    // Act — navigate to Add Employee and create Bob Green
    await addEmployeePage.open();
    await addEmployeePage.fillFirstName('Bob');
    await addEmployeePage.fillLastName('Green');
    await addEmployeePage.save();

    // Assert — confirm save redirected to Personal Details with correct data
    await expect(page).toHaveURL(/pim\/viewPersonalDetails\/empNumber\//);
    await expect(addEmployeePage.firstNameField).toHaveValue('Bob');
    await expect(addEmployeePage.lastNameField).toHaveValue('Green');

    // Act — navigate to Employee List and search for Bob Green
    await employeeListPage.openFromNav();
    await employeeListPage.searchByEmployeeName('Bob Green');

    // Assert — Employee List shows the new employee
    await expect(page).toHaveURL(/pim\/viewEmployeeList/);
    await expect(employeeListPage.firstNameCell('Bob')).toBeVisible();
    await expect(employeeListPage.lastNameCell('Green')).toBeVisible();
    await expect(employeeListPage.employeeRowContaining('Bob Green')).toBeVisible();
  });
});
