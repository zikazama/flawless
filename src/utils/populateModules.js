// Script to populate empty modules with content
const fs = require('fs').promises;
const path = require('path');

async function addRemainingContent() {
  const modulesPath = path.join(__dirname, '../data/modules.ts');
  let content = await fs.readFile(modulesPath, 'utf8');
  
  // Replace empty JavaScript modules
  content = content.replace(
    /{\s*id: 'js-advanced-1',\s*title: 'JavaScript Advanced Functions',\s*topics: \[\]\s*}/,
    `{
        id: 'js-advanced-1',
        title: 'JavaScript Advanced Functions',
        topics: [
          {
            id: 'date',
            title: 'Date',
            content: \`Date object digunakan untuk bekerja dengan tanggal dan waktu di JavaScript.

**Creating Dates:**
- new Date(): current date/time
- new Date(dateString): parse string  
- new Date(year, month, day...)

**Important:**
- Months are 0-indexed (0 = January)
- getTime() returns milliseconds\`,
            analogies: 'Date object seperti kalender digital dengan stopwatch.',
            examples: [
              \`const now = new Date();
const specific = new Date('2024-01-15');\`
            ],
            fillInBlanks: [
              {
                id: 'date1',
                code: \`const now = _____ Date();\`,
                blanks: ['new'],
                explanation: 'Create new date'
              }
            ],
            caseStudy: {
              id: 'cs-date',
              title: 'Age Calculator', 
              description: 'Calculate age from birthdate',
              expectedOutput: { years: 25 },
              initialCode: 'function calculateAge(birthdate) {}',
              testFunction: 'return calculateAge("1999-01-01").years > 0;'
            }
          }
        ]
      }`
  );

  content = content.replace(
    /{\s*id: 'js-advanced-2',\s*title: 'JavaScript Prototypes & Async',\s*topics: \[\]\s*}/,
    `{
        id: 'js-advanced-2', 
        title: 'JavaScript Prototypes & Async',
        topics: [
          {
            id: 'promise',
            title: 'Promise',
            content: \`Promise represents eventual completion of asynchronous operation.\`,
            analogies: 'Promise seperti delivery tracking.',
            examples: [\`const promise = new Promise((resolve, reject) => {});\`],
            fillInBlanks: [{
              id: 'pr1',
              code: \`const promise = new _____((resolve, reject) => {});\`,
              blanks: ['Promise'],
              explanation: 'Create Promise'
            }],
            caseStudy: {
              id: 'cs-promise',
              title: 'API Promise',
              description: 'Promise-based API',
              expectedOutput: { data: "test" },
              initialCode: 'function getData() {}',
              testFunction: 'return getData().then(d => d.data === "test");'
            }
          }
        ]
      }`
  );

  // Replace empty TypeScript modules  
  content = content.replace(
    /{\s*id: 'ts-advanced-1',\s*title: 'TypeScript Advanced Types',\s*topics: \[\]\s*}/,
    `{
        id: 'ts-advanced-1',
        title: 'TypeScript Advanced Types', 
        topics: [
          {
            id: 'ts-unions',
            title: 'Unions',
            content: \`Union types allow values to be one of several types using | operator.\`,
            analogies: 'Union types seperti Swiss Army knife.',
            examples: [\`type ID = string | number;\`],
            fillInBlanks: [{
              id: 'tsu1',
              code: \`type Status = "pending" _____ "completed";\`,
              blanks: ['|'],
              explanation: 'Union syntax'
            }],
            caseStudy: {
              id: 'cs-union',
              title: 'API Response Handler',
              description: 'Handle union response types',
              expectedOutput: { handled: true },
              initialCode: 'function handleResponse(response) {}',
              testFunction: 'return handleResponse({status: "success"}).handled;'
            }
          }
        ]
      }`
  );

  await fs.writeFile(modulesPath, content);
  console.log('Content updated successfully!');
}

addRemainingContent().catch(console.error);