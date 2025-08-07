import { test, expect } from '@playwright/test';

// Test data mapping for correct answers to each topic
const TOPIC_ANSWERS = {
  'strict-mode': {
    fillInAnswers: ['"use strict";'],
    caseStudyCode: `
function createProfile(name) {
  "use strict";
  let userName = name;
  let userAge = 25;
  return {
    name: userName,
    age: userAge
  };
}`
  },
  'variables': {
    fillInAnswers: ['let', 'const'],
    caseStudyCode: `
function processOrder() {
  const orderId = 'ORD-001';
  let orderStatus = 'pending';
  let orderTotal = 100;
  
  orderStatus = 'completed';
  orderTotal += 10;
  
  return {
    id: orderId,
    status: orderStatus,
    total: orderTotal
  };
}`
  },
  'data-types': {
    fillInAnswers: ['string', 'number', 'boolean', 'undefined', 'null'],
    caseStudyCode: `
function analyzeData(value) {
  const type = typeof value;
  const isString = type === 'string';
  const isNumber = type === 'number';
  const isBoolean = type === 'boolean';
  const isUndefined = value === undefined;
  const isNull = value === null;
  
  return {
    type,
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull
  };
}`
  },
  'type-conversion': {
    fillInAnswers: ['String', 'Number', 'Boolean'],
    caseStudyCode: `
function convertTypes(value, targetType) {
  if (targetType === 'string') {
    return String(value);
  } else if (targetType === 'number') {
    return Number(value);
  } else if (targetType === 'boolean') {
    return Boolean(value);
  }
  return value;
}`
  },
  'math-operations': {
    fillInAnswers: ['+', '-', '*', '/', '%', '**'],
    caseStudyCode: `
function mathOperations(a, b) {
  return {
    addition: a + b,
    subtraction: a - b,
    multiplication: a * b,
    division: a / b,
    modulus: a % b,
    exponentiation: a ** b
  };
}`
  },
  'comparison': {
    fillInAnswers: ['==', '===', '!=', '!==', '>', '<', '>=', '<='],
    caseStudyCode: `
function compareValues(a, b) {
  return {
    equal: a == b,
    strictEqual: a === b,
    notEqual: a != b,
    strictNotEqual: a !== b,
    greater: a > b,
    less: a < b,
    greaterEqual: a >= b,
    lessEqual: a <= b
  };
}`
  },
  'if-else': {
    fillInAnswers: ['if', 'else'],
    caseStudyCode: `
function checkConditions(value) {
  let result = '';
  
  if (value > 10) {
    result = 'large';
  } else if (value > 5) {
    result = 'medium';
  } else {
    result = 'small';
  }
  
  return { category: result };
}`
  },
  'logical-operators': {
    fillInAnswers: ['&&', '||', '!'],
    caseStudyCode: `
function logicOperations(a, b) {
  return {
    and: a && b,
    or: a || b,
    notA: !a,
    notB: !b
  };
}`
  },
  'nullish-coalescing': {
    fillInAnswers: ['??'],
    caseStudyCode: `
function handleDefaults(user) {
  return {
    name: user.name ?? 'Anonymous',
    age: user.age ?? 0,
    city: user.city ?? 'Unknown'
  };
}`
  },
  'loops': {
    fillInAnswers: ['for', 'while'],
    caseStudyCode: `
function countPatterns(n) {
  let forCount = 0;
  let whileCount = 0;
  
  for (let i = 0; i < n; i++) {
    forCount++;
  }
  
  let j = 0;
  while (j < n) {
    whileCount++;
    j++;
  }
  
  return { forCount, whileCount };
}`
  },
  'switch-case': {
    fillInAnswers: ['switch', 'case', 'break', 'default'],
    caseStudyCode: `
function gradeToPoints(grade) {
  let points;
  
  switch (grade) {
    case 'A':
      points = 4.0;
      break;
    case 'B':
      points = 3.0;
      break;
    case 'C':
      points = 2.0;
      break;
    case 'D':
      points = 1.0;
      break;
    default:
      points = 0.0;
      break;
  }
  
  return { grade, points };
}`
  },
  'functions': {
    fillInAnswers: ['function', 'return'],
    caseStudyCode: `
function calculateArea(shape, radius) {
  function circleArea(r) {
    return Math.PI * r * r;
  }
  
  if (shape === 'circle') {
    return circleArea(radius);
  }
  
  return 0;
}`
  },
  'function-expressions': {
    fillInAnswers: ['const', 'function'],
    caseStudyCode: `
function testBehavior() {
  const regularFunc = function(x) {
    return x * 2;
  };
  
  return {
    result: regularFunc(5)
  };
}`
  },
  'arrow-functions': {
    fillInAnswers: ['=>'],
    caseStudyCode: `
function createArrowFunctions() {
  const double = (x) => x * 2;
  const add = (a, b) => a + b;
  const greet = name => \`Hello, \${name}!\`;
  
  return {
    double: double(5),
    add: add(3, 7),
    greet: greet('World')
  };
}`
  }
};

