import { test, expect } from '@playwright/test';

test.describe('tables page', () => {
  test('users table sorts by Name and filters by text', async ({ page }) => {
    await page.goto('/tables');

    // Ensure the page header is present
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Table Component');

    // The Users Table card title
    await expect(page.getByText('Users Table')).toBeVisible();

    // Scope to the Users Table card container
    const usersSection = page.getByTestId('users-table');
    const usersTable = usersSection.locator('table[mat-table]').first();
    await expect(usersTable).toBeVisible();

    // Before sorting, the first row should contain John Doe (Name column is the 2nd cell)
    const firstNameCell = usersTable.locator('tbody tr:first-child td:nth-child(2)');
    await expect(firstNameCell).toContainText('John Doe');

    // Click the Name header to sort ascending
    await usersSection.getByRole('columnheader', { name: 'Name' }).click();

    // After sorting asc, the first row should be Alice Williams
    await expect(usersTable.locator('tbody tr:first-child td:nth-child(2)')).toHaveText(/Alice Williams/i);

    // Filter to a specific user
    const filterInput = usersSection.locator('input.lib-table-filter-input');
    await filterInput.fill('alice');

    // Expect only Alice row to remain in view
    const rows = usersTable.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first().locator('td').nth(1)).toHaveText(/Alice Williams/i);
  });
});
