import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Learning Platform/);
    await expect(page.locator('h1')).toContainText('JavaScript & TypeScript Learning Platform');
  });

  test('should show course navigation', async ({ page }) => {
    await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
    await expect(page.locator('text=TypeScript Basics')).toBeVisible();
  });

  test('should display author information', async ({ page }) => {
    await expect(page.locator('text=About the Author')).toBeVisible();
    await expect(page.locator('text=Fauzi')).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    await page.click('text=JavaScript Fundamentals');
    await expect(page).toHaveURL(/.*javascript/);
    
    await page.goBack();
    await page.click('text=TypeScript Basics');
    await expect(page).toHaveURL(/.*typescript/);
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.locator('.course-cards')).toBeVisible();
      // Mobile-specific layout checks
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThan(768);
    }
  });
});