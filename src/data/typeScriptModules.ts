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

// TypeScript Module 3: Generics
export const tsModule3: Module = {
  id: 'ts-generics-1',
  title: 'TypeScript Generics & Advanced Features',
  topics: [
    {
      id: 'ts-generic-function',
      title: 'Generic Function',
      content: `Generic functions allow creating reusable functions that work dengan multiple types.

**Generic Syntax:**
function name<T>(param: T): T

**Type Parameters:**
- Single: <T>
- Multiple: <T, U, V>
- Default types: <T = string>

**Benefits:**
- Code reusability
- Type safety
- Better IntelliSense`,
      analogies: 'Generic functions seperti template kosong. Bisa di-fill dengan any type, tapi tetep type-safe karena template ensure consistency.',
      examples: [
        `// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);     // number
const str = identity<string>("hi");   // string
const auto = identity(true);          // boolean (inferred)`,
        `// Generic with constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");    // OK
logLength([1, 2, 3]);  // OK
// logLength(123);     // Error! number has no length`
      ],
      fillInBlanks: [
        {
          id: 'tsgf1',
          code: `function first<_____>(arr: T[]): T | undefined {
  return arr[0];
}`,
          blanks: ['T'],
          explanation: 'Generic type parameter'
        },
        {
          id: 'tsgf2',
          code: `// Multiple generics
function pair<T, _____>(first: T, second: U): [T, U] {
  return [first, second];
}`,
          blanks: ['U'],
          explanation: 'Multiple type parameters'
        },
        {
          id: 'tsgf3',
          code: `// With constraint
function process<T extends { length: _____ }>(data: T): number {
  return data.length;
}`,
          blanks: ['number'],
          explanation: 'Generic constraint'
        },
        {
          id: 'tsgf4',
          code: `// Default generic type
function create<T = _____>(): T[] {
  return [];
}`,
          blanks: ['string'],
          explanation: 'Default generic type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-genfunc',
        title: 'Generic Array Utils',
        description: 'Create generic utility functions untuk array operations.',
        expectedOutput: { filtered: [2, 4], mapped: ["1", "2"] },
        initialCode: `// Create generic filter function
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  // Implementation
}

// Create generic map function  
function map<T, U>(arr: T[], transform: (item: T) => U): U[] {
  // Implementation
}`,
        testFunction: `
          const numbers = [1, 2, 3, 4];
          const filtered = filter(numbers, x => x % 2 === 0);
          const mapped = map([1, 2], x => x.toString());
          return filtered.length === 2 && mapped[0] === "1";
        `
      }
    },
    {
      id: 'ts-generic-type-interface',
      title: 'Generic Type Interface',
      content: `Generic interfaces dan types allow creating flexible type definitions.

**Generic Interfaces:**
interface Name<T> { ... }

**Generic Type Aliases:**
type Name<T> = ...

**Built-in Generics:**
- Array<T>
- Promise<T>
- Map<K, V>

**Variance:**
- Covariance: readonly arrays
- Contravariance: function parameters`,
      analogies: 'Generic interfaces seperti blueprint yang bisa customize. Same basic structure, tapi bisa ganti materials (types) sesuai kebutuhan.',
      examples: [
        `// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

const stringContainer: Container<string> = {
  value: "hello",
  getValue() { return this.value; },
  setValue(value) { this.value = value; }
};`,
        `// Generic type alias
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

type UserResult = Result<User>;
type NumberResult = Result<number, string>;

// Generic with utility types
type Optional<T> = {
  [K in keyof T]?: T[K];
};`
      ],
      fillInBlanks: [
        {
          id: 'tsgti1',
          code: `interface Response<_____> {
  data: T;
  status: number;
}`,
          blanks: ['T'],
          explanation: 'Generic interface parameter'
        },
        {
          id: 'tsgti2',
          code: `type ApiResult<T, E = _____> = 
  { success: true; data: T } | 
  { success: false; error: E };`,
          blanks: ['Error'],
          explanation: 'Default generic parameter'
        },
        {
          id: 'tsgti3',
          code: `interface KeyValuePair<_____, _____> {
  key: K;
  value: V;
}`,
          blanks: ['K', 'V'],
          explanation: 'Multiple generic parameters'
        },
        {
          id: 'tsgti4',
          code: `// Generic constraint in interface
interface Comparable<T extends { compare: _____ }> {
  item: T;
}`,
          blanks: ['Function'],
          explanation: 'Generic constraint in interface'
        }
      ],
      caseStudy: {
        id: 'cs-ts-genint',
        title: 'Generic Repository Pattern',
        description: 'Build generic repository interface for data access.',
        expectedOutput: { created: true, found: true },
        initialCode: `interface Repository<T, ID = string> {
  create(entity: T): Promise<T>;
  findById(id: ID): Promise<T | null>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<boolean>;
}

// Implement generic repository`,
        testFunction: `
          interface User { id: string; name: string; }
          const userRepo: Repository<User> = new GenericRepository();
          const user = await userRepo.create({ id: "1", name: "Alice" });
          return user.id === "1";
        `
      }
    },
    {
      id: 'ts-generic-constraints',
      title: 'Generic Constraints',
      content: `Generic constraints limit what types can be used dengan generic parameters.

**Extends Constraint:**
<T extends SomeType>

**Multiple Constraints:**
<T extends A & B>

**Conditional Constraints:**
<T extends U ? X : Y>

**keyof Constraints:**
<K extends keyof T>

**Common Patterns:**
- Object constraints
- Function constraints
- Array constraints`,
      analogies: 'Generic constraints seperti dress code di restaurant. Generic bisa any type (any clothes), tapi constraint kasih rules (must be formal).',
      examples: [
        `// Object constraint
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
// logLength(123);      // Error - number no length`,
        `// keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name");  // string
// const wrong = getProperty(person, "wrong"); // Error`
      ],
      fillInBlanks: [
        {
          id: 'tsgc1',
          code: `function clone<T extends _____>(obj: T): T {
  return { ...obj };
}`,
          blanks: ['object'],
          explanation: 'Object constraint'
        },
        {
          id: 'tsgc2',
          code: `function getValue<T, K extends _____ T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
          blanks: ['keyof'],
          explanation: 'keyof constraint'
        },
        {
          id: 'tsgc3',
          code: `// Multiple constraints
function process<T extends string _____ { length: number }>(value: T): number {
  return value.length;
}`,
          blanks: ['&'],
          explanation: 'Multiple constraints with intersection'
        },
        {
          id: 'tsgc4',
          code: `// Array constraint
function first<T extends _____[]>(arr: T): T[0] {
  return arr[0];
}`,
          blanks: ['any'],
          explanation: 'Array constraint'
        }
      ],
      caseStudy: {
        id: 'cs-ts-gencon',
        title: 'Constrained Generic Validator',
        description: 'Build validation system dengan generic constraints.',
        expectedOutput: { valid: true, type: "string" },
        initialCode: `interface Validatable {
  validate(): boolean;
}

interface Serializable {
  serialize(): string;
}

// Create validator with constraints
function createValidator<T extends Validatable & Serializable>(
  data: T
): ValidationResult {
  // Implementation
}`,
        testFunction: `
          const data = {
            value: "test",
            validate() { return true; },
            serialize() { return "serialized"; }
          };
          const result = createValidator(data);
          return result.valid === true;
        `
      }
    },
    {
      id: 'ts-mapped-types',
      title: 'Mapped Types',
      content: `Mapped types create new types by transforming properties of existing types.

**Basic Syntax:**
{ [K in keyof T]: T[K] }

**Modifiers:**
- ? (optional)
- readonly
- -? (remove optional)
- -readonly (remove readonly)

**Template Literal Types:**
{ [K in keyof T as \`prefix_\${string & K}\`]: T[K] }

**Built-in Mapped Types:**
- Partial<T>
- Required<T>
- Readonly<T>
- Pick<T, K>`,
      analogies: 'Mapped types seperti photo filter. Takes original image (type) dan applies transformation ke every pixel (property) to create new image (type).',
      examples: [
        `// Make all properties optional
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = MyPartial<User>;
// Result: { name?: string; age?: number; email?: string; }`,
        `// Transform property names
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// Result: { getName: () => string; getAge: () => number; getEmail: () => string; }`
      ],
      fillInBlanks: [
        {
          id: 'tsmt1',
          code: `// Basic mapped type
type ReadonlyAll<T> = {
  readonly [K _____ keyof T]: T[K];
};`,
          blanks: ['in'],
          explanation: 'Mapped type syntax'
        },
        {
          id: 'tsmt2',
          code: `// Remove optional
type Required<T> = {
  [K in keyof T]_____?: T[K];
};`,
          blanks: ['-'],
          explanation: 'Remove modifier'
        },
        {
          id: 'tsmt3',
          code: `// Transform keys
type Prefixed<T> = {
  [K in keyof T as \`prefix_\${_____ & K}\`]: T[K];
};`,
          blanks: ['string'],
          explanation: 'Template literal in mapped type'
        },
        {
          id: 'tsmt4',
          code: `// Conditional mapped type
type NonNullable<T> = {
  [K in keyof T]: T[K] extends null _____ undefined ? never : T[K];
};`,
          blanks: ['|'],
          explanation: 'Conditional in mapped type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-mapped',
        title: 'API Response Transformer',
        description: 'Create mapped types untuk transform API responses.',
        expectedOutput: { getName: "Alice", getAge: 30 },
        initialCode: `interface ApiUser {
  name: string;
  age: number;
  email: string;
}

// Create getter mapped type
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Implement transformer`,
        testFunction: `
          const user: ApiUser = { name: "Alice", age: 30, email: "a@test.com" };
          const getters = createGetters(user);
          return getters.getName() === "Alice" && getters.getAge() === 30;
        `
      }
    },
    {
      id: 'ts-generic-function-with-generic-type',
      title: 'Generic Function with Generic Type',
      content: `Advanced patterns combining generic functions dengan generic types.

**Function + Generic Type:**
Generic function yang returns atau accepts generic types

**Higher-Order Generics:**
Functions yang work dengan generic types themselves

**Type Parameter Inference:**
How TypeScript infers types dalam complex scenarios

**Practical Patterns:**
- Factory functions
- HOCs (Higher-Order Components)
- Middleware patterns`,
      analogies: 'Generic function dengan generic type seperti factory yang bisa produce different machines (generic types), dan each machine bisa process different materials (type parameters).',
      examples: [
        `// Generic function returning generic type
function createContainer<T>(): Container<T> {
  return {
    value: undefined as any,
    set(val: T) { this.value = val; },
    get(): T { return this.value; }
  };
}

const stringContainer = createContainer<string>();
const numberContainer = createContainer<number>();`,
        `// Generic function with generic constraint
function createValidator<T, V extends Validator<T>>(
  validatorClass: new () => V
): V {
  return new validatorClass();
}

interface Validator<T> {
  validate(value: T): boolean;
}

class StringValidator implements Validator<string> {
  validate(value: string): boolean {
    return typeof value === "string" && value.length > 0;
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tsgfgt1',
          code: `// Factory function
function createRepository<_____>(): Repository<T> {
  return new GenericRepository<T>();
}`,
          blanks: ['T'],
          explanation: 'Generic factory function'
        },
        {
          id: 'tsgfgt2',
          code: `// HOC pattern
function withLogging<T extends _____>(Component: T): T {
  // Add logging wrapper
  return Component;
}`,
          blanks: ['Function'],
          explanation: 'Higher-order function with generics'
        },
        {
          id: 'tsgfgt3',
          code: `// Generic function with generic return
function transform<T, _____>(data: T, transformer: Transformer<T, U>): U {
  return transformer.transform(data);
}`,
          blanks: ['U'],
          explanation: 'Multiple generics in function'
        },
        {
          id: 'tsgfgt4',
          code: `// Inferred generic
function pipe<T>(...fns: Function[]): (input: _____) => any {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}`,
          blanks: ['T'],
          explanation: 'Generic parameter inference'
        }
      ],
      caseStudy: {
        id: 'cs-ts-genfunctype',
        title: 'Generic Factory System',
        description: 'Build generic factory system untuk create typed instances.',
        expectedOutput: { created: true, typed: true },
        initialCode: `interface Factory<T> {
  create(config: any): T;
  validate(instance: T): boolean;
}

// Create generic factory function
function createFactory<T, F extends Factory<T>>(
  factoryClass: new () => F
): F {
  // Implementation
}`,
        testFunction: `
          interface User { name: string; }
          class UserFactory implements Factory<User> {
            create(config: any) { return { name: config.name }; }
            validate(user: User) { return !!user.name; }
          }
          const factory = createFactory(UserFactory);
          const user = factory.create({ name: "Alice" });
          return factory.validate(user);
        `
      }
    },
    {
      id: 'ts-empty-object-not-object',
      title: '{} is not object',
      content: `Understanding the difference between {} dan object types dalam TypeScript.

**{} (Empty Object Type):**
- Accepts any value except null/undefined
- NOT just objects
- Includes primitives, functions, etc.

**object Type:**
- Only non-primitive values
- Excludes null, undefined, primitives
- More restrictive than {}

**Record<string, unknown>:**
- Actual object dengan string keys
- Unknown values
- Most restrictive object type`,
      analogies: '{} seperti container yang accept anything except null/undefined. object seperti box yang only accept complex items (no primitives). Record seperti labeled storage dengan specific requirements.',
      examples: [
        `// {} accepts almost everything
function acceptEmpty(value: {}): void {
  console.log(value);
}

acceptEmpty(42);        // ✅ OK
acceptEmpty("hello");   // ✅ OK  
acceptEmpty([1, 2, 3]); // ✅ OK
acceptEmpty({x: 1});    // ✅ OK
// acceptEmpty(null);   // ❌ Error
// acceptEmpty(undefined); // ❌ Error`,
        `// object is more restrictive
function acceptObject(value: object): void {
  console.log(value);
}

// acceptObject(42);     // ❌ Error - primitive
// acceptObject("hello"); // ❌ Error - primitive
acceptObject([1, 2, 3]); // ✅ OK - array is object
acceptObject({x: 1});    // ✅ OK - object literal

// Record is most specific
function acceptRecord(value: Record<string, unknown>): void {
  console.log(value.someKey); // Safe property access
}

acceptRecord({a: 1, b: "test"}); // ✅ OK
// acceptRecord([1, 2, 3]);      // ❌ Error - array`
      ],
      fillInBlanks: [
        {
          id: 'tseoo1',
          code: `// {} accepts primitives
function fn1(value: _____): void {
  // value could be 42, "hello", {}, etc.
}`,
          blanks: ['{}'],
          explanation: '{} accepts non-null/undefined values'
        },
        {
          id: 'tseoo2',
          code: `// object excludes primitives  
function fn2(value: _____): void {
  // value must be object, array, function, etc.
}`,
          blanks: ['object'],
          explanation: 'object excludes primitives'
        },
        {
          id: 'tseoo3',
          code: `// Most restrictive
function fn3(value: Record<string, _____>): void {
  // value must be object with string keys
}`,
          blanks: ['unknown'],
          explanation: 'Record with unknown values'
        },
        {
          id: 'tseoo4',
          code: `// Never assign to {}
const empty: {} = 42;        // Legal but wrong
const proper: _____ = {x: 1}; // Better`,
          blanks: ['object'],
          explanation: 'Prefer object over {}'
        }
      ],
      caseStudy: {
        id: 'cs-ts-emptyobj',
        title: 'Type-Safe Object Validation',
        description: 'Create proper object type validation system.',
        expectedOutput: { isObject: true, isValid: true },
        initialCode: `// Create type guards
function isObject(value: unknown): value is object {
  // Proper object type guard
}

function isRecord(value: unknown): value is Record<string, unknown> {
  // Record type guard
}

// Create validator that properly handles different object types`,
        testFunction: `
          const tests = [
            isObject({}),           // true
            isObject([]),           // true
            !isObject(42),          // true (42 is not object)
            isRecord({}),           // true
            !isRecord([])           // true (array is not Record)
          ];
          return tests.every(t => t);
        `
      }
    },
    {
      id: 'ts-promise-async-functions',
      title: 'Promise and Async Functions',
      content: `TypeScript provides excellent support untuk async/await dan Promises dengan proper typing.

**Promise Types:**
- Promise<T> - resolves to type T
- Promise<void> - no return value
- Promise rejection typing

**Async Function Types:**
- async functions return Promise<T>
- await unwraps Promise<T> to T
- Error handling with types

**Advanced Patterns:**
- Generic async functions
- Promise utilities
- Type-safe error handling`,
      analogies: 'Promise types seperti delivery tracking. Promise<Pizza> means you will get Pizza eventually. Async function seperti kitchen yang always returns delivery promise.',
      examples: [
        `// Basic Promise typing
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// Using the async function
async function displayUser(id: string): Promise<void> {
  try {
    const user = await fetchUser(id); // user is type User
    console.log(user.name);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}`,
        `// Generic async function
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}

// Usage with type inference
const users = await fetchData<User[]>('/api/users');
const user = await fetchData<User>('/api/users/1');`
      ],
      fillInBlanks: [
        {
          id: 'tspaf1',
          code: `async function getData(): Promise<_____> {
  const response = await fetch('/api/data');
  return response.json();
}`,
          blanks: ['any'],
          explanation: 'Promise return type'
        },
        {
          id: 'tspaf2',
          code: `// Generic async function
async function load<_____>(url: string): Promise<T> {
  const data = await fetch(url);
  return data.json();
}`,
          blanks: ['T'],
          explanation: 'Generic async function'
        },
        {
          id: 'tspaf3',
          code: `// Async function that returns nothing
async function saveData(data: any): Promise<_____> {
  await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
}`,
          blanks: ['void'],
          explanation: 'Promise<void> for no return value'
        },
        {
          id: 'tspaf4',
          code: `// Using async function
async function process(): Promise<string> {
  const result = _____ getData(); // Unwrap Promise<string>
  return result.toUpperCase();
}`,
          blanks: ['await'],
          explanation: 'Await unwraps Promise'
        }
      ],
      caseStudy: {
        id: 'cs-ts-promiseasync',
        title: 'Type-Safe API Client',
        description: 'Build type-safe async API client dengan proper error handling.',
        expectedOutput: { data: {}, error: null },
        initialCode: `interface ApiResponse<T> {
  data: T;
  error: string | null;
}

class ApiClient {
  // Implement type-safe async methods
  async get<T>(url: string): Promise<ApiResponse<T>> {
    // Implementation with proper typing
  }
  
  async post<T, U>(url: string, data: T): Promise<ApiResponse<U>> {
    // Implementation
  }
}`,
        testFunction: `
          const client = new ApiClient();
          const response = await client.get<{id: number}>('/test');
          return response.data && response.error === null;
        `
      }
    }
  ]
};

// TypeScript Module 4: Conditional & Utility Types
export const tsModule4: Module = {
  id: 'ts-conditional-1',
  title: 'TypeScript Conditional & Utility Types',
  topics: [
    {
      id: 'ts-basic-conditional-types',
      title: 'Basic Conditional Types',
      content: `Conditional types allow creating types yang depend on conditions.

**Syntax:**
T extends U ? X : Y

**How it Works:**
- If T is assignable to U, result is X
- Otherwise, result is Y

**Use Cases:**
- Type filtering
- Type transformation
- API response types
- Utility type creation`,
      analogies: 'Conditional types seperti if-else untuk types. "If this type looks like that type, then use this, otherwise use that."',
      examples: [
        `// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;   // true
type Test2 = IsString<number>;   // false
type Test3 = IsString<"hello">;  // true`,
        `// Practical example
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>;  // { message: string }
type UserResponse = ApiResponse<User>;      // { data: User }`
      ],
      fillInBlanks: [
        {
          id: 'tsbct1',
          code: `type IsArray<T> = T _____ any[] ? true : false;`,
          blanks: ['extends'],
          explanation: 'Conditional type syntax'
        },
        {
          id: 'tsbct2',
          code: `// Nested conditional
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "_____" :
  "other";`,
          blanks: ['number'],
          explanation: 'Nested conditional types'
        },
        {
          id: 'tsbct3',
          code: `type NonNullable<T> = T extends null | undefined _____ never _____ T;`,
          blanks: ['?', ':'],
          explanation: 'Conditional type for non-nullable'
        },
        {
          id: 'tsbct4',
          code: `// Extract from union
type ExtractString<T> = T extends _____ ? T : never;`,
          blanks: ['string'],
          explanation: 'Extract specific type from union'
        }
      ],
      caseStudy: {
        id: 'cs-ts-basiccond',
        title: 'Smart API Response Types',
        description: 'Create conditional types untuk smart API response handling.',
        expectedOutput: { smart: true, typed: true },
        initialCode: `// Create conditional response type
type SmartResponse<T> = T extends { id: any } 
  ? { entity: T; meta: { cached: boolean } }
  : { list: T[]; meta: { total: number } };

// Implement function using conditional types
function handleResponse<T>(data: T): SmartResponse<T> {
  // Implementation based on type condition
}`,
        testFunction: `
          const single = handleResponse({ id: 1, name: "test" });
          const list = handleResponse("items");
          return 'entity' in single && 'list' in list;
        `
      }
    },
    {
      id: 'ts-conditional-type-looping-and-never',
      title: 'Conditional Type Looping and Never',
      content: `Advanced conditional types dengan looping dan never type untuk filtering.

**Never Type:**
- Represents impossible values
- Used for filtering in unions
- Bottom type in TypeScript

**Distributive Conditional Types:**
- Automatically distribute over unions
- T extends U ? X : Y distributes when T is union

**Looping Patterns:**
- Recursive conditional types
- Union filtering
- Type extraction`,
      analogies: 'Never type seperti black hole - swallows everything dan disappears. Distributive conditional types seperti assembly line yang process each union member individually.',
      examples: [
        `// Never filters out from unions
type WithoutString<T> = T extends string ? never : T;

type Test = WithoutString<string | number | boolean>;
// Result: number | boolean (string filtered out)`,
        `// Recursive conditional type
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object 
    ? DeepReadonly<T[K]> 
    : T[K];
};

interface Nested {
  user: { name: string; age: number };
  settings: { theme: string };
}

type ReadonlyNested = DeepReadonly<Nested>;
// All nested properties become readonly`
      ],
      fillInBlanks: [
        {
          id: 'tsctln1',
          code: `// Filter out specific type
type ExcludeString<T> = T extends string ? _____ : T;`,
          blanks: ['never'],
          explanation: 'Use never to filter types'
        },
        {
          id: 'tsctln2',
          code: `// Recursive conditional
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object 
    ? _____(T[K]) 
    : T[K];
};`,
          blanks: ['DeepPartial'],
          explanation: 'Recursive conditional type'
        },
        {
          id: 'tsctln3',
          code: `// Extract function types
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : _____;
}[keyof T];`,
          blanks: ['never'],
          explanation: 'Extract function property keys'
        },
        {
          id: 'tsctln4',
          code: `// Union distribution
type ToArray<T> = T extends any ? _____[] : never;
type Arrays = ToArray<string | number>; // string[] | number[]`,
          blanks: ['T'],
          explanation: 'Distributive conditional type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-condloop',
        title: 'Advanced Type Filtering System',
        description: 'Build recursive type system untuk filter dan transform nested types.',
        expectedOutput: { filtered: true, recursive: true },
        initialCode: `// Create recursive type filter
type FilterByType<T, U> = {
  [K in keyof T]: T[K] extends U 
    ? T[K] 
    : T[K] extends object 
      ? FilterByType<T[K], U>
      : never;
};

// Implement utility functions using advanced conditionals`,
        testFunction: `
          interface Complex {
            str: string;
            num: number;
            nested: { innerStr: string; innerNum: number };
          }
          
          type OnlyStrings = FilterByType<Complex, string>;
          // Should extract all string properties recursively
          return true;
        `
      }
    },
    {
      id: 'ts-conditional-types-infer',
      title: 'Conditional Types Infer',
      content: `'infer' keyword allows extracting types from other types dalam conditional types.

**Infer Syntax:**
T extends SomeType<infer U> ? U : never

**Use Cases:**
- Extract generic parameters
- Function return types
- Array element types
- Promise resolve types

**Multiple Infers:**
Can use multiple infer in same conditional type

**Inference Locations:**
- Function parameters
- Return types
- Generic parameters`,
      analogies: 'infer keyword seperti detective yang extract clues (types) from evidence (existing types). "If this looks like Promise<something>, tell me what that something is."',
      examples: [
        `// Extract Promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : never;

type StringPromise = UnwrapPromise<Promise<string>>;  // string
type NumberPromise = UnwrapPromise<Promise<number>>;  // number
type NotPromise = UnwrapPromise<string>;              // never`,
        `// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string { return ""; }
function getNumber(): number { return 0; }

type StringReturn = ReturnType<typeof getString>;  // string
type NumberReturn = ReturnType<typeof getNumber>;  // number`
      ],
      fillInBlanks: [
        {
          id: 'tscti1',
          code: `// Extract array element type
type ElementType<T> = T extends (_____ U)[] ? U : never;`,
          blanks: ['infer'],
          explanation: 'Infer array element type'
        },
        {
          id: 'tscti2',
          code: `// Extract function parameters
type Parameters<T> = T extends (...args: _____ P) => any ? P : never;`,
          blanks: ['infer'],
          explanation: 'Infer function parameters'
        },
        {
          id: 'tscti3',
          code: `// Extract object value type
type ValueType<T> = T extends { [key: string]: _____ V } ? V : never;`,
          blanks: ['infer'],
          explanation: 'Infer object value type'
        },
        {
          id: 'tscti4',
          code: `// Multiple infers
type SwapPromise<T> = T extends Promise<_____ A> 
  ? T extends Promise<infer B> 
    ? Promise<B> 
    : never 
  : never;`,
          blanks: ['infer'],
          explanation: 'Multiple infer in conditional type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-condinfer',
        title: 'Type Extraction Utilities',
        description: 'Build comprehensive type extraction system using infer.',
        expectedOutput: { extracted: true, types: ["string", "number"] },
        initialCode: `// Create advanced type extractors
type ExtractGeneric<T> = T extends SomeGeneric<infer U> ? U : never;
type ExtractDeep<T> = T extends { deep: { value: infer V } } ? V : never;
type ExtractAll<T> = T extends [infer A, infer B, infer C] ? [A, B, C] : never;

// Implement extraction functions`,
        testFunction: `
          type TestPromise = Promise<string>;
          type TestArray = [string, number, boolean];
          
          type Extracted1 = UnwrapPromise<TestPromise>;     // string
          type Extracted2 = ExtractAll<TestArray>;          // [string, number, boolean]
          
          return true; // Verify extraction works
        `
      }
    },
    {
      id: 'ts-conditional-types-infer-with-generic-type',
      title: 'Conditional Types Infer with Generic Type',
      content: `Combining infer dengan generic types untuk advanced type manipulation.

**Generic + Infer Patterns:**
- Extract from generic constraints
- Recursive type extraction
- Complex type transformations

**Higher-Order Type Operations:**
- Type composition
- Type transformation chains
- Advanced utility types

**Real-World Applications:**
- ORM type generation
- API response parsing
- Configuration validation`,
      analogies: 'Infer dengan generics seperti advanced chemistry lab. Generic provides the lab equipment (type parameters), infer extracts the pure elements (specific types) from complex compounds.',
      examples: [
        `// Extract from generic constraint
type ExtractConstraint<T> = T extends <U extends infer C>(arg: U) => any 
  ? C 
  : never;

// Advanced Promise extraction
type DeepUnwrap<T> = T extends Promise<Promise<infer U>> 
  ? DeepUnwrap<Promise<U>>
  : T extends Promise<infer U>
    ? DeepUnwrap<U>
    : T;

type Test = DeepUnwrap<Promise<Promise<Promise<string>>>>;  // string`,
        `// Extract generic parameters from classes
type ExtractGenericParam<T> = T extends new (...args: any[]) => infer R
  ? R extends SomeClass<infer P>
    ? P
    : never
  : never;

class Repository<T> {
  constructor(public entity: T) {}
}

type EntityType = ExtractGenericParam<typeof Repository>; // any`
      ],
      fillInBlanks: [
        {
          id: 'tsctig1',
          code: `// Extract from generic function
type ExtractGenericReturn<T> = T extends <U>(arg: U) => _____ R ? R : never;`,
          blanks: ['infer'],
          explanation: 'Infer generic function return'
        },
        {
          id: 'tsctig2',
          code: `// Deep extraction
type DeepExtract<T> = T extends Container<Container<_____ U>> ? U : never;`,
          blanks: ['infer'],
          explanation: 'Deep nested type extraction'
        },
        {
          id: 'tsctig3',
          code: `// Multiple generic infers
type ExtractBoth<T> = T extends Map<_____ K, infer V> ? [K, V] : never;`,
          blanks: ['infer'],
          explanation: 'Multiple generic parameter extraction'
        },
        {
          id: 'tsctig4',
          code: `// Conditional with generic constraint
type ConstrainedExtract<T, U> = T extends U 
  ? T extends SomeType<_____ V> 
    ? V 
    : never 
  : never;`,
          blanks: ['infer'],
          explanation: 'Infer with generic constraint'
        }
      ],
      caseStudy: {
        id: 'cs-ts-condinfergen',
        title: 'Generic Type Analysis System',
        description: 'Build system untuk analyze dan extract complex generic type structures.',
        expectedOutput: { analyzed: true, extracted: ["T", "U", "V"] },
        initialCode: `// Create advanced generic analyzers
type AnalyzeGeneric<T> = T extends SomeGeneric<infer A, infer B> 
  ? { first: A; second: B }
  : never;

type ExtractNestedGeneric<T> = T extends Wrapper<Container<infer U>> 
  ? U 
  : never;

// Implement analyzer functions`,
        testFunction: `
          type TestType = Container<Wrapper<Promise<string>>>;
          type Analyzed = AnalyzeGeneric<TestType>;
          
          // Verify complex extraction works
          return true;
        `
      }
    },
    {
      id: 'ts-pick-and-omit',
      title: 'Pick and Omit',
      content: `Pick dan Omit are utility types untuk selecting atau excluding properties from types.

**Pick<T, K>:**
- Select specific properties
- K must be keyof T
- Creates new type dengan only selected properties

**Omit<T, K>:**
- Exclude specific properties  
- Opposite of Pick
- Creates new type without specified properties

**Use Cases:**
- API DTOs
- Form types
- Partial updates
- Interface composition`,
      analogies: 'Pick seperti shopping list - pilih exactly what you need. Omit seperti packing - take everything EXCEPT these specific items.',
      examples: [
        `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick specific properties
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;
// Result: { id: string; name: string; email: string; }

// Omit sensitive properties
type SafeUser = Omit<User, 'password'>;
// Result: { id: string; name: string; email: string; createdAt: Date; }`,
        `// Practical usage
type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDto = Partial<Pick<User, 'name' | 'email'>>;

// API responses
type LoginResponse = Pick<User, 'id' | 'name'> & { token: string };`
      ],
      fillInBlanks: [
        {
          id: 'tspao1',
          code: `// Select specific properties
type UserBasic = _____<User, 'name' | 'email'>;`,
          blanks: ['Pick'],
          explanation: 'Pick utility type'
        },
        {
          id: 'tspao2',
          code: `// Exclude properties
type PublicUser = _____<User, 'password' | 'id'>;`,
          blanks: ['Omit'],
          explanation: 'Omit utility type'
        },
        {
          id: 'tspao3',
          code: `// Create DTO type
type CreateDto = Omit<Entity, '_____' | 'createdAt' | 'updatedAt'>;`,
          blanks: ['id'],
          explanation: 'DTO with omitted fields'
        },
        {
          id: 'tspao4',
          code: `// Combine with Partial
type UpdateDto = _____<Pick<User, 'name' | 'email'>>;`,
          blanks: ['Partial'],
          explanation: 'Combine Pick with Partial'
        }
      ],
      caseStudy: {
        id: 'cs-ts-pickomit',
        title: 'API DTO Generator',
        description: 'Build type-safe API DTO system using Pick dan Omit.',
        expectedOutput: { created: true, validated: true },
        initialCode: `interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
}

// Create DTOs using Pick and Omit
type CreateArticleDto = // Create new article
type UpdateArticleDto = // Update existing  
type ArticleResponse = // Public response

// Implement DTO validators`,
        testFunction: `
          const createDto: CreateArticleDto = {
            title: "Test",
            content: "Content", 
            author: "Author"
          };
          
          const response: ArticleResponse = {
            id: "1",
            title: "Test",
            author: "Author",
            publishedAt: new Date()
          };
          
          return validateDto(createDto) && validateResponse(response);
        `
      }
    },
    {
      id: 'ts-partial-and-required',
      title: 'Partial and Required',
      content: `Partial dan Required utility types untuk manipulating property optionality.

**Partial<T>:**
- Makes all properties optional
- Useful for updates, configuration
- Type: { [P in keyof T]?: T[P] }

**Required<T>:**
- Makes all properties required
- Opposite of Partial
- Type: { [P in keyof T]-?: T[P] }

**DeepPartial:**
- Custom recursive partial
- For nested objects

**Use Cases:**
- Update operations
- Configuration objects
- Form validation
- Default merging`,
      analogies: 'Partial seperti optional ingredients dalam recipe - bisa skip kalau tidak ada. Required seperti mandatory ingredients - must have all of them.',
      examples: [
        `interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug?: boolean;
}

// All properties optional
type ConfigOverrides = Partial<Config>;
// Result: { apiUrl?: string; timeout?: number; retries?: number; debug?: boolean; }

// All properties required (including originally optional)
type FullConfig = Required<Config>;
// Result: { apiUrl: string; timeout: number; retries: number; debug: boolean; }`,
        `// Practical usage
function updateUser(id: string, updates: Partial<User>): Promise<User> {
  // Only provided fields will be updated
}

function createUser(userData: Required<Pick<User, 'name' | 'email'>>): User {
  // Must provide name and email
}`
      ],
      fillInBlanks: [
        {
          id: 'tspar1',
          code: `// Make all optional
type UserUpdates = _____<User>;`,
          blanks: ['Partial'],
          explanation: 'Partial utility type'
        },
        {
          id: 'tspar2',
          code: `// Make all required
type CompleteUser = _____<User>;`,
          blanks: ['Required'],
          explanation: 'Required utility type'
        },
        {
          id: 'tspar3',
          code: `// Custom deep partial
type DeepPartial<T> = {
  [P in keyof T]_____?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};`,
          blanks: [''],
          explanation: 'Optional modifier in mapped type'
        },
        {
          id: 'tspar4',
          code: `// Remove optional modifier
type AllRequired<T> = {
  [P in keyof T]_____?: T[P];
};`,
          blanks: ['-'],
          explanation: 'Remove optional modifier'
        }
      ],
      caseStudy: {
        id: 'cs-ts-partialreq',
        title: 'Configuration Management System',
        description: 'Build flexible config system using Partial dan Required.',
        expectedOutput: { merged: true, validated: true },
        initialCode: `interface AppConfig {
  database: {
    host: string;
    port: number;
    name: string;
  };
  server: {
    port: number;
    host?: string;
  };
  features: {
    auth: boolean;
    logging: boolean;
  };
}

// Create config manager with proper typing
class ConfigManager {
  // Use Partial for overrides
  // Use Required for validation
  // Implement deep merging
}`,
        testFunction: `
          const defaults: AppConfig = {
            database: { host: "localhost", port: 5432, name: "app" },
            server: { port: 3000 },
            features: { auth: true, logging: false }
          };
          
          const overrides: Partial<AppConfig> = {
            server: { port: 4000, host: "0.0.0.0" }
          };
          
          const manager = new ConfigManager(defaults);
          const merged = manager.merge(overrides);
          
          return merged.server.port === 4000;
        `
      }
    },
    {
      id: 'ts-readonly-utility',
      title: 'Readonly Utility',
      content: `Readonly<T> utility type makes all properties readonly.

**Readonly<T>:**
- { readonly [P in keyof T]: T[P] }
- Prevents property modification
- Compile-time only protection

**DeepReadonly:**
- Recursive readonly
- For nested objects
- Custom implementation needed

**ReadonlyArray<T>:**
- Built-in readonly array
- Alternative: readonly T[]

**Use Cases:**
- Immutable data structures
- Configuration objects
- State management
- API contracts`,
      analogies: 'Readonly seperti museum exhibit dengan glass case. Bisa lihat dan access, tapi tidak bisa modify atau touch.',
      examples: [
        `interface User {
  id: string;
  name: string;
  preferences: {
    theme: string;
    language: string;
  };
}

type ReadonlyUser = Readonly<User>;
// Result: {
//   readonly id: string;
//   readonly name: string;
//   readonly preferences: { theme: string; language: string; };
// }

// Note: nested objects are still mutable
const user: ReadonlyUser = getUser();
// user.name = "new"; // Error!
user.preferences.theme = "dark"; // OK (nested not readonly)`,
        `// Deep readonly implementation
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

type DeepReadonlyUser = DeepReadonly<User>;
// Now nested objects are also readonly`
      ],
      fillInBlanks: [
        {
          id: 'tsru1',
          code: `// Make type readonly
type ImmutableConfig = _____<Config>;`,
          blanks: ['Readonly'],
          explanation: 'Readonly utility type'
        },
        {
          id: 'tsru2',
          code: `// Deep readonly
type DeepReadonly<T> = {
  _____ [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};`,
          blanks: ['readonly'],
          explanation: 'Deep readonly implementation'
        },
        {
          id: 'tsru3',
          code: `// Readonly array
type ReadonlyNumbers = _____<number>;`,
          blanks: ['ReadonlyArray'],
          explanation: 'ReadonlyArray type'
        },
        {
          id: 'tsru4',
          code: `// Alternative readonly array syntax
const numbers: _____ number[] = [1, 2, 3];`,
          blanks: ['readonly'],
          explanation: 'Readonly array syntax'
        }
      ],
      caseStudy: {
        id: 'cs-ts-readonly',
        title: 'Immutable State System',
        description: 'Build immutable state management using Readonly types.',
        expectedOutput: { immutable: true, updated: false },
        initialCode: `interface AppState {
  user: {
    id: string;
    profile: {
      name: string;
      email: string;
    };
  };
  settings: {
    theme: string;
    notifications: boolean;
  };
}

type ImmutableState = DeepReadonly<AppState>;

// Implement immutable state manager`,
        testFunction: `
          const initialState: ImmutableState = {
            user: { 
              id: "1", 
              profile: { name: "Alice", email: "alice@test.com" } 
            },
            settings: { theme: "dark", notifications: true }
          };
          
          // Verify immutability works
          try {
            // These should cause TypeScript errors:
            // initialState.user.profile.name = "Bob";
            // initialState.settings.theme = "light";
            return true;
          } catch {
            return false;
          }
        `
      }
    },
    {
      id: 'ts-record',
      title: 'Record',
      content: `Record<K, T> utility type creates object type dengan specific keys dan values.

**Syntax:**
Record<Keys, Type>

**Equivalent to:**
{ [P in K]: T }

**Key Types:**
- string | number | symbol
- Literal types
- Union types

**Use Cases:**
- Dictionaries
- Lookup tables
- Enum mappings
- Index signatures alternative`,
      analogies: 'Record seperti filling cabinet dengan labeled drawers. Setiap drawer (key) punya same type of contents (value type).',
      examples: [
        `// Basic Record
type UserRoles = Record<string, boolean>;
// Equivalent to: { [key: string]: boolean }

const permissions: UserRoles = {
  read: true,
  write: false,
  delete: true
};`,
        `// With literal union keys
type Theme = 'light' | 'dark' | 'auto';
type ThemeConfig = Record<Theme, { primary: string; secondary: string }>;

const themes: ThemeConfig = {
  light: { primary: '#000', secondary: '#666' },
  dark: { primary: '#fff', secondary: '#ccc' },
  auto: { primary: '#333', secondary: '#999' }
};`
      ],
      fillInBlanks: [
        {
          id: 'tsrec1',
          code: `// Basic record type
type StringMap = Record<_____, string>;`,
          blanks: ['string'],
          explanation: 'Record with string keys'
        },
        {
          id: 'tsrec2',
          code: `// Enum-like record
type Status = 'pending' | 'success' | 'error';
type StatusMessages = _____<Status, string>;`,
          blanks: ['Record'],
          explanation: 'Record with literal union keys'
        },
        {
          id: 'tsrec3',
          code: `// Complex value type
type UserActions = Record<string, { 
  handler: _____; 
  permission: string; 
}>;`,
          blanks: ['Function'],
          explanation: 'Record with object values'
        },
        {
          id: 'tsrec4',
          code: `// Number keys
type ScoreBoard = Record<_____, number>;`,
          blanks: ['number'],
          explanation: 'Record with number keys'
        }
      ],
      caseStudy: {
        id: 'cs-ts-record',
        title: 'Type-Safe Configuration Registry',
        description: 'Build configuration registry using Record types.',
        expectedOutput: { registered: true, validated: true },
        initialCode: `// Define configuration types
type ConfigKey = 'database' | 'api' | 'cache' | 'logging';

interface DatabaseConfig {
  host: string;
  port: number;
}

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Create type-safe registry using Record
type ConfigRegistry = Record<ConfigKey, any>; // Make this more specific

class ConfigManager {
  // Implement type-safe config management
}`,
        testFunction: `
          const manager = new ConfigManager();
          
          manager.register('database', { host: 'localhost', port: 5432 });
          manager.register('api', { baseUrl: 'https://api.test.com', timeout: 5000 });
          
          const dbConfig = manager.get('database');
          return dbConfig.host === 'localhost' && dbConfig.port === 5432;
        `
      }
    },
    {
      id: 'ts-return-type-and-parameter',
      title: 'ReturnType and Parameters',
      content: `ReturnType dan Parameters extract function signature information.

**ReturnType<T>:**
- Extracts function return type
- T extends (...args: any) => infer R ? R : any

**Parameters<T>:**
- Extracts function parameter types as tuple
- T extends (...args: infer P) => any ? P : never

**ConstructorParameters<T>:**
- Constructor parameter types
- For class constructors

**InstanceType<T>:**
- Get instance type of constructor function

**Use Cases:**
- Type inference from existing functions
- Higher-order functions
- Decorator patterns`,
      analogies: 'ReturnType seperti looking at function output specification. Parameters seperti looking at function input requirements. Both help understand function contract.',
      examples: [
        `// ReturnType example
function createUser(name: string, age: number): { id: string; name: string; age: number } {
  return { id: Math.random().toString(), name, age };
}

type User = ReturnType<typeof createUser>;
// Result: { id: string; name: string; age: number }`,
        `// Parameters example
function updateProfile(id: string, data: { name?: string; age?: number }): void {}

type UpdateParams = Parameters<typeof updateProfile>;
// Result: [string, { name?: string; age?: number }]

// Usage in higher-order function
function withLogging<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log('Calling function with:', args);
    const result = fn(...args);
    console.log('Function returned:', result);
    return result;
  };
}`
      ],
      fillInBlanks: [
        {
          id: 'tsrtp1',
          code: `// Extract return type
type UserType = _____<typeof createUser>;`,
          blanks: ['ReturnType'],
          explanation: 'ReturnType utility'
        },
        {
          id: 'tsrtp2',
          code: `// Extract parameters
type FuncParams = _____<typeof someFunction>;`,
          blanks: ['Parameters'],
          explanation: 'Parameters utility'
        },
        {
          id: 'tsrtp3',
          code: `// Constructor parameters
type ClassParams = _____<typeof MyClass>;`,
          blanks: ['ConstructorParameters'],
          explanation: 'Constructor parameters'
        },
        {
          id: 'tsrtp4',
          code: `// Instance type
type Instance = _____<typeof MyClass>;`,
          blanks: ['InstanceType'],
          explanation: 'Instance type from constructor'
        }
      ],
      caseStudy: {
        id: 'cs-ts-retparam',
        title: 'Function Signature Analysis',
        description: 'Build system untuk analyze dan work dengan function signatures.',
        expectedOutput: { analyzed: true, parameters: 2, returnType: "object" },
        initialCode: `// Create function analyzer
function analyzeFunction<T extends (...args: any[]) => any>(fn: T) {
  // Extract and analyze function signature information
  // Use ReturnType and Parameters
  // Return analysis results
}

// Example functions to analyze
function login(email: string, password: string): { token: string; user: User } {
  return { token: "abc", user: { id: "1", name: "Test" } };
}

function logout(): void {}

// Implement analyzer`,
        testFunction: `
          const loginAnalysis = analyzeFunction(login);
          const logoutAnalysis = analyzeFunction(logout);
          
          return loginAnalysis.parameters === 2 && 
                 typeof loginAnalysis.returnType === "object" &&
                 logoutAnalysis.parameters === 0;
        `
      }
    },
    {
      id: 'ts-awaited',
      title: 'Awaited',
      content: `Awaited<T> utility type recursively unwraps Promise types.

**What it Does:**
- Unwraps Promise<T> to T
- Works recursively for nested Promises
- Handles Promise-like types (thenables)

**Syntax:**
Awaited<T>

**Use Cases:**
- Async function typing
- Promise chaining
- Generic async utilities
- Type inference from Promises

**Built-in since TypeScript 4.5:**
Previously needed custom implementation`,
      analogies: 'Awaited seperti unwrapping Russian nesting dolls. Keeps unwrapping Promise layers until reaches the actual value type inside.',
      examples: [
        `// Basic usage
type StringPromise = Promise<string>;
type UnwrappedString = Awaited<StringPromise>; // string

// Nested Promises
type NestedPromise = Promise<Promise<Promise<number>>>;
type UnwrappedNumber = Awaited<NestedPromise>; // number`,
        `// With async functions
async function fetchUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  return response.json();
}

type UserType = Awaited<ReturnType<typeof fetchUser>>;   // User
type UsersType = Awaited<ReturnType<typeof fetchUsers>>; // User[]`
      ],
      fillInBlanks: [
        {
          id: 'tsaw1',
          code: `// Unwrap Promise type
type UserData = _____<Promise<User>>;`,
          blanks: ['Awaited'],
          explanation: 'Awaited utility type'
        },
        {
          id: 'tsaw2',
          code: `// With async function
async function getData(): Promise<string> { return "data"; }
type Data = _____<ReturnType<typeof getData>>;`,
          blanks: ['Awaited'],
          explanation: 'Awaited with async function'
        },
        {
          id: 'tsaw3',
          code: `// Nested Promise
type DeepPromise = Promise<Promise<number>>;
type Unwrapped = _____<DeepPromise>; // number`,
          blanks: ['Awaited'],
          explanation: 'Unwrap nested Promises'
        },
        {
          id: 'tsaw4',
          code: `// Generic utility
type AsyncReturnType<T extends (...args: any) => any> = 
  _____<ReturnType<T>>;`,
          blanks: ['Awaited'],
          explanation: 'Generic async return type'
        }
      ],
      caseStudy: {
        id: 'cs-ts-awaited',
        title: 'Async Pipeline Type System',
        description: 'Build type-safe async pipeline using Awaited types.',
        expectedOutput: { processed: true, result: "final" },
        initialCode: `// Create async pipeline
type AsyncPipeline<T> = {
  map<U>(fn: (value: Awaited<T>) => Promise<U> | U): AsyncPipeline<Promise<U>>;
  then<U>(fn: (value: Awaited<T>) => Promise<U> | U): Promise<U>;
  catch(fn: (error: any) => void): AsyncPipeline<T>;
};

// Implement pipeline with proper Awaited typing
function createPipeline<T>(promise: Promise<T>): AsyncPipeline<Promise<T>> {
  // Implementation
}`,
        testFunction: `
          const pipeline = createPipeline(Promise.resolve("start"));
          
          const result = await pipeline
            .map(async (value: string) => value + "-middle")
            .map((value: string) => value + "-end")
            .then(value => value);
            
          return result === "start-middle-end";
        `
      }
    }
  ]
};

// TypeScript Module 5: Type Guards & Advanced Features
export const tsModule5: Module = {
  id: 'ts-advanced-2',
  title: 'TypeScript Type Guards & Advanced Features',
  topics: [
    {
      id: 'ts-basic-type-guard',
      title: 'Basic Type Guard',
      content: `Type guards are functions atau expressions yang narrow down types at runtime.

**typeof Type Guards:**
- typeof x === "string"
- typeof x === "number" 
- typeof x === "boolean"
- typeof x === "object"

**instanceof Type Guards:**
- x instanceof ClassName
- Works dengan class instances
- Checks prototype chain

**in Operator:**
- "property" in object
- Checks if property exists

**Custom Type Guards:**
- Functions returning x is Type
- User-defined narrowing logic`,
      analogies: 'Type guards seperti security checkpoint. Check ID (type) before allowing entry ke specific area (code block).',
      examples: [
        `// typeof guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string
  } else {
    return value.toFixed(2);    // TypeScript knows it's number
  }
}`,
        `// instanceof guard
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tsbtg1',
          code: `function isString(value: unknown): boolean {
  return _____ value === "string";
}`,
          blanks: ['typeof'],
          explanation: 'typeof type guard'
        },
        {
          id: 'tsbtg2',
          code: `function processAnimal(animal: Dog | Cat) {
  if (animal _____ Dog) {
    animal.bark();
  }
}`,
          blanks: ['instanceof'],
          explanation: 'instanceof type guard'
        },
        {
          id: 'tsbtg3',
          code: `function hasProperty(obj: any): boolean {
  return "name" _____ obj;
}`,
          blanks: ['in'],
          explanation: 'in operator type guard'
        },
        {
          id: 'tsbtg4',
          code: `// Custom type guard
function isUser(obj: any): obj _____ User {
  return obj && typeof obj.name === "string";
}`,
          blanks: ['is'],
          explanation: 'Custom type guard function'
        }
      ],
      caseStudy: {
        id: 'cs-ts-basicguard',
        title: 'Multi-Type Data Processor',
        description: 'Build processor yang handles multiple data types dengan type guards.',
        expectedOutput: { processed: true, types: ["string", "number", "object"] },
        initialCode: `// Process mixed data types
function processData(data: string | number | User | null): ProcessResult {
  // Use type guards to handle each type safely
  // Return processing results with type information
}

interface User {
  id: string;
  name: string;
}

interface ProcessResult {
  value: any;
  type: string;
  processed: boolean;
}`,
        testFunction: `
          const results = [
            processData("hello"),
            processData(42),
            processData({ id: "1", name: "Alice" }),
            processData(null)
          ];
          
          return results.every(r => r.processed) && 
                 results[0].type === "string" &&
                 results[1].type === "number";
        `
      }
    },
    {
      id: 'ts-switch-case-exhaustive-check',
      title: 'Switch Case Exhaustive Check',
      content: `Exhaustive checking ensures all possible cases dalam union types are handled.

**Never Type for Exhaustiveness:**
- TypeScript uses never untuk unreachable code
- Helps catch missing cases
- Compile-time safety guarantee

**Switch Statement Pattern:**
- Handle all union members
- Default case with never
- Compiler error for missing cases

**Benefits:**
- Prevents runtime errors
- Self-documenting code
- Refactoring safety
- Type system enforcement`,
      analogies: 'Exhaustive checking seperti safety checklist sebelum takeoff. Must verify every item (case) before proceeding safely.',
      examples: [
        `type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status): string {
  switch (status) {
    case 'loading':
      return 'Please wait...';
    case 'success':
      return 'Operation completed!';
    case 'error':
      return 'Something went wrong';
    default:
      // This ensures we handle all cases
      const exhaustiveCheck: never = status;
      throw new Error(\`Unhandled status: \${exhaustiveCheck}\`);
  }
}`,
        `// Adding new union member will cause compile error
type ExtendedStatus = 'loading' | 'success' | 'error' | 'pending';

function handleExtendedStatus(status: ExtendedStatus): string {
  switch (status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Success!';
    case 'error':
      return 'Error!';
    // Missing 'pending' case - TypeScript will error
    default:
      const exhaustiveCheck: never = status; // Error here!
      throw new Error(\`Unhandled: \${exhaustiveCheck}\`);
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tssce1',
          code: `// Exhaustive check
function process(type: 'A' | 'B' | 'C'): string {
  switch (type) {
    case 'A': return 'Type A';
    case 'B': return 'Type B';
    case 'C': return 'Type C';
    default:
      const check: _____ = type;
      throw new Error(\`Unhandled: \${check}\`);
  }
}`,
          blanks: ['never'],
          explanation: 'Never type for exhaustive check'
        },
        {
          id: 'tssce2',
          code: `// Helper function for exhaustive checking
function assertNever(value: _____): never {
  throw new Error(\`Unexpected value: \${value}\`);
}`,
          blanks: ['never'],
          explanation: 'Helper function with never parameter'
        },
        {
          id: 'tssce3',
          code: `type Color = 'red' | 'green' | 'blue';
function getHex(color: Color): string {
  switch (color) {
    case 'red': return '#FF0000';
    case 'green': return '#00FF00';
    case 'blue': return '#0000FF';
    _____:
      return assertNever(color);
  }
}`,
          blanks: ['default'],
          explanation: 'Default case for exhaustive check'
        },
        {
          id: 'tssce4',
          code: `// Without exhaustive check (less safe)
function unsafeHandle(status: Status): string {
  if (status === 'loading') return 'Loading';
  if (status === 'success') return 'Success';
  // Missing 'error' case - no compile error!
  return '_____'; // Fallback
}`,
          blanks: ['Unknown'],
          explanation: 'Unsafe handling without exhaustive check'
        }
      ],
      caseStudy: {
        id: 'cs-ts-exhaustive',
        title: 'State Machine Implementation',
        description: 'Build type-safe state machine dengan exhaustive checking.',
        expectedOutput: { transitioned: true, allHandled: true },
        initialCode: `type State = 'idle' | 'loading' | 'success' | 'error';
type Event = 'START' | 'SUCCESS' | 'ERROR' | 'RESET';

interface StateMachine {
  currentState: State;
  transition(event: Event): State;
  canTransition(from: State, event: Event): boolean;
}

// Implement state machine with exhaustive checking
class TypeSafeStateMachine implements StateMachine {
  // Use exhaustive checking in transition logic
  // Ensure all state/event combinations are handled
}`,
        testFunction: `
          const machine = new TypeSafeStateMachine();
          
          const transitions = [
            machine.transition('START'),    // idle -> loading
            machine.transition('SUCCESS'),  // loading -> success
            machine.transition('RESET'),    // success -> idle
            machine.transition('START'),    // idle -> loading
            machine.transition('ERROR')     // loading -> error
          ];
          
          return transitions.length === 5 && 
                 machine.currentState === 'error';
        `
      }
    },
    {
      id: 'ts-as-casting',
      title: 'As Casting',
      content: `Type assertions (as casting) tell TypeScript to treat a value sebagai specific type.

**As Syntax:**
value as Type

**Angle Bracket Syntax:**
<Type>value (not recommended in JSX)

**When to Use:**
- You know more than TypeScript
- Working dengan DOM elements
- API responses
- Type narrowing

**Dangers:**
- No runtime checking
- Can cause runtime errors
- Should be used sparingly
- Prefer type guards when possible`,
      analogies: 'As casting seperti saying "trust me, I know what this is" kepada TypeScript. Powerful but dangerous - like driving without seatbelt.',
      examples: [
        `// DOM element casting
const input = document.getElementById('username') as HTMLInputElement;
input.value = 'default'; // TypeScript knows it's an input

// API response casting
interface User {
  id: string;
  name: string;
}

async function getUser(): Promise<User> {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data as User; // Assert API response type
}`,
        `// Safe casting dengan validation
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

function processApiResponse(data: unknown): User {
  if (isUser(data)) {
    return data; // Type guard - safer
  }
  throw new Error('Invalid user data');
}

// Less safe alternative
function unsafeProcess(data: unknown): User {
  return data as User; // Dangerous - could crash
}`
      ],
      fillInBlanks: [
        {
          id: 'tsac1',
          code: `// Basic casting
const element = document.getElementById('btn') _____ HTMLButtonElement;`,
          blanks: ['as'],
          explanation: 'as syntax for type assertion'
        },
        {
          id: 'tsac2',
          code: `// Cast API response
const user = apiResponse _____ User;`,
          blanks: ['as'],
          explanation: 'Cast API response to interface'
        },
        {
          id: 'tsac3',
          code: `// Const assertion
const colors = ['red', 'green', 'blue'] _____ const;`,
          blanks: ['as'],
          explanation: 'as const assertion'
        },
        {
          id: 'tsac4',
          code: `// Double casting (rarely needed)
const value = (unknownValue as _____) as string;`,
          blanks: ['any'],
          explanation: 'Double casting through any'
        }
      ],
      caseStudy: {
        id: 'cs-ts-casting',
        title: 'Safe API Response Handler',
        description: 'Build API response handler dengan safe casting practices.',
        expectedOutput: { validated: true, safe: true },
        initialCode: `interface ApiUser {
  id: string;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Create safe API handler
class ApiHandler {
  // Use type guards AND casting together
  // Validate data before casting
  // Handle errors gracefully
  
  async fetchUser(id: string): Promise<ApiUser> {
    // Implementation with safe casting
  }
  
  private validateUser(data: unknown): data is ApiUser {
    // Type guard implementation
  }
}`,
        testFunction: `
          const handler = new ApiHandler();
          
          // Mock successful response
          const validResponse = {
            data: { id: "1", name: "Alice", email: "alice@test.com" },
            success: true
          };
          
          // Mock invalid response  
          const invalidResponse = {
            data: { id: 1, name: "Bob" }, // Wrong types
            success: true
          };
          
          try {
            const user1 = await handler.processResponse(validResponse);
            const user2 = await handler.processResponse(invalidResponse);
            return user1.name === "Alice";
          } catch (error) {
            return true; // Expected to throw for invalid data
          }
        `
      }
    },
    {
      id: 'ts-satisfies',
      title: 'Satisfies',
      content: `'satisfies' keyword ensures a value conforms to a type tanpa widening the type.

**Satisfies vs As:**
- satisfies: checks compatibility, preserves specific type
- as: forces type, may lose specificity

**Benefits:**
- Type checking without type widening
- Preserves literal types
- Better IntelliSense
- Safer than casting

**Use Cases:**
- Configuration objects
- Const assertions alternative
- API contracts
- Complex object validation

**Available since TypeScript 4.9**`,
      analogies: 'satisfies seperti quality check. Ensures product meets standards tapi doesn\'t change the product label (type). as casting adalah like changing the label tanpa checking.',
      examples: [
        `// Problem with as casting
const config1 = {
  development: { apiUrl: "dev.api.com", port: 3000 },
  production: { apiUrl: "api.com", port: 443 }
} as Record<string, { apiUrl: string; port: number }>;

// config1.development.apiUrl - loses specific literal type

// Solution with satisfies
const config2 = {
  development: { apiUrl: "dev.api.com", port: 3000 },
  production: { apiUrl: "api.com", port: 443 }
} satisfies Record<string, { apiUrl: string; port: number }>;

// config2.development.apiUrl - keeps literal type "dev.api.com"`,
        `// Complex validation
interface Theme {
  colors: Record<string, string>;
  spacing: Record<string, number>;
}

const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d"
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24
  }
} satisfies Theme;

// theme.colors.primary has literal type "#007bff"
// Still validates against Theme interface`
      ],
      fillInBlanks: [
        {
          id: 'tssat1',
          code: `// Use satisfies instead of as
const settings = {
  theme: "dark",
  lang: "en"
} _____ Config;`,
          blanks: ['satisfies'],
          explanation: 'satisfies keyword usage'
        },
        {
          id: 'tssat2',
          code: `// Preserves literal types
const routes = {
  home: "/",
  about: "/about"
} satisfies Record<string, _____>;`,
          blanks: ['string'],
          explanation: 'satisfies with Record type'
        },
        {
          id: 'tssat3',
          code: `// API contract validation
const apiEndpoints = {
  users: { method: "GET", url: "/users" },
  createUser: { method: "_____", url: "/users" }
} satisfies Record<string, ApiEndpoint>;`,
          blanks: ['POST'],
          explanation: 'satisfies with interface constraint'
        },
        {
          id: 'tssat4',
          code: `// Better than as for complex objects
const complexConfig = {
  // ... complex structure
} _____ ComplexType; // Validates but preserves specific types`,
          blanks: ['satisfies'],
          explanation: 'satisfies for complex type validation'
        }
      ],
      caseStudy: {
        id: 'cs-ts-satisfies',
        title: 'Configuration Validation System',
        description: 'Build type-safe configuration system using satisfies.',
        expectedOutput: { validated: true, preserved: true },
        initialCode: `interface DatabaseConfig {
  host: string;
  port: number;
  credentials: {
    username: string;
    password: string;
  };
}

interface AppConfig {
  database: DatabaseConfig;
  server: {
    port: number;
    host?: string;
  };
  features: Record<string, boolean>;
}

// Create configurations using satisfies
const developmentConfig = {
  // Use satisfies to validate against AppConfig
  // While preserving specific literal types
} satisfies AppConfig;

const productionConfig = {
  // Similar structure with different values
} satisfies AppConfig;

// Implement config validator and merger`,
        testFunction: `
          // Verify satisfies preserves literal types
          const devPort = developmentConfig.server.port; // Should be literal type
          const prodHost = productionConfig.database.host; // Should be literal type
          
          // Verify validation works
          try {
            const invalidConfig = {
              database: { host: "localhost" }, // Missing required fields
              server: { port: "3000" }, // Wrong type
              features: {}
            } satisfies AppConfig; // Should cause TypeScript error
            
            return false;
          } catch {
            return true; // Expected validation to fail
          }
        `
      }
    },
    {
      id: 'ts-discriminated-union',
      title: 'Discriminated Union',
      content: `Discriminated unions use common properties untuk distinguish between union members.

**Discriminator Property:**
- Common property with literal types
- Usually called 'type', 'kind', atau 'tag'
- Enables type narrowing

**Pattern Matching:**
- Switch statements on discriminator
- Exhaustive checking
- Type safety

**Benefits:**
- Clear intent
- Type safety
- Self-documenting
- Prevents invalid combinations

**Use Cases:**
- State machines
- API responses  
- Redux actions
- Form validation`,
      analogies: 'Discriminated union seperti ID cards dengan different types (student, employee, visitor). Same basic structure tapi discriminator tells you exactly which type.',
      examples: [
        `// Basic discriminated union
type Shape = 
  | { type: 'circle'; radius: number }
  | { type: 'square'; size: number }  
  | { type: 'rectangle'; width: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // TypeScript knows radius exists
    case 'square':
      return shape.size ** 2; // TypeScript knows size exists
    case 'rectangle':
      return shape.width * shape.height; // TypeScript knows width/height exist
    default:
      const exhaustive: never = shape;
      throw new Error(\`Unhandled shape: \${exhaustive}\`);
  }
}`,
        `// API response pattern
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; code: number }
  | { status: 'loading' };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'success':
      console.log(response.data); // TypeScript knows data exists
      break;
    case 'error':
      console.error(\`Error \${response.code}: \${response.error}\`);
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tsdu1',
          code: `// Discriminated union
type Animal = 
  | { _____: 'dog'; breed: string }
  | { type: 'cat'; lives: number };`,
          blanks: ['type'],
          explanation: 'Discriminator property'
        },
        {
          id: 'tsdu2',
          code: `// Pattern matching
function makeSound(animal: Animal) {
  switch (animal._____) {
    case 'dog': return animal.breed + " barks";
    case 'cat': return "Cat with " + animal.lives + " lives meows";
  }
}`,
          blanks: ['type'],
          explanation: 'Switch on discriminator'
        },
        {
          id: 'tsdu3',
          code: `// Redux action pattern
type Action = 
  | { type: 'SET_USER'; payload: User }
  | { type: '_____'; payload: string };`,
          blanks: ['SET_ERROR'],
          explanation: 'Action discriminated union'
        },
        {
          id: 'tsdu4',
          code: `// Exhaustive check
function reducer(action: Action) {
  switch (action.type) {
    case 'SET_USER': return action.payload;
    case 'SET_ERROR': return action.payload;
    default:
      const check: _____ = action;
      throw new Error(\`Unhandled: \${check}\`);
  }
}`,
          blanks: ['never'],
          explanation: 'Exhaustive checking with never'
        }
      ],
      caseStudy: {
        id: 'cs-ts-discriminated',
        title: 'State Management System',
        description: 'Build Redux-style state management menggunakan discriminated unions.',
        expectedOutput: { state: "updated", actions: 3 },
        initialCode: `// Define application state
interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Define actions using discriminated unions
type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' };

// Implement reducer with exhaustive checking
function appReducer(state: AppState, action: AppAction): AppState {
  // Use discriminated union pattern
  // Handle all action types
  // Include exhaustive checking
}

// Implement action creators
const actions = {
  // Type-safe action creators
};`,
        testFunction: `
          const initialState: AppState = {
            user: null,
            loading: false,
            error: null
          };
          
          const user = { id: "1", name: "Alice" };
          
          let state = appReducer(initialState, actions.setLoading(true));
          state = appReducer(state, actions.setUser(user));
          state = appReducer(state, actions.setLoading(false));
          
          return state.user?.name === "Alice" && 
                 !state.loading && 
                 state.error === null;
        `
      }
    },
    {
      id: 'ts-function-overloads',
      title: 'Function Overloads',
      content: `Function overloads allow multiple function signatures untuk same implementation.

**Overload Signatures:**
- Multiple function declarations
- Different parameter/return types
- Implementation signature must be compatible

**Implementation:**
- Single implementation handles all overloads
- Use type guards/conditionals internally
- Must accommodate all signatures

**Benefits:**
- Better IntelliSense
- Type safety
- Clear API contracts
- Flexible function behavior

**Use Cases:**
- Different parameter combinations
- Conditional return types
- Library APIs
- Utility functions`,
      analogies: 'Function overloads seperti restaurant menu dengan different combos. Same kitchen (implementation) but different meal combinations (signatures) available.',
      examples: [
        `// Basic overloads
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: string): HTMLElement; // Implementation signature

function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

// Usage with type safety
const div = createElement('div');     // Type: HTMLDivElement
const span = createElement('span');   // Type: HTMLSpanElement
const input = createElement('input'); // Type: HTMLInputElement`,
        `// Conditional return types
function parse(input: string): string;
function parse(input: string, asNumber: true): number;
function parse(input: string, asNumber?: boolean): string | number {
  if (asNumber) {
    return parseInt(input);
  }
  return input;
}

const str = parse("123");        // string
const num = parse("123", true);  // number`
      ],
      fillInBlanks: [
        {
          id: 'tsfo1',
          code: `// Overload signatures
function format(value: string): string;
function format(value: number): _____;
function format(value: string | number): string {
  return value.toString();
}`,
          blanks: ['string'],
          explanation: 'Overload signature return type'
        },
        {
          id: 'tsfo2',
          code: `// Different parameter counts
function log(message: string): void;
function log(message: string, level: _____): void;
function log(message: string, level?: string): void {
  console.log(\`[\${level || 'INFO'}] \${message}\`);
}`,
          blanks: ['string'],
          explanation: 'Overload with different parameter counts'
        },
        {
          id: 'tsfo3',
          code: `// Generic overloads
function identity<T>(value: T): T;
function identity<T>(value: T[]): _____[];
function identity<T>(value: T | T[]): T | T[] {
  return value;
}`,
          blanks: ['T'],
          explanation: 'Generic function overloads'
        },
        {
          id: 'tsfo4',
          code: `// Method overloads in class
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): _____;
  add(a: number | string, b: number | string): number | string {
    return (a as any) + (b as any);
  }
}`,
          blanks: ['string'],
          explanation: 'Method overloads in class'
        }
      ],
      caseStudy: {
        id: 'cs-ts-overloads',
        title: 'Flexible Database Query Builder',
        description: 'Build query builder dengan multiple function overloads.',
        expectedOutput: { built: true, flexible: true },
        initialCode: `interface User {
  id: string;
  name: string;
  email: string;
}

interface QueryResult<T> {
  data: T[];
  count: number;
}

// Create flexible query builder dengan overloads
class QueryBuilder<T> {
  // Overload untuk different query patterns
  find(id: string): Promise<T | null>;
  find(conditions: Partial<T>): Promise<T[]>;
  find(conditions: Partial<T>, limit: number): Promise<T[]>;
  
  // Implementation yang handles all overloads
  find(idOrConditions: string | Partial<T>, limit?: number): Promise<T | T[] | null> {
    // Implementation
  }
  
  // More overloads untuk different operations
  create(data: Omit<T, 'id'>): Promise<T>;
  create(data: Omit<T, 'id'>[]): Promise<T[]>;
}`,
        testFunction: `
          const userQuery = new QueryBuilder<User>();
          
          // Test different overload usages
          const user1 = await userQuery.find("123");                    // User | null
          const users1 = await userQuery.find({ name: "Alice" });       // User[]
          const users2 = await userQuery.find({ name: "Bob" }, 10);     // User[]
          
          const newUser = await userQuery.create({ name: "Charlie", email: "charlie@test.com" });
          
          return typeof user1?.id === "string" && Array.isArray(users1);
        `
      }
    },
    {
      id: 'ts-type-predicate-function',
      title: 'Type Predicate Function',
      content: `Type predicate functions are custom type guards yang return 'parameter is Type'.

**Syntax:**
function isType(param: any): param is Type

**How it Works:**
- Returns boolean
- If true, TypeScript narrows type
- If false, TypeScript knows it's not that type

**Benefits:**
- Custom narrowing logic
- Reusable type checking
- Better than casting
- Runtime safety

**Best Practices:**
- Validate all required properties
- Handle edge cases
- Use with discriminated unions
- Combine dengan exhaustive checking`,
      analogies: 'Type predicate functions seperti expert inspector. Can examine any object dan give official certificate (type assertion) if it meets all requirements.',
      examples: [
        `// Basic type predicate
interface User {
  id: string;
  name: string;
  email: string;
}

function isUser(obj: any): obj is User {
  return obj && 
         typeof obj.id === 'string' &&
         typeof obj.name === 'string' &&
         typeof obj.email === 'string';
}

// Usage
function processUser(data: unknown) {
  if (isUser(data)) {
    console.log(data.name);    // TypeScript knows it's User
    console.log(data.email);   // All User properties available
  } else {
    console.log('Not a user'); // TypeScript knows it's not User
  }
}`,
        `// Advanced type predicates
interface Bird {
  type: 'bird';
  canFly: boolean;
}

interface Fish {
  type: 'fish';
  canSwim: boolean;
}

type Animal = Bird | Fish;

function isBird(animal: Animal): animal is Bird {
  return animal.type === 'bird';
}

function makeMove(animal: Animal) {
  if (isBird(animal)) {
    if (animal.canFly) {
      console.log('Flying!');
    }
  } else {
    // TypeScript knows it's Fish
    if (animal.canSwim) {
      console.log('Swimming!');
    }
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'tstpf1',
          code: `// Basic type predicate
function isString(value: unknown): value _____ string {
  return typeof value === 'string';
}`,
          blanks: ['is'],
          explanation: 'Type predicate syntax'
        },
        {
          id: 'tstpf2',
          code: `// Array type predicate
function isStringArray(arr: unknown): arr is _____[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'string');
}`,
          blanks: ['string'],
          explanation: 'Array type predicate'
        },
        {
          id: 'tstpf3',
          code: `// Object type predicate
function isPerson(obj: any): obj _____ Person {
  return obj && 
         typeof obj.name === 'string' && 
         typeof obj.age === 'number';
}`,
          blanks: ['is'],
          explanation: 'Object type predicate'
        },
        {
          id: 'tstpf4',
          code: `// Generic type predicate
function isArrayOf<T>(arr: unknown, guard: (item: any) => item is T): arr is _____[] {
  return Array.isArray(arr) && arr.every(guard);
}`,
          blanks: ['T'],
          explanation: 'Generic type predicate'
        }
      ],
      caseStudy: {
        id: 'cs-ts-typepred',
        title: 'Runtime Type Validation System',
        description: 'Build comprehensive runtime validation using type predicates.',
        expectedOutput: { validated: true, safe: true },
        initialCode: `// Define complex data structures
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  address?: Address;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

// Create type predicates for each type
function isAddress(obj: any): obj is Address {
  // Validate Address structure
}

function isUser(obj: any): obj is User {
  // Validate User structure including optional address
}

function isProduct(obj: any): obj is Product {
  // Validate Product structure
}

// Create generic validation utilities
function validateApiResponse<T>(
  data: unknown, 
  guard: (obj: any) => obj is T
): T {
  // Use type predicate to safely validate
}`,
        testFunction: `
          const validUser = {
            id: "1",
            name: "Alice",
            email: "alice@test.com",
            age: 30,
            address: {
              street: "123 Main St",
              city: "Anytown",
              zipCode: "12345"
            }
          };
          
          const invalidUser = {
            id: 1, // Wrong type
            name: "Bob",
            email: "bob@test.com"
            // Missing age
          };
          
          try {
            const user1 = validateApiResponse(validUser, isUser);
            const user2 = validateApiResponse(invalidUser, isUser);
            return user1.name === "Alice";
          } catch (error) {
            return true; // Expected to throw for invalid data
          }
        `
      }
    }
  ]
};

// Export all TypeScript modules
export const typeScriptModules = [
  ...tsModule1Topics,
  tsModule2,
  tsModule3,
  tsModule4,
  tsModule5
];