# Learning Platform Test Suite

This directory contains comprehensive end-to-end tests for the JavaScript & TypeScript Learning Platform using Playwright.

## Test Coverage

### 📋 Test Categories

1. **Homepage Tests** (`homepage.spec.ts`)
   - Title and heading validation
   - Course navigation functionality
   - Author information display
   - Responsive layout checks

2. **Learning Flow Tests** (`learning-flow.spec.ts`)
   - Course and module navigation
   - Topic content display
   - Back navigation functionality
   - Progress indicators

3. **Interactive Exercises Tests** (`exercises.spec.ts`)
   - Fill-in-blank exercise display
   - Answer validation (correct/incorrect)
   - Empty field validation
   - Keyboard navigation
   - Special data type handling (undefined/null)
   - Exercise explanations

4. **Code Editor Tests** (`code-editor.spec.ts`)
   - Code editor interface display
   - Text input and editing
   - Syntax highlighting
   - Case study execution
   - Keyboard shortcuts
   - Large code input handling

5. **Badges System Tests** (`badges.spec.ts`)
   - Badge display and notifications
   - Progress tracking
   - Badge details and interactions
   - Achievement unlocking

6. **Responsive Design Tests** (`responsive.spec.ts`)
   - Desktop layout (1920x1080)
   - Tablet layout (768x1024)
   - Mobile layout (375x667)
   - Touch interactions
   - Viewport adaptation
   - Text readability

7. **Accessibility Tests** (`accessibility.spec.ts`)
   - Heading hierarchy
   - Form input accessibility
   - Keyboard navigation
   - ARIA attributes
   - Screen reader support
   - Semantic HTML structure
   - Color contrast basics

8. **Performance Tests** (`performance.spec.ts`)
   - Page load times
   - Navigation efficiency
   - Large content handling
   - Memory management
   - Asset loading optimization

## 🚀 Running Tests

### Prerequisites
```bash
npm install
npx playwright install
```

### Test Commands

```bash
# Run all tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug

# Show test report
npm run test:report
```

### Run Specific Test Files
```bash
# Run only homepage tests
npx playwright test homepage

# Run only exercises tests
npx playwright test exercises

# Run accessibility tests
npx playwright test accessibility
```

### Run Tests on Specific Browsers
```bash
# Run on Chrome only
npx playwright test --project=chromium

# Run on Firefox only
npx playwright test --project=firefox

# Run on mobile Chrome
npx playwright test --project=mobile-chrome
```

## 🎯 Test Scenarios

### Critical User Journeys

1. **New User Experience**
   - Homepage → Course Selection → Module Navigation → Topic Learning
   - Exercise completion and validation
   - Progress tracking

2. **Learning Progression**
   - JavaScript fundamentals mastery
   - TypeScript advanced concepts
   - Badge earning and achievement tracking

3. **Cross-Device Usage**
   - Desktop learning experience
   - Mobile/tablet compatibility
   - Touch interaction support

### Edge Cases Covered

1. **Input Validation**
   - Empty fields
   - Special characters
   - Incorrect answers
   - Case sensitivity

2. **Navigation Edge Cases**
   - Back button usage
   - Direct URL access
   - Refresh behavior
   - Deep linking

3. **Performance Edge Cases**
   - Large content loading
   - Rapid interactions
   - Memory management
   - Network failures

## 📊 Test Configuration

### Browser Support
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari/WebKit
- ✅ Mobile Chrome
- ✅ Mobile Safari

### Test Environment
- **Base URL**: http://localhost:3000
- **Timeout**: 30s per test
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## 🔧 Test Utilities

### Custom Matchers
The tests use Playwright's built-in expect matchers:
- `toBeVisible()` - Element visibility
- `toHaveText()` - Text content validation
- `toHaveURL()` - URL pattern matching
- `toHaveCount()` - Element count validation

### Test Data
Tests use realistic data that matches the learning platform:
- JavaScript concepts (variables, functions, objects)
- TypeScript types (unions, generics, utilities)
- Exercise answers and validations

## 📈 Continuous Integration

### GitHub Actions Integration
```yaml
- name: Run Playwright tests
  run: npx playwright test
  
- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

### Test Reports
- HTML reports with screenshots
- Test execution videos
- Performance metrics
- Accessibility audit results

## 🐛 Debugging Tests

### Debug Mode
```bash
# Debug specific test
npx playwright test --debug exercises.spec.ts

# Debug with browser
npx playwright test --headed --slowMo=1000
```

### Test Inspection
```bash
# Generate test code
npx playwright codegen localhost:3000

# Record new tests
npx playwright codegen --target=typescript localhost:3000
```

## 📝 Writing New Tests

### Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform specific action', async ({ page }) => {
    // Test implementation
    await page.click('text=Element');
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices
1. Use descriptive test names
2. Group related tests with `describe()`
3. Use `beforeEach()` for common setup
4. Wait for elements properly
5. Use specific selectors
6. Include both positive and negative test cases
7. Test mobile responsiveness
8. Validate accessibility

## 🎯 Test Coverage Goals

- ✅ 100% critical user journeys
- ✅ 95% UI component coverage  
- ✅ 90% responsive design scenarios
- ✅ 85% accessibility requirements
- ✅ 80% performance benchmarks

## 📞 Support

For test issues or questions:
1. Check test logs and screenshots
2. Run tests in headed mode for debugging
3. Review test configuration
4. Update selectors if UI changes
5. Add new tests for new features

## 🔄 Maintenance

### Regular Tasks
- Update test data as content changes
- Adjust selectors for UI updates
- Performance benchmark updates  
- Browser compatibility checks
- Accessibility standard updates

### Version Updates
- Playwright version updates
- Test dependency maintenance
- Browser driver updates
- CI/CD pipeline adjustments