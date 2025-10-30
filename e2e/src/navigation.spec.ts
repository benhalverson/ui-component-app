import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('toolbar links navigate to pages', async ({ page }) => {
    await page.goto('/');

    // Home heading exists
    await expect(page.getByRole('heading', { level: 1 })).toContainText('My Awesome Component Library');

    // Navigate to Buttons
    await page.getByTestId('nav-buttons').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Button Components');

    // Navigate to Cards
    await page.getByTestId('nav-cards').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Card Components');

    // Navigate to Tables
    await page.getByTestId('nav-tables').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Table Component');
  });
});
