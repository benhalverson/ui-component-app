import { test, expect } from '@playwright/test';

test('home has hero heading', async ({ page }) => {
  await page.goto('/');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toContainText('My Awesome Component Library');
});
