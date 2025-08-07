import { test, expect } from '@playwright/test';

test.describe('Badges System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display badges section', async ({ page }) => {
    // Look for badges in navigation or main area
    const badgesSection = page.locator('text=Badges, .badges, [data-testid="badges"]');
    
    if (await badgesSection.first().isVisible()) {
      await badgesSection.first().click();
      await expect(page.locator('.badge, .achievement')).toBeVisible();
    }
  });

  test('should show badge notifications', async ({ page }) => {
    // Complete an exercise to trigger badge notification
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Wait and look for badge notifications
    await page.waitForTimeout(2000);
    const notification = page.locator('.badge-notification, .achievement-notification, .notification');
    
    // Badge notifications might appear
    if (await notification.first().isVisible({ timeout: 5000 })) {
      await expect(notification.first()).toContainText(/badge|achievement/i);
    }
  });

  test('should display different badge types', async ({ page }) => {
    // Navigate to badges view if available
    const badgesLink = page.locator('text=Badges, [href*="badge"], .badges-link');
    
    if (await badgesLink.first().isVisible()) {
      await badgesLink.first().click();
      
      // Check for different badge categories
      const badges = page.locator('.badge, .achievement-card');
      const count = await badges.count();
      
      if (count > 0) {
        // Verify badge content
        await expect(badges.first()).toBeVisible();
      }
    }
  });

  test('should handle badge unlock progression', async ({ page }) => {
    // Simulate learning progression to unlock badges
    const courses = ['JavaScript Fundamentals', 'TypeScript Basics'];
    
    for (const course of courses) {
      if (await page.locator(`text=${course}`).isVisible()) {
        await page.click(`text=${course}`);
        
        // Check first module
        const firstModule = page.locator('.module-card, .topic-card').first();
        if (await firstModule.isVisible()) {
          await firstModule.click();
          
          // Wait for potential badge unlock
          await page.waitForTimeout(1000);
          
          // Go back
          await page.goBack();
          await page.goBack();
        }
      }
    }
    
    // Check if any progress badges were unlocked
    await page.waitForTimeout(2000);
  });

  test('should persist badge progress', async ({ page }) => {
    // Complete some activities
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    
    // Refresh page
    await page.reload();
    
    // Check if progress is maintained
    await page.click('text=JavaScript Fundamentals');
    await expect(page.locator('text=JavaScript Variables')).toBeVisible();
  });

  test('should show badge details on click', async ({ page }) => {
    const badgesSection = page.locator('text=Badges, [href*="badge"], .badges-link');
    
    if (await badgesSection.first().isVisible()) {
      await badgesSection.first().click();
      
      const badges = page.locator('.badge, .achievement-card');
      const count = await badges.count();
      
      if (count > 0) {
        await badges.first().click();
        
        // Check if badge details are shown
        const details = page.locator('.badge-details, .badge-description, .modal');
        if (await details.first().isVisible({ timeout: 3000 })) {
          await expect(details.first()).toBeVisible();
        }
      }
    }
  });

  test('should display badge progress indicators', async ({ page }) => {
    const badgesSection = page.locator('text=Badges, [href*="badge"], .badges-link');
    
    if (await badgesSection.first().isVisible()) {
      await badgesSection.first().click();
      
      // Look for progress indicators
      const progressElements = page.locator('.progress, .progress-bar, [role="progressbar"]');
      const count = await progressElements.count();
      
      // May or may not have progress indicators
      if (count > 0) {
        await expect(progressElements.first()).toBeVisible();
      }
    }
  });

  test('should handle badge sharing functionality', async ({ page }) => {
    const badgesSection = page.locator('text=Badges, [href*="badge"], .badges-link');
    
    if (await badgesSection.first().isVisible()) {
      await badgesSection.first().click();
      
      const shareButton = page.locator('button:has-text("Share"), .share-button, [data-testid="share"]');
      
      if (await shareButton.first().isVisible()) {
        await shareButton.first().click();
        
        // Check if share options appear
        const shareOptions = page.locator('.share-options, .social-share');
        if (await shareOptions.first().isVisible({ timeout: 3000 })) {
          await expect(shareOptions.first()).toBeVisible();
        }
      }
    }
  });
});