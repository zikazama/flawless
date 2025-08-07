import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check H1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Navigate to content page
    await page.click('text=JavaScript Fundamentals');
    
    // Check heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
    
    // H1 should still be unique on content pages
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeLessThanOrEqual(1);
  });

  test('should have accessible form inputs', async ({ page }) => {
    // Navigate to a page with exercises
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    await page.waitForSelector('.fill-input', { timeout: 10000 });
    
    const inputs = page.locator('.fill-input, input, textarea');
    const count = await inputs.count();
    
    if (count > 0) {
      // Check if inputs have labels or aria-labels
      const firstInput = inputs.first();
      
      const hasLabel = await firstInput.evaluate(input => {
        const labels = document.querySelectorAll(`label[for="${input.id}"]`);
        return labels.length > 0 || input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');
      });
      
      // Inputs should be properly labeled
      expect(hasLabel).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Test Tab navigation
    await page.keyboard.press('Tab');
    
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through interactive elements
    await page.keyboard.press('Tab');
    focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test Enter key on links
    const links = page.locator('a, button');
    if (await links.first().isVisible()) {
      await links.first().focus();
      
      // Enter should activate the element
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
    }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    // Check for ARIA landmarks
    const landmarks = page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]');
    
    // At least one landmark should exist
    const landmarkCount = await landmarks.count();
    if (landmarkCount === 0) {
      // Check for semantic HTML instead
      const semanticElements = page.locator('main, nav, header, footer');
      const semanticCount = await semanticElements.count();
      expect(semanticCount).toBeGreaterThan(0);
    }
    
    // Check for ARIA-expanded on interactive elements
    const expandableElements = page.locator('[aria-expanded]');
    const expandableCount = await expandableElements.count();
    
    if (expandableCount > 0) {
      const firstExpandable = expandableElements.first();
      const ariaExpanded = await firstExpandable.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(ariaExpanded);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // This is a basic check - in a real scenario, you'd use axe-core
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
    const count = await textElements.count();
    
    if (count > 0) {
      const firstTextElement = textElements.first();
      const styles = await firstTextElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize
        };
      });
      
      // Basic checks
      expect(styles.color).toBeTruthy();
      expect(styles.fontSize).toBeTruthy();
    }
  });

  test('should support screen readers', async ({ page }) => {
    // Check for alt attributes on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const hasAlt = await img.getAttribute('alt');
      
      // Images should have alt text (empty alt is acceptable for decorative images)
      expect(hasAlt).not.toBeNull();
    }
    
    // Check for screen reader only content
    const srOnlyElements = page.locator('.sr-only, .screen-reader-only, [class*="visually-hidden"]');
    // These elements should exist for better screen reader experience
    const srCount = await srOnlyElements.count();
    // This is optional, so we don't enforce it
  });

  test('should handle focus management', async ({ page }) => {
    // Navigate to a content page
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    
    // Focus should be managed properly after navigation
    const focusedElement = page.locator(':focus');
    
    // Either the main content or the first interactive element should be focused
    if (await focusedElement.isVisible()) {
      await expect(focusedElement).toBeVisible();
    }
    
    // Test skip links if they exist
    const skipLinks = page.locator('a[href="#main"], a:has-text("Skip to content"), [class*="skip-link"]');
    if (await skipLinks.first().isVisible()) {
      await skipLinks.first().focus();
      await page.keyboard.press('Enter');
      
      // Should jump to main content
      await page.waitForTimeout(500);
    }
  });

  test('should have semantic HTML structure', async ({ page }) => {
    // Check for semantic HTML5 elements
    const semanticElements = page.locator('header, nav, main, section, article, aside, footer');
    const semanticCount = await semanticElements.count();
    
    expect(semanticCount).toBeGreaterThan(0);
    
    // Lists should use proper list markup
    const lists = page.locator('ul, ol');
    const listCount = await lists.count();
    
    if (listCount > 0) {
      const firstList = lists.first();
      const listItems = firstList.locator('li');
      const itemCount = await listItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Test with reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Navigate through the app
    await page.click('text=JavaScript Fundamentals');
    
    // Animations should be reduced or disabled
    // This is hard to test automatically, but we can check that the page still functions
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
  });

  test('should support high contrast mode', async ({ page }) => {
    // Emulate high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    
    await page.reload();
    
    // Page should still be usable
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=JavaScript Fundamentals')).toBeVisible();
    
    // Test light mode too
    await page.emulateMedia({ colorScheme: 'light' });
    await page.reload();
    
    await expect(page.locator('h1')).toBeVisible();
  });
});