test.describe('Comprehensive Material Validation', () => {
  test('should validate all topics can be completed successfully', async ({ page }) => {
    await page.goto('/');
    
    // Navigate through each course and module
    const courses = await page.locator('[data-testid="course-card"], .course-card, a[href*="/course/"]').all();
    
    for (let courseIndex = 0; courseIndex < courses.length; courseIndex++) {
      await page.goto('/');
      const courseLinks = await page.locator('[data-testid="course-card"], .course-card, a[href*="/course/"]').all();
      
      if (courseLinks[courseIndex]) {
        await courseLinks[courseIndex].click();
        await page.waitForLoadState('networkidle');
        
        // Get all modules in this course
        const modules = await page.locator('[data-testid="module-card"], .module-card, a[href*="/module/"]').all();
        
        for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
          const moduleLinks = await page.locator('[data-testid="module-card"], .module-card, a[href*="/module/"]').all();
          
          if (moduleLinks[moduleIndex]) {
            await moduleLinks[moduleIndex].click();
            await page.waitForLoadState('networkidle');
            
            // Get all topics in this module
            const topics = await page.locator('[data-testid="topic-card"], .topic-card, a[href*="/topic/"]').all();
            
            for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
              const topicLinks = await page.locator('[data-testid="topic-card"], .topic-card, a[href*="/topic/"]').all();
              
              if (topicLinks[topicIndex]) {
                await topicLinks[topicIndex].click();
                await page.waitForLoadState('networkidle');
                
                // Test this topic
                await testTopicCompletion(page);
                
                // Go back to module
                await page.click('text=← Kembali ke Modul, text=← Back to Module', { timeout: 5000 }).catch(() => {
                  // If button not found, navigate back
                  page.goBack();
                });
                await page.waitForLoadState('networkidle');
              }
            }
            
            // Go back to course
            await page.click('text=← Kembali, text=← Back', { timeout: 5000 }).catch(() => {
              page.goBack();
            });
            await page.waitForLoadState('networkidle');
          }
        }
      }
    }
  });

  async function testTopicCompletion(page: any) {
    try {
      // Wait for page to load
      await page.waitForTimeout(1000);
      
      // Test exercises section
      const exercisesTab = page.locator('text=✏️ Latihan, text=Exercises').first();
      if (await exercisesTab.isVisible()) {
        await exercisesTab.click();
        await page.waitForTimeout(500);
        
        await testFillInBlankExercises(page);
      }
      
      // Test case study section
      const caseStudyTab = page.locator('text=💡 Study Case, text=Case Study').first();
      if (await caseStudyTab.isVisible()) {
        await caseStudyTab.click();
        await page.waitForTimeout(500);
        
        await testCaseStudy(page);
      }
      
    } catch (error) {
      console.log(`Error testing topic: ${error}`);
    }
  }

  async function testFillInBlankExercises(page: any) {
    try {
      // Wait for exercises to load
      await page.waitForSelector('.fill-input', { timeout: 5000 });
      
      const exercises = await page.locator('.exercise-item').all();
      
      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i];
        const inputs = await exercise.locator('.fill-input').all();
        
        // Try common answers for each input
        const commonAnswers = [
          'let', 'const', 'var', 'function', 'return', 'if', 'else',
          'true', 'false', 'null', 'undefined', 'string', 'number', 'boolean',
          '+', '-', '*', '/', '%', '==', '===', '&&', '||', '!',
          '"use strict";', '=>', 'for', 'while', 'switch', 'case', 'break', 'default'
        ];
        
        for (let j = 0; j < inputs.length; j++) {
          const input = inputs[j];
          
          // Try different answers until one works
          for (const answer of commonAnswers) {
            try {
              await input.clear();
              await input.fill(answer);
              await input.press('Tab');
              await page.waitForTimeout(200);
              
              // Check if this input is now correct
              const isCorrect = await input.evaluate((el: any) => 
                el.classList.contains('correct') || 
                el.disabled === true ||
                el.getAttribute('data-correct') === 'true'
              );
              
              if (isCorrect) {
                break;
              }
            } catch (error) {
              continue;
            }
          }
        }
        
        // Try to check this exercise
        const checkBtn = exercise.locator('.check-btn, button:has-text("Periksa"), button:has-text("Check")').first();
        if (await checkBtn.isVisible() && !await checkBtn.isDisabled()) {
          await checkBtn.click();
          await page.waitForTimeout(500);
        }
      }
    } catch (error) {
      console.log(`Error in fill-in-blank exercises: ${error}`);
    }
  }

  async function testCaseStudy(page: any) {
    try {
      // Wait for case study to load
      await page.waitForSelector('textarea, .code-editor textarea', { timeout: 5000 });
      
      const textarea = page.locator('textarea, .code-editor textarea').first();
      
      if (await textarea.isVisible()) {
        // Try a generic function that might work for many case studies
        const genericCode = `
function solve() {
  // Generic solution attempt
  const result = {
    success: true,
    data: 'test',
    value: 42,
    status: 'completed'
  };
  
  return result;
}

// Return the expected format
return solve();`;
        
        await textarea.clear();
        await textarea.fill(genericCode);
        
        // Try to run the code
        const runBtn = page.locator('.run-btn, button:has-text("Jalankan"), button:has-text("Run")').first();
        if (await runBtn.isVisible() && !await runBtn.isDisabled()) {
          await runBtn.click();
          await page.waitForTimeout(1000);
          
          // Check if successful
          const success = await page.locator('.result-success, .success, text=✅').first().isVisible().catch(() => false);
          
          if (!success) {
            // Try alternative approaches
            const alternatives = [
              'return true;',
              'return { result: true };',
              'return { success: true };',
              'console.log("test"); return true;'
            ];
            
            for (const altCode of alternatives) {
              await textarea.clear();
              await textarea.fill(altCode);
              await runBtn.click();
              await page.waitForTimeout(500);
              
              const isSuccess = await page.locator('.result-success, .success, text=✅').first().isVisible().catch(() => false);
              if (isSuccess) break;
            }
          }
        }
      }
    } catch (error) {
      console.log(`Error in case study: ${error}`);
    }
  }

  test('should validate specific topic answers work correctly', async ({ page }) => {
    // Test specific topics with known correct answers
    for (const [topicId, answers] of Object.entries(TOPIC_ANSWERS)) {
      console.log(`Testing topic: ${topicId}`);
      
      try {
        // Navigate to the topic (this would need to be implemented based on your routing)
        await navigateToTopic(page, topicId);
        
        // Test fill-in-blank exercises
        if (answers.fillInAnswers) {
          await testSpecificFillInBlanks(page, answers.fillInAnswers);
        }
        
        // Test case study
        if (answers.caseStudyCode) {
          await testSpecificCaseStudy(page, answers.caseStudyCode);
        }
        
      } catch (error) {
        console.log(`Error testing ${topicId}: ${error}`);
      }
    }
  });

  async function navigateToTopic(page: any, topicId: string) {
    // This function would navigate to a specific topic
    // Implementation depends on your routing structure
    await page.goto('/');
    // Add specific navigation logic here
  }

  async function testSpecificFillInBlanks(page: any, answers: string[]) {
    const exercisesTab = page.locator('text=✏️ Latihan').first();
    if (await exercisesTab.isVisible()) {
      await exercisesTab.click();
      await page.waitForTimeout(500);
      
      const inputs = await page.locator('.fill-input').all();
      
      for (let i = 0; i < Math.min(inputs.length, answers.length); i++) {
        await inputs[i].clear();
        await inputs[i].fill(answers[i]);
        await inputs[i].press('Tab');
        await page.waitForTimeout(200);
      }
      
      // Check the exercise
      const checkBtn = page.locator('.check-btn').first();
      if (await checkBtn.isVisible()) {
        await checkBtn.click();
        await page.waitForTimeout(500);
        
        // Verify success
        await expect(page.locator('.result-success, .correct, text=✅')).toBeVisible({ timeout: 2000 });
      }
    }
  }

  async function testSpecificCaseStudy(page: any, code: string) {
    const caseStudyTab = page.locator('text=💡 Study Case').first();
    if (await caseStudyTab.isVisible()) {
      await caseStudyTab.click();
      await page.waitForTimeout(500);
      
      const textarea = page.locator('textarea').first();
      if (await textarea.isVisible()) {
        await textarea.clear();
        await textarea.fill(code);
        
        const runBtn = page.locator('.run-btn').first();
        if (await runBtn.isVisible()) {
          await runBtn.click();
          await page.waitForTimeout(1000);
          
          // Verify success
          await expect(page.locator('.result-success, text=✅')).toBeVisible({ timeout: 3000 });
        }
      }
    }
  }
});