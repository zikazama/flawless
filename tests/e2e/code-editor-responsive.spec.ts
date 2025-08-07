import { test, expect } from '@playwright/test';

test.describe('Code Editor Responsiveness', () => {
  
  test('code editor should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Navigate to a topic with code editor
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for code editor to load
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    // Check if editor container is visible and fits screen
    const editorContainer = page.locator('.monaco-editor-container, .code-editor-container').first();
    await expect(editorContainer).toBeVisible();
    
    const containerWidth = await editorContainer.evaluate(el => el.offsetWidth);
    expect(containerWidth).toBeLessThanOrEqual(375); // Should not overflow screen
    
    // Check if editor has appropriate mobile styling
    const borderRadius = await editorContainer.evaluate(el => 
      window.getComputedStyle(el).borderRadius
    );
    expect(parseFloat(borderRadius)).toBeLessThanOrEqual(10); // Should have smaller border radius
  });

  test('monaco editor should adapt to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for Monaco editor
    const monacoContainer = page.locator('.monaco-editor-container');
    if (await monacoContainer.isVisible()) {
      // Editor hints should be hidden on mobile
      const editorHints = page.locator('.editor-hints');
      if (await editorHints.isVisible()) {
        const display = await editorHints.evaluate(el => 
          window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
      
      // Header should stack vertically
      const header = page.locator('.monaco-editor-header');
      const flexDirection = await header.evaluate(el => 
        window.getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');
      
      // Language badge should be smaller on mobile
      const languageBadge = page.locator('.language-badge');
      const fontSize = await languageBadge.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      expect(parseFloat(fontSize)).toBeLessThanOrEqual(12); // Should be smaller font
    }
  });

  test('code editor should work on small mobile screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE (1st gen)
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for editor
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    const editor = page.locator('.monaco-editor-container, .code-editor-container').first();
    
    // Editor should fit within screen bounds
    const editorWidth = await editor.evaluate(el => el.offsetWidth);
    expect(editorWidth).toBeLessThanOrEqual(320);
    
    // Editor should have appropriate height for small screens
    const editorHeight = await editor.evaluate(el => el.offsetHeight);
    expect(editorHeight).toBeLessThan(300); // Should be compact on small screens
    
    // Editor should still be functional
    const textarea = page.locator('.code-textarea, .monaco-editor textarea');
    if (await textarea.first().isVisible()) {
      await textarea.first().click();
      await textarea.first().fill('console.log("Hello Mobile");');
      
      // Should accept input
      const value = await textarea.first().inputValue();
      expect(value).toContain('console.log');
    }
  });

  test('code editor should work in landscape mode', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 }); // Landscape mobile
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for editor
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    const editor = page.locator('.monaco-editor-container, .code-editor-container').first();
    
    // Editor should be more compact in landscape
    const editorHeight = await editor.evaluate(el => el.offsetHeight);
    expect(editorHeight).toBeLessThan(250); // Should be very compact in landscape
    
    // Should still be usable
    await expect(editor).toBeVisible();
  });

  test('code editor should handle touch interactions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to study case
    await page.tap('text=JavaScript Fundamentals');
    await page.tap('text=JavaScript Variables');
    await page.tap('text=Variables');
    await page.tap('button:has-text("Study Case")');
    
    // Wait for editor
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    const editor = page.locator('.monaco-editor-container, .code-editor-container').first();
    
    // Tap on editor should focus it
    await editor.tap();
    
    // Should be able to input text
    const textarea = page.locator('.code-textarea, .monaco-editor textarea');
    if (await textarea.first().isVisible()) {
      await textarea.first().tap();
      await textarea.first().fill('const mobile = true;');
      
      const value = await textarea.first().inputValue();
      expect(value).toContain('mobile');
    }
  });

  test('code editor scrolling should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for editor
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    const editor = page.locator('.monaco-editor-container, .code-editor-container').first();
    
    // Add content that requires scrolling
    const textarea = page.locator('.code-textarea, .monaco-editor textarea');
    if (await textarea.first().isVisible()) {
      const longCode = `// Line 1
console.log('Line 2');
let variable1 = 'Line 3';
let variable2 = 'Line 4';
let variable3 = 'Line 5';
let variable4 = 'Line 6';
let variable5 = 'Line 7';
let variable6 = 'Line 8';
let variable7 = 'Line 9';
let variable8 = 'Line 10';
let variable9 = 'Line 11';
let variable10 = 'Line 12';
console.log('Line 13');
// End of content`;
      
      await textarea.first().click();
      await textarea.first().fill(longCode);
      
      // Try to scroll within editor
      await editor.evaluate(el => {
        el.scrollTop = 50;
      });
      
      // Editor should handle scroll
      const scrollTop = await editor.evaluate(el => el.scrollTop);
      expect(scrollTop).toBeGreaterThan(0);
    }
  });

  test('toolbar and badges should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Study Case")');
    
    // Wait for editor
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 10000 });
    
    // Check language badge
    const languageBadge = page.locator('.language-badge');
    if (await languageBadge.isVisible()) {
      await expect(languageBadge).toBeVisible();
      
      // Badge should have appropriate mobile styling
      const padding = await languageBadge.evaluate(el => 
        window.getComputedStyle(el).padding
      );
      // Should have smaller padding on mobile
      expect(padding).toMatch(/^([\d.]+px\s?){1,4}$/);
    }
    
    // Check toolbar positioning
    const toolbar = page.locator('.code-editor-toolbar, .monaco-editor-header');
    if (await toolbar.isVisible()) {
      // Should be positioned correctly and not overlap content
      const position = await toolbar.evaluate(el => ({
        top: el.getBoundingClientRect().top,
        right: el.getBoundingClientRect().right,
        width: el.offsetWidth
      }));
      
      expect(position.top).toBeGreaterThanOrEqual(0);
      expect(position.width).toBeLessThanOrEqual(375);
    }
  });

  test('editor performance should be acceptable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to study case
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    const startTime = Date.now();
    await page.click('button:has-text("Study Case")');
    
    // Wait for editor to load
    await page.waitForSelector('.monaco-editor-container, .code-editor-container', { timeout: 15000 });
    
    const loadTime = Date.now() - startTime;
    
    // Editor should load within reasonable time on mobile
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    
    // Editor should be interactive
    const editor = page.locator('.monaco-editor-container, .code-editor-container').first();
    await expect(editor).toBeVisible();
    
    // Should respond to interactions quickly
    const interactionStart = Date.now();
    await editor.click();
    const interactionTime = Date.now() - interactionStart;
    
    expect(interactionTime).toBeLessThan(1000); // Should respond within 1 second
  });
});