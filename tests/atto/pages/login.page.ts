import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly path = "/web/index.php/auth/login";

  readonly usernameInput: Locator = this.page.getByPlaceholder("Username");
  readonly passwordInput: Locator = this.page.getByPlaceholder("Password");
  private readonly loginButton: Locator = this.page.getByRole("button", { name: "Login" });
  readonly requiredError: Locator = this.page.getByText("Required");

  constructor(page: Page) {
    super(page);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submitLogin();
  }

  get loginButtonLocator(): Locator {
    return this.loginButton;
  }

  readonly usernameField: Locator = this.page.getByPlaceholder("Username");

  readonly passwordField: Locator = this.page.getByPlaceholder("Password");
}
