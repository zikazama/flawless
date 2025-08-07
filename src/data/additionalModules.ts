import { Module } from './modules';

// JavaScript Module 3: Objects & Arrays
export const jsModule3: Module = {
  id: 'js-basics-3',
  title: 'JavaScript Objects & Arrays',
  topics: [
    {
      id: 'basic-object',
      title: 'Basic Object',
      content: `Object adalah struktur data fundamental di JavaScript untuk menyimpan koleksi key-value pairs.

**Membuat Object:**
- Object literal: {}
- Constructor: new Object()
- Object.create()

**Mengakses Properties:**
- Dot notation: obj.property
- Bracket notation: obj['property']
- Dynamic keys dengan bracket notation`,
      analogies: 'Object seperti tas dengan banyak kantong. Setiap kantong punya label (key) dan isi (value). Kamu bisa mencari kantong berdasarkan labelnya.',
      examples: [
        `// Object literal
const person = {
  name: "John",
  age: 30,
  isActive: true
};

// Accessing properties
console.log(person.name);      // "John"
console.log(person['age']);    // 30`,
        `// Dynamic properties
const key = 'email';
person[key] = 'john@example.com';

// Check property exists
'name' in person;  // true
person.hasOwnProperty('age');  // true`
      ],
      fillInBlanks: [
        {
          id: 'ob1',
          code: `const car = {
  _____: "Toyota",
  _____: 2020,
  isElectric: false
};`,
          blanks: ['brand', 'year'],
          explanation: 'Buat object dengan properti brand dan year'
        },
        {
          id: 'ob2',
          code: `const obj = { name: "Alice" };
console.log(obj_____);    // dot notation
console.log(obj_____);    // bracket notation`,
          blanks: ['.name', "['name']"],
          explanation: 'Akses properti dengan dot dan bracket notation'
        },
        {
          id: 'ob3',
          code: `const key = 'score';
const game = {};
game_____ = 100;  // Dynamic property`,
          blanks: ['[key]'],
          explanation: 'Gunakan bracket notation untuk dynamic key'
        },
        {
          id: 'ob4',
          code: `const user = { id: 1, name: "Bob" };
_____ user;        // Check property exists
delete user_____;  // Delete property`,
          blanks: ["'id' in", '.id'],
          explanation: 'Check existence dan delete property'
        }
      ],
      caseStudy: {
        id: 'cs-object',
        title: 'Object Manipulation',
        description: 'Buat fungsi createProduct yang membuat object product dengan properties: name, price, inStock. Tambahkan method calculateDiscount yang mengembalikan harga setelah diskon 10%.',
        expectedOutput: { name: "Laptop", price: 1000, inStock: true, discountPrice: 900 },
        initialCode: `function createProduct(name, price, inStock) {
  // Buat object dengan properties
  // Tambahkan method calculateDiscount
  // Return object dengan discountPrice
}`,
        testFunction: `
          const product = createProduct("Laptop", 1000, true);
          return product.name === "Laptop" && product.price === 1000 && 
                 product.discountPrice === 900;
        `
      }
    },
    {
      id: 'object-references',
      title: 'Object References and Copying',
      content: `Object di JavaScript disimpan dan dicopy by reference, bukan by value.

**Reference vs Value:**
- Primitives (string, number, boolean) dicopy by value
- Objects dan arrays dicopy by reference
- Modifikasi copy akan mengubah original

**Shallow vs Deep Copy:**
- Shallow copy: Object.assign(), spread operator
- Deep copy: JSON.parse(JSON.stringify()) atau library`,
      analogies: 'Object reference seperti alamat rumah. Memberi alamat ke teman bukan berarti membangun rumah baru, tapi berbagi alamat yang sama.',
      examples: [
        `// Reference behavior
let obj1 = { a: 1 };
let obj2 = obj1;  // Same reference
obj2.a = 2;
console.log(obj1.a);  // 2 (changed!)`,
        `// Shallow copy
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };
copy.a = 3;  // OK, doesn't affect original
copy.b.c = 4;  // Affects original! (nested object)`,
        `// Deep copy
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.b.c = 5;  // Doesn't affect original`
      ],
      fillInBlanks: [
        {
          id: 'or1',
          code: `let a = { x: 1 };
let b = _____;
b.x = 2;
console.log(a.x);  // 2 (same reference)`,
          blanks: ['a'],
          explanation: 'Assignment creates reference, not copy'
        },
        {
          id: 'or2',
          code: `const obj = { a: 1, b: 2 };
const copy = { _____ };  // Shallow copy`,
          blanks: ['...obj'],
          explanation: 'Spread operator untuk shallow copy'
        },
        {
          id: 'or3',
          code: `const original = { x: 1 };
const copy = Object._____(_____, original);`,
          blanks: ['assign', '{}'],
          explanation: 'Object.assign untuk shallow copy'
        },
        {
          id: 'or4',
          code: `const deep = { a: { b: 1 } };
const deepCopy = JSON._____(_____._____(_____));`,
          blanks: ['parse', 'JSON', 'stringify', 'deep'],
          explanation: 'Deep copy dengan JSON methods'
        }
      ],
      caseStudy: {
        id: 'cs-objref',
        title: 'Safe Object Cloning',
        description: 'Buat fungsi cloneObject yang melakukan shallow copy dan deepCloneObject yang melakukan deep copy. Handle nested objects properly.',
        expectedOutput: { shallow: { a: 1, b: { c: 2 } }, deep: { a: 1, b: { c: 3 } } },
        initialCode: `function cloneObject(obj) {
  // Implementasi shallow copy
}

function deepCloneObject(obj) {
  // Implementasi deep copy
}`,
        testFunction: `
          const original = { a: 1, b: { c: 2 } };
          const shallow = cloneObject(original);
          const deep = deepCloneObject(original);
          shallow.b.c = 3;
          deep.b.c = 4;
          return original.b.c === 3 && deep.b.c === 4;
        `
      }
    },
    {
      id: 'object-methods-this',
      title: 'Object Methods and This',
      content: `Methods adalah functions yang menjadi property dari object. Keyword 'this' merujuk ke object pemilik method.

**This Binding:**
- Dalam method: this = object pemilik
- Dalam function biasa: this = global/undefined (strict mode)
- Arrow function: this dari lexical scope

**Method Shorthand:**
ES6 memungkinkan sintaks pendek untuk methods`,
      analogies: 'This seperti kata "saya" - artinya tergantung siapa yang mengucapkan. Dalam method, "saya" merujuk ke object pemiliknya.',
      examples: [
        `const user = {
  name: "Alice",
  // Method longhand
  greet: function() {
    return "Hi, I'm " + this.name;
  },
  // Method shorthand
  sayAge() {
    return this.age + " years old";
  }
};`,
        `// This binding issues
const obj = {
  name: "Object",
  regular: function() { return this.name; },
  arrow: () => this.name  // undefined!
};`
      ],
      fillInBlanks: [
        {
          id: 'om1',
          code: `const calculator = {
  value: 10,
  add: function(n) {
    return _____.value + n;
  }
};`,
          blanks: ['this'],
          explanation: 'Use this to access object property'
        },
        {
          id: 'om2',
          code: `const obj = {
  count: 0,
  _____() {  // Method shorthand
    this.count++;
  }
};`,
          blanks: ['increment'],
          explanation: 'ES6 method shorthand syntax'
        },
        {
          id: 'om3',
          code: `const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: _____ {
    return this.firstName + " " + this.lastName;
  }
};`,
          blanks: ['function()'],
          explanation: 'Method dengan function keyword'
        },
        {
          id: 'om4',
          code: `const counter = {
  count: 0,
  // Arrow function loses this binding
  increment: _____ { this.count++; }  // Won't work!
};`,
          blanks: ['() =>'],
          explanation: 'Arrow functions tidak punya this binding sendiri'
        }
      ],
      caseStudy: {
        id: 'cs-methods',
        title: 'Object with Methods',
        description: 'Buat object bankAccount dengan properties balance dan methods: deposit(amount), withdraw(amount), getBalance(). Use proper this binding.',
        expectedOutput: { balance: 150, status: "success" },
        initialCode: `function createBankAccount(initialBalance) {
  return {
    // Add properties and methods
    // Use this properly
  };
}`,
        testFunction: `
          const account = createBankAccount(100);
          account.deposit(100);
          account.withdraw(50);
          return account.getBalance() === 150;
        `
      }
    },
    {
      id: 'function-constructor',
      title: 'Function Constructor',
      content: `Constructor functions adalah cara lama membuat objects sebelum ES6 classes. Diawali dengan huruf kapital dan dipanggil dengan 'new'.

**How it Works:**
1. new membuat empty object
2. this menunjuk ke object baru
3. Function body dieksekusi
4. Object dikembalikan implisit

**Prototype:**
Methods sebaiknya ditambahkan ke prototype untuk efisiensi memory.`,
      analogies: 'Constructor function seperti cetakan kue. Sekali buat cetakan, bisa bikin banyak kue dengan bentuk sama tapi isi berbeda.',
      examples: [
        `// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add method to prototype
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

const john = new Person("John", 30);`,
        `// Without new - ERROR!
const jane = Person("Jane", 25);  // undefined
// this would be global/undefined`
      ],
      fillInBlanks: [
        {
          id: 'fc1',
          code: `_____ Car(brand, model) {
  this.brand = brand;
  this.model = model;
}
const myCar = _____ Car("Toyota", "Camry");`,
          blanks: ['function', 'new'],
          explanation: 'Constructor function dengan new keyword'
        },
        {
          id: 'fc2',
          code: `function User(name) {
  _____.name = name;
  _____.isActive = true;
}`,
          blanks: ['this', 'this'],
          explanation: 'Use this dalam constructor'
        },
        {
          id: 'fc3',
          code: `function Product(name, price) {
  this.name = name;
  this.price = price;
}
Product._____.getInfo = function() {
  return this.name + ": $" + this.price;
};`,
          blanks: ['prototype'],
          explanation: 'Add method ke prototype'
        },
        {
          id: 'fc4',
          code: `function Student(id) {
  _____ (!(this instanceof Student)) {
    return _____ Student(id);
  }
  this.id = id;
}`,
          blanks: ['if', 'new'],
          explanation: 'Guard against missing new'
        }
      ],
      caseStudy: {
        id: 'cs-constructor',
        title: 'Constructor Function',
        description: 'Buat constructor function Vehicle dengan properties type dan speed. Add method accelerate ke prototype yang menambah speed by 10.',
        expectedOutput: { type: "car", speed: 30 },
        initialCode: `function Vehicle(type, initialSpeed) {
  // Setup properties
}

// Add accelerate method to prototype

// Test: const car = new Vehicle("car", 0);
// car.accelerate(); car.accelerate(); car.accelerate();`,
        testFunction: `
          const car = new Vehicle("car", 0);
          car.accelerate();
          car.accelerate();
          car.accelerate();
          return car.type === "car" && car.speed === 30;
        `
      }
    },
    {
      id: 'optional-chaining',
      title: 'Optional Chaining',
      content: `Optional chaining (?.) memungkinkan safe access ke nested properties, bahkan jika intermediate property tidak ada.

**Syntax:**
- obj?.prop - property access
- obj?.[expr] - bracket notation
- func?.() - function call

**Benefits:**
- Hindari "Cannot read property of undefined" errors
- Code lebih bersih tanpa banyak if checks`,
      analogies: 'Optional chaining seperti GPS dengan rute alternatif. Jika jalan utama tidak ada, tidak error tapi return undefined dengan aman.',
      examples: [
        `const user = {
  name: "John",
  address: {
    street: "123 Main St"
  }
};

// Safe access
console.log(user.address?.street);  // "123 Main St"
console.log(user.phone?.number);    // undefined (no error!)`,
        `// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city;`
      ],
      fillInBlanks: [
        {
          id: 'oc1',
          code: `const obj = { a: { b: 1 } };
console.log(obj_____.b);     // 1
console.log(obj_____.c);     // undefined`,
          blanks: ['?.a', '?.x'],
          explanation: 'Optional chaining untuk safe access'
        },
        {
          id: 'oc2',
          code: `const user = { getName: () => "John" };
const name = user.getName_____();
const age = user.getAge_____();  // undefined`,
          blanks: ['?', '?'],
          explanation: 'Optional chaining untuk function calls'
        },
        {
          id: 'oc3',
          code: `const arr = [1, 2, 3];
const item = arr_____[10];  // undefined, not error`,
          blanks: ['?'],
          explanation: 'Optional chaining dengan bracket notation'
        },
        {
          id: 'oc4',
          code: `const config = {};
const value = config_____.settings_____.theme _____ "default";`,
          blanks: ['?', '?', '??'],
          explanation: 'Combine optional chaining dengan nullish coalescing'
        }
      ],
      caseStudy: {
        id: 'cs-optional',
        title: 'Safe Navigation',
        description: 'Buat fungsi getNestedValue yang safely mengakses nested property path seperti "user.profile.email" menggunakan optional chaining.',
        expectedOutput: "john@example.com",
        initialCode: `function getNestedValue(obj, path) {
  // Split path dan gunakan optional chaining
  // Handle deep nesting safely
}`,
        testFunction: `
          const data = { user: { profile: { email: "john@example.com" } } };
          const email = getNestedValue(data, "user.profile.email");
          const missing = getNestedValue(data, "user.settings.theme");
          return email === "john@example.com" && missing === undefined;
        `
      }
    },
    {
      id: 'methods-of-primitives',
      title: 'Methods of Primitives',
      content: `Primitives (string, number, boolean) bisa punya methods karena JavaScript temporarily wraps them dalam object wrappers.

**Object Wrappers:**
- String untuk string primitives
- Number untuk numbers
- Boolean untuk booleans

**Auto-boxing:**
JavaScript otomatis converts primitive ke object saat accessing methods, lalu converts back.`,
      analogies: 'Primitives dengan methods seperti superhero dengan kostum. Saat butuh kekuatan (methods), mereka pakai kostum (wrapper), selesai misi langsung lepas kostum.',
      examples: [
        `// String methods
"hello".toUpperCase();  // "HELLO"
"hello".length;         // 5

// Number methods
(123).toString();       // "123"
(3.14159).toFixed(2);   // "3.14"

// Behind the scenes
// "hello".toUpperCase() becomes:
// new String("hello").toUpperCase()`,
        `// Explicit wrapper (rarely needed)
const strObj = new String("hello");
typeof strObj;  // "object"
const strPrim = "hello";
typeof strPrim;  // "string"`
      ],
      fillInBlanks: [
        {
          id: 'mp1',
          code: `const str = "javascript";
console.log(str._____());      // "JAVASCRIPT"
console.log(str._____(0, 4));  // "java"`,
          blanks: ['toUpperCase', 'slice'],
          explanation: 'String primitive methods'
        },
        {
          id: 'mp2',
          code: `const num = 123.456;
console.log(num._____(2));     // "123.46"
console.log(num._____());      // "123.456"`,
          blanks: ['toFixed', 'toString'],
          explanation: 'Number primitive methods'
        },
        {
          id: 'mp3',
          code: `const bool = true;
console.log(bool._____());     // "true"
console.log(typeof bool);      // "_____"`,
          blanks: ['toString', 'boolean'],
          explanation: 'Boolean remains primitive even with methods'
        },
        {
          id: 'mp4',
          code: `// Wrapper objects
const strObj = _____ String("hi");
const numObj = _____ Number(42);
typeof strObj;  // "object"`,
          blanks: ['new', 'new'],
          explanation: 'Explicit wrapper objects (rarely used)'
        }
      ],
      caseStudy: {
        id: 'cs-primitives',
        title: 'Working with Primitive Methods',
        description: 'Buat fungsi formatCurrency yang menerima number dan mengembalikan formatted string dengan 2 decimal places dan currency symbol.',
        expectedOutput: "$1,234.56",
        initialCode: `function formatCurrency(amount) {
  // Use number methods untuk format
  // Add currency symbol
  // Handle thousands separator
}`,
        testFunction: `
          return formatCurrency(1234.567) === "$1,234.57" &&
                 formatCurrency(99.9) === "$99.90";
        `
      }
    },
    {
      id: 'arrays',
      title: 'Arrays',
      content: `Array adalah ordered collection yang bisa menyimpan multiple values dari any type.

**Creating Arrays:**
- Array literal: []
- Array constructor: new Array()
- Array.from() dan Array.of()

**Array Properties:**
- length: jumlah elements
- Index-based (0-based)
- Dynamic size

**Array adalah Object:**
Arrays adalah special objects dengan numeric keys dan length property.`,
      analogies: 'Array seperti rak buku dengan nomor. Setiap buku punya nomor posisi (index), dan kamu tahu berapa total buku (length).',
      examples: [
        `// Creating arrays
const arr1 = [1, 2, 3];
const arr2 = new Array(3);  // [empty × 3]
const arr3 = Array.of(1, 2, 3);

// Accessing elements
arr1[0];     // 1
arr1.length; // 3

// Mixed types
const mixed = [1, "hello", true, { a: 1 }];`,
        `// Array is object
const arr = [1, 2, 3];
typeof arr;  // "object"
Array.isArray(arr);  // true

// Add properties (not recommended)
arr.customProp = "value";`
      ],
      fillInBlanks: [
        {
          id: 'ar1',
          code: `const fruits = ["apple", "banana", "_____"];
console.log(fruits[_____]);  // "banana"
console.log(fruits._____);   // 3`,
          blanks: ['orange', '1', 'length'],
          explanation: 'Array creation and access'
        },
        {
          id: 'ar2',
          code: `const arr = _____ Array(5);
arr[0] = 10;
console.log(arr.length);  // _____`,
          blanks: ['new', '5'],
          explanation: 'Array constructor creates empty slots'
        },
        {
          id: 'ar3',
          code: `const nums = [1, 2, 3];
nums[_____] = 4;  // Add element
nums._____ = 2;   // Truncate array`,
          blanks: ['3', 'length'],
          explanation: 'Add element and truncate with length'
        },
        {
          id: 'ar4',
          code: `const arr = [1, "two", true];
Array._____(arr);        // true
_____ arr;               // "object"`,
          blanks: ['isArray', 'typeof'],
          explanation: 'Check if array and typeof'
        }
      ],
      caseStudy: {
        id: 'cs-arrays',
        title: 'Array Manipulation',
        description: 'Buat fungsi arrayOperations yang membuat array, menambah elements di awal dan akhir, remove element, dan return array info.',
        expectedOutput: { array: [0, 1, 2, 3], length: 4, first: 0, last: 3 },
        initialCode: `function arrayOperations() {
  // Create array [1, 2, 3]
  // Add 0 at beginning
  // Add 4 at end
  // Remove last element
  // Return object with array info
}`,
        testFunction: `
          const result = arrayOperations();
          return JSON.stringify(result.array) === '[0,1,2,3]' &&
                 result.length === 4 && result.first === 0 && result.last === 3;
        `
      }
    },
    {
      id: 'array-methods',
      title: 'Array Methods',
      content: `JavaScript arrays memiliki banyak built-in methods untuk manipulasi data.

**Mutating Methods (mengubah original):**
- push/pop: add/remove dari end
- shift/unshift: add/remove dari beginning
- splice: add/remove di anywhere
- sort, reverse: ordering

**Non-mutating Methods (return new array):**
- concat, slice: combine/extract
- map, filter, reduce: transformation
- find, includes, indexOf: searching`,
      analogies: 'Array methods seperti tools di toolbox. Ada yang mengubah benda asli (mutating) seperti gergaji, ada yang membuat copy (non-mutating) seperti scanner.',
      examples: [
        `// Mutating methods
const arr = [1, 2, 3];
arr.push(4);        // [1,2,3,4]
arr.pop();          // [1,2,3]
arr.unshift(0);     // [0,1,2,3]
arr.shift();        // [1,2,3]`,
        `// Non-mutating methods
const arr = [1, 2, 3];
arr.concat([4, 5]); // [1,2,3,4,5]
arr.slice(1, 3);    // [2,3]
arr.map(x => x * 2); // [2,4,6]
// Original unchanged`
      ],
      fillInBlanks: [
        {
          id: 'am1',
          code: `const arr = [1, 2, 3];
arr._____(4);      // Add to end
arr._____(0);      // Add to beginning
console.log(arr);  // [0,1,2,3,4]`,
          blanks: ['push', 'unshift'],
          explanation: 'Push dan unshift methods'
        },
        {
          id: 'am2',
          code: `const nums = [1, 2, 3, 4, 5];
const evens = nums._____(x => x % 2 === 0);
const doubled = nums._____(x => x * 2);`,
          blanks: ['filter', 'map'],
          explanation: 'Filter dan map untuk transformation'
        },
        {
          id: 'am3',
          code: `const arr = [1, 2, 3];
const found = arr._____(x => x > 2);     // 3
const index = arr._____(2);              // 1`,
          blanks: ['find', 'indexOf'],
          explanation: 'Find element dan get index'
        },
        {
          id: 'am4',
          code: `const arr = [1, 2, 3, 4, 5];
arr._____(1, 2);   // Remove 2 items from index 1
// arr is now [1, 4, 5]`,
          blanks: ['splice'],
          explanation: 'Splice untuk remove items'
        }
      ],
      caseStudy: {
        id: 'cs-arraymethods',
        title: 'Array Method Chaining',
        description: 'Buat fungsi processNumbers yang menerima array numbers, filter even numbers, double them, lalu sum hasilnya.',
        expectedOutput: 20,
        initialCode: `function processNumbers(numbers) {
  // Filter even numbers
  // Double them with map
  // Sum with reduce
  // Return total
}`,
        testFunction: `
          const result = processNumbers([1, 2, 3, 4, 5, 6]);
          // Even: [2,4,6], Doubled: [4,8,12], Sum: 24
          return result === 24;
        `
      }
    },
    {
      id: 'map',
      title: 'Map',
      content: `Map adalah collection of key-value pairs dimana keys bisa ANY type (tidak hanya strings seperti object).

**Map vs Object:**
- Map: keys bisa any type (objects, functions, primitives)
- Object: keys hanya strings/symbols
- Map: size property, iterable
- Map: better performance untuk frequent additions/deletions

**Map Methods:**
- set(key, value): add/update
- get(key): retrieve value
- has(key): check existence
- delete(key): remove
- clear(): remove all`,
      analogies: 'Map seperti dictionary yang super fleksibel. Kalau object dictionary biasa hanya bisa pakai kata (string) sebagai key, Map bisa pakai apa saja - bahkan object atau function.',
      examples: [
        `// Creating and using Map
const map = new Map();
map.set('name', 'John');
map.set(1, 'number key');
map.set(true, 'boolean key');

const objKey = { id: 1 };
map.set(objKey, 'object as key!');

console.log(map.get(objKey));  // 'object as key!'
console.log(map.size);         // 4`,
        `// Map iteration
for (const [key, value] of map) {
  console.log(key, value);
}

// Convert to array
const entries = [...map];
const keys = [...map.keys()];
const values = [...map.values()];`
      ],
      fillInBlanks: [
        {
          id: 'map1',
          code: `const map = _____ Map();
map._____(\'id\', 123);
map._____(\'name\', \'Alice\');
console.log(map._____(\'name\'));  // "Alice"`,
          blanks: ['new', 'set', 'set', 'get'],
          explanation: 'Basic Map operations'
        },
        {
          id: 'map2',
          code: `const map = new Map();
const obj = { a: 1 };
map.set(_____, 'object key');
console.log(map._____(obj));  // true`,
          blanks: ['obj', 'has'],
          explanation: 'Object as Map key'
        },
        {
          id: 'map3',
          code: `const map = new Map([
  ['a', 1],
  ['b', 2]
]);
map._____(\'a\');  // Remove key 'a'
console.log(map._____);  // 1`,
          blanks: ['delete', 'size'],
          explanation: 'Delete and size'
        },
        {
          id: 'map4',
          code: `const map = new Map();
map.set(1, 'one').set(2, 'two');
for (const [_____, _____] of map) {
  // Iterate over entries
}`,
          blanks: ['key', 'value'],
          explanation: 'Map iteration with destructuring'
        }
      ],
      caseStudy: {
        id: 'cs-map',
        title: 'Cache Implementation',
        description: 'Buat fungsi createCache menggunakan Map untuk menyimpan hasil expensive calculations. Include methods: set, get, has, clear.',
        expectedOutput: { cached: true, value: 100 },
        initialCode: `function createCache() {
  // Create Map for cache
  // Return object with methods:
  // - set(key, value)
  // - get(key)
  // - has(key)
  // - clear()
}`,
        testFunction: `
          const cache = createCache();
          cache.set('result', 100);
          return cache.has('result') && cache.get('result') === 100;
        `
      }
    },
    {
      id: 'set',
      title: 'Set',
      content: `Set adalah collection of UNIQUE values. Setiap value hanya bisa muncul sekali dalam Set.

**Set Features:**
- Automatic deduplication
- Any type of values
- Maintains insertion order
- Fast lookups

**Set Methods:**
- add(value): add value
- has(value): check existence
- delete(value): remove value
- clear(): remove all
- size: get count`,
      analogies: 'Set seperti tas koleksi stiker - tidak ada duplikat. Kalau coba masukin stiker yang sama, tetap cuma ada satu.',
      examples: [
        `// Creating Set
const set = new Set([1, 2, 3, 3, 3]);
console.log(set.size);  // 3 (no duplicates)

// Add values
set.add(4);
set.add(4);  // Ignored
console.log(set.size);  // 4`,
        `// Useful for deduplication
const numbers = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(numbers)];
console.log(unique);  // [1, 2, 3]

// Check membership
set.has(2);  // true`
      ],
      fillInBlanks: [
        {
          id: 'set1',
          code: `const set = _____ Set();
set._____(1);
set._____(2);
set._____(1);  // Duplicate ignored
console.log(set._____);  // 2`,
          blanks: ['new', 'add', 'add', 'add', 'size'],
          explanation: 'Set creation and uniqueness'
        },
        {
          id: 'set2',
          code: `const arr = [1, 1, 2, 2, 3, 3];
const unique = [..._____ _____(arr)];
console.log(unique);  // [1, 2, 3]`,
          blanks: ['new', 'Set'],
          explanation: 'Array deduplication with Set'
        },
        {
          id: 'set3',
          code: `const set = new Set(['a', 'b', 'c']);
console.log(set._____('b'));  // true
set._____('b');
console.log(set.size);  // 2`,
          blanks: ['has', 'delete'],
          explanation: 'Check and delete from Set'
        },
        {
          id: 'set4',
          code: `const set = new Set([1, 2, 3]);
for (const _____ of set) {
  console.log(_____);
}
set._____();  // Remove all`,
          blanks: ['value', 'value', 'clear'],
          explanation: 'Iterate and clear Set'
        }
      ],
      caseStudy: {
        id: 'cs-set',
        title: 'Unique Values Tracker',
        description: 'Buat fungsi trackUniqueVisitors yang menggunakan Set untuk track unique visitor IDs. Return count dan ability to check if visitor exists.',
        expectedOutput: { count: 3, hasVisitor: true },
        initialCode: `function trackUniqueVisitors() {
  // Create Set for visitors
  // Return object with methods:
  // - addVisitor(id)
  // - hasVisited(id)
  // - getCount()
  // - reset()
}`,
        testFunction: `
          const tracker = trackUniqueVisitors();
          tracker.addVisitor('user1');
          tracker.addVisitor('user2');
          tracker.addVisitor('user1'); // Duplicate
          tracker.addVisitor('user3');
          return tracker.getCount() === 3 && tracker.hasVisited('user1');
        `
      }
    }
  ]
};

