import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddEmployeePage } from '../pages/add-employee.page';
import { EmployeeListPage } from '../pages/employee-list.page';

export interface Fixtures {
  loginPage: LoginPage;
  addEmployeePage: AddEmployeePage;
  employeeListPage: EmployeeListPage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },
});

export { expect };
