import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';

  readonly dashboardHeading: Locator = this.page.getByRole('heading', { name: 'Dashboard', level: 6 });

  readonly buzzWidgetTitle: Locator = this.page.getByText('Buzz Latest Posts', { exact: true });

  readonly buzzWidgetContainer: Locator = this.page.locator('.orangehrm-buzz-widget');

  readonly buzzPostDividers: Locator = this.page.locator('.orangehrm-buzz-widget-divider');

  readonly buzzAuthorName: Locator = this.page.getByText('John Mike Doe');

  readonly buzzPostTimestamp: Locator = this.page.getByText('2026-23-11');

  constructor(page: Page) {
    super(page);
  }
}
