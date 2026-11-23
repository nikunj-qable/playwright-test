import type { Page } from "@playwright/test";

/**
 * Shared behaviour for every page object. Page objects expose intent ("submit the form"),
 * never raw locators — that boundary is what stops a UI change from touching every spec.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Path relative to baseURL, e.g. "/login". */
  protected abstract readonly path: string;

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}
