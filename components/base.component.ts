import type { Locator, Page } from "@playwright/test";

/**
 * A component object scopes its locators to one region of the page, so the same widget can
 * appear on several pages without duplicating selectors.
 */
export abstract class BaseComponent {
  constructor(
    protected readonly page: Page,
    protected readonly root: Locator,
  ) {}

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}
