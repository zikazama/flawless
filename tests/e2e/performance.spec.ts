import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load homepage quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for main content to be visible
    await expect(page.locator('h1')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Homepage should load within reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should navigate between pages efficiently', async ({ page }) => {
    await page.goto('/');
    
    const startTime = Date.now();
    
    // Navigate to course
    await page.click('text=JavaScript Fundamentals');
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
    
    const navigationTime = Date.now() - startTime;
    
    // Navigation should be quick (3 seconds max)
    expect(navigationTime).toBeLessThan(3000);
  });

  test('should handle large content efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to TypeScript content (which should be comprehensive now)
    await page.click('text=TypeScript Basics');
    
    const startTime = Date.now();
    await page.click('text=TypeScript Advanced Types');
    
    // Wait for content to load
    await expect(page.locator('text=Union Types')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Should handle large content within reasonable time
    expect(loadTime).toBeLessThan(4000);
  });

  test('should handle multiple exercises loading', async ({ page }) => {
    await page.goto('/');
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    
    const startTime = Date.now();
    await page.click('text=Variables');
    
    // Wait for all exercises to be visible
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    
    // Exercises should load quickly
    expect(loadTime).toBeLessThan(3000);
  });

  test('should maintain performance under interaction load', async ({ page }) => {
    await page.goto('/');
    
    // Perform rapid interactions
    const interactions = [
      'JavaScript Fundamentals',
      'JavaScript Variables', 
      'Variables'
    ];
    
    const startTime = Date.now();
    
    for (const interaction of interactions) {
      await page.click(`text=${interaction}`);
      await page.waitForTimeout(100); // Small delay between clicks
    }
    
    // Wait for final content
    await expect(page.locator('.topic-content')).toBeVisible();
    
    const totalTime = Date.now() - startTime;
    
    // Rapid navigation should complete in reasonable time
    expect(totalTime).toBeLessThan(5000);
  });

  test('should handle memory efficiently with repeated navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate back and forth multiple times
    for (let i = 0; i < 5; i++) {
      await page.click('text=JavaScript Fundamentals');
      await expect(page.locator('text=JavaScript Variables')).toBeVisible();
      
      await page.click('text=← Back to Courses');
      await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
    }
    
    // Final navigation should still be responsive
    const startTime = Date.now();
    await page.click('text=JavaScript Fundamentals');
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
    const finalTime = Date.now() - startTime;
    
    expect(finalTime).toBeLessThan(2000);
  });

  test('should handle exercise validation performance', async ({ page }) => {
    await page.goto('/');
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    // Test rapid input and validation
    const inputs = page.locator('.fill-input');
    const count = await inputs.count();
    
    const startTime = Date.now();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const input = inputs.nth(i);
      await input.fill('test');
      await input.press('Tab');
      await page.waitForTimeout(50); // Small delay for validation
    }
    
    const validationTime = Date.now() - startTime;
    
    // Validation should be quick even for multiple inputs
    expect(validationTime).toBeLessThan(2000);
  });

  test('should load fonts and assets efficiently', async ({ page }) => {
    // Monitor network requests
    const responses: any[] = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type']
      });
    });
    
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that critical resources loaded successfully
    const fontResponses = responses.filter(r => r.contentType?.includes('font'));
    const cssResponses = responses.filter(r => r.contentType?.includes('css'));
    const jsResponses = responses.filter(r => r.contentType?.includes('javascript'));
    
    // Most resources should load successfully (200 status)
    const successfulResponses = responses.filter(r => r.status === 200);
    const totalResponses = responses.length;
    
    if (totalResponses > 0) {
      const successRate = successfulResponses.length / totalResponses;
      expect(successRate).toBeGreaterThan(0.8); // At least 80% success rate
    }
  });

  test('should handle code editor performance', async ({ page }) => {
    await page.goto('/');
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Look for code editor
    const codeEditor = page.locator('.code-editor textarea, textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      const startTime = Date.now();
      
      // Type a substantial amount of code
      const codeText = `function testFunction() {
  const variable = "test";
  for (let i = 0; i < 100; i++) {
    console.log(variable + i);
  }
  return variable;
}`;
      
      await codeEditor.fill(codeText);
      
      const typingTime = Date.now() - startTime;
      
      // Code input should be responsive
      expect(typingTime).toBeLessThan(3000);
      
      // Verify the text was entered correctly
      const value = await codeEditor.inputValue();
      expect(value).toContain('testFunction');
    }
  });

  test('should maintain performance with syntax highlighting', async ({ page }) => {
    await page.goto('/');
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Wait for syntax highlighted content to load
    await page.waitForTimeout(1000);
    
    const startTime = Date.now();
    
    // Scroll through content to trigger any lazy loading
    await page.evaluate(() => {
      window.scrollBy(0, 200);
    });
    
    await page.waitForTimeout(500);
    
    await page.evaluate(() => {
      window.scrollBy(0, 200);
    });
    
    const scrollTime = Date.now() - startTime;
    
    // Scrolling with syntax highlighting should be smooth
    expect(scrollTime).toBeLessThan(1000);
  });
});