// JavaScript Module 4: Advanced Functions & Dates
export const jsModule4: Module = {
  id: 'js-advanced-1',
  title: 'JavaScript Advanced Functions',
  topics: [
    {
      id: 'date',
      title: 'Date',
      content: `Date object digunakan untuk bekerja dengan tanggal dan waktu di JavaScript.

**Creating Dates:**
- new Date(): current date/time
- new Date(milliseconds): from Unix epoch
- new Date(dateString): parse string
- new Date(year, month, day, hours, minutes, seconds, ms)

**Important:**
- Months are 0-indexed (0 = January)
- getTime() returns milliseconds since epoch
- toISOString() for standard format`,
      analogies: 'Date object seperti kalender digital dengan stopwatch. Bisa tunjukkan tanggal/waktu sekarang atau waktu spesifik, dan bisa hitung selisih waktu.',
      examples: [
        `// Creating dates
const now = new Date();
const specific = new Date('2024-01-15');
const epoch = new Date(0);

// Get components
now.getFullYear();  // 2024
now.getMonth();     // 0-11
now.getDate();      // 1-31
now.getDay();       // 0-6 (Sun-Sat)`,
        `// Format and calculate
const date = new Date();
date.toISOString();  // "2024-01-15T10:30:00.000Z"
date.toLocaleDateString();  // "1/15/2024"

// Time difference
const diff = date2 - date1;  // milliseconds`
      ],
      fillInBlanks: [
        {
          id: 'date1',
          code: `const now = _____ Date();
const year = now._____();
const month = now._____() + 1;  // Add 1 for human-readable`,
          blanks: ['new', 'getFullYear', 'getMonth'],
          explanation: 'Create date and get components'
        },
        {
          id: 'date2',
          code: `const date = new Date(2024, _____, 15);  // January 15, 2024
const timestamp = date._____();  // Milliseconds since epoch`,
          blanks: ['0', 'getTime'],
          explanation: 'Remember: months are 0-indexed'
        },
        {
          id: 'date3',
          code: `const date = new Date();
const iso = date._____();  // ISO format
const locale = date._____('en-US');  // Locale format`,
          blanks: ['toISOString', 'toLocaleDateString'],
          explanation: 'Date formatting methods'
        },
        {
          id: 'date4',
          code: `const start = new Date('2024-01-01');
const end = new Date('2024-01-10');
const days = (end - start) / (1000 * 60 * 60 * _____);`,
          blanks: ['24'],
          explanation: 'Calculate days between dates'
        }
      ],
      caseStudy: {
        id: 'cs-date',
        title: 'Age Calculator',
        description: 'Buat fungsi calculateAge yang menerima birthdate string dan menghitung umur dalam years, months, dan days.',
        expectedOutput: { years: 25, months: 3, days: 15 },
        initialCode: `function calculateAge(birthdate) {
  // Parse birthdate
  // Calculate difference from now
  // Return object with years, months, days
}`,
        testFunction: `
          const age = calculateAge('1999-01-01');
          return age.years > 0 && age.months >= 0 && age.days >= 0;
        `
      }
    },
    {
      id: 'json',
      title: 'JSON',
      content: `JSON (JavaScript Object Notation) adalah format untuk data exchange. JavaScript punya built-in methods untuk JSON.

**JSON Methods:**
- JSON.stringify(): Convert JS object to JSON string
- JSON.parse(): Convert JSON string to JS object

**JSON Rules:**
- Keys must be strings (double quotes)
- Values: string, number, boolean, null, object, array
- No functions, undefined, symbols, dates (converted to string)

**Replacer & Reviver:**
Optional functions untuk customize conversion.`,
      analogies: 'JSON seperti bahasa universal untuk data. Seperti Google Translate untuk objects - bisa ubah ke text untuk dikirim, lalu ubah balik jadi object.',
      examples: [
        `// Stringify
const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);
// '{"name":"John","age":30}'

// Parse
const parsed = JSON.parse(json);
console.log(parsed.name);  // "John"`,
        `// Pretty print
JSON.stringify(obj, null, 2);

// Custom replacer
JSON.stringify(obj, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});`
      ],
      fillInBlanks: [
        {
          id: 'json1',
          code: `const data = { id: 1, name: "Alice" };
const json = JSON._____(_____);
console.log(typeof json);  // "string"`,
          blanks: ['stringify', 'data'],
          explanation: 'Convert object to JSON string'
        },
        {
          id: 'json2',
          code: `const json = '{"x":10,"y":20}';
const obj = JSON._____(json);
console.log(obj._____);  // 10`,
          blanks: ['parse', 'x'],
          explanation: 'Parse JSON string to object'
        },
        {
          id: 'json3',
          code: `const obj = { a: 1, b: undefined, c: function() {} };
const json = JSON.stringify(obj);
// Result: '{"_____":1}'  // b and c are omitted`,
          blanks: ['a'],
          explanation: 'undefined and functions are omitted'
        },
        {
          id: 'json4',
          code: `// Pretty print
const obj = { name: "Bob", age: 25 };
JSON.stringify(obj, _____, _____);  // null replacer, 2 spaces`,
          blanks: ['null', '2'],
          explanation: 'Pretty print with indentation'
        }
      ],
      caseStudy: {
        id: 'cs-json',
        title: 'Deep Clone with JSON',
        description: 'Buat fungsi deepClone yang menggunakan JSON untuk deep copy objects. Handle edge cases seperti dates.',
        expectedOutput: { data: { nested: { value: 42 } }, cloned: true },
        initialCode: `function deepClone(obj) {
  // Use JSON for deep clone
  // Handle special cases
  // Return cloned object
}`,
        testFunction: `
          const original = { a: 1, b: { c: 2 } };
          const cloned = deepClone(original);
          cloned.b.c = 3;
          return original.b.c === 2 && cloned.b.c === 3;
        `
      }
    },
    {
      id: 'recursive',
      title: 'Recursive Functions',
      content: `Recursive function adalah function yang memanggil dirinya sendiri. Digunakan untuk solve problems yang bisa dipecah menjadi smaller subproblems.

**Components:**
- Base case: kondisi stop recursion
- Recursive case: function calls itself dengan modified parameters

**Common Uses:**
- Tree/nested structure traversal
- Mathematical calculations (factorial, fibonacci)
- Divide and conquer algorithms

**Warning:** Stack overflow jika no base case atau infinite recursion.`,
      analogies: 'Recursion seperti Russian doll (matryoshka). Buka satu boneka, ada boneka lebih kecil di dalam. Terus buka sampai boneka terkecil (base case).',
      examples: [
        `// Factorial
function factorial(n) {
  if (n <= 1) return 1;  // Base case
  return n * factorial(n - 1);  // Recursive case
}

factorial(5);  // 5 * 4 * 3 * 2 * 1 = 120`,
        `// Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Tree sum
function sumTree(node) {
  if (!node) return 0;
  return node.value + 
         sumTree(node.left) + 
         sumTree(node.right);
}`
      ],
      fillInBlanks: [
        {
          id: 'rec1',
          code: `function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    _____;  // Stop recursion
  }
  console.log(n);
  _____(n - 1);  // Recursive call
}`,
          blanks: ['return', 'countdown'],
          explanation: 'Base case and recursive call'
        },
        {
          id: 'rec2',
          code: `function sum(n) {
  if (n === 1) return _____;  // Base case
  return n + _____(_____ - 1);  // Recursive case
}`,
          blanks: ['1', 'sum', 'n'],
          explanation: 'Sum from 1 to n'
        },
        {
          id: 'rec3',
          code: `function power(base, exp) {
  if (exp === 0) return _____;
  return base * _____(base, exp - 1);
}`,
          blanks: ['1', 'power'],
          explanation: 'Calculate power recursively'
        },
        {
          id: 'rec4',
          code: `function deepCount(arr) {
  let count = 0;
  for (let item of arr) {
    if (Array._____(item)) {
      count += _____(item);
    } else {
      count++;
    }
  }
  return count;
}`,
          blanks: ['isArray', 'deepCount'],
          explanation: 'Count nested array elements'
        }
      ],
      caseStudy: {
        id: 'cs-recursive',
        title: 'Flatten Nested Array',
        description: 'Buat fungsi flatten yang recursively flattens nested array menjadi single-level array.',
        expectedOutput: [1, 2, 3, 4, 5],
        initialCode: `function flatten(arr) {
  // Base case: check if array
  // Recursive case: flatten nested arrays
  // Return flattened array
}`,
        testFunction: `
          const nested = [1, [2, [3, [4]], 5]];
          const flat = flatten(nested);
          return JSON.stringify(flat) === '[1,2,3,4,5]';
        `
      }
    },
    {
      id: 'lexical-environment',
      title: 'Lexical Environment',
      content: `Lexical Environment adalah tempat variabel "hidup" dan bagaimana mereka diakses. Ini fundamental untuk understanding closures.

**Simple Explanation:**
Setiap function "remembers" dimana dia dibuat. Function bisa access variables dari tempat dia dibuat, even after outer function selesai.

**Closure:**
Function yang punya access ke outer variables, even after outer function returns.

**Practical Use:**
- Private variables
- Event handlers
- Callbacks`,
      analogies: 'Lexical environment seperti backpack. Function bawa backpack berisi variables dari tempat dia "lahir". Kemana pun function pergi, backpack tetap dibawa.',
      examples: [
        `// Closure example
function outer(x) {
  // x lives in outer's lexical environment
  
  function inner(y) {
    // inner can access x
    return x + y;
  }
  
  return inner;
}

const addFive = outer(5);
addFive(3);  // 8 - still remembers x=5!`,
        `// Private variable with closure
function counter() {
  let count = 0;  // Private
  
  return {
    increment: () => ++count,
    get: () => count
  };
}`
      ],
      fillInBlanks: [
        {
          id: 'lex1',
          code: `function makeAdder(x) {
  return function(y) {
    return _____ + _____;  // Access outer variable
  };
}
const add10 = makeAdder(10);`,
          blanks: ['x', 'y'],
          explanation: 'Closure accessing outer variable'
        },
        {
          id: 'lex2',
          code: `function createCounter() {
  let count = 0;
  return function() {
    return ++_____;  // Modify outer variable
  };
}`,
          blanks: ['count'],
          explanation: 'Closure modifying outer variable'
        },
        {
          id: 'lex3',
          code: `function secret() {
  const password = "123";
  return {
    check: (input) => input === _____
  };
}`,
          blanks: ['password'],
          explanation: 'Private variable with closure'
        },
        {
          id: 'lex4',
          code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(_____), 100);
}
// Outputs: 0, 1, 2 (let creates new lexical environment)`,
          blanks: ['i'],
          explanation: 'let creates block scope'
        }
      ],
      caseStudy: {
        id: 'cs-lexical',
        title: 'Private State with Closures',
        description: 'Buat fungsi createBankAccount dengan private balance dan public methods menggunakan closures.',
        expectedOutput: { balance: 150, transactions: 3 },
        initialCode: `function createBankAccount(initial) {
  // Private variables
  // Return public methods that access private state
  // Use closures properly
}`,
        testFunction: `
          const account = createBankAccount(100);
          account.deposit(100);
          account.withdraw(50);
          return account.getBalance() === 150 && 
                 account.getTransactionCount() === 3;
        `
      }
    },
    {
      id: 'function-is-object',
      title: 'Function is Object',
      content: `Di JavaScript, functions adalah first-class objects. Mereka punya properties dan methods.

**Function Properties:**
- name: function name
- length: number of parameters
- Custom properties bisa ditambahkan

**Function Methods:**
- call(): invoke dengan specific this
- apply(): like call, but args as array
- bind(): create new function dengan fixed this

**Functions as Values:**
Can be stored, passed, returned like any value.`,
      analogies: 'Function seperti Swiss Army knife yang pintar. Bukan cuma alat (bisa dipanggil), tapi juga object (punya properties) yang bisa dibawa kemana-mana.',
      examples: [
        `// Function properties
function greet(name) {
  console.log("Hello " + name);
}

greet.name;    // "greet"
greet.length;  // 1 (parameter count)

// Custom property
greet.callCount = 0;
greet.callCount++;`,
        `// Function methods
function introduce() {
  return "I'm " + this.name;
}

const person = { name: "Alice" };
introduce.call(person);  // "I'm Alice"

const boundIntro = introduce.bind(person);
boundIntro();  // "I'm Alice"`
      ],
      fillInBlanks: [
        {
          id: 'fio1',
          code: `function add(a, b) { return a + b; }
console.log(add._____);   // "add"
console.log(add._____);   // 2`,
          blanks: ['name', 'length'],
          explanation: 'Function name and parameter count'
        },
        {
          id: 'fio2',
          code: `function greet() {
  return "Hi " + this.name;
}
const obj = { name: "Bob" };
greet._____(obj);  // "Hi Bob"`,
          blanks: ['call'],
          explanation: 'Call with specific this'
        },
        {
          id: 'fio3',
          code: `function multiply(a, b) {
  return a * b;
}
const double = multiply._____(null, 2);
double(5);  // 10`,
          blanks: ['bind'],
          explanation: 'Bind creates partial function'
        },
        {
          id: 'fio4',
          code: `function counter() {
  counter._____ = (counter.count || 0) + 1;
  return counter._____;
}`,
          blanks: ['count', 'count'],
          explanation: 'Function with custom property'
        }
      ],
      caseStudy: {
        id: 'cs-funcobj',
        title: 'Function with State',
        description: 'Buat fungsi memo yang remembers previous results menggunakan function properties untuk caching.',
        expectedOutput: { result: 120, cached: true },
        initialCode: `function createMemo(fn) {
  // Create wrapper function
  // Store cache as function property
  // Check cache before computing
}`,
        testFunction: `
          const factorial = createMemo(n => n <= 1 ? 1 : n * factorial(n - 1));
          factorial(5);  // Computes
          const cached = factorial(5);  // From cache
          return factorial.cache && factorial.cache['5'] === 120;
        `
      }
    },
    {
      id: 'setTimeout-setInterval',
      title: 'SetTimeout and SetInterval',
      content: `Timer functions untuk scheduling code execution.

**setTimeout:**
- Execute once after delay
- Returns timer ID
- clearTimeout() to cancel

**setInterval:**
- Execute repeatedly with interval
- Returns timer ID
- clearInterval() to stop

**Important:**
- Delay in milliseconds
- Minimum delay ~4ms in browsers
- Not guaranteed exact timing`,
      analogies: 'setTimeout seperti alarm sekali bunyi. setInterval seperti alarm berulang. clearTimeout/clearInterval seperti tombol stop alarm.',
      examples: [
        `// setTimeout
const timerId = setTimeout(() => {
  console.log("After 2 seconds");
}, 2000);

// Cancel if needed
clearTimeout(timerId);`,
        `// setInterval
let count = 0;
const intervalId = setInterval(() => {
  console.log(++count);
  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);`,
        `// Pass arguments
setTimeout((name, age) => {
  console.log(name, age);
}, 1000, "John", 30);`
      ],
      fillInBlanks: [
        {
          id: 'st1',
          code: `const id = _____(() => {
  console.log("Delayed");
}, _____);  // 3 seconds`,
          blanks: ['setTimeout', '3000'],
          explanation: 'setTimeout with 3 second delay'
        },
        {
          id: 'st2',
          code: `const id = _____(() => {
  console.log("Repeat");
}, 1000);
// Stop after 5 seconds
setTimeout(() => _____(id), 5000);`,
          blanks: ['setInterval', 'clearInterval'],
          explanation: 'setInterval and clear'
        },
        {
          id: 'st3',
          code: `let count = 0;
const timer = setInterval(() => {
  if (++count === 3) {
    _____(timer);
  }
}, 100);`,
          blanks: ['clearInterval'],
          explanation: 'Stop interval from inside'
        },
        {
          id: 'st4',
          code: `// Recursive setTimeout (better than setInterval)
function repeat() {
  console.log("tick");
  _____(repeat, 1000);
}
repeat();`,
          blanks: ['setTimeout'],
          explanation: 'Recursive setTimeout pattern'
        }
      ],
      caseStudy: {
        id: 'cs-timers',
        title: 'Debounce Implementation',
        description: 'Buat fungsi debounce yang delays execution sampai berhenti calling untuk specified time.',
        expectedOutput: { called: 1, value: "final" },
        initialCode: `function debounce(func, delay) {
  // Track timeout ID
  // Clear previous timeout
  // Set new timeout
  // Return debounced function
}`,
        testFunction: `
          let callCount = 0;
          const fn = debounce(() => callCount++, 100);
          fn(); fn(); fn();  // Called 3 times quickly
          // After delay, should only execute once
          return new Promise(resolve => {
            setTimeout(() => resolve(callCount === 1), 150);
          });
        `
      }
    },
    {
      id: 'decorators-forwarding',
      title: 'Decorators and Forwarding',
      content: `Decorator adalah wrapper function yang adds/modifies behavior tanpa changing original function.

**Decorator Pattern:**
- Takes function as input
- Returns new function
- New function calls original dengan modifications

**Common Decorators:**
- Logging
- Caching
- Timing
- Access control

**Call Forwarding:**
Using call/apply to preserve context.`,
      analogies: 'Decorator seperti bungkus kado. Function asli tetap sama, tapi dibungkus dengan fitur tambahan yang cantik.',
      examples: [
        `// Simple decorator
function logDecorator(func) {
  return function(...args) {
    console.log('Calling:', func.name);
    const result = func.apply(this, args);
    console.log('Result:', result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = logDecorator(add);`,
        `// Cache decorator
function cache(func) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`
      ],
      fillInBlanks: [
        {
          id: 'dec1',
          code: `function timeDecorator(func) {
  return function(..._____) {
    console.time('execution');
    const result = func._____(this, args);
    console.timeEnd('execution');
    return _____;
  };
}`,
          blanks: ['args', 'apply', 'result'],
          explanation: 'Timing decorator'
        },
        {
          id: 'dec2',
          code: `function once(func) {
  let called = false;
  let result;
  return function(...args) {
    if (!_____) {
      result = func._____(this, args);
      called = true;
    }
    return result;
  };
}`,
          blanks: ['called', 'apply'],
          explanation: 'Call once decorator'
        },
        {
          id: 'dec3',
          code: `function delay(func, ms) {
  return function(...args) {
    _____(()_____ => {
      func.apply(this, args);
    }, ms);
  };
}`,
          blanks: ['setTimeout', '=>'],
          explanation: 'Delay decorator'
        },
        {
          id: 'dec4',
          code: `// Preserve context with arrow function
const decorator = (func) => {
  return function(...args) {
    // this is preserved
    return func._____(_____, args);
  };
};`,
          blanks: ['call', 'this'],
          explanation: 'Preserve this context'
        }
      ],
      caseStudy: {
        id: 'cs-decorator',
        title: 'Rate Limiter Decorator',
        description: 'Buat decorator yang limits function calls to max N times per second.',
        expectedOutput: { allowed: 3, blocked: 2 },
        initialCode: `function rateLimit(func, maxCalls, perSeconds) {
  // Track call timestamps
  // Check if within limit
  // Allow or block call
  // Return decorated function
}`,
        testFunction: `
          let callCount = 0;
          const limited = rateLimit(() => callCount++, 2, 1);
          for (let i = 0; i < 5; i++) limited();
          return callCount === 2;  // Only 2 calls allowed per second
        `
      }
    },
    {
      id: 'bind',
      title: 'Bind',
      content: `bind() method creates new function dengan fixed this value dan optionally fixed arguments.

**Syntax:**
func.bind(thisArg, arg1, arg2, ...)

**Features:**
- Returns new function (doesn't call immediately)
- Permanently sets this
- Can pre-set arguments (partial application)
- Cannot be overridden by call/apply

**Use Cases:**
- Event handlers
- Callbacks
- Partial functions
- Method borrowing`,
      analogies: 'bind() seperti kontrak permanen. Sekali function di-bind ke object, dia akan selalu ingat object itu sebagai this, seperti ikatan yang tidak bisa dilepas.',
      examples: [
        `// Basic bind
const person = {
  name: "Alice",
  greet() {
    return "Hi, I'm " + this.name;
  }
};

const greet = person.greet;
greet();  // undefined (lost this)

const boundGreet = person.greet.bind(person);
boundGreet();  // "Hi, I'm Alice"`,
        `// Partial application
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
double(5);  // 10
double(10); // 20`
      ],
      fillInBlanks: [
        {
          id: 'bind1',
          code: `const obj = { x: 10 };
function getX() {
  return this.x;
}
const boundGetX = getX._____(obj);
boundGetX();  // 10`,
          blanks: ['bind'],
          explanation: 'Basic bind usage'
        },
        {
          id: 'bind2',
          code: `function greet(greeting, name) {
  return greeting + ", " + name;
}
const sayHello = greet._____(null, "_____");
sayHello("Alice");  // "Hello, Alice"`,
          blanks: ['bind', 'Hello'],
          explanation: 'Partial application with bind'
        },
        {
          id: 'bind3',
          code: `const calculator = {
  value: 0,
  add(n) { this.value += n; }
};
const add = calculator.add;
const boundAdd = add._____(calculator);
boundAdd(5);`,
          blanks: ['bind'],
          explanation: 'Bind method to object'
        },
        {
          id: 'bind4',
          code: `// Event handler
const button = {
  label: "Click",
  onClick() { console.log(this.label); }
};
element.addEventListener('click', button.onClick._____(button));`,
          blanks: ['bind'],
          explanation: 'Bind for event handlers'
        }
      ],
      caseStudy: {
        id: 'cs-bind',
        title: 'Function Currying with Bind',
        description: 'Implement curry function using bind untuk transform function(a,b,c) menjadi function(a)(b)(c).',
        expectedOutput: 6,
        initialCode: `function curry(func) {
  // Use bind recursively
  // Return curried function
  // Handle all arguments
}`,
        testFunction: `
          function sum(a, b, c) { return a + b + c; }
          const curriedSum = curry(sum);
          return curriedSum(1)(2)(3) === 6;
        `
      }
    },
    {
      id: 'arrow-functions-advanced',
      title: 'Further Exploration of Arrow Functions',
      content: `Arrow functions punya beberapa karakteristik khusus yang membedakan dari regular functions.

**No own this:**
- Inherit this from enclosing scope
- Cannot be changed with call/apply/bind

**No arguments object:**
- Use rest parameters instead

**Cannot be constructor:**
- No new keyword
- No prototype property

**Always anonymous:**
- Can be assigned to variable for naming

**Best for:**
- Callbacks
- Array methods
- Short functions`,
      analogies: 'Arrow function seperti anak yang selalu ikut orangtua. Tidak punya rumah sendiri (no own this), selalu refer ke rumah orangtua (lexical this).',
      examples: [
        `// Lexical this
const obj = {
  name: "Object",
  regularMethod() {
    setTimeout(function() {
      console.log(this.name);  // undefined
    }, 100);
    
    setTimeout(() => {
      console.log(this.name);  // "Object"
    }, 100);
  }
};`,
        `// No arguments object
const regular = function() {
  return arguments.length;
};

const arrow = (...args) => {
  return args.length;  // Use rest parameters
};

// Cannot be constructor
const Arrow = () => {};
// new Arrow();  // Error!`
      ],
      fillInBlanks: [
        {
          id: 'afa1',
          code: `const obj = {
  value: 10,
  getValue: () => _____.value,  // undefined!
  getValueCorrect() {
    return _____.value;  // 10
  }
};`,
          blanks: ['this', 'this'],
          explanation: 'Arrow function no own this'
        },
        {
          id: 'afa2',
          code: `// Convert to arrow function
const sum = (_____)  _____ {
  return args.reduce((a, b) => a + b, 0);
};`,
          blanks: ['...args', '=>'],
          explanation: 'Rest parameters in arrow function'
        },
        {
          id: 'afa3',
          code: `const obj = {
  count: 0,
  increment() {
    setInterval(_____ => {
      this.count++;  // Works with arrow
    }, 1000);
  }
};`,
          blanks: ['()'],
          explanation: 'Arrow function in callback preserves this'
        },
        {
          id: 'afa4',
          code: `// Short syntax
const double = x _____ x * 2;
const getObj = () _____ ({ key: "value" });  // Return object`,
          blanks: ['=>', '=>'],
          explanation: 'Implicit return and object literal'
        }
      ],
      caseStudy: {
        id: 'cs-arrow-advanced',
        title: 'Event Handler with Arrow Functions',
        description: 'Create class-like object dengan methods using arrow functions untuk preserve this in event handlers.',
        expectedOutput: { count: 3, context: "correct" },
        initialCode: `function createCounter() {
  return {
    count: 0,
    // Use arrow functions appropriately
    // Regular methods where needed
    // Handle this correctly
  };
}`,
        testFunction: `
          const counter = createCounter();
          counter.increment();
          counter.increment();
          counter.increment();
          return counter.count === 3;
        `
      }
    },
    {
      id: 'prototypal-inheritance',
      title: 'Prototypal Inheritance',
      content: `JavaScript uses prototypal inheritance. Objects dapat inherit properties dari other objects melalui prototype chain.

**Prototype Chain:**
- Setiap object punya hidden [[Prototype]]
- Accessed via __proto__ atau Object.getPrototypeOf()
- Jika property tidak ada, search di prototype

**Object.create():**
Creates new object dengan specified prototype.

**Inheritance Methods:**
- Object.setPrototypeOf()
- Constructor.prototype
- class extends (ES6)`,
      analogies: 'Prototype chain seperti family tree. Kalau kamu tidak punya sesuatu, tanya orangtua. Kalau orangtua tidak punya, tanya kakek, dan seterusnya.',
      examples: [
        `// Prototype chain
const animal = {
  eats: true,
  walk() {
    return "Walking...";
  }
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats);  // true (inherited)
console.log(dog.walk()); // "Walking..." (inherited)`,
        `// Check prototype
const proto = Object.getPrototypeOf(dog);
console.log(proto === animal);  // true

// Property lookup
console.log('barks' in dog);  // true (own)
console.log('eats' in dog);   // true (inherited)
console.log(dog.hasOwnProperty('eats'));  // false`
      ],
      fillInBlanks: [
        {
          id: 'pi1',
          code: `const parent = { a: 1 };
const child = Object._____(parent);
child.b = 2;
console.log(child.a);  // 1 (inherited)`,
          blanks: ['create'],
          explanation: 'Create object with prototype'
        },
        {
          id: 'pi2',
          code: `const obj = { x: 10 };
const proto = Object._____(obj);
console.log(proto === Object._____);  // true for plain object`,
          blanks: ['getPrototypeOf', 'prototype'],
          explanation: 'Get object prototype'
        },
        {
          id: 'pi3',
          code: `const animal = { type: "animal" };
const cat = {};
Object._____(cat, animal);
console.log(cat.type);  // "animal"`,
          blanks: ['setPrototypeOf'],
          explanation: 'Set prototype of existing object'
        },
        {
          id: 'pi4',
          code: `const base = { getValue() { return this.value; } };
const derived = Object.create(base);
derived._____ = 42;
derived.getValue();  // 42`,
          blanks: ['value'],
          explanation: 'Method inherited, property on instance'
        }
      ],
      caseStudy: {
        id: 'cs-proto',
        title: 'Prototype Chain Implementation',
        description: 'Implement inheritance chain: Vehicle -> Car -> ElectricCar menggunakan prototypal inheritance.',
        expectedOutput: { type: "electric", wheels: 4, battery: true },
        initialCode: `function createInheritanceChain() {
  // Create Vehicle prototype
  // Create Car inheriting from Vehicle
  // Create ElectricCar inheriting from Car
  // Return instance with proper chain
}`,
        testFunction: `
          const tesla = createInheritanceChain();
          return tesla.type === "electric" && 
                 tesla.wheels === 4 && 
                 tesla.battery === true &&
                 tesla.hasOwnProperty('battery');
        `
      }
    },
    {
      id: 'f-prototype',
      title: 'F.prototype',
      content: `Constructor functions punya property prototype yang digunakan untuk set [[Prototype]] dari instances.

**F.prototype:**
- Property pada constructor function
- Becomes [[Prototype]] of instances
- Default: object dengan constructor property

**Pattern:**
1. Define constructor function
2. Add methods to F.prototype
3. Create instances with new
4. Instances inherit from F.prototype`,
      analogies: 'F.prototype seperti blueprint warisan. Constructor function punya blueprint yang otomatis dikasih ke semua "anak" (instances) yang dibuat dengan new.',
      examples: [
        `// Constructor with prototype
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

const john = new Person("John");
john.greet();  // "Hi, I'm John"

// Check prototype
Object.getPrototypeOf(john) === Person.prototype;  // true`,
        `// Default prototype
function Foo() {}
console.log(Foo.prototype);  // { constructor: Foo }

// Instances
const f1 = new Foo();
console.log(f1.constructor === Foo);  // true`
      ],
      fillInBlanks: [
        {
          id: 'fp1',
          code: `function Dog(name) {
  this.name = name;
}
Dog._____.bark = function() {
  return this.name + " barks!";
};`,
          blanks: ['prototype'],
          explanation: 'Add method to prototype'
        },
        {
          id: 'fp2',
          code: `function Cat() {}
const fluffy = _____ Cat();
Object.getPrototypeOf(fluffy) === Cat._____;  // true`,
          blanks: ['new', 'prototype'],
          explanation: 'Instance prototype from constructor'
        },
        {
          id: 'fp3',
          code: `function Vehicle() {}
Vehicle.prototype.type = "vehicle";
const car = new Vehicle();
car._____ = "car";  // Override
console.log(car.type);  // "car"`,
          blanks: ['type'],
          explanation: 'Override inherited property'
        },
        {
          id: 'fp4',
          code: `function User(name) {
  this.name = name;
}
// Check constructor
const u = new User("Bob");
u._____ === User;  // true`,
          blanks: ['constructor'],
          explanation: 'Constructor property reference'
        }
      ],
      caseStudy: {
        id: 'cs-fprototype',
        title: 'Prototype Method Sharing',
        description: 'Create Shape constructor dengan shared methods di prototype. Subclasses Circle dan Rectangle inherit methods.',
        expectedOutput: { circleArea: 78.54, rectArea: 50 },
        initialCode: `function Shape() {
  // Base shape constructor
}

// Add shared methods to Shape.prototype

function Circle(radius) {
  // Circle specific
}

function Rectangle(width, height) {
  // Rectangle specific
}

// Set up inheritance`,
        testFunction: `
          const circle = new Circle(5);
          const rect = new Rectangle(5, 10);
          return Math.abs(circle.getArea() - 78.54) < 0.01 &&
                 rect.getArea() === 50;
        `
      }
    }
  ]
};

