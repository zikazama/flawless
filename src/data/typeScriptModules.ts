import { Module, Topic } from './modules';

// Complete TypeScript Module 1
export const tsModule1Topics: Topic[] = [
  {
    id: 'ts-types-inference',
    title: 'Assigning Types and Type Inference',
    content: `TypeScript dapat infer types automatically atau kamu bisa explicitly assign types.

**Type Inference:**
TypeScript otomatis menentukan type berdasarkan value.

**Type Annotations:**
Explicitly declare types dengan : Type

**When to Use:**
- Inference: untuk simple cases
- Annotations: untuk clarity dan complex types`,
    analogies: 'Type inference seperti auto-complete di HP. TypeScript bisa tebak apa yang kamu mau, tapi kadang lebih baik tulis lengkap supaya jelas.',
    examples: [
      `// Type inference
let message = "Hello";  // inferred as string
let count = 42;         // inferred as number
let isActive = true;    // inferred as boolean

// Type annotations
let name: string = "Alice";
let age: number = 30;
let isStudent: boolean = false;`,
      `// Function type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Inference with const
const PI = 3.14;  // Type: 3.14 (literal type)`
    ],
    fillInBlanks: [
      {
        id: 'tti1',
        code: `let username_____ = "John";
let score_____ = 100;
let isPremium_____ = true;`,
        blanks: [': string', ': number', ': boolean'],
        explanation: 'Add type annotations'
      },
      {
        id: 'tti2',
        code: `// Type inference
let city = "New York";  // Type: _____
const MAX = 100;        // Type: _____`,
        blanks: ['string', '100'],
        explanation: 'let infers general type, const infers literal'
      },
      {
        id: 'tti3',
        code: `function multiply(x_____, y_____

): _____ {
  return x * y;
}`,
        blanks: [': number', ': number', 'number'],
        explanation: 'Function parameter and return types'
      },
      {
        id: 'tti4',
        code: `// Inference vs annotation
let inferred = 42;           // Type: _____
let annotated: number = 42;  // Type: _____`,
        blanks: ['number', 'number'],
        explanation: 'Both result in same type'
      }
    ],
    caseStudy: {
      id: 'cs-ts-types',
      title: 'Type Safety System',
      description: 'Create typed function yang validates user input dengan proper type annotations dan inference.',
      expectedOutput: { valid: true, type: "string" },
      initialCode: `function validateInput(value: unknown): ValidationResult {
  // Check type of value
  // Return validation result with type info
  // Use proper type annotations
}`,
      testFunction: `
        const result = validateInput("test");
        return result.valid === true && result.type === "string";
      `
    }
  },
  {
    id: 'ts-array-type',
    title: 'Array Type',
    content: `TypeScript provides beberapa cara untuk type arrays.

**Array Type Syntax:**
- Type[] - preferred
- Array<Type> - generic syntax
- ReadonlyArray<Type> - immutable

**Tuple Types:**
Fixed-length arrays dengan specific types at each position.

**Array Methods:**
All array methods are properly typed.`,
    analogies: 'Array types seperti label di container. number[] seperti container khusus angka, string[] khusus text. Tuple seperti kotak bento dengan compartment specific.',
    examples: [
      `// Array types
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];
let mixed: (string | number)[] = [1, "two", 3];

// Generic syntax
let scores: Array<number> = [95, 87, 92];

// Readonly array
let readOnly: ReadonlyArray<number> = [1, 2, 3];
// readOnly.push(4);  // Error!`,
      `// Tuple types
let tuple: [string, number] = ["Alice", 30];
let coordinate: [number, number, number] = [10, 20, 30];

// Optional tuple elements
let optional: [string, number?] = ["Bob"];  // age optional`
    ],
    fillInBlanks: [
      {
        id: 'tsa1',
        code: `let numbers: _____[] = [1, 2, 3];
let names: Array<_____> = ["Alice", "Bob"];`,
        blanks: ['number', 'string'],
        explanation: 'Array type syntaxes'
      },
      {
        id: 'tsa2',
        code: `// Tuple type
let person: [_____, _____] = ["John", 25];
person[0].toUpperCase();  // OK
person[1].toFixed(2);     // OK`,
        blanks: ['string', 'number'],
        explanation: 'Tuple with specific types'
      },
      {
        id: 'tsa3',
        code: `// Mixed array
let data: (_____ | _____)[] = [1, "two", 3, "four"];`,
        blanks: ['number', 'string'],
        explanation: 'Union type array'
      },
      {
        id: 'tsa4',
        code: `// Readonly
let constants: _____<number> = [3.14, 2.71];
// constants.push(1.41);  // Error!`,
        blanks: ['ReadonlyArray'],
        explanation: 'Immutable array'
      }
    ],
    caseStudy: {
      id: 'cs-ts-array',
      title: 'Typed Array Operations',
      description: 'Create functions untuk manipulate typed arrays dengan tuples untuk coordinates.',
      expectedOutput: { sum: 15, coordinates: [[0, 0], [10, 20]] },
      initialCode: `type Coordinate = [number, number];

function processArrays(numbers: number[], points: Coordinate[]): Result {
  // Sum numbers array
  // Process coordinate tuples
  // Return typed result
}`,
      testFunction: `
        const result = processArrays([1, 2, 3, 4, 5], [[0, 0], [10, 20]]);
        return result.sum === 15 && result.coordinates.length === 2;
      `
    }
  },
  {
    id: 'ts-any-type',
    title: 'Any Type',
    content: `The 'any' type disables type checking. Use sparingly!

**When Any is Used:**
- Migrating JavaScript code
- Working with dynamic content
- Third-party libraries without types

**Problems with Any:**
- No type safety
- No IntelliSense
- Spreads like virus

**Alternatives:**
- unknown: safer any
- Type assertions
- Type guards`,
    analogies: 'Any type seperti wild card di UNO. Bisa jadi apa saja, tapi kalau terlalu banyak, game jadi tidak seru dan tidak ada strategi.',
    examples: [
      `// Using any (avoid when possible)
let value: any = 42;
value = "hello";     // OK
value = true;        // OK
value.foo.bar.baz;   // OK (but might crash)

// Better: unknown
let safe: unknown = 42;
safe = "hello";      // OK
// safe.length;      // Error! Must check type first

if (typeof safe === "string") {
  safe.length;       // OK after type guard
}`,
      `// Migrating from JS
function oldCode(data: any) {
  return data.someProperty;  // No checking
}

// Better approach
function newCode(data: unknown) {
  if (data && typeof data === "object" && "someProperty" in data) {
    return (data as any).someProperty;
  }
}`
    ],
    fillInBlanks: [
      {
        id: 'tany1',
        code: `// Avoid this
let data: _____ = "hello";
data = 123;
data = { x: 10 };`,
        blanks: ['any'],
        explanation: 'Any allows any type'
      },
      {
        id: 'tany2',
        code: `// Safer alternative
let value: _____ = getData();
if (typeof value === "string") {
  console.log(value.length);
}`,
        blanks: ['unknown'],
        explanation: 'Unknown requires type checking'
      },
      {
        id: 'tany3',
        code: `// Type assertion from any
let input: any = "123";
let num = input _____ string;
num.toUpperCase();`,
        blanks: ['as'],
        explanation: 'Type assertion'
      },
      {
        id: 'tany4',
        code: `// Escape hatch
let legacy = {} as _____;
legacy.anything.goes = true;  // Works but dangerous`,
        blanks: ['any'],
        explanation: 'Cast to any (use carefully)'
      }
    ],
    caseStudy: {
      id: 'cs-ts-any',
      title: 'Migrating from Any',
      description: 'Refactor function dari using any ke proper types dengan unknown dan type guards.',
      expectedOutput: { safe: true, value: "processed" },
      initialCode: `// Original with any
function processData(data: any) {
  return data.value.toUpperCase();
}

// Refactor to be type-safe
function processDataSafe(data: unknown) {
  // Add type guards
  // Handle edge cases
  // Return typed result
}`,
      testFunction: `
        const result = processDataSafe({ value: "test" });
        return result.safe === true && result.value === "PROCESSED";
      `
    }
  },
  {
    id: 'ts-object-basics',
    title: 'Object Basics',
    content: `TypeScript object types define shape of objects.

**Object Type Syntax:**
- Inline: { prop: type }
- Type alias: type Name = { }
- Interface: interface Name { }

**Optional Properties:**
Use ? for optional

**Readonly Properties:**
Prevent modification

**Index Signatures:**
Dynamic property names`,
    analogies: 'Object types seperti blueprint rumah. Menentukan ruangan apa saja (properties) dan ukurannya (types). Optional properties seperti ruangan bonus.',
    examples: [
      `// Inline object type
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// Type alias
type User = {
  id: number;
  name: string;
  email?: string;  // Optional
  readonly createdAt: Date;  // Readonly
};

// Using the type
let user: User = {
  id: 1,
  name: "Bob",
  createdAt: new Date()
};`,
      `// Index signature
type Dictionary = {
  [key: string]: string;
};

let dict: Dictionary = {
  hello: "world",
  foo: "bar"
};`
    ],
    fillInBlanks: [
      {
        id: 'tso1',
        code: `type Person = {
  name: _____;
  age: _____;
  email_____ string;  // Optional
};`,
        blanks: ['string', 'number', '?:'],
        explanation: 'Object type with optional property'
      },
      {
        id: 'tso2',
        code: `type Config = {
  _____ apiUrl: string;  // Can't be changed
  timeout?: number;
};`,
        blanks: ['readonly'],
        explanation: 'Readonly property'
      },
      {
        id: 'tso3',
        code: `// Index signature
type StringMap = {
  [_____: string]: _____;
};`,
        blanks: ['key', 'string'],
        explanation: 'Dynamic string keys'
      },
      {
        id: 'tso4',
        code: `let car: { brand: string; year: _____ } = {
  brand: "Toyota",
  year: _____
};`,
        blanks: ['number', '2020'],
        explanation: 'Inline object type'
      }
    ],
    caseStudy: {
      id: 'cs-ts-object',
      title: 'Complex Object Types',
      description: 'Design type system untuk e-commerce product dengan nested objects dan optional fields.',
      expectedOutput: { valid: true, hasDiscount: true },
      initialCode: `type Product = {
  // Define product structure
  // Include nested objects
  // Handle optional fields
}

function validateProduct(product: Product): ValidationResult {
  // Validate product structure
  // Check required fields
  // Return validation result
}`,
      testFunction: `
        const product = {
          id: 1,
          name: "Laptop",
          price: { amount: 1000, currency: "USD" },
          discount: { percent: 10 }
        };
        const result = validateProduct(product);
        return result.valid === true && result.hasDiscount === true;
      `
    }
  },
  {
    id: 'ts-type-vs-interface',
    title: 'Type vs Interface',
    content: `Type aliases dan Interfaces both define object shapes, dengan some differences.

**Interface:**
- Extendable with extends
- Can be merged (declaration merging)
- Only for object shapes

**Type Alias:**
- Can represent any type
- Use & for intersection
- Cannot be merged

**When to Use:**
- Interface: for public API, objects
- Type: for unions, aliases, utilities`,
    analogies: 'Interface seperti kontrak formal yang bisa di-extend. Type alias seperti nickname yang lebih fleksibel, bisa untuk apa saja.',
    examples: [
      `// Interface
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Declaration merging
interface Animal {
  age: number;  // Merged with above
}`,
      `// Type alias
type Point = {
  x: number;
  y: number;
};

type Point3D = Point & {
  z: number;
};

// Union types (only with type)
type Status = "pending" | "success" | "error";`
    ],
    fillInBlanks: [
      {
        id: 'tvi1',
        code: `_____ User {
  name: string;
}

_____ Admin extends User {
  role: string;
}`,
        blanks: ['interface', 'interface'],
        explanation: 'Interface with extends'
      },
      {
        id: 'tvi2',
        code: `_____ ID = string | number;
_____ Status = "active" | "inactive";`,
        blanks: ['type', 'type'],
        explanation: 'Type for unions'
      },
      {
        id: 'tvi3',
        code: `type A = { a: string };
type B = { b: number };
type C = A _____ B;  // Intersection`,
        blanks: ['&'],
        explanation: 'Type intersection'
      },
      {
        id: 'tvi4',
        code: `// Declaration merging (only interface)
_____ Config {
  url: string;
}
_____ Config {
  timeout: number;
}`,
        blanks: ['interface', 'interface'],
        explanation: 'Interface merging'
      }
    ],
    caseStudy: {
      id: 'cs-ts-interface',
      title: 'API Design with Interfaces',
      description: 'Design extensible API types using interfaces dengan proper inheritance.',
      expectedOutput: { type: "admin", permissions: ["read", "write", "delete"] },
      initialCode: `interface BaseUser {
  // Base user properties
}

interface AdminUser extends BaseUser {
  // Admin specific properties
}

function createUser(type: string): BaseUser | AdminUser {
  // Create appropriate user type
  // Return with correct interface
}`,
      testFunction: `
        const admin = createUser("admin");
        return "permissions" in admin && 
               admin.permissions.includes("delete");
      `
    }
  },
  {
    id: 'ts-function-types',
    title: 'Function Types - Defining Functions',
    content: `TypeScript allows precise typing of functions.

**Function Type Syntax:**
- Parameter types
- Return type
- Optional parameters with ?
- Default parameters
- Rest parameters

**Function Type Alias:**
Define reusable function signatures.

**Overloads:**
Multiple function signatures.`,
    analogies: 'Function types seperti resep masak yang detail. Tidak cuma bilang "masak", tapi specify bahan apa (parameters) dan hasil akhirnya apa (return type).',
    examples: [
      `// Function with types
function greet(name: string, age?: number): string {
  if (age) {
    return \`Hello \${name}, age \${age}\`;
  }
  return \`Hello \${name}\`;
}

// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;`,
      `// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Default parameters
function createUser(name: string, role: string = "user") {
  return { name, role };
}`
    ],
    fillInBlanks: [
      {
        id: 'tsf1',
        code: `function calculate(x: _____, y: _____): _____ {
  return x + y;
}`,
        blanks: ['number', 'number', 'number'],
        explanation: 'Basic function types'
      },
      {
        id: 'tsf2',
        code: `// Optional parameter
function greet(name: string, title_____ string): string {
  return title ? \`\${title} \${name}\` : name;
}`,
        blanks: ['?:'],
        explanation: 'Optional parameter syntax'
      },
      {
        id: 'tsf3',
        code: `// Function type
type Callback = (error: Error | null, data?: string) _____ void;`,
        blanks: ['=>'],
        explanation: 'Function type arrow syntax'
      },
      {
        id: 'tsf4',
        code: `// Rest parameters
function concat(_____ strings: _____[]): string {
  return strings.join("");
}`,
        blanks: ['...', 'string'],
        explanation: 'Rest parameter with type'
      }
    ],
    caseStudy: {
      id: 'cs-ts-function',
      title: 'Function Type System',
      description: 'Create calculator dengan typed operations, optional parameters, dan function types.',
      expectedOutput: { result: 15, operation: "add" },
      initialCode: `type Operation = (a: number, b: number) => number;

interface Calculator {
  add: Operation;
  subtract: Operation;
  // Add more operations
}

function createCalculator(): Calculator {
  // Implement calculator with typed functions
}`,
      testFunction: `
        const calc = createCalculator();
        const result = calc.add(10, 5);
        return result === 15;
      `
    }
  },
  {
    id: 'ts-void-type',
    title: 'Function Types - Void Type',
    content: `Void type indicates function returns nothing (undefined).

**Void vs Undefined:**
- void: function doesn't return value
- undefined: explicitly returns undefined

**Usage:**
- Side-effect functions
- Event handlers
- Callbacks

**Important:**
Void functions can still use return; without value.`,
    analogies: 'Void function seperti mesin cuci. Melakukan sesuatu (cuci baju) tapi tidak "return" apa-apa ke kamu. Side effect saja.',
    examples: [
      `// Void function
function logMessage(message: string): void {
  console.log(message);
  // No return or return; without value
}

// Can still use return for control flow
function processData(data: any): void {
  if (!data) {
    return;  // Early exit
  }
  console.log(data);
}`,
      `// Void in callbacks
function doAsync(callback: (result: string) => void): void {
  setTimeout(() => {
    callback("Done");
  }, 1000);
}

// Event handlers typically void
const handleClick = (event: MouseEvent): void => {
  console.log("Clicked");
};`
    ],
    fillInBlanks: [
      {
        id: 'tsv1',
        code: `function printName(name: string): _____ {
  console.log(name);
}`,
        blanks: ['void'],
        explanation: 'Void return type'
      },
      {
        id: 'tsv2',
        code: `// Callback with void
type Logger = (message: string) => _____;
const log: Logger = (msg) => console.log(msg);`,
        blanks: ['void'],
        explanation: 'Void in function type'
      },
      {
        id: 'tsv3',
        code: `function process(data: any): _____ {
  if (!data) _____;  // Early return
  handleData(data);
}`,
        blanks: ['void', 'return'],
        explanation: 'Void with early return'
      },
      {
        id: 'tsv4',
        code: `// forEach callback is void
[1, 2, 3].forEach((n): _____ => {
  console.log(n);
});`,
        blanks: ['void'],
        explanation: 'Void in array methods'
      }
    ],
    caseStudy: {
      id: 'cs-ts-void',
      title: 'Event System with Void',
      description: 'Create event emitter system dengan void callbacks untuk side effects.',
      expectedOutput: { eventFired: true, listenersCalled: 2 },
      initialCode: `type EventListener = (data: any) => void;

class EventEmitter {
  // Store listeners
  // emit method (void)
  // on method to register listeners
}`,
      testFunction: `
        const emitter = new EventEmitter();
        let count = 0;
        emitter.on("test", () => count++);
        emitter.on("test", () => count++);
        emitter.emit("test");
        return count === 2;
      `
    }
  },
  {
    id: 'ts-optional-params',
    title: 'Function Types - Optional Parameters',
    content: `Optional parameters allow functions to be called with fewer arguments.

**Rules:**
- Optional parameters use ?
- Must come after required parameters
- Have type T | undefined
- Different from default parameters

**Default vs Optional:**
- Optional: may be undefined
- Default: has fallback value

**Best Practices:**
- Put optional params at end
- Consider using default values instead`,
    analogies: 'Optional parameters seperti topping pizza. Base pizza (required params) harus ada, topping (optional params) boleh tidak. Default parameters seperti topping standard yang otomatis ditambah kalau tidak pilih.',
    examples: [
      `// Optional parameters
function createProfile(
  name: string,
  age?: number,
  email?: string
): Profile {
  return {
    name,
    age: age ?? 0,
    email: email ?? "not provided"
  };
}

createProfile("Alice");  // OK
createProfile("Bob", 25);  // OK
createProfile("Charlie", 30, "charlie@example.com");  // OK`,
      `// Optional vs Default
function greet(name: string, greeting?: string): string {
  // greeting is string | undefined
  return \`\${greeting || "Hello"}, \${name}\`;
}

function greetWithDefault(
  name: string, 
  greeting: string = "Hello"
): string {
  // greeting is always string
  return \`\${greeting}, \${name}\`;
}`
    ],
    fillInBlanks: [
      {
        id: 'tso1',
        code: `function buildUrl(
  protocol: string,
  domain: string,
  path_____ string
): string {
  return \`\${protocol}://\${domain}\${path || ""}\`;
}`,
        blanks: ['?:'],
        explanation: 'Optional parameter'
      },
      {
        id: 'tso2',
        code: `// All optionals after required
function createUser(
  id: number,
  name_____ string,
  email_____ string
) { }`,
        blanks: ['?:', '?:'],
        explanation: 'Multiple optional parameters'
      },
      {
        id: 'tso3',
        code: `// Type of optional
function getValue(key: string, fallback?: number): _____ {
  return fallback ?? 0;
}`,
        blanks: ['number'],
        explanation: 'Return type with optional param'
      },
      {
        id: 'tso4',
        code: `// Optional vs default
function log(message: string, level_____ = "info") {
  // level is always string
}`,
        blanks: [': string'],
        explanation: 'Default parameter with type'
      }
    ],
    caseStudy: {
      id: 'cs-ts-optional',
      title: 'Flexible API with Optional Parameters',
      description: 'Create flexible search function dengan multiple optional parameters.',
      expectedOutput: { results: ["item1", "item2"], filtered: true },
      initialCode: `interface SearchOptions {
  query: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
}

function search(options: SearchOptions): SearchResult {
  // Implement search with optional parameters
  // Handle defaults properly
  // Return typed results
}`,
      testFunction: `
        const result = search({ query: "test", limit: 10 });
        return result.results.length > 0 && result.filtered === true;
      `
    }
  }
];

