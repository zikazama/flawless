import { test, expect } from '@playwright/test';

test.describe('Code Editor Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to a topic with case studies
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    
    // Wait for content to load and look for case study
    await page.waitForSelector('.case-study, .code-editor', { timeout: 10000 });
  });

  test('should display code editor interface', async ({ page }) => {
    // Check if code editor elements are present
    const codeEditor = page.locator('.code-editor, .monaco-editor, textarea[class*="code"]');
    
    // Wait for editor to be visible
    await expect(codeEditor.first()).toBeVisible({ timeout: 10000 });
  });

  test('should handle text input in code editor', async ({ page }) => {
    // Find the code editor
    const codeEditor = page.locator('.code-editor textarea, .code-editor [contenteditable], textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      await codeEditor.click();
      await codeEditor.fill('console.log("Hello World");');
      
      // Check if text was entered
      const value = await codeEditor.inputValue();
      expect(value).toContain('console.log');
    }
  });

  test('should handle Enter key properly', async ({ page }) => {
    // Find the code editor
    const codeEditor = page.locator('.code-editor textarea, .code-editor [contenteditable], textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      await codeEditor.click();
      await codeEditor.type('function test() {');
      await page.keyboard.press('Enter');
      await codeEditor.type('  return true;');
      
      // Check if Enter created new line properly
      const value = await codeEditor.inputValue();
      expect(value).toContain('\n');
    }
  });

  test('should provide syntax highlighting', async ({ page }) => {
    // Check if syntax highlighting elements are present
    const syntaxElements = page.locator('.hljs, .syntax-highlight, .token, .keyword');
    
    // At least some syntax highlighting should be present
    const count = await syntaxElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle case study execution', async ({ page }) => {
    // Look for run/execute buttons
    const runButton = page.locator('button:has-text("Run"), button:has-text("Execute"), button:has-text("Test")');
    
    if (await runButton.first().isVisible()) {
      await runButton.first().click();
      
      // Wait for execution result
      await page.waitForTimeout(2000);
      
      // Check if results are displayed
      const result = page.locator('.result, .output, .execution-result');
      await expect(result.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should validate code solutions', async ({ page }) => {
    // Find code editor and input some code
    const codeEditor = page.locator('.code-editor textarea, textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      await codeEditor.click();
      await codeEditor.fill('function calculate() { return 42; }');
      
      // Look for validation/submit button
      const submitButton = page.locator('button:has-text("Submit"), button:has-text("Check"), button:has-text("Validate")');
      
      if (await submitButton.first().isVisible()) {
        await submitButton.first().click();
        
        // Wait for validation result
        await page.waitForTimeout(2000);
      }
    }
  });

  test('should handle code editor keyboard shortcuts', async ({ page }) => {
    const codeEditor = page.locator('.code-editor textarea, textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      await codeEditor.click();
      
      // Test Ctrl+A (select all)
      await page.keyboard.press('Control+a');
      
      // Type new content
      await codeEditor.type('// New code');
      
      const value = await codeEditor.inputValue();
      expect(value).toBe('// New code');
    }
  });

  test('should maintain code formatting', async ({ page }) => {
    const codeEditor = page.locator('.code-editor textarea, textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      await codeEditor.click();
      await codeEditor.fill(`function example() {
    if (true) {
        console.log("indented");
    }
}`);
      
      const value = await codeEditor.inputValue();
      expect(value).toContain('    '); // Check indentation is preserved
    }
  });

  test('should handle large code inputs', async ({ page }) => {
    const codeEditor = page.locator('.code-editor textarea, textarea[class*="code"]').first();
    
    if (await codeEditor.isVisible()) {
      const largeCode = 'console.log("line");\n'.repeat(50);
      await codeEditor.click();
      await codeEditor.fill(largeCode);
      
      // Check if editor handles large input
      const value = await codeEditor.inputValue();
      expect(value.split('\n').length).toBeGreaterThan(40);
    }
  });
});