// JavaScript Module 5: Prototypes & Async
export const jsModule5: Module = {
  id: 'js-advanced-2',
  title: 'JavaScript Prototypes & Async',
  topics: [
    {
      id: 'native-prototypes',
      title: 'Native Prototypes',
      content: `Built-in objects seperti Array, String, Number punya native prototypes dengan useful methods.

**Native Prototypes:**
- Object.prototype: root prototype
- Array.prototype: array methods
- String.prototype: string methods
- Function.prototype: function methods

**Extending Native Prototypes:**
Possible but generally discouraged (dapat cause conflicts).

**Polyfills:**
Adding missing methods untuk older browsers.`,
      analogies: 'Native prototypes seperti toolkit bawaan pabrik. Array punya toolkit untuk list operations, String punya toolkit untuk text manipulation.',
      examples: [
        `// Native methods from prototypes
const arr = [1, 2, 3];
arr.map(x => x * 2);  // From Array.prototype

const str = "hello";
str.toUpperCase();    // From String.prototype

// Check prototype chain
arr.__proto__ === Array.prototype;  // true
arr.__proto__.__proto__ === Object.prototype;  // true`,
        `// Adding to native prototype (avoid in production!)
String.prototype.reverse = function() {
  return this.split('').reverse().join('');
};

"hello".reverse();  // "olleh"`
      ],
      fillInBlanks: [
        {
          id: 'np1',
          code: `// Prototype chain
const arr = [];
arr.__proto__ === Array._____;  // true
Array.prototype.__proto__ === Object._____;  // true`,
          blanks: ['prototype', 'prototype'],
          explanation: 'Native prototype chain'
        },
        {
          id: 'np2',
          code: `// All objects inherit from Object.prototype
const obj = {};
'toString' in obj;  // true
obj._____ === Object.prototype.toString;  // true`,
          blanks: ['toString'],
          explanation: 'Inherited from Object.prototype'
        },
        {
          id: 'np3',
          code: `// Polyfill example
if (!Array.prototype._____) {
  Array.prototype._____ = function(predicate) {
    // Implementation
  };
}`,
          blanks: ['find', 'find'],
          explanation: 'Adding polyfill for missing method'
        },
        {
          id: 'np4',
          code: `// Check native method exists
const hasMap = 'map' _____ Array.prototype;
const hasIncludes = Array.prototype._____ !== undefined;`,
          blanks: ['in', 'includes'],
          explanation: 'Check for native method support'
        }
      ],
      caseStudy: {
        id: 'cs-native',
        title: 'Safe Prototype Extension',
        description: 'Create safe method untuk extend native prototype only if not exists. Add Array.prototype.last() method.',
        expectedOutput: 5,
        initialCode: `function safeExtend(prototype, methodName, implementation) {
  // Check if method exists
  // Add only if missing
  // Make non-enumerable
}

// Add Array.prototype.last()`,
        testFunction: `
          safeExtend(Array.prototype, 'last', function() {
            return this[this.length - 1];
          });
          return [1, 2, 3, 4, 5].last() === 5;
        `
      }
    },
    {
      id: 'class',
      title: 'Class',
      content: `ES6 Classes adalah syntactic sugar over prototypal inheritance. Lebih clean dan familiar untuk OOP developers.

**Class Syntax:**
- class keyword
- constructor method
- Instance methods
- Static methods
- Getters/Setters

**Under the Hood:**
Classes tetap menggunakan prototypes, just dengan syntax yang lebih nice.`,
      analogies: 'Class seperti upgrade dari constructor function. Sama-sama bikin objects, tapi class punya syntax yang lebih rapi dan modern, seperti smartphone vs flip phone.',
      examples: [
        `// Class declaration
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Instance method
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
  
  // Static method
  static species() {
    return "Homo sapiens";
  }
}

const john = new Person("John", 30);
john.greet();  // "Hi, I'm John"
Person.species();  // "Homo sapiens"`,
        `// Getters and Setters
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
  
  set radius(value) {
    if (value < 0) throw new Error("Invalid radius");
    this._radius = value;
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'cl1',
          code: `_____ Rectangle {
  _____(width, height) {
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}`,
          blanks: ['class', 'constructor'],
          explanation: 'Basic class syntax'
        },
        {
          id: 'cl2',
          code: `class Counter {
  constructor() {
    this.count = 0;
  }
  
  increment() {
    _____.count++;
  }
  
  _____ getCount() {
    return this.count;
  }
}`,
          blanks: ['this', 'get'],
          explanation: 'Instance method and getter'
        },
        {
          id: 'cl3',
          code: `class Math {
  _____ add(a, b) {
    return a + b;
  }
  
  _____ PI = 3.14159;
}
// Call: Math.add(2, 3)`,
          blanks: ['static', 'static'],
          explanation: 'Static method and property'
        },
        {
          id: 'cl4',
          code: `class User {
  #privateField = "secret";
  
  getPrivate() {
    return this._____;
  }
}`,
          blanks: ['#privateField'],
          explanation: 'Private field access'
        }
      ],
      caseStudy: {
        id: 'cs-class',
        title: 'Class with Full Features',
        description: 'Create BankAccount class dengan constructor, private balance, methods, getters/setters, dan static method.',
        expectedOutput: { balance: 150, type: "savings" },
        initialCode: `class BankAccount {
  // Private field for balance
  // Constructor
  // Methods: deposit, withdraw
  // Getter for balance
  // Static method for account types
}`,
        testFunction: `
          const account = new BankAccount(100);
          account.deposit(100);
          account.withdraw(50);
          return account.balance === 150 && 
                 BankAccount.getTypes().includes("savings");
        `
      }
    },
    {
      id: 'class-inheritance',
      title: 'Class Inheritance',
      content: `Classes dapat inherit dari other classes menggunakan extends keyword.

**Inheritance Features:**
- extends: inherit dari parent class
- super(): call parent constructor
- super.method(): call parent method
- Override methods

**Prototype Chain:**
Child.prototype.__proto__ === Parent.prototype

**Multiple Inheritance:**
Not directly supported, use mixins.`,
      analogies: 'Class inheritance seperti family business. Anak (child class) inherit bisnis orangtua (parent class), bisa tambah fitur baru atau modifikasi yang ada.',
      examples: [
        `// Basic inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks\`;
  }
  
  wagTail() {
    return "Wagging tail";
  }
}`,
        `// Method override and super
class Cat extends Animal {
  speak() {
    const base = super.speak();
    return base + " - Meow!";
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'ci1',
          code: `class Vehicle {
  constructor(type) {
    this.type = type;
  }
}

class Car _____ Vehicle {
  constructor(type, brand) {
    _____(type);
    this.brand = brand;
  }
}`,
          blanks: ['extends', 'super'],
          explanation: 'Basic inheritance'
        },
        {
          id: 'ci2',
          code: `class Parent {
  greet() {
    return "Hello";
  }
}

class Child extends Parent {
  greet() {
    return _____.greet() + " World";
  }
}`,
          blanks: ['super'],
          explanation: 'Call parent method with super'
        },
        {
          id: 'ci3',
          code: `class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Circle _____ Shape {
  constructor(color, radius) {
    _____(color);
    this._____ = radius;
  }
}`,
          blanks: ['extends', 'super', 'radius'],
          explanation: 'Extend and add properties'
        },
        {
          id: 'ci4',
          code: `// Check inheritance
class A {}
class B extends A {}
const b = new B();
b _____ B;  // true
b _____ A;  // true`,
          blanks: ['instanceof', 'instanceof'],
          explanation: 'instanceof checks inheritance'
        }
      ],
      caseStudy: {
        id: 'cs-inheritance',
        title: 'Class Hierarchy',
        description: 'Create Employee base class dan Manager child class. Manager dapat add team members dan has higher level.',
        expectedOutput: { name: "Alice", level: 2, teamSize: 3 },
        initialCode: `class Employee {
  // Base employee with name and level
}

class Manager extends Employee {
  // Extends Employee
  // Add team management
  // Override level
}`,
        testFunction: `
          const manager = new Manager("Alice");
          manager.addTeamMember("Bob");
          manager.addTeamMember("Charlie");
          manager.addTeamMember("David");
          return manager.name === "Alice" && 
                 manager.level === 2 && 
                 manager.getTeamSize() === 3;
        `
      }
    },
    {
      id: 'static-properties-methods',
      title: 'Static Properties and Methods',
      content: `Static members belong ke class itself, bukan ke instances.

**Static Members:**
- Called on class, not instance
- No access to instance data (no this)
- Shared across all instances
- Often used for utilities

**Static Inheritance:**
Child class inherits parent's static methods.

**Use Cases:**
- Factory methods
- Utilities
- Constants
- Counters`,
      analogies: 'Static methods seperti customer service perusahaan. Tidak peduli customer mana yang telepon, semua dapat service yang sama dari satu tempat.',
      examples: [
        `class MathUtils {
  static PI = 3.14159;
  
  static area(radius) {
    return this.PI * radius ** 2;
  }
  
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Call on class, not instance
MathUtils.area(5);
MathUtils.PI;`,
        `// Instance counter with static
class User {
  static count = 0;
  
  constructor(name) {
    this.name = name;
    User.count++;
  }
  
  static getCount() {
    return User.count;
  }
}`
      ],
      fillInBlanks: [
        {
          id: 'sp1',
          code: `class Config {
  _____ API_URL = "https://api.example.com";
  
  _____ getEndpoint(path) {
    return this.API_URL + path;
  }
}
// Config.getEndpoint("/users")`,
          blanks: ['static', 'static'],
          explanation: 'Static property and method'
        },
        {
          id: 'sp2',
          code: `class Counter {
  static #count = 0;
  
  constructor() {
    _____.#count++;
  }
  
  static getTotal() {
    return _____.#count;
  }
}`,
          blanks: ['Counter', 'Counter'],
          explanation: 'Access static from constructor'
        },
        {
          id: 'sp3',
          code: `class Factory {
  static create(type) {
    return new _____(type);
  }
}

class Product {
  constructor(type) {
    this.type = type;
  }
}`,
          blanks: ['Product'],
          explanation: 'Static factory method'
        },
        {
          id: 'sp4',
          code: `class Parent {
  static value = "parent";
}

class Child _____ Parent {
  static getValue() {
    return _____.value;
  }
}`,
          blanks: ['extends', 'super'],
          explanation: 'Inherit static members'
        }
      ],
      caseStudy: {
        id: 'cs-static',
        title: 'Static Factory Pattern',
        description: 'Create Color class dengan static factory methods untuk create common colors dan static validation.',
        expectedOutput: { r: 255, g: 0, b: 0, valid: true },
        initialCode: `class Color {
  // Constructor with RGB
  // Static factory methods: red(), green(), blue()
  // Static validation: isValid(r, g, b)
}`,
        testFunction: `
          const red = Color.red();
          return red.r === 255 && red.g === 0 && red.b === 0 &&
                 Color.isValid(255, 0, 0) === true &&
                 Color.isValid(256, 0, 0) === false;
        `
      }
    },
    {
      id: 'private-properties',
      title: 'Private Properties',
      content: `Private fields dan methods are truly private - cannot be accessed outside class.

**Private Members:**
- Prefix dengan # symbol
- Only accessible within class
- Not inherited
- Cannot be accessed via bracket notation

**Convention:**
- _ prefix adalah convention (not truly private)
- # adalah real private (ES2022)

**Encapsulation:**
Hide internal implementation details.`,
      analogies: 'Private properties seperti diary dengan gembok. Hanya pemilik (class itself) yang punya kunci untuk baca/tulis.',
      examples: [
        `class BankAccount {
  #balance = 0;  // Private field
  
  constructor(initial) {
    this.#balance = initial;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  getBalance() {
    return this.#balance;
  }
  
  #log(action) {  // Private method
    console.log(\`Action: \${action}\`);
  }
}

const account = new BankAccount(100);
// account.#balance;  // Error! Private field`,
        `// Old convention (not truly private)
class OldStyle {
  constructor() {
    this._private = "not really private";
  }
}

const old = new OldStyle();
old._private;  // Still accessible`
      ],
      fillInBlanks: [
        {
          id: 'pp1',
          code: `class Secret {
  _____message = "hidden";
  
  reveal() {
    return this._____message;
  }
}`,
          blanks: ['#', '#'],
          explanation: 'Private field with # prefix'
        },
        {
          id: 'pp2',
          code: `class Counter {
  _____count = 0;
  
  increment() {
    this._____count++;
  }
  
  get value() {
    return this._____count;
  }
}`,
          blanks: ['#', '#', '#'],
          explanation: 'Private field accessed internally'
        },
        {
          id: 'pp3',
          code: `class User {
  #id;
  
  constructor(id) {
    this._____ = id;
  }
  
  _____validate() {  // Private method
    return this.#id > 0;
  }
}`,
          blanks: ['#id', '#'],
          explanation: 'Private field and method'
        },
        {
          id: 'pp4',
          code: `class Data {
  #secret = "private";
  _convention = "not private";
}

const d = new Data();
// d._____ // Error!
d._____;  // OK (convention only)`,
          blanks: ['#secret', '_convention'],
          explanation: 'True private vs convention'
        }
      ],
      caseStudy: {
        id: 'cs-private',
        title: 'Encapsulated State',
        description: 'Create Password class dengan private storage, validation, dan public methods untuk safe interaction.',
        expectedOutput: { valid: true, strength: "strong" },
        initialCode: `class Password {
  // Private field for password
  // Private method for validation
  // Public methods: set, check, getStrength
}`,
        testFunction: `
          const pwd = new Password();
          pwd.set("SecurePass123!");
          return pwd.check("SecurePass123!") === true &&
                 pwd.getStrength() === "strong" &&
                 !pwd.hasOwnProperty('#password');
        `
      }
    },
    {
      id: 'instanceof',
      title: 'Instanceof',
      content: `instanceof operator checks if object is instance of specific class atau constructor function.

**How it Works:**
Checks prototype chain untuk constructor's prototype.

**Syntax:**
object instanceof Constructor

**Returns:**
true if object's prototype chain contains Constructor.prototype

**Works With:**
- Classes
- Constructor functions
- Built-in types`,
      analogies: 'instanceof seperti checking family tree. "Apakah kamu keturunan dari keluarga ini?" Check sampai ke ancestor tertinggi.',
      examples: [
        `class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Object);  // true

const cat = new Animal();
console.log(cat instanceof Dog);     // false`,
        `// With built-in types
const arr = [1, 2, 3];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true

const date = new Date();
console.log(date instanceof Date);   // true

// Primitives
console.log("hello" instanceof String);  // false
console.log(new String("hello") instanceof String);  // true`
      ],
      fillInBlanks: [
        {
          id: 'io1',
          code: `class Car {}
const myCar = new Car();
console.log(myCar _____ Car);     // true
console.log(myCar _____ Object);  // true`,
          blanks: ['instanceof', 'instanceof'],
          explanation: 'Basic instanceof check'
        },
        {
          id: 'io2',
          code: `class A {}
class B extends A {}
const b = new B();
console.log(b instanceof _____);  // true
console.log(b instanceof _____);  // true`,
          blanks: ['B', 'A'],
          explanation: 'instanceof with inheritance'
        },
        {
          id: 'io3',
          code: `const num = 42;
const numObj = new Number(42);
console.log(num _____ Number);     // false
console.log(numObj _____ Number);  // true`,
          blanks: ['instanceof', 'instanceof'],
          explanation: 'Primitives vs wrapper objects'
        },
        {
          id: 'io4',
          code: `function isArray(obj) {
  return obj _____ _____;
}
console.log(isArray([1, 2, 3]));  // true`,
          blanks: ['instanceof', 'Array'],
          explanation: 'Check for array type'
        }
      ],
      caseStudy: {
        id: 'cs-instanceof',
        title: 'Type Checking System',
        description: 'Create type checking system using instanceof untuk validate different object types dalam application.',
        expectedOutput: { isValid: true, types: ["User", "Admin"] },
        initialCode: `class User {}
class Admin extends User {}
class Guest {}

function validateAccess(user) {
  // Check user type with instanceof
  // Return access level based on type
}`,
        testFunction: `
          const admin = new Admin();
          const guest = new Guest();
          return validateAccess(admin) === "full" &&
                 validateAccess(guest) === "limited";
        `
      }
    },
    {
      id: 'error-handling',
      title: 'Error Handling Try Catch',
      content: `Try-catch allows handling errors gracefully instead of crashing program.

**Try-Catch-Finally:**
- try: code yang might throw error
- catch: handle error if thrown
- finally: always executes (cleanup)

**Error Object:**
- name: error type
- message: error description
- stack: stack trace

**Throwing Errors:**
- throw new Error("message")
- Can throw any value`,
      analogies: 'Try-catch seperti safety net di sirkus. Kalau acrobat (code) jatuh (error), safety net (catch) menangkap supaya show tetap lanjut.',
      examples: [
        `// Basic try-catch
try {
  const data = JSON.parse("invalid json");
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Cleanup");
}`,
        `// Throwing custom errors
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.name);     // "Error"
  console.log(e.message);  // "Division by zero"
}`
      ],
      fillInBlanks: [
        {
          id: 'eh1',
          code: `_____ {
  const result = riskyOperation();
} _____ (error) {
  console.log("Failed:", error.message);
}`,
          blanks: ['try', 'catch'],
          explanation: 'Basic try-catch structure'
        },
        {
          id: 'eh2',
          code: `try {
  JSON.parse("invalid");
} catch (e) {
  console.log(e._____);  // Error type
  console.log(e._____);  // Error description
}`,
          blanks: ['name', 'message'],
          explanation: 'Error object properties'
        },
        {
          id: 'eh3',
          code: `function validate(age) {
  if (age < 0) {
    _____ new _____("Invalid age");
  }
  return true;
}`,
          blanks: ['throw', 'Error'],
          explanation: 'Throwing custom error'
        },
        {
          id: 'eh4',
          code: `try {
  doSomething();
} catch (e) {
  handleError(e);
} _____ {
  cleanup();  // Always runs
}`,
          blanks: ['finally'],
          explanation: 'Finally block for cleanup'
        }
      ],
      caseStudy: {
        id: 'cs-errors',
        title: 'Robust Error Handler',
        description: 'Create error handling system dengan custom error types dan proper error recovery.',
        expectedOutput: { handled: true, errorType: "ValidationError" },
        initialCode: `class ValidationError extends Error {
  // Custom error type
}

function processData(data) {
  // Validate and process
  // Throw appropriate errors
  // Handle errors properly
}`,
        testFunction: `
          try {
            processData({ value: -1 });
            return false;
          } catch (e) {
            return e instanceof ValidationError && 
                   e.message.includes("Invalid");
          }
        `
      }
    },
    {
      id: 'promise',
      title: 'Promise',
      content: `Promise represents eventual completion atau failure dari asynchronous operation.

**Promise States:**
- Pending: initial state
- Fulfilled: completed successfully
- Rejected: failed

**Creating Promises:**
new Promise((resolve, reject) => {})

**Consuming Promises:**
- then(): handle success
- catch(): handle error
- finally(): cleanup

**Promise adalah alternative ke callbacks untuk async code.`,
      analogies: 'Promise seperti delivery tracking. Status bisa "sedang dikirim" (pending), "sampai" (fulfilled), atau "gagal kirim" (rejected).',
      examples: [
        `// Creating Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  }, 1000);
});

// Consuming Promise
promise
  .then(result => console.log(result))
  .catch(error => console.log(error))
  .finally(() => console.log("Done"));`,
        `// Immediate resolve/reject
Promise.resolve(42).then(x => console.log(x));
Promise.reject("Error").catch(e => console.log(e));`
      ],
      fillInBlanks: [
        {
          id: 'pr1',
          code: `const promise = new _____((_resolve_, reject) => {
  setTimeout(() => {
    _____(\"Success\");
  }, 1000);
});`,
          blanks: ['Promise', 'resolve'],
          explanation: 'Create and resolve Promise'
        },
        {
          id: 'pr2',
          code: `promise
  ._____(result => console.log(result))
  ._____(error => console.log(error));`,
          blanks: ['then', 'catch'],
          explanation: 'Handle Promise result'
        },
        {
          id: 'pr3',
          code: `function delay(ms) {
  return new Promise(_____ => {
    setTimeout(_____, ms);
  });
}`,
          blanks: ['resolve', 'resolve'],
          explanation: 'Promise-based delay'
        },
        {
          id: 'pr4',
          code: `Promise._____(42)
  .then(x => x * 2)
  .then(x => console.log(x));  // 84`,
          blanks: ['resolve'],
          explanation: 'Immediate resolve'
        }
      ],
      caseStudy: {
        id: 'cs-promise',
        title: 'Promise-based API',
        description: 'Create getData function yang returns Promise. Simulate async API call dengan setTimeout.',
        expectedOutput: { data: "fetched", status: "success" },
        initialCode: `function getData(id) {
  // Return Promise
  // Simulate async operation
  // Resolve with data or reject with error
}`,
        testFunction: `
          return getData(1)
            .then(data => data.status === "success")
            .catch(() => false);
        `
      }
    },
    {
      id: 'promise-chaining',
      title: 'Promise Chaining',
      content: `Promise chaining allows sequential async operations dengan clean syntax.

**Chaining Rules:**
- Each then() returns new Promise
- Return value becomes next then's input
- Errors bubble to nearest catch
- Can mix sync and async operations

**Benefits:**
- Avoids callback hell
- Clear error handling
- Sequential flow`,
      analogies: 'Promise chaining seperti assembly line. Setiap station (then) process hasil dari station sebelumnya dan pass ke station berikutnya.',
      examples: [
        `// Promise chain
fetch('/api/user')
  .then(response => response.json())      // Parse JSON
  .then(user => fetch(\`/api/posts/\${user.id}\`))  // Get posts
  .then(response => response.json())      // Parse posts
  .then(posts => console.log(posts))      // Use posts
  .catch(error => console.error(error));  // Handle any error`,
        `// Mixed sync/async
Promise.resolve(5)
  .then(x => x * 2)        // Sync
  .then(x => {
    return new Promise(resolve => {
      setTimeout(() => resolve(x * 2), 100);  // Async
    });
  })
  .then(x => console.log(x));  // 20`
      ],
      fillInBlanks: [
        {
          id: 'pc1',
          code: `Promise.resolve(10)
  ._____(x => x + 5)
  ._____(x => x * 2)
  ._____(x => console.log(x));  // 30`,
          blanks: ['then', 'then', 'then'],
          explanation: 'Chain multiple operations'
        },
        {
          id: 'pc2',
          code: `getData()
  .then(data => {
    _____ processData(data);  // Return for chaining
  })
  .then(result => console.log(result));`,
          blanks: ['return'],
          explanation: 'Return value for next then'
        },
        {
          id: 'pc3',
          code: `promise
  .then(x => x.prop)  // Might fail
  ._____(error => {
    return "default";  // Recover from error
  })
  .then(value => console.log(value));`,
          blanks: ['catch'],
          explanation: 'Error recovery in chain'
        },
        {
          id: 'pc4',
          code: `// Conditional chaining
promise
  .then(x => {
    if (x > 10) {
      return Promise._____(x);
    }
    return Promise._____("Too small");
  });`,
          blanks: ['resolve', 'reject'],
          explanation: 'Conditional resolve/reject'
        }
      ],
      caseStudy: {
        id: 'cs-chain',
        title: 'Sequential Operations',
        description: 'Create promise chain untuk: fetch user, validate, transform, dan save. Handle errors at each step.',
        expectedOutput: { saved: true, transformed: true },
        initialCode: `function processUser(userId) {
  return fetchUser(userId)
    // Validate user
    // Transform data
    // Save to database
    // Handle errors
}`,
        testFunction: `
          return processUser(1)
            .then(result => result.saved && result.transformed)
            .catch(() => false);
        `
      }
    },
    {
      id: 'promise-error-handling',
      title: 'Promise Error Handling',
      content: `Proper error handling dalam Promises adalah crucial untuk robust applications.

**Error Propagation:**
- Errors automatically propagate down chain
- First catch() handles error
- Can re-throw to propagate further

**Error Recovery:**
- catch() can return value to recover
- Chain continues after recovery

**Best Practices:**
- Always have catch() at end
- Handle specific errors
- Log errors properly`,
      analogies: 'Promise error handling seperti sistem backup. Kalau plan A gagal, catch adalah plan B. Bisa recover dan lanjut, atau escalate ke level lebih tinggi.',
      examples: [
        `// Error propagation
promise
  .then(x => {
    throw new Error("Step 1 failed");
  })
  .then(x => {
    // Skipped
  })
  .catch(error => {
    console.log("Caught:", error.message);
    return "recovered";  // Recovery
  })
  .then(x => {
    console.log(x);  // "recovered"
  });`,
        `// Specific error handling
promise
  .then(processData)
  .catch(error => {
    if (error.name === 'ValidationError') {
      return defaultValue;
    }
    throw error;  // Re-throw other errors
  })
  .catch(handleCriticalError);`
      ],
      fillInBlanks: [
        {
          id: 'pe1',
          code: `promise
  .then(x => {
    _____ new Error("Failed");
  })
  ._____(error => {
    console.log(error.message);
  });`,
          blanks: ['throw', 'catch'],
          explanation: 'Throw and catch error'
        },
        {
          id: 'pe2',
          code: `promise
  .catch(error => {
    console.log("First catch");
    _____ error;  // Re-throw
  })
  .catch(error => {
    console.log("Second catch");
  });`,
          blanks: ['throw'],
          explanation: 'Re-throw error'
        },
        {
          id: 'pe3',
          code: `promise
  .then(riskyOperation)
  .catch(error => {
    _____ "default";  // Recover with default
  })
  .then(value => console.log(value));`,
          blanks: ['return'],
          explanation: 'Error recovery'
        },
        {
          id: 'pe4',
          code: `// Finally always runs
promise
  .then(process)
  .catch(handle)
  ._____(cleanup);`,
          blanks: ['finally'],
          explanation: 'Finally for cleanup'
        }
      ],
      caseStudy: {
        id: 'cs-perror',
        title: 'Robust Error System',
        description: 'Create error handling system dengan retry logic, specific error types, dan proper logging.',
        expectedOutput: { retries: 3, success: true },
        initialCode: `function fetchWithRetry(url, maxRetries = 3) {
  // Implement retry logic
  // Handle different error types
  // Log attempts
  // Return success or final error
}`,
        testFunction: `
          return fetchWithRetry('/api/data', 3)
            .then(result => result.success === true)
            .catch(() => false);
        `
      }
    },
    {
      id: 'promise-api',
      title: 'Promise API',
      content: `Promise class provides static methods untuk working dengan multiple promises.

**Promise.all():**
Wait for all promises (fails if any fails)

**Promise.allSettled():**
Wait for all promises (never fails)

**Promise.race():**
First promise to settle wins

**Promise.any():**
First promise to fulfill wins

These methods sangat useful untuk concurrent operations.`,
      analogies: 'Promise.all seperti waiting untuk semua teman sampai sebelum masuk bioskop. Promise.race seperti lomba lari - yang pertama sampai menang.',
      examples: [
        `// Promise.all - all must succeed
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(([user, posts, comments]) => {
  // All successful
})
.catch(error => {
  // Any failed
});`,
        `// Promise.allSettled - get all results
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3)
])
.then(results => {
  // [{status: "fulfilled", value: 1},
  //  {status: "rejected", reason: "error"},
  //  {status: "fulfilled", value: 3}]
});`,
        `// Promise.race - first wins
Promise.race([
  delay(100).then(() => "fast"),
  delay(200).then(() => "slow")
])
.then(winner => console.log(winner));  // "fast"`
      ],
      fillInBlanks: [
        {
          id: 'pa1',
          code: `Promise._____([\n  Promise.resolve(1),\n  Promise.resolve(2)\n])\n.then(values => console.log(values));  // [1, 2]`,
          blanks: ['all'],
          explanation: 'Wait for all promises'
        },
        {
          id: 'pa2',
          code: `Promise._____([\n  delay(100),\n  delay(200)\n])\n.then(winner => console.log("First done"));`,
          blanks: ['race'],
          explanation: 'First to settle wins'
        },
        {
          id: 'pa3',
          code: `Promise._____([\n  Promise.resolve(1),\n  Promise.reject(2)\n])\n.then(results => {\n  // Get all results regardless\n});`,
          blanks: ['allSettled'],
          explanation: 'Wait for all to settle'
        },
        {
          id: 'pa4',
          code: `Promise._____([\n  Promise.reject("error1"),\n  Promise.resolve("success")\n])\n.then(first => console.log(first));  // "success"`,
          blanks: ['any'],
          explanation: 'First to fulfill wins'
        }
      ],
      caseStudy: {
        id: 'cs-papi',
        title: 'Concurrent Operations',
        description: 'Implement parallel data fetching dengan proper error handling using Promise.allSettled.',
        expectedOutput: { successful: 2, failed: 1, total: 3 },
        initialCode: `function fetchMultipleAPIs(urls) {
  // Use Promise.allSettled
  // Count successes and failures
  // Return summary
}`,
        testFunction: `
          const urls = ['/api/1', '/api/2', '/api/3'];
          return fetchMultipleAPIs(urls)
            .then(result => result.total === 3);
        `
      }
    },
    {
      id: 'async-await',
      title: 'Async Await',
      content: `Async/await makes asynchronous code look synchronous, lebih readable dari promise chains.

**async function:**
- Always returns Promise
- Can use await inside

**await:**
- Pauses execution until Promise resolves
- Only works inside async function
- Returns resolved value

**Error Handling:**
Use try-catch for errors

**Benefits:**
- Cleaner syntax
- Better debugging
- Easier error handling`,
      analogies: 'Async/await seperti waiting di restoran dengan buzzer. Kamu bisa duduk santai (await) sampai buzzer bunyi (promise resolves), tidak perlu berdiri terus di counter.',
      examples: [
        `// Async function
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/user/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

// Using async function
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));`,
        `// Sequential vs Parallel
async function sequential() {
  const a = await fetchA();  // Wait
  const b = await fetchB();  // Then wait
  return [a, b];
}

async function parallel() {
  const [a, b] = await Promise.all([
    fetchA(),
    fetchB()
  ]);  // Wait together
  return [a, b];
}`
      ],
      fillInBlanks: [
        {
          id: 'aa1',
          code: `_____ function getData() {
  const result = _____ fetch('/api/data');
  return result;
}`,
          blanks: ['async', 'await'],
          explanation: 'Basic async/await'
        },
        {
          id: 'aa2',
          code: `async function process() {
  _____ {
    const data = await fetchData();
    return data;
  } _____ (error) {
    console.error(error);
  }
}`,
          blanks: ['try', 'catch'],
          explanation: 'Error handling with try-catch'
        },
        {
          id: 'aa3',
          code: `// Parallel execution
async function fetchAll() {
  const results = _____ Promise.all([
    fetch('/api/1'),
    fetch('/api/2')
  ]);
  return results;
}`,
          blanks: ['await'],
          explanation: 'Await Promise.all'
        },
        {
          id: 'aa4',
          code: `// Top-level await (modules only)
const data = _____ fetch('/api/data');
const json = _____ data.json();`,
          blanks: ['await', 'await'],
          explanation: 'Multiple awaits'
        }
      ],
      caseStudy: {
        id: 'cs-async',
        title: 'Async Data Pipeline',
        description: 'Create async function pipeline untuk fetch, validate, transform, dan save data dengan proper error handling.',
        expectedOutput: { processed: true, steps: 4 },
        initialCode: `async function dataPipeline(id) {
  // Fetch data
  // Validate
  // Transform
  // Save
  // Handle errors at each step
}`,
        testFunction: `
          return dataPipeline(1)
            .then(result => result.processed === true && result.steps === 4)
            .catch(() => false);
        `
      }
    }
  ]
};

// Complete the rest of TypeScript modules and additional modules...
// Due to length constraints, I'll continue with the remaining modules in the next part

export const additionalModules = [
  jsModule3,
  jsModule4,
  jsModule5
];