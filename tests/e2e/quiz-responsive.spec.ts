import { test, expect } from '@playwright/test';

test.describe('Quiz Responsiveness', () => {
  
  test('quiz instructions should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Navigate to a quiz
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    
    // Check quiz instructions layout
    await expect(page.locator('.quiz-instructions')).toBeVisible();
    await expect(page.locator('.instructions-header h2')).toBeVisible();
    
    // Instructions should stack vertically on mobile
    const instructionsContent = page.locator('.instructions-content');
    if (await instructionsContent.isVisible()) {
      const gridColumns = await instructionsContent.evaluate(el => 
        window.getComputedStyle(el).gridTemplateColumns
      );
      expect(gridColumns).toBe('1fr'); // Should be single column on mobile
    }
    
    // Start button should be full width on mobile
    const startButton = page.locator('.start-quiz-button');
    await expect(startButton).toBeVisible();
    
    const buttonWidth = await startButton.evaluate(el => el.offsetWidth);
    const containerWidth = await page.locator('.quiz-container').evaluate(el => el.offsetWidth);
    
    // Button should be close to container width (accounting for padding)
    expect(buttonWidth / containerWidth).toBeGreaterThan(0.7);
  });

  test('quiz question layout should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to quiz and start it
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');  
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    await page.click('.start-quiz-button');
    
    // Check quiz header layout
    const quizHeader = page.locator('.quiz-header');
    await expect(quizHeader).toBeVisible();
    
    // Header should stack vertically on mobile
    const flexDirection = await quizHeader.evaluate(el => 
      window.getComputedStyle(el).flexDirection
    );
    expect(flexDirection).toBe('column');
    
    // Timer should be centered
    const timer = page.locator('.timer');
    await expect(timer).toBeVisible();
    
    // Question should be readable
    const question = page.locator('.question');
    await expect(question).toBeVisible();
    
    const fontSize = await question.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(16); // Minimum readable size
  });

  test('quiz options should be touch-friendly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to quiz and start it  
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    await page.click('.start-quiz-button');
    
    // Check option buttons
    const optionButtons = page.locator('.option-button');
    await expect(optionButtons.first()).toBeVisible();
    
    // Options should have adequate height for touch
    const firstOption = optionButtons.first();
    const buttonHeight = await firstOption.evaluate(el => el.offsetHeight);
    expect(buttonHeight).toBeGreaterThanOrEqual(44); // iOS minimum touch target
    
    // Options should stack vertically with proper spacing
    const optionsContainer = page.locator('.options');
    const gap = await optionsContainer.evaluate(el => 
      window.getComputedStyle(el).gap
    );
    expect(parseFloat(gap)).toBeGreaterThanOrEqual(16); // Adequate spacing
  });

  test('quiz completion screen should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to quiz and complete it
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    await page.click('.start-quiz-button');
    
    // Answer all questions (selecting first option for speed)
    for (let i = 0; i < 5; i++) {
      await page.click('.option-button >> nth=0');
      await page.waitForSelector('.next-button', { timeout: 5000 });
      const nextButton = page.locator('.next-button');
      if (await nextButton.isVisible()) {
        await nextButton.click();
      }
    }
    
    // Wait for quiz completion
    await page.waitForSelector('.quiz-complete', { timeout: 10000 });
    
    // Check completion screen layout
    await expect(page.locator('.quiz-complete')).toBeVisible();
    await expect(page.locator('.final-score')).toBeVisible();
    
    // Score value should be visible and readable
    const scoreValue = page.locator('.score-value');
    await expect(scoreValue).toBeVisible();
    
    const scoreFontSize = await scoreValue.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    expect(parseFloat(scoreFontSize)).toBeGreaterThanOrEqual(24);
    
    // Quiz summary should be properly formatted
    const summary = page.locator('.quiz-summary');
    if (await summary.isVisible()) {
      const summaryItems = page.locator('.quiz-summary .summary-item');
      if (await summaryItems.first().isVisible()) {
        // Items should stack on mobile
        const itemDirection = await summaryItems.first().evaluate(el => 
          window.getComputedStyle(el).flexDirection
        );
        expect(itemDirection).toBe('column');
      }
    }
  });

  test('quiz should work on very small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE (1st gen)
    await page.goto('/');
    
    // Navigate to quiz
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    
    // Quiz container should fit screen
    const quizContainer = page.locator('.quiz-container');
    await expect(quizContainer).toBeVisible();
    
    const containerWidth = await quizContainer.evaluate(el => el.offsetWidth);
    expect(containerWidth).toBeLessThanOrEqual(320); // Should not overflow
    
    // Start button should be accessible
    const startButton = page.locator('.start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();
    
    // Quiz should still function
    await expect(page.locator('.question')).toBeVisible();
    await expect(page.locator('.option-button')).toBeVisible();
    await expect(page.locator('.timer')).toBeVisible();
  });

  test('quiz should work in landscape mode', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 }); // Landscape mobile
    await page.goto('/');
    
    // Navigate to quiz
    await page.click('text=JavaScript Fundamentals');
    await page.click('text=JavaScript Variables');
    await page.click('text=Variables');
    await page.click('button:has-text("Quiz")');
    
    // Instructions should be more compact in landscape
    const instructionsHeader = page.locator('.instructions-header h2');
    if (await instructionsHeader.isVisible()) {
      const fontSize = await instructionsHeader.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeLessThanOrEqual(32); // Smaller than portrait
    }
    
    await page.click('.start-quiz-button');
    
    // Quiz should still be usable in landscape
    await expect(page.locator('.question')).toBeVisible();
    await expect(page.locator('.option-button')).toBeVisible();
    
    // Content should fit within viewport height
    const questionSection = page.locator('.question-section');
    const sectionHeight = await questionSection.evaluate(el => el.offsetHeight);
    expect(sectionHeight).toBeLessThan(300); // Should be compact in landscape
  });

  test('touch interactions should work properly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to quiz
    await page.tap('text=JavaScript Fundamentals');
    await page.tap('text=JavaScript Variables');
    await page.tap('text=Variables');
    await page.tap('button:has-text("Quiz")');
    await page.tap('.start-quiz-button');
    
    // Test tap on quiz options
    const firstOption = page.locator('.option-button').first();
    await expect(firstOption).toBeVisible();
    
    // Tap should work
    await firstOption.tap();
    
    // Should show result
    await expect(page.locator('.explanation-box')).toBeVisible();
    
    // Next button should be tappable
    const nextButton = page.locator('.next-button');
    await expect(nextButton).toBeVisible();
    await nextButton.tap();
    
    // Should proceed to next question or completion
    await page.waitForTimeout(1000);
    const isNextQuestion = await page.locator('.question').isVisible();
    const isComplete = await page.locator('.quiz-complete').isVisible();
    expect(isNextQuestion || isComplete).toBe(true);
  });
});