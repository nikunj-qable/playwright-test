import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class EmployeeListPage extends BasePage {
  readonly path = '/web/index.php/pim/viewEmployeeList';

  private readonly employeeListLink: Locator = this.page.getByRole('link', { name: 'Employee List' });
  private readonly employeeNameInput: Locator = this.page.getByPlaceholder('Type for hints...').nth(0);
  private readonly searchButton: Locator = this.page.getByRole('button', { name: 'Search' });

  constructor(page: Page) {
    super(page);
  }

  async openFromNav(): Promise<void> {
    await this.employeeListLink.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async searchByEmployeeName(fullName: string): Promise<void> {
    await this.employeeNameInput.fill(fullName);
    await this.page.getByRole('option', { name: fullName }).click();
    await this.searchButton.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  firstNameCell(firstName: string): Locator {
    return this.page.getByRole('cell', { name: firstName });
  }

  lastNameCell(lastName: string): Locator {
    return this.page.getByRole('cell', { name: lastName });
  }

  employeeRowContaining(fullName: string): Locator {
    return this.page.locator('div.oxd-table-card > div.oxd-table-row.oxd-table-row--with-border').filter({ hasText: fullName });
  }
}
