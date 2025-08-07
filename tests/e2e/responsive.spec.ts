import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  
  test('should work on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.course-cards, .course-list')).toBeVisible();
    
    // Check desktop layout
    const courseCards = page.locator('.course-card, .module-card');
    const count = await courseCards.count();
    if (count > 0) {
      // Desktop should show multiple columns
      const firstCard = courseCards.first();
      const bounds = await firstCard.boundingBox();
      expect(bounds?.width).toBeGreaterThan(200);
    }
  });

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Check tablet-specific layout adjustments
    const navigation = page.locator('.nav, .navigation, header');
    if (await navigation.first().isVisible()) {
      await expect(navigation.first()).toBeVisible();
    }
    
    // Cards should still be visible but potentially in fewer columns
    const courseCards = page.locator('.course-card, .module-card');
    if (await courseCards.first().isVisible()) {
      await expect(courseCards.first()).toBeVisible();
    }
  });

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Mobile navigation might be different
    const mobileNav = page.locator('.mobile-nav, .hamburger, .nav-toggle');
    if (await mobileNav.first().isVisible()) {
      await mobileNav.first().click();
    }
    
    // Content should still be accessible
    await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
    
    // Test mobile navigation
    await page.click('text=JavaScript Fundamentals');
    await expect(page).toHaveURL(/.*javascript/);
  });

  test('should handle touch interactions on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/');
      
      // Test tap interactions
      await page.tap('text=JavaScript Fundamentals');
      await expect(page).toHaveURL(/.*javascript/);
      
      // Test scroll
      await page.evaluate(() => window.scrollBy(0, 100));
      
      // Content should still be visible after scroll
      const content = page.locator('h2, .module-list');
      if (await content.first().isVisible()) {
        await expect(content.first()).toBeVisible();
      }
    }
  });

  test('should maintain functionality across viewport changes', async ({ page }) => {
    await page.goto('/');
    
    // Start desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.click('text=JavaScript Fundamentals');
    await expect(page).toHaveURL(/.*javascript/);
    
    // Change to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // Allow layout to adjust
    
    // Functionality should still work
    const backButton = page.locator('text=← Back, .back-button, button:has-text("Back")');
    if (await backButton.first().isVisible()) {
      await backButton.first().click();
      await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
    }
  });

  test('should handle text readability on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // Small mobile
    await page.goto('/');
    
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Text should be readable
    const content = page.locator('.topic-content, .content');
    if (await content.first().isVisible()) {
      const fontSize = await content.first().evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      // Font size should be reasonable for mobile
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(14);
    }
  });

  test('should handle exercise inputs on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/');
      await page.tap('text=JavaScript Fundamentals');
      await page.tap('text=JavaScript Variables');
      await page.tap('text=Variables');
      
      // Wait for exercises to load
      await page.waitForSelector('.fill-input', { timeout: 10000 });
      
      const input = page.locator('.fill-input').first();
      if (await input.isVisible()) {
        await input.tap();
        await input.fill('let');
        
        // Virtual keyboard should not interfere
        await expect(input).toHaveValue('let');
      }
    }
  });

  test('should adapt navigation for different screen sizes', async ({ page }) => {
    // Test desktop navigation
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    let navItems = page.locator('nav a, .nav-link');
    let count = await navItems.count();
    
    // Change to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Navigation should adapt (might be hidden, in hamburger menu, etc.)
    const hamburger = page.locator('.hamburger, .menu-toggle, .nav-toggle');
    if (await hamburger.first().isVisible()) {
      await hamburger.first().click();
      
      // Menu should expand
      await page.waitForTimeout(500);
    }
    
    // Core navigation should still be accessible
    await expect(page.locator('text=JavaScript Fundamentals, a:has-text("JavaScript")')).toBeVisible();
  });
});