// TypeScript Module 2: Advanced Types
export const tsModule2: Module = {
  id: 'ts-advanced-1',
  title: 'TypeScript Advanced Types',
  topics: [
    {
      id: 'ts-destructuring-rest',
      title: 'Destructuring and Rest Parameters',
      content: `TypeScript fully supports destructuring with type annotations.

**Object Destructuring:**
- Type entire object or individual properties
- Rename with aliases
- Default values

**Array Destructuring:**
- Works with tuples
- Rest elements

**Function Parameters:**
- Destructure in parameters
- Rest parameters with types`,
      analogies: 'Destructuring dengan types seperti unpacking koper dengan label. Setiap item punya label type, jadi tahu exactly apa yang di-unpack.',
      examples: [
        `// Object destructuring with types
interface User {
  name: string;
  age: number;
  email?: string;
}

function processUser({ name, age = 0 }: User) {
  console.log(name, age);
}

// Rename with type
const { name: userName }: User = user;`,
        `// Array/Tuple destructuring
const [first, second]: [string, number] = ["hello", 42];
const [head, ...tail]: number[] = [1, 2, 3, 4];

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}`
      ],
      fillInBlanks: [
        {
          id: 'tsd1',
          code: `// Object destructuring
const { name, age }: { name: _____; age: _____ } = person;`,
          blanks: ['string', 'number'],
          explanation: 'Type destructured object'
        },
        {
          id: 'tsd2',
          code: `// Array destructuring
const [x, y, z]: [_____, _____, _____] = [1, 2, 3];`,
          blanks: ['number', 'number', 'number'],
          explanation: 'Tuple destructuring'
        },
        {
          id: 'tsd3',
          code: `// Rest in function
function concat(first: string, _____ rest: _____[]): string {
  return first + rest.join("");
}`,
          blanks: ['...', 'string'],
          explanation: 'Rest parameters with type'
        },
        {
          id: 'tsd4',
          code: `// Destructuring with default
function greet({ name = "Guest" }: { name_____ string }): void {
  console.log(name);
}`,
          blanks: ['?:'],
          explanation: 'Optional with default'
        }
      ],
      caseStudy: {
        id: 'cs-ts-destruct',
        title: 'Advanced Destructuring',
        description: 'Create functions using complex destructuring patterns dengan proper types.',
        expectedOutput: { formatted: "John Doe", metadata: { age: 30 } },
        initialCode: `interface Person {
  firstName: string;
  lastName: string;
  age?: number;
  address?: {
    city: string;
    country: string;
  };
}

function formatPerson({ firstName, lastName, ...rest }: Person) {
  // Use destructuring
  // Process rest properties
  // Return formatted result
}`,
        testFunction: `
          const person = { firstName: "John", lastName: "Doe", age: 30 };
          const result = formatPerson(person);
          return result.formatted === "John Doe" && result.metadata.age === 30;
        `
      }
    },
    {
      id: 'ts-function-type-info',
      title: 'Function Type (Additional Info)',
      content: `Advanced function type patterns dalam TypeScript.

**Function Signatures:**
- Multiple ways to type functions
- Call signatures in interfaces
- Construct signatures

**Contextual Typing:**
- Types inferred from context
- Callback parameter types

**Generic Functions:**
- Type parameters for flexibility`,
      analogies: 'Function signatures seperti berbagai cara tulis alamat. Bisa detail lengkap, bisa singkat, tapi semua menuju tempat yang sama.',
      examples: [
        `// Different ways to type functions
type Add1 = (a: number, b: number) => number;
type Add2 = { (a: number, b: number): number };

interface Calculator {
  add(a: number, b: number): number;  // Method
  subtract: (a: number, b: number) => number;  // Property
}`,
        `// Contextual typing
const numbers = [1, 2, 3];
numbers.map(n => n * 2);  // n inferred as number

// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");
identity(42);  // T inferred as number`
      ],
      fillInBlanks: [
        {
          id: 'tsfi1',
          code: `// Call signature
interface Callable {
  (x: number): _____;
  description: string;
}`,
          blanks: ['string'],
          explanation: 'Call signature in interface'
        },
        {
          id: 'tsfi2',
          code: `// Generic function
function first<_____>(arr: T[]): T | undefined {
  return arr[0];
}`,
          blanks: ['T'],
          explanation: 'Generic type parameter'
        },
        {
          id: 'tsfi3',
          code: `// Contextual typing
[1, 2, 3].filter(_____=> n > 1);  // n type inferred`,
          blanks: ['n '],
          explanation: 'Parameter type from context'
        },
        {
          id: 'tsfi4',
          code: `// Constructor signature
interface Constructable {
  _____(name: string): User;
}`,
          blanks: ['new '],
          explanation: 'Constructor signature'
        }
      ],
      caseStudy: {
        id: 'cs-ts-funcadv',
        title: 'Advanced Function Patterns',
        description: 'Implement flexible API dengan multiple function signatures dan generics.',
        expectedOutput: { single: 5, multiple: [1, 2, 3] },
        initialCode: `// Create overloaded function
// Handle single value and array
// Use generics for type safety
// Return appropriate result`,
        testFunction: `
          const single = process(5);
          const multiple = process([1, 2, 3]);
          return single === 5 && Array.isArray(multiple);
        `
      }
    },
    {
      id: 'ts-unions',
      title: 'Unions',
      content: `Union types allow values to be one of several types.

**Union Syntax:**
Use | to combine types

**Type Narrowing:**
- typeof checks
- in operator
- instanceof
- Type predicates

**Discriminated Unions:**
Common property untuk distinguish types

**Union Best Practices:**
- Keep unions simple
- Use discriminated unions for objects`,
      analogies: 'Union types seperti multi-tool Swiss Army knife. Satu variable bisa jadi pisau, gunting, atau pembuka botol, tergantung situasi.',
      examples: [
        `// Basic union
type ID = string | number;
let userId: ID = 123;
userId = "abc-123";  // Also valid

// Union with type narrowing
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}`,
        `// Discriminated union
type Success = { status: "success"; data: string };
type Error = { status: "error"; message: string };
type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tsu1',
          code: `// Basic union
type Status = "pending" _____ "completed" _____ "failed";
let currentStatus: Status = "pending";`,
          blanks: ['|', '|'],
          explanation: 'Union type syntax'
        },
        {
          id: 'tsu2',
          code: `// Type narrowing
function format(value: string | number) {
  if (_____ value === "string") {
    return value.toUpperCase();
  }
  return value;
}`,
          blanks: ['typeof'],
          explanation: 'Type guard with typeof'
        },
        {
          id: 'tsu3',
          code: `// Discriminated union
type Cat = { type: "cat"; meow(): void };
type Dog = { type: "_____"; bark(): void };
type Pet = Cat _____ Dog;`,
          blanks: ['dog', '|'],
          explanation: 'Discriminated union pattern'
        },
        {
          id: 'tsu4',
          code: `// Narrowing with in
function process(obj: { a: string } | { b: number }) {
  if ("a" _____ obj) {
    console.log(obj.a);
  }
}`,
          blanks: ['in'],
          explanation: 'Type guard with in operator'
        }
      ],
      caseStudy: {
        id: 'cs-ts-union',
        title: 'API Response Handler',
        description: 'Create type-safe API response handler dengan discriminated unions.',
        expectedOutput: { handled: true, type: "success" },
        initialCode: `type ApiResponse = 
  | { status: "success"; data: any }
  | { status: "error"; error: string }
  | { status: "loading" };

function handleResponse(response: ApiResponse) {
  // Handle each response type
  // Use type narrowing
  // Return appropriate result
}`,
        testFunction: `
          const response = { status: "success", data: { id: 1 } };
          const result = handleResponse(response);
          return result.handled === true && result.type === "success";
        `
      }
    },
    {
      id: 'ts-intersections',
      title: 'Intersections',
      content: `Intersection types combine multiple types into one.

**Intersection Syntax:**
Use & to combine types

**Different from Union:**
- Union: A | B (either A or B)
- Intersection: A & B (both A and B)

**Use Cases:**
- Mixins
- Extending types
- Combining interfaces

**Type Conflicts:**
Conflicting properties result in never`,
      analogies: 'Intersection types seperti menggabungkan ingredients. Pizza & Pasta = dish yang punya semua properties dari pizza DAN pasta.',
      examples: [
        `// Basic intersection
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const person: Person = {
  name: "Alice",
  age: 30  // Must have both
};`,
        `// Extending interfaces
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

// Mixin pattern
type Timestamped = { createdAt: Date; updatedAt: Date };
type User = { id: string; name: string };
type TimestampedUser = User & Timestamped;`
      ],
      fillInBlanks: [
        {
          id: 'tsi1',
          code: `type A = { a: string };
type B = { b: number };
type C = A _____ B;  // Has both a and b`,
          blanks: ['&'],
          explanation: 'Intersection syntax'
        },
        {
          id: 'tsi2',
          code: `interface Readable { read(): void }
interface Writable { write(): void }
type ReadWrite = Readable _____ Writable;`,
          blanks: ['&'],
          explanation: 'Combine interfaces'
        },
        {
          id: 'tsi3',
          code: `type Base = { id: number; created: Date };
type Extended = Base _____ { name: string; active: boolean };`,
          blanks: ['&'],
          explanation: 'Extend type with intersection'
        },
        {
          id: 'tsi4',
          code: `// Mixin types
type Trackable = { track(): void };
type Deletable = { delete(): void };
type Entity = Trackable _____ Deletable _____ { id: string };`,
          blanks: ['&', '&'],
          explanation: 'Multiple intersections'
        }
      ],
      caseStudy: {
        id: 'cs-ts-intersect',
        title: 'Mixin Pattern Implementation',
        description: 'Implement mixin pattern using intersection types untuk combine behaviors.',
        expectedOutput: { canLog: true, canValidate: true, canSerialize: true },
        initialCode: `type Loggable = {
  log(message: string): void;
};

type Validatable = {
  validate(): boolean;
};

type Serializable = {
  serialize(): string;
};

// Create combined type and implementation`,
        testFunction: `
          const entity = createEntity();
          return entity.validate() && 
                 entity.serialize() === "serialized" &&
                 true; // Check log exists
        `
      }
    },
    {
      id: 'ts-readonly',
      title: 'Readonly',
      content: `Readonly modifier prevents properties from being changed after initialization.

**Readonly Modifier:**
- Individual properties: readonly prop: type
- All properties: Readonly<Type>
- Arrays: ReadonlyArray<T> or readonly T[]

**Shallow vs Deep:**
- Readonly is shallow
- Nested objects still mutable
- Use DeepReadonly for deep immutability

**Use Cases:**
- Immutable data
- Configuration objects
- Function parameters`,
      analogies: 'Readonly seperti museum display. Bisa lihat (read) tapi tidak bisa sentuh (modify). Tapi kalau display punya drawer, drawer masih bisa dibuka (shallow readonly).',
      examples: [
        `// Individual readonly
interface User {
  readonly id: string;
  name: string;  // Mutable
  readonly createdAt: Date;
}

const user: User = {
  id: "123",
  name: "Alice",
  createdAt: new Date()
};

// user.id = "456";  // Error!
user.name = "Bob";  // OK`,
        `// Readonly utility type
type Config = {
  apiUrl: string;
  timeout: number;
};

type ReadonlyConfig = Readonly<Config>;

// Readonly array
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4);  // Error!
// numbers[0] = 10;  // Error!`
      ],
      fillInBlanks: [
        {
          id: 'tsr1',
          code: `interface Product {
  _____ id: number;
  name: string;
  _____ price: number;
}`,
          blanks: ['readonly', 'readonly'],
          explanation: 'Readonly properties'
        },
        {
          id: 'tsr2',
          code: `// Readonly utility
type User = { name: string; age: number };
type ImmutableUser = _____<User>;`,
          blanks: ['Readonly'],
          explanation: 'Readonly utility type'
        },
        {
          id: 'tsr3',
          code: `// Readonly array
const arr: _____ string[] = ["a", "b"];
// arr.push("c");  // Error!`,
          blanks: ['readonly'],
          explanation: 'Readonly array'
        },
        {
          id: 'tsr4',
          code: `// Function with readonly param
function process(data: _____ { value: number }[]) {
  // Cannot modify array or objects
}`,
          blanks: ['readonly'],
          explanation: 'Readonly parameter'
        }
      ],
      caseStudy: {
        id: 'cs-ts-readonly',
        title: 'Immutable State Management',
        description: 'Create immutable state system using readonly types.',
        expectedOutput: { value: 10, frozen: true },
        initialCode: `interface State {
  readonly value: number;
  readonly history: readonly number[];
}

class StateManager {
  // Implement immutable state updates
  // Return new state instead of mutating
}`,
        testFunction: `
          const manager = new StateManager();
          const state1 = manager.getState();
          const state2 = manager.update(10);
          return state1 !== state2 && state2.value === 10;
        `
      }
    },
    {
      id: 'ts-index-signatures',
      title: 'Index Signatures',
      content: `Index signatures allow objects dengan dynamic property names.

**Syntax:**
[key: string]: type

**Key Types:**
- string
- number
- symbol

**Combining with Known Properties:**
Known properties must be assignable to index signature type.

**Readonly Index:**
Can make index signatures readonly`,
      analogies: 'Index signature seperti hotel dengan unlimited rooms. Tidak perlu define setiap room number, cukup bilang "all rooms are type Room".',
      examples: [
        `// Basic index signature
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  hello: "world",
  foo: "bar",
  // Any string key is allowed
};`,
        `// Combining with known properties
interface UserScores {
  [subject: string]: number;
  math: number;  // Must be number (matches index)
  science: number;
  // name: string;  // Error! Not assignable to number
}

// Number index
interface StringArray {
  [index: number]: string;
  length: number;  // OK, not part of index
}`
      ],
      fillInBlanks: [
        {
          id: 'tsis1',
          code: `interface Dictionary {
  [_____: string]: _____;
}`,
          blanks: ['key', 'any'],
          explanation: 'Basic index signature'
        },
        {
          id: 'tsis2',
          code: `interface NumberMap {
  [_____: _____]: string;
  length: number;  // Additional property
}`,
          blanks: ['index', 'number'],
          explanation: 'Number index signature'
        },
        {
          id: 'tsis3',
          code: `// Readonly index
interface ReadonlyDict {
  _____ [key: string]: string;
}`,
          blanks: ['readonly'],
          explanation: 'Readonly index signature'
        },
        {
          id: 'tsis4',
          code: `// Mixed properties
interface Config {
  name: string;
  [_____: string]: string | number;  // Union to allow both
}`,
          blanks: ['key'],
          explanation: 'Index with known properties'
        }
      ],
      caseStudy: {
        id: 'cs-ts-index',
        title: 'Dynamic Configuration System',
        description: 'Build flexible config system dengan index signatures dan type safety.',
        expectedOutput: { get: "value", has: true },
        initialCode: `interface ConfigStore {
  [key: string]: string | number | boolean;
  // Add methods for get/set
}

class Config implements ConfigStore {
  [key: string]: any;
  
  // Implement dynamic property access
  // Add validation
}`,
        testFunction: `
          const config = new Config();
          config.set("apiUrl", "https://api.example.com");
          return config.get("apiUrl") === "https://api.example.com";
        `
      }
    },
    {
      id: 'ts-keyof',
      title: 'Keyof',
      content: `keyof operator gets union of keys from an object type.

**Basic Usage:**
keyof Type returns union of property names

**With Generics:**
Constrain to object keys

**Mapped Types:**
Iterate over keys

**String vs Number Keys:**
Depends on index signature`,
      analogies: 'keyof seperti getting daftar isi buku. Daripada baca semua halaman, langsung dapat list semua chapter names (keys).',
      examples: [
        `// Basic keyof
interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person;  // "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(person, "name");  // string
const age = getProperty(person, "age");    // number`,
        `// keyof with index signature
interface StringMap {
  [key: string]: string;
}

type StringMapKeys = keyof StringMap;  // string | number

// keyof with arrays
type ArrayKeys = keyof string[];  // number | "length" | "push" | ...`
      ],
      fillInBlanks: [
        {
          id: 'tsk1',
          code: `interface User {
  id: number;
  name: string;
}
type Keys = _____ User;  // "id" | "name"`,
          blanks: ['keyof'],
          explanation: 'Basic keyof usage'
        },
        {
          id: 'tsk2',
          code: `function getValue<T, K extends _____ T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
          blanks: ['keyof'],
          explanation: 'Generic constraint with keyof'
        },
        {
          id: 'tsk3',
          code: `type ReadonlyKeys<T> = {
  readonly [K in _____ T]: T[K];
};`,
          blanks: ['keyof'],
          explanation: 'Mapped type with keyof'
        },
        {
          id: 'tsk4',
          code: `// Get value type
interface Config { url: string; port: number }
type PortType = Config["_____"];  // number`,
          blanks: ['port'],
          explanation: 'Index access type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-keyof',
        title: 'Type-Safe Property Access',
        description: 'Create type-safe property getter/setter using keyof.',
        expectedOutput: { name: "Updated", valid: true },
        initialCode: `interface Model {
  id: number;
  name: string;
  active: boolean;
}

class TypedModel {
  // Implement type-safe get/set using keyof
  // Ensure correct types for each property
}`,
        testFunction: `
          const model = new TypedModel();
          model.set("name", "Updated");
          return model.get("name") === "Updated";
        `
      }
    },
    {
      id: 'ts-typeof',
      title: 'Typeof',
      content: `typeof in TypeScript gets the type of a value (different from JavaScript typeof).

**Type Level typeof:**
- Gets type from value
- Works with variables, functions, classes
- Useful for deriving types

**JavaScript vs TypeScript typeof:**
- JS: runtime type check
- TS: compile-time type extraction

**Common Patterns:**
- Get type from const
- Function return types
- Module types`,
      analogies: 'TypeScript typeof seperti reverse engineering. Dari actual object/value, extract blueprint (type) nya.',
      examples: [
        `// Get type from value
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type Config = typeof config;
// type Config = {
//   apiUrl: string;
//   timeout: number;
//   retries: number;
// }`,
        `// Function types
function createUser(name: string, age: number) {
  return { name, age, id: Math.random() };
}

type User = ReturnType<typeof createUser>;
// type User = { name: string; age: number; id: number }

// With const assertion
const COLORS = ["red", "green", "blue"] as const;
type Color = typeof COLORS[number];  // "red" | "green" | "blue"`
      ],
      fillInBlanks: [
        {
          id: 'tst1',
          code: `const settings = { theme: "dark", fontSize: 14 };
type Settings = _____ settings;`,
          blanks: ['typeof'],
          explanation: 'Get type from value'
        },
        {
          id: 'tst2',
          code: `function getData() { return { id: 1, value: "test" }; }
type Data = ReturnType<_____ getData>;`,
          blanks: ['typeof'],
          explanation: 'Get function return type'
        },
        {
          id: 'tst3',
          code: `const ROLES = ["admin", "user", "guest"] as _____;
type Role = typeof ROLES[_____];  // "admin" | "user" | "guest"`,
          blanks: ['const', 'number'],
          explanation: 'Const assertion with typeof'
        },
        {
          id: 'tst4',
          code: `class MyClass { x = 10; }
const instance = new MyClass();
type InstanceType = _____ instance;`,
          blanks: ['typeof'],
          explanation: 'Get instance type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-typeof',
        title: 'Config Type Derivation',
        description: 'Derive types from runtime configuration objects.',
        expectedOutput: { derived: true, type: "config" },
        initialCode: `const DEFAULT_CONFIG = {
  api: {
    url: "https://api.example.com",
    timeout: 5000
  },
  features: {
    darkMode: false,
    beta: true
  }
} as const;

// Derive types from config
// Create type-safe config manager`,
        testFunction: `
          type ConfigType = typeof DEFAULT_CONFIG;
          const manager = new ConfigManager(DEFAULT_CONFIG);
          return manager.get("api").timeout === 5000;
        `
      }
    },
    {
      id: 'ts-index-access',
      title: 'Index Access Types',
      content: `Index access types let you get type of specific property from another type.

**Syntax:**
Type["property"] or Type[keyof Type]

**Nested Access:**
Can chain for nested properties

**Array Element Types:**
Get element type from array

**Union Indexes:**
Access multiple properties at once`,
      analogies: 'Index access types seperti GPS coordinates. Daripada describe seluruh kota, cukup kasih exact coordinates untuk specific location (property type).',
      examples: [
        `// Basic index access
interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type Name = Person["name"];  // string
type Age = Person["age"];    // number
type Address = Person["address"];  // { street: string; city: string }
type City = Person["address"]["city"];  // string`,
        `// Union index access
type NameOrAge = Person["name" | "age"];  // string | number
type AllValues = Person[keyof Person];    // string | number | { ... }

// Array element type
type StringArray = string[];
type ElementType = StringArray[number];  // string

const TUPLE = [1, "two", true] as const;
type TupleElement = typeof TUPLE[number];  // 1 | "two" | true`
      ],
      fillInBlanks: [
        {
          id: 'tsia1',
          code: `interface User { id: number; name: string; role: string }
type UserID = User["_____"];  // number`,
          blanks: ['id'],
          explanation: 'Access specific property type'
        },
        {
          id: 'tsia2',
          code: `interface Nested { a: { b: { c: string } } }
type DeepType = Nested["_____"]["_____"]["c"];  // string`,
          blanks: ['a', 'b'],
          explanation: 'Nested property access'
        },
        {
          id: 'tsia3',
          code: `type Values<T> = T[_____ T];
type UserValues = Values<User>;  // All value types`,
          blanks: ['keyof'],
          explanation: 'Get all value types'
        },
        {
          id: 'tsia4',
          code: `type NumberArray = number[];
type Element = NumberArray[_____];  // number`,
          blanks: ['number'],
          explanation: 'Array element type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-indexaccess',
        title: 'Dynamic Type Extraction',
        description: 'Build type-safe path-based property accessor.',
        expectedOutput: { value: "nested", type: "string" },
        initialCode: `interface DeepObject {
  level1: {
    level2: {
      level3: {
        value: string;
      };
    };
  };
}

// Create type-safe path accessor
// Use index access types
// Handle nested paths`,
        testFunction: `
          const obj: DeepObject = {
            level1: { level2: { level3: { value: "nested" } } }
          };
          const value = getPath(obj, "level1.level2.level3.value");
          return value === "nested";
        `
      }
    },
    {
      id: 'ts-as-const',
      title: 'As Const',
      content: `'as const' assertion makes values deeply readonly dan infers literal types.

**Effects of as const:**
- Literal types instead of general types
- Readonly properties
- Readonly arrays become readonly tuples

**Use Cases:**
- Configuration objects
- Enum-like constants
- Tuple types

**Difference from readonly:**
- as const: compile-time, literal types
- readonly: just prevents mutation`,
      analogies: 'as const seperti foto polaroid. Captures exact moment (literal values) dan makes it permanent (readonly). Regular type seperti sketch yang bisa di-edit.',
      examples: [
        `// Without as const
const config1 = {
  name: "app",
  port: 3000
};
// type: { name: string; port: number }

// With as const
const config2 = {
  name: "app",
  port: 3000
} as const;
// type: { readonly name: "app"; readonly port: 3000 }`,
        `// Array to tuple
const arr1 = [1, 2, 3];  // number[]
const arr2 = [1, 2, 3] as const;  // readonly [1, 2, 3]

// Enum-like pattern
const STATES = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error"
} as const;

type State = typeof STATES[keyof typeof STATES];
// type State = "pending" | "success" | "error"`
      ],
      fillInBlanks: [
        {
          id: 'tsac1',
          code: `const CONFIG = {
  API_URL: "https://api.example.com",
  TIMEOUT: 5000
} _____ _____;`,
          blanks: ['as', 'const'],
          explanation: 'as const assertion'
        },
        {
          id: 'tsac2',
          code: `const COLORS = ["red", "green", "blue"] as const;
type Color = typeof COLORS[_____];  // "red" | "green" | "blue"`,
          blanks: ['number'],
          explanation: 'Tuple to union with as const'
        },
        {
          id: 'tsac3',
          code: `const point = { x: 10, y: 20 } _____ _____;
// point.x = 30;  // Error! readonly`,
          blanks: ['as', 'const'],
          explanation: 'Make object deeply readonly'
        },
        {
          id: 'tsac4',
          code: `// Literal type inference
const literal = "hello" as const;
type LiteralType = typeof literal;  // "_____" not string`,
          blanks: ['hello'],
          explanation: 'Literal type with as const'
        }
      ],
      caseStudy: {
        id: 'cs-ts-asconst',
        title: 'Type-Safe Constants System',
        description: 'Create enum-like constants system using as const.',
        expectedOutput: { status: "SUCCESS", code: 200 },
        initialCode: `// Create HTTP status constants
// Use as const for literal types
// Derive types from constants
// Build type-safe status handler`,
        testFunction: `
          const STATUS = {
            SUCCESS: { status: "SUCCESS", code: 200 },
            ERROR: { status: "ERROR", code: 500 }
          } as const;
          
          type StatusType = typeof STATUS[keyof typeof STATUS];
          const result = handleStatus(STATUS.SUCCESS);
          return result.code === 200;
        `
      }
    }
  ]
};

// Export all TypeScript modules
export const typeScriptModules = [
  ...tsModule1Topics,
  tsModule2
];