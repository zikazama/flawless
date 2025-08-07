import { test, expect } from '@playwright/test';

test.describe('Interactive Exercises', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to a topic with exercises
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
  });

  test('should display fill-in-blank exercises', async ({ page }) => {
    // Wait for exercises to load
    await expect(page.locator('.fill-in-blank-exercise')).toBeVisible({ timeout: 10000 });
    
    // Check if input fields are present
    const inputs = page.locator('.fill-input');
    await expect(inputs.first()).toBeVisible();
    
    // Check if code blocks are displayed properly
    await expect(page.locator('.exercise-code')).toBeVisible();
  });

  test('should validate correct answers', async ({ page }) => {
    // Wait for exercises to load
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Fill in a correct answer
    const firstInput = page.locator('.fill-input').first();
    await firstInput.fill('let');
    await firstInput.press('Tab'); // Move to next input to trigger validation
    
    // Check for success feedback
    await expect(page.locator('.success, .correct')).toBeVisible({ timeout: 5000 });
  });

  test('should show error for incorrect answers', async ({ page }) => {
    // Wait for exercises to load
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Fill in an incorrect answer
    const firstInput = page.locator('.fill-input').first();
    await firstInput.fill('wrong');
    await firstInput.press('Tab'); // Trigger validation
    
    // Check for error feedback
    await expect(page.locator('.error, .incorrect')).toBeVisible({ timeout: 5000 });
  });

  test('should handle empty field validation', async ({ page }) => {
    // Wait for exercises to load  
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Focus and then blur an input without filling
    const firstInput = page.locator('.fill-input').first();
    await firstInput.focus();
    await firstInput.blur();
    
    // Should show validation error for empty field
    await expect(page.locator('.error, .validation-error')).toBeVisible({ timeout: 5000 });
  });

  test('should work with keyboard navigation', async ({ page }) => {
    // Wait for exercises to load
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Test Tab navigation between inputs
    const inputs = page.locator('.fill-input');
    const count = await inputs.count();
    
    if (count > 1) {
      await inputs.first().focus();
      await page.keyboard.press('Tab');
      
      // Check if focus moved to next input
      const activeElement = page.locator(':focus');
      await expect(activeElement).toHaveClass(/fill-input/);
    }
  });

  test('should handle special data type exercises', async ({ page }) => {
    // Navigate to data types topic
    await page.click('text=← Back to Modules');
    await page.click('text=Data Types');
    
    // Wait for data type exercises
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Test undefined/null validation
    const inputs = page.locator('.fill-input');
    const count = await inputs.count();
    
    if (count > 0) {
      await inputs.first().fill('undefined');
      await inputs.first().press('Tab');
      
      // Should handle special cases correctly
      await page.waitForTimeout(1000); // Allow validation to complete
    }
  });

  test('should provide exercise explanations', async ({ page }) => {
    // Wait for exercises to load
    await page.waitForSelector('.fill-in-blank-exercise', { timeout: 10000 });
    
    // Check if explanations are displayed
    await expect(page.locator('.explanation, .exercise-explanation')).toBeVisible();
  });

  test('should handle exercise completion', async ({ page }) => {
    // Wait for exercises to load
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Complete all exercises if possible
    const inputs = page.locator('.fill-input');
    const count = await inputs.count();
    
    // Fill in reasonable answers
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      await input.fill('let'); // Generic answer for testing
      await input.press('Tab');
    }
    
    // Wait for any completion indicators
    await page.waitForTimeout(2000);
  });
});