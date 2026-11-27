import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AddEmployeePage extends BasePage {
  readonly path = '/web/index.php/pim/addEmployee';

  readonly firstNameField: Locator = this.page.getByPlaceholder('First Name');
  readonly lastNameField: Locator = this.page.getByPlaceholder('Last Name');

  private readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });
  private readonly pimLink: Locator = this.page.getByRole('link', { name: 'PIM' });
  private readonly addEmployeeLink: Locator = this.page.getByRole('link', { name: 'Add Employee' });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.pimLink.click();
    await this.addEmployeeLink.click();
    await this.page.waitForURL(/pim\/addEmployee/);
  }

  async fillFirstName(name: string): Promise<void> {
    await this.firstNameField.fill(name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.lastNameField.fill(name);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForURL(/pim\/viewPersonalDetails\/empNumber\//);
  }
}
