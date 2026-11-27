import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AddEmployeePage extends BasePage {
  readonly path = '/pim/addEmployee';

  readonly firstNameInput: Locator = this.page.getByPlaceholder('First Name');
  readonly lastNameInput: Locator = this.page.getByPlaceholder('Last Name');
  readonly employeeFullNameLabel: Locator = this.page.getByText('Employee Full Name', { exact: true });

  /**
   * The first 'Required' error visible on the page.
   * When Save is clicked with an empty First Name, OrangeHRM shows this
   * error for the First Name field.
   */
  readonly requiredError: Locator = this.page.getByText('Required', { exact: true }).first();

  /**
   * A format-specific validation error scoped to the Last Name field.
   * OrangeHRM OS 5.9 does NOT render this for '@Smith'; asserting
   * not.toBeVisible() is the decisive ORA-TC-9 goal check — the application
   * does not validate against special characters in the Last Name field.
   */
  readonly lastNameFormatError: Locator = this.page
    .locator('div.oxd-input-group > div:nth-of-type(2) > div.oxd-input-group.oxd-input-field-bottom-space:nth-of-type(3)')
    .getByText('Required', { exact: true });

  private readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });

  async enterLastName(value: string): Promise<void> {
    await this.lastNameInput.fill(value);
  }

  async enterFirstName(value: string): Promise<void> {
    await this.firstNameInput.fill(value);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}
