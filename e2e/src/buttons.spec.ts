import { test, expect } from '@playwright/test';

test.describe('buttons page', () => {
  test('clicking Save shows success modal and can be closed', async ({ page }) => {
    await page.goto('/buttons');

    // Click the Save button
    await page.getByTestId('btn-save').click();

    // Modal should appear with role dialog and contain the success message
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Changes saved!');

    // Confirm/close via OK button
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(dialog).toBeHidden();
  });
});
