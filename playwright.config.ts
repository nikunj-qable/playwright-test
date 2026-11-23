import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL ?? "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: BASE_URL,
    // Locator priority starts here: getByTestId reads this attribute.
    testIdAttribute: "data-testid",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    // Authenticates once, then every other project reuses the saved storage state.
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },
  ],
});
