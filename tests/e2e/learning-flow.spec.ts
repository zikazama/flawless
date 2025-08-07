import { test, expect } from '@playwright/test';

test.describe('Learning Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate through JavaScript course modules', async ({ page }) => {
    // Navigate to JavaScript course
    await page.click('text=JavaScript Fundamentals');
    await expect(page).toHaveURL(/.*javascript/);
    
    // Check modules are displayed
    await expect(page.locator('text=JavaScript Strict Mode')).toBeVisible();
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
    
    // Navigate to first module
    await page.click('text=JavaScript Strict Mode');
    await expect(page.locator('text=Strict Mode')).toBeVisible();
  });

  test('should navigate through TypeScript course modules', async ({ page }) => {
    // Navigate to TypeScript course  
    await page.click('text=TypeScript Basics');
    await expect(page).toHaveURL(/.*typescript/);
    
    // Check modules are displayed
    await expect(page.locator('text=TypeScript Basics')).toBeVisible();
    await expect(page.locator('text=TypeScript Advanced Types')).toBeVisible();
    
    // Navigate to first module
    await page.click('text=TypeScript Basics');
    await expect(page.locator('h2')).toContainText('TypeScript Basics');
  });

  test('should show topic content when clicked', async ({ page }) => {
    // Navigate to a specific topic
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Check topic content is displayed
    await expect(page.locator('.topic-content')).toBeVisible();
    await expect(page.locator('text=Variable adalah container')).toBeVisible();
  });

  test('should handle module back navigation', async ({ page }) => {
    // Navigate deep into content
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Use back navigation
    await page.click('text=← Back to Modules');
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
    
    // Back to course list
    await page.click('text=← Back to Courses');
    await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
  });

  test('should display progress indicators', async ({ page }) => {
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    
    // Check if progress elements are present
    const progressElements = page.locator('.progress, .completion-status');
    await expect(progressElements.first()).toBeVisible({ timeout: 10000 });
  });
});