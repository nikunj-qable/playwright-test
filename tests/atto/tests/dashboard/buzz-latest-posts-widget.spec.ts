import { test, expect } from '../../fixtures/test.fixture';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('TC-Buzz-03: Buzz Latest Posts Widget Displays Posts with Correct Author', () => {
  test('dashboard Buzz Latest Posts widget shows posts authored by John Mike Doe with correct timestamps', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.open();
    await loginPage.signIn('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);

    // Act — wait for the login redirect to settle on the dashboard URL naturally
    await page.waitForURL(/dashboard\/index/);

    // Assert — URL contains 'dashboard/index' after login
    await expect(page).toHaveURL(/dashboard\/index/);

    // Assert — Page text contains 'Dashboard' heading
    await expect(dashboardPage.dashboardHeading).toBeVisible();

    // Assert — Page text contains 'Buzz Latest Posts' widget title
    await expect(dashboardPage.buzzWidgetTitle).toBeVisible();

    // Assert — Buzz widget container is present in the DOM
    await expect(dashboardPage.buzzWidgetContainer).toBeAttached();

    // Assert — Page text contains 'John Mike Doe' as the post author
    await expect(dashboardPage.buzzAuthorName.first()).toBeVisible();

    // Assert — Page text contains '2026-23-11' as the post timestamp date
    await expect(dashboardPage.buzzPostTimestamp.first()).toBeVisible();

    // Assert — Buzz widget post dividers have a count >= 1 (live site shows 2 at time of exploration)
    const dividerCount = await dashboardPage.buzzPostDividers.count();
    expect(dividerCount).toBeGreaterThanOrEqual(1);

    // Assert (DECISIVE) — Every post in the widget is authored by 'John Mike Doe':
    // the number of author name occurrences equals the number of post dividers,
    // proving that all visible posts carry the correct author, not merely one of them.
    const authorCount = await dashboardPage.buzzAuthorName.count();
    expect(authorCount).toEqual(dividerCount);

    // Assert — Post timestamps are present for every post:
    // the number of timestamp occurrences equals the number of post dividers.
    const timestampCount = await dashboardPage.buzzPostTimestamp.count();
    expect(timestampCount).toEqual(dividerCount);
  });
});
