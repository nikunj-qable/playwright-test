import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddEmployeePage } from '../pages/add-employee.page';

export interface Fixtures {
  loginPage: LoginPage;
  addEmployeePage: AddEmployeePage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
});

export { expect };
