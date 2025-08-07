export interface Topic {
  id: string;
  title: string;
  content: string;
  analogies?: string;
  examples: string[];
  fillInBlanks: FillInBlank[];
  caseStudy: CaseStudy;
}

export interface FillInBlank {
  id: string;
  code: string;
  blanks: string[];
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  expectedOutput: any;
  initialCode?: string;
  testFunction: string;
}

export interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    modules: [
      {
        id: 'js-basics-1',
        title: 'JavaScript Dasar - Bagian 1',
        topics: [
          {
            id: 'strict-mode',
            title: 'Strict Mode',
            content: `Strict mode adalah fitur JavaScript yang membuat kode kita berjalan dalam mode "ketat". Mode ini membantu menangkap kesalahan umum dan mencegah penggunaan fitur yang tidak aman.

Dengan strict mode, JavaScript akan:
- Mengubah kesalahan diam menjadi error yang terlempar
- Mencegah penggunaan variabel yang belum dideklarasikan
- Melarang penghapusan properti yang tidak bisa dihapus`,
            analogies: 'Bayangkan strict mode seperti guru yang sangat teliti. Tanpa strict mode, JavaScript seperti guru yang santai yang membiarkan kesalahan kecil. Dengan strict mode, setiap kesalahan kecil akan langsung ditegur.',
            examples: [
              `// Tanpa strict mode - tidak error
x = 10; // variabel global otomatis

// Dengan strict mode - error
"use strict";
x = 10; // Error: x is not defined`,
              `"use strict";
let x = 10;
console.log(x); // 10 - bekerja normal dengan deklarasi`
            ],
            fillInBlanks: [
              {
                id: 'sb1',
                code: `_____ 
let myVar = 5;
console.log(myVar);`,
                blanks: ['"use strict";'],
                explanation: 'Tambahkan strict mode di awal file'
              },
              {
                id: 'sb2',
                code: `"use strict";
_____ x = 10;
console.log(x);`,
                blanks: ['let'],
                explanation: 'Deklarasikan variabel dengan let dalam strict mode'
              },
              {
                id: 'sb3',
                code: `function myFunc() {
  _____
  y = 20;
}`,
                blanks: ['"use strict";'],
                explanation: 'Strict mode dapat ditambahkan di dalam fungsi'
              },
              {
                id: 'sb4',
                code: `"use strict";
_____ name = "John";
_____ age = 25;`,
                blanks: ['const', 'let'],
                explanation: 'Gunakan const dan let untuk mendeklarasikan variabel'
              }
            ],
            caseStudy: {
              id: 'cs-strict',
              title: 'Implementasi Strict Mode',
              description: 'Buatlah fungsi createProfile yang menggunakan strict mode. Harus ada "use strict"; di dalam fungsi. Deklarasikan semua variabel dengan let/const (jangan biarkan undeclared). Return object dengan name dan status.',
              expectedOutput: { name: "John", status: "active" },
              initialCode: `function createProfile(userName) {
  // HARUS tambahkan "use strict"; di sini
  // Deklarasikan variabel dengan let/const, bukan langsung assign
  // Tanpa strict mode: status = "active" (tidak error)
  // Dengan strict mode: status = "active" (akan error)
  
}`,
              testFunction: `
                try {
                  const profile = createProfile("John");
                  return profile && profile.name === "John" && profile.status === "active";
                } catch (e) {
                  return false; // strict mode akan throw error jika ada undeclared variable
                }
              `
            }
          },
          {
            id: 'variables',
            title: 'Variables',
            content: `Variabel adalah tempat penyimpanan data dalam JavaScript. Ada tiga cara mendeklarasikan variabel:

1. **let** - Variabel yang bisa diubah nilainya
2. **const** - Variabel yang tidak bisa diubah (konstanta)
3. **var** - Cara lama (tidak direkomendasikan)

Perbedaan utama:
- const: nilai tidak bisa diubah setelah dideklarasi
- let: nilai bisa diubah
- Keduanya memiliki block scope (hanya berlaku dalam {})`,
            analogies: 'Variabel seperti kotak penyimpanan. const seperti kotak yang dikunci setelah diisi, let seperti kotak yang bisa dibuka-tutup, dan var seperti kotak model lama yang kurang aman.',
            examples: [
              `let age = 25;
age = 26; // OK - let bisa diubah

const name = "John";
// name = "Jane"; // Error - const tidak bisa diubah`,
              `{
  let x = 10;
  const y = 20;
} 
// console.log(x); // Error - x tidak ada di luar block`
            ],
            fillInBlanks: [
              {
                id: 'vb1',
                code: `_____ userName = "Alice";
userName = "Bob"; // Ini harus bisa diubah`,
                blanks: ['let'],
                explanation: 'Gunakan let untuk variabel yang bisa diubah'
              },
              {
                id: 'vb2',
                code: `_____ PI = 3.14159;
// PI = 3.14; // Ini tidak boleh bisa diubah`,
                blanks: ['const'],
                explanation: 'Gunakan const untuk nilai konstanta'
              },
              {
                id: 'vb3',
                code: `_____ counter = 0;
counter++;
console.log(counter); // 1`,
                blanks: ['let'],
                explanation: 'Counter perlu bisa diubah, gunakan let'
              },
              {
                id: 'vb4',
                code: `_____ MAX_SIZE = 100;
_____ currentSize = 0;`,
                blanks: ['const', 'let'],
                explanation: 'MAX_SIZE konstanta, currentSize bisa berubah'
              }
            ],
            caseStudy: {
              id: 'cs-variables',
              title: 'Deklarasi Variabel yang Tepat',
              description: 'Buatlah fungsi processOrder yang mendemonstrasikan const vs let. HARUS gunakan const untuk orderId (tidak berubah), let untuk total (akan dihitung/berubah), dan const untuk status (tidak berubah). Tunjukkan proses perhitungan, bukan hardcode.',
              expectedOutput: { orderId: "ORD-001", total: 150, status: "processed" },
              initialCode: `function processOrder() {
  // HARUS: const orderId = "ORD-001"  (tidak berubah)
  // HARUS: let total = 100  (akan berubah dengan perhitungan)
  // HARUS: total += 50  (tunjukkan perhitungan)
  // HARUS: const status = "processed"  (tidak berubah)
  // JANGAN: langsung return {orderId: "ORD-001", total: 150, ...}
  
}`,
              testFunction: `
                const order = processOrder();
                return order.orderId === "ORD-001" && order.total === 150 && order.status === "processed";
              `
            }
          },
          {
            id: 'data-types',
            title: 'Data Types',
            content: `JavaScript memiliki beberapa tipe data primitif:

1. **Number** - Angka (integer atau desimal)
2. **String** - Teks
3. **Boolean** - true atau false
4. **Undefined** - Variabel yang belum diberi nilai
5. **Null** - Nilai kosong yang disengaja
6. **Symbol** - Identifier unik
7. **BigInt** - Angka yang sangat besar

Dan tipe data kompleks:
- **Object** - Koleksi pasangan key-value
- **Array** - List terurut`,
            analogies: 'Tipe data seperti jenis wadah berbeda. Number seperti kalkulator, String seperti buku teks, Boolean seperti saklar lampu (on/off), Object seperti tas dengan banyak kantong.',
            examples: [
              `let age = 25;              // Number
let name = "John";         // String
let isStudent = true;      // Boolean
let data;                  // Undefined
let empty = null;          // Null`,
              `let person = {             // Object
  name: "Alice",
  age: 30
};
let numbers = [1, 2, 3];   // Array`
            ],
            fillInBlanks: [
              {
                id: 'dt1',
                code: `let score = _____;        // Masukkan angka apapun (contoh: 85, 100, 95)
let passed = _____;       // Masukkan true atau false`,
                blanks: ['number', 'boolean'],
                explanation: 'Masukkan nilai Number apapun dan Boolean apapun'
              },
              {
                id: 'dt2',
                code: `let message = _____;      // Masukkan string apapun dengan quotes (contoh: "Hello", "Hi")
let items = _____;        // Masukkan array apapun (contoh: [1,2,3], ["a","b"])`,
                blanks: ['string', 'array'],
                explanation: 'Masukkan nilai String apapun (dengan quotes) dan Array apapun'
              },
              {
                id: 'dt3',
                code: `// Buat object user dengan properti yang tepat
let user = {
  name: _____,     // Masukkan string nama apapun (contoh: "Alice", "John")
  age: _____,      // Masukkan angka umur apapun (contoh: 25, 30)
  isActive: _____ // Masukkan true atau false
};`,
                blanks: ['string', 'number', 'boolean'],
                explanation: 'Masukkan nilai String apapun, Number apapun, dan Boolean apapun'
              },
              {
                id: 'dt4',
                code: `let value; // Variabel yang dideklarasi tapi tidak diberi nilai
console.log(value === _____); // true - nilai default variabel
value = null; // Sekarang diberi nilai null  
console.log(value === _____); // true - nilai variabel sekarang`,
                blanks: ['undefined', 'null'],
                explanation: 'Masukkan: undefined dan null (huruf kecil semua)'
              }
            ],
            caseStudy: {
              id: 'cs-datatypes',
              title: 'Identifikasi Tipe Data',
              description: 'Buatlah fungsi analyzeData yang menerima nilai dan mengembalikan analisis lengkap: value, type (menggunakan typeof), isObject (boolean), isPrimitive (boolean). Harus bisa membedakan semua tipe data JavaScript.',
              expectedOutput: { value: "hello", type: "string", isObject: false, isPrimitive: true },
              initialCode: `function analyzeData(data) {
  // Gunakan typeof untuk mengetahui tipe data
  // Tentukan apakah object (non-primitive) atau primitive
  // Return object dengan semua informasi
}`,
              testFunction: `
                const result1 = analyzeData("hello");
                const result2 = analyzeData({name: "test"});
                return result1.type === "string" && result1.isPrimitive === true &&
                       result2.type === "object" && result2.isPrimitive === false;
              `
            }
          },
          {
            id: 'type-conversions',
            title: 'Type Conversions',
            content: `JavaScript dapat mengkonversi tipe data secara otomatis (implicit) atau manual (explicit).

**Konversi Eksplisit:**
- String() - Konversi ke string
- Number() - Konversi ke number
- Boolean() - Konversi ke boolean

**Konversi Implisit:**
JavaScript otomatis mengkonversi tipe saat diperlukan, tapi bisa menyebabkan hasil tak terduga.

**Truthy & Falsy:**
Falsy: false, 0, "", null, undefined, NaN
Truthy: Semua nilai lainnya`,
            analogies: 'Type conversion seperti menerjemahkan bahasa. Eksplisit seperti menggunakan penerjemah profesional (pasti benar), implisit seperti Google Translate (kadang aneh hasilnya).',
            examples: [
              `// Eksplisit
String(123);        // "123"
Number("456");      // 456
Boolean(1);         // true`,
              `// Implisit
"5" + 3;           // "53" (string concatenation)
"5" - 3;           // 2 (numeric subtraction)
!!"hello";         // true (double negation)`
            ],
            fillInBlanks: [
              {
                id: 'tc1',
                code: `let str = _____(123);
console.log(typeof str); // "string"`,
                blanks: ['String'],
                explanation: 'Masukkan: String (hanya nama fungsi, tanpa tanda kurung)'
              },
              {
                id: 'tc2',
                code: `let num = _____("42");
console.log(num + 8);     // 50`,
                blanks: ['Number'],
                explanation: 'Masukkan: Number, parseInt, atau parseFloat (hanya nama fungsi)'
              },
              {
                id: 'tc3',
                code: `let bool1 = _____(0);     // false
let bool2 = _____("hi");  // true`,
                blanks: ['Boolean', 'Boolean'],
                explanation: 'Masukkan: Boolean (hanya nama fungsi, untuk kedua blank)'
              },
              {
                id: 'tc4',
                code: `let result1 = "10" _____ 5;  // 5
let result2 = "10" _____ 5;  // "105"`,
                blanks: ['-', '+'],
                explanation: 'Minus memaksa konversi ke number, plus concatenate string'
              }
            ],
            caseStudy: {
              id: 'cs-typeconv',
              title: 'Konversi Tipe Data Eksplisit',
              description: 'Buatlah fungsi convertTypes yang menerima string value dan target type ("number", "boolean", "string"). Gunakan metode konversi eksplisit JavaScript seperti Number(), Boolean(), String(). Return hasil konversi atau null jika tidak valid.',
              expectedOutput: 42,
              initialCode: `function convertTypes(value, targetType) {
  // Gunakan Number(), Boolean(), String() untuk konversi eksplisit
  // Jika targetType "number", gunakan Number()
  // Jika targetType "boolean", gunakan Boolean() 
  // Jika targetType "string", gunakan String()
  // Return null jika konversi gagal (NaN untuk number)
}`,
              testFunction: `
                return convertTypes("42", "number") === 42 && 
                       convertTypes("true", "boolean") === true && 
                       convertTypes(123, "string") === "123";
              `
            }
          },
          {
            id: 'basic-math-operators',
            title: 'Basic Math Operators',
            content: `JavaScript memiliki operator matematika standar dan beberapa operator khusus.

**Operator Dasar:**
- + (penjumlahan)
- - (pengurangan)
- * (perkalian)
- / (pembagian)
- % (modulo/sisa bagi)
- ** (pangkat)

**Operator Assignment:**
- += , -= , *= , /= (operasi dan assign)

**Increment/Decrement:**
- ++ (tambah 1)
- -- (kurang 1)
- Prefix (++x) vs Postfix (x++)`,
            analogies: 'Operator seperti tombol kalkulator. += seperti tombol memory+ di kalkulator, langsung menambah dan menyimpan. Prefix ++ seperti "tambah dulu baru pakai", postfix ++ seperti "pakai dulu baru tambah".',
            examples: [
              `let a = 10;
a += 5;     // a = a + 5 = 15
a *= 2;     // a = a * 2 = 30`,
              `let x = 5;
console.log(x++);  // 5 (pakai dulu)
console.log(x);    // 6 (sudah ditambah)
console.log(++x);  // 7 (tambah dulu)`
            ],
            fillInBlanks: [
              {
                id: 'mo1',
                code: `let result = 10 _____ 3;  // 1 (sisa bagi)
let power = 2 _____ 3;    // 8`,
                blanks: ['%', '**'],
                explanation: 'Modulo dan pangkat'
              },
              {
                id: 'mo2',
                code: `let score = 100;
score _____ 20;  // score menjadi 120
score _____ 2;   // score menjadi 60`,
                blanks: ['+=', '/='],
                explanation: 'Compound assignment operators'
              },
              {
                id: 'mo3',
                code: `let a = 5;
let b = a_____;  // b = 5 (pakai dulu), a jadi 6
let c = _____a;  // c = 7 (tambah dulu), a tetap 7`,
                blanks: ['++', '++'],
                explanation: 'a++ = postfix (pakai dulu baru tambah), ++a = prefix (tambah dulu baru pakai)'
              },
              {
                id: 'mo4',
                code: `let x = 17;
let remainder = x _____ 5;  // 2
let quotient = Math.floor(x _____ 5);  // 3`,
                blanks: ['%', '/'],
                explanation: 'Sisa bagi dan hasil bagi'
              }
            ],
            caseStudy: {
              id: 'cs-math',
              title: 'Demonstrasi Operator Matematika',
              description: 'Buatlah fungsi mathOperations yang menerima dua angka dan mengembalikan object dengan hasil semua operator dasar: add (+), subtract (-), multiply (*), divide (/), modulus (%), dan power (**).',
              expectedOutput: { add: 8, subtract: 2, multiply: 15, divide: 1.67, modulus: 2, power: 125 },
              initialCode: `function mathOperations(a, b) {
  // Gunakan semua operator matematika dasar
  // Return object dengan properti add, subtract, multiply, divide, modulus, power
  // a = 5, b = 3 sebagai contoh
}`,
              testFunction: `
                const result = mathOperations(5, 3);
                return result.add === 8 && result.subtract === 2 && 
                       result.multiply === 15 && Math.abs(result.divide - 1.67) < 0.01 &&
                       result.modulus === 2 && result.power === 125;
              `
            }
          },
          {
            id: 'comparisons',
            title: 'Comparisons',
            content: `Operator perbandingan digunakan untuk membandingkan nilai dan menghasilkan boolean.

**Operator Perbandingan:**
- > (lebih besar)
- < (lebih kecil)
- >= (lebih besar sama dengan)
- <= (lebih kecil sama dengan)
- == (sama dengan, dengan type coercion)
- === (strict equality, tanpa type coercion)
- != (tidak sama dengan)
- !== (strict not equal)

**Penting:** Selalu gunakan === dan !== untuk menghindari bug dari type coercion!`,
            analogies: '== seperti membandingkan "5 apel" dengan "5 jeruk" dan bilang sama karena jumlahnya 5. === seperti membandingkan dengan teliti, "5 apel" tidak sama dengan "5 jeruk" meski jumlahnya sama.',
            examples: [
              `5 == "5"     // true (type coercion)
5 === "5"    // false (strict comparison)
null == undefined   // true
null === undefined  // false`,
              `let age = 18;
age >= 18    // true (bisa vote)
age > 18     // false`
            ],
            fillInBlanks: [
              {
                id: 'cp1',
                code: `console.log(10 _____ "10");   // true (with coercion)
console.log(10 _____ "10");   // false (strict)`,
                blanks: ['==', '==='],
                explanation: 'Loose vs strict equality'
              },
              {
                id: 'cp2',
                code: `let x = 5;
console.log(x _____ 5);    // true
console.log(x _____ 10);   // true`,
                blanks: ['>=', '<'],
                explanation: 'Greater-equal dan less than'
              },
              {
                id: 'cp3',
                code: `console.log(null _____ undefined);   // true (loose equality)
console.log(0 _____ false);          // false (strict equality)`,
                blanks: ['==', '==='],
                explanation: 'null == undefined adalah true, 0 === false adalah false (beda tipe)'
              },
              {
                id: 'cp4',
                code: `let a = "apple";
let b = "banana";
console.log(a _____ b);    // true (alphabetically)`,
                blanks: ['<'],
                explanation: 'String comparison secara alphabetical'
              }
            ],
            caseStudy: {
              id: 'cs-compare',
              title: 'Operator Perbandingan',
              description: 'Buatlah fungsi compareValues yang menerima dua nilai dan mengembalikan object dengan hasil semua operator perbandingan: equal (==), strictEqual (===), notEqual (!=), greater (>), less (<), greaterEqual (>=), lessEqual (<=).',
              expectedOutput: { equal: true, strictEqual: false, notEqual: false, greater: false, less: true, greaterEqual: false, lessEqual: true },
              initialCode: `function compareValues(a, b) {
  // Gunakan semua operator perbandingan
  // Contoh: a = "5", b = 5
  // Return object dengan hasil setiap perbandingan
}`,
              testFunction: `
                const result = compareValues("5", 5);
                return result.equal === true && result.strictEqual === false &&
                       result.notEqual === false && result.greater === false;
              `
            }
          },
          {
            id: 'ifelse',
            title: 'If-Else Statements',
            content: `Pernyataan kondisional memungkinkan kode berjalan berdasarkan kondisi tertentu.

**Struktur:**
- if - menjalankan kode jika kondisi true
- else if - kondisi tambahan jika if sebelumnya false
- else - menjalankan kode jika semua kondisi false

**Ternary Operator:**
Shorthand untuk if-else sederhana: kondisi ? nilaiTrue : nilaiFalse`,
            analogies: 'If-else seperti persimpangan jalan. If adalah "kalau lampu hijau, jalan". Else if adalah "kalau kuning, hati-hati". Else adalah "kalau merah, berhenti". Ternary seperti jalan pintas untuk keputusan sederhana.',
            examples: [
              `let score = 85;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}`,
              `// Ternary operator
let status = age >= 18 ? "adult" : "minor";`
            ],
            fillInBlanks: [
              {
                id: 'if1',
                code: `let temperature = 30;
_____ (temperature > 35) {
  console.log("Very hot");
} _____ (temperature > 25) {
  console.log("Warm");
}`,
                blanks: ['if', 'else if'],
                explanation: 'Basic if-else if structure'
              },
              {
                id: 'if2',
                code: `let isRaining = true;
let action = isRaining _____ "Take umbrella" _____ "Enjoy sunshine";`,
                blanks: ['?', ':'],
                explanation: 'Ternary operator syntax'
              },
              {
                id: 'if3',
                code: `let hour = 14;
if (hour < 12) {
  greeting = "Good morning";
} _____ _____ (hour < 18) {  // [1:else] [2:if] 
  greeting = "Good afternoon";
} _____ {                    // [3:else]
  greeting = "Good evening";
}`,
                blanks: ['else', 'if', 'else'],
                explanation: 'Urutan: else if (untuk kondisi kedua), else (untuk default)'
              },
              {
                id: 'if4',
                code: `let x = 10;
let result = x > 5 _____ x < 15 ? "in range" : "out of range";`,
                blanks: ['&&'],
                explanation: 'Kondisi kompleks dalam ternary'
              }
            ],
            caseStudy: {
              id: 'cs-ifelse',
              title: 'Struktur If-Else',
              description: 'Buatlah fungsi checkConditions yang mendemonstrasikan if-else chain lengkap. HARUS ada if untuk positif, else if untuk negatif, dan else untuk zero. JANGAN gunakan return langsung tanpa if-else structure.',
              expectedOutput: "positive",
              initialCode: `function checkConditions(number) {
  // HARUS: if (number > 0) return "positive"
  // HARUS: else if (number < 0) return "negative"  
  // HARUS: else return "zero"
  // JANGAN: return number > 0 ? "positive" : number < 0 ? "negative" : "zero"
  
}`,
              testFunction: `
                return checkConditions(5) === "positive" && 
                       checkConditions(-3) === "negative" &&
                       checkConditions(0) === "zero";
              `
            }
          }
        ]
      },
      {
        id: 'js-basics-2',
        title: 'JavaScript Dasar - Bagian 2',
        topics: [
          {
            id: 'logical-operators',
            title: 'Logical Operators',
            content: `Operator logika digunakan untuk menggabungkan atau memodifikasi kondisi boolean.

**Operator Logika:**
- && (AND) - true jika kedua kondisi true
- || (OR) - true jika salah satu kondisi true
- ! (NOT) - membalik nilai boolean

**Short-circuit Evaluation:**
- && berhenti di nilai falsy pertama
- || berhenti di nilai truthy pertama

Ini bisa digunakan untuk default values dan conditional execution.`,
            analogies: 'AND (&&) seperti pintu dengan dua kunci - butuh kedua kunci untuk buka. OR (||) seperti pintu dengan dua handle - cukup satu untuk buka. NOT (!) seperti tombol reverse - membalik keadaan.',
            examples: [
              `let age = 25;
let hasLicense = true;
let canDrive = age >= 18 && hasLicense; // true`,
              `// Short-circuit untuk default value
let name = inputName || "Guest";
// Short-circuit untuk conditional execution
isLoggedIn && showDashboard();`
            ],
            fillInBlanks: [
              {
                id: 'lo1',
                code: `let isWeekend = true;
let isHoliday = false;
let canRelax = isWeekend _____ isHoliday; // true`,
                blanks: ['||'],
                explanation: 'OR - bisa relax jika weekend ATAU holiday'
              },
              {
                id: 'lo2',
                code: `let hasTicket = true;
let hasID = true;
let canEnter = hasTicket _____ hasID; // true`,
                blanks: ['&&'],
                explanation: 'AND - butuh ticket DAN ID untuk masuk'
              },
              {
                id: 'lo3',
                code: `let isLocked = true;
let isOpen = _____isLocked; // false`,
                blanks: ['!'],
                explanation: 'NOT - kebalikan dari locked adalah open'
              },
              {
                id: 'lo4',
                code: `let userInput = "";
let value = userInput _____ "default";
console.log(value); // "default"`,
                blanks: ['||'],
                explanation: 'Short-circuit untuk default value'
              }
            ],
            caseStudy: {
              id: 'cs-logical',
              title: 'Operator Logika',
              description: 'Buatlah fungsi logicOperations yang menerima dua boolean dan mengembalikan object dengan hasil semua operator logika: and (&&), or (||), notA (!a), notB (!b).',
              expectedOutput: { and: false, or: true, notA: false, notB: true },
              initialCode: `function logicOperations(a, b) {
  // Gunakan operator logika &&, ||, !
  // Return object dengan hasil setiap operasi
  // Contoh: a = true, b = false
}`,
              testFunction: `
                const result = logicOperations(true, false);
                return result.and === false && result.or === true &&
                       result.notA === false && result.notB === true;
              `
            }
          },
          {
            id: 'nullish-coalescing',
            title: 'Nullish Coalescing Operator',
            content: `Operator ?? (nullish coalescing) adalah cara modern untuk memberikan default value, lebih presisi dari ||.

**Perbedaan dengan ||:**
- || menganggap semua falsy values (0, "", false, null, undefined, NaN) sebagai "butuh default"
- ?? hanya menganggap null dan undefined sebagai "butuh default"

Ini penting saat 0, "", atau false adalah nilai yang valid.`,
            analogies: '|| seperti security ketat yang menolak siapapun yang mencurigakan. ?? seperti security yang hanya menolak yang benar-benar tidak punya identitas (null/undefined).',
            examples: [
              `let count = 0;
// Dengan || 
console.log(count || 10);  // 10 (salah! 0 dianggap falsy)
// Dengan ??
console.log(count ?? 10);  // 0 (benar! 0 adalah nilai valid)`,
              `let username = "";
console.log(username || "Anonymous");  // "Anonymous"
console.log(username ?? "Anonymous");  // "" (string kosong valid)`
            ],
            fillInBlanks: [
              {
                id: 'nc1',
                code: `let score = 0;
let finalScore = score _____ 100;
console.log(finalScore); // 0`,
                blanks: ['??'],
                explanation: 'Gunakan ?? agar 0 tidak diganti dengan default'
              },
              {
                id: 'nc2',
                code: `let setting = null;
let value = setting _____ "default";
console.log(value); // "default"`,
                blanks: ['??'],
                explanation: 'null memicu default value dengan ??'
              },
              {
                id: 'nc3',
                code: `let enabled = false;
let status1 = enabled _____ true;   // true (|| mengganti falsy)
let status2 = enabled _____ true;   // false (?? tidak mengganti false)`,
                blanks: ['||', '??'],
                explanation: '|| mengganti false dengan true, ?? tidak mengganti false (hanya null/undefined)'
              },
              {
                id: 'nc4',
                code: `let data = undefined;
let result = data _____ {};
console.log(result); // {}`,
                blanks: ['??'],
                explanation: 'undefined memicu default dengan ??'
              }
            ],
            caseStudy: {
              id: 'cs-nullish',
              title: 'Nullish Coalescing Operator',
              description: 'Buatlah fungsi handleDefaults yang menerima object {name, age, city} dan gunakan ?? untuk memberikan default values: name = "Anonymous", age = 0, city = "Unknown". Hanya null/undefined yang diganti, bukan falsy values.',
              expectedOutput: {name: "John", age: 0, city: "Unknown"},
              initialCode: `function handleDefaults(data) {
  // Gunakan nullish coalescing operator (??) 
  // Hanya ganti null/undefined, bukan falsy values seperti 0, false, ""
  // Return object dengan defaults yang diterapkan
}`,
              testFunction: `
                const result = handleDefaults({name: "John", age: 0, city: null});
                return result.name === "John" && result.age === 0 && result.city === "Unknown";
              `
            }
          },
          {
            id: 'while-and-for',
            title: 'While and For Loops',
            content: `Loop memungkinkan kita menjalankan kode berulang kali.

**While Loop:**
Berjalan selama kondisi true. Hati-hati infinite loop!

**For Loop:**
Loop dengan counter terintegrasi (initialization; condition; increment)

**For...of:**
Iterasi nilai dalam array

**For...in:**
Iterasi properti dalam object

**Break & Continue:**
- break: keluar dari loop
- continue: skip ke iterasi berikutnya`,
            analogies: 'While loop seperti "terus jalan sampai lampu merah". For loop seperti "jalan 10 langkah". For...of seperti "kunjungi setiap toko di mall". Break seperti emergency exit, continue seperti skip lagu.',
            examples: [
              `// While
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}`,
              `// For
for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
              `// For...of
let arr = [1, 2, 3];
for (let num of arr) {
  console.log(num);
}`
            ],
            fillInBlanks: [
              {
                id: 'wf1',
                code: `let count = 0;
_____ (count < 5) {
  console.log(count);
  count++;
}`,
                blanks: ['while'],
                explanation: 'While loop syntax'
              },
              {
                id: 'wf2',
                code: `_____ (let i = 0; i < 3; _____) {
  console.log(i);
}`,
                blanks: ['for', 'i++'],
                explanation: 'For loop dengan increment'
              },
              {
                id: 'wf3',
                code: `let fruits = ["apple", "banana"];
for (let fruit _____ fruits) {
  console.log(fruit);
}`,
                blanks: ['of'],
                explanation: 'For...of untuk iterasi array'
              },
              {
                id: 'wf4',
                code: `for (let i = 0; i < 10; i++) {
  if (i === 5) _____;       // [1] Stop loop selamanya di i=5
  if (i % 2 === 0) _____;   // [2] Skip angka genap (0,2,4)
  console.log(i); // Output: 1, 3
}`,
                blanks: ['break', 'continue'],
                explanation: 'break untuk berhenti total, continue untuk skip ke iterasi berikutnya'
              }
            ],
            caseStudy: {
              id: 'cs-loops',
              title: 'Loop Implementation',
              description: 'Buatlah fungsi countPatterns yang menggunakan for loop untuk menghitung angka dari 1 sampai n, dan while loop untuk menghitung mundur dari n sampai 1. Return object dengan hasil kedua array.',
              expectedOutput: { countUp: [1, 2, 3, 4, 5], countDown: [5, 4, 3, 2, 1] },
              initialCode: `function countPatterns(n) {
  // Gunakan for loop untuk counting up
  // Gunakan while loop untuk counting down
  // Return object dengan kedua array
}`,
              testFunction: `
                const result = countPatterns(5);
                return JSON.stringify(result.countUp) === '[1,2,3,4,5]' &&
                       JSON.stringify(result.countDown) === '[5,4,3,2,1]';
              `
            }
          },
          {
            id: 'switch',
            title: 'Switch Statement',
            content: `Switch statement adalah cara elegan untuk menangani multiple kondisi berdasarkan satu nilai.

**Struktur:**
- switch(expression) - nilai yang dicek
- case value: - kondisi yang dicocokkan
- break - keluar dari switch (penting!)
- default - jika tidak ada yang cocok

**Fall-through:**
Tanpa break, eksekusi akan "jatuh" ke case berikutnya.`,
            analogies: 'Switch seperti lift dengan tombol lantai. Tekan tombol (case), lift berhenti di lantai itu (break). Tanpa break, lift terus ke lantai berikutnya. Default seperti basement - tujuan kalau tidak ada tombol yang ditekan.',
            examples: [
              `let day = 3;
switch(day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Other day");
}`,
              `// Fall-through untuk multiple cases
switch(month) {
  case 12:
  case 1:
  case 2:
    season = "Winter";
    break;
}`
            ],
            fillInBlanks: [
              {
                id: 'sw1',
                code: `let grade = 'B';
_____(grade) {
  _____ 'A':
    console.log("Excellent");
    _____;
}`,
                blanks: ['switch', 'case', 'break'],
                explanation: 'Basic switch structure'
              },
              {
                id: 'sw2',
                code: `switch(color) {
  case 'red':
  case 'blue':
    type = "primary";
    _____;
  _____:
    type = "other";
}`,
                blanks: ['break', 'default'],
                explanation: 'Multiple cases dan default'
              },
              {
                id: 'sw3',
                code: `let action = 'start';
switch(action) {
  _____ 'start':              // [1:case]
    console.log("Starting...");
    _____;                    // [2:break]
  _____ 'stop':              // [3:case]
    console.log("Stopping...");
}`,
                blanks: ['case', 'break', 'case'],
                explanation: 'case untuk mencocokkan nilai, break untuk keluar dari switch'
              },
              {
                id: 'sw4',
                code: `let num = 2;
switch(num) {
  case 1:
    result = "one";
    _____;
  case 2:
  case 3:
    result = "two or three";
    _____;
}`,
                blanks: ['break', 'break'],
                explanation: 'Break untuk setiap grup case'
              }
            ],
            caseStudy: {
              id: 'cs-switch',
              title: 'Switch Statement Structure',
              description: 'Buatlah fungsi gradeToPoints menggunakan switch statement. HARUS ada switch(grade), case untuk setiap grade, break statement, dan default case. HARUS gunakan fall-through untuk A+/A/A- (tanpa break).',
              expectedOutput: 4,
              initialCode: `function gradeToPoints(grade) {
  // HARUS: switch (grade) {
  // HARUS: case "A+": case "A": case "A-": return 4; (fall-through)
  // HARUS: case "B": return 3; break;
  // HARUS: default: return 0;
  // JANGAN: if-else chain atau ternary operator
  
}`,
              testFunction: `
                return gradeToPoints('A') === 4 && gradeToPoints('A+') === 4 &&
                       gradeToPoints('B') === 3 && gradeToPoints('F') === 0;
              `
            }
          },
          {
            id: 'basic-function',
            title: 'Basic Functions',
            content: `Function adalah blok kode yang dapat digunakan kembali. Seperti resep yang bisa dipakai berulang kali.

**Deklarasi Function:**
- Menggunakan keyword function
- Memiliki nama, parameter, dan return value
- Hoisted (bisa dipanggil sebelum deklarasi)

**Parameter vs Argument:**
- Parameter: variabel dalam definisi function
- Argument: nilai aktual saat memanggil function

**Return:**
Mengembalikan nilai dari function. Tanpa return, function mengembalikan undefined.`,
            analogies: 'Function seperti mesin. Parameter adalah lubang input, return adalah output. Seperti mesin jus: masukkan buah (parameter), keluar jus (return value).',
            examples: [
              `function greet(name) {  // name adalah parameter
  return "Hello, " + name;
}
let message = greet("Alice"); // "Alice" adalah argument`,
              `function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // 8`
            ],
            fillInBlanks: [
              {
                id: 'bf1',
                code: `_____ multiply(x, y) {
  _____ x * y;
}`,
                blanks: ['function', 'return'],
                explanation: 'Function declaration dan return'
              },
              {
                id: 'bf2',
                code: `function greet(_____, _____) {
  return "Hello, " + name + " from " + city;
}
greet("John", "NYC");`,
                blanks: ['name', 'city'],
                explanation: 'Multiple parameters'
              },
              {
                id: 'bf3',
                code: `function isEven(num) {
  _____ num % 2 === 0;
}
let result = _____(4);`,
                blanks: ['return', 'isEven'],
                explanation: 'Return boolean dan function call'
              },
              {
                id: 'bf4',
                code: `function calculate(a, b, operation) {
  if (operation === "add") {
    _____ a + b;
  }
  _____ a - b;
}`,
                blanks: ['return', 'return'],
                explanation: 'Multiple return statements'
              }
            ],
            caseStudy: {
              id: 'cs-function',
              title: 'Function Declaration',
              description: 'Buatlah function declaration (BUKAN function expression). HARUS dimulai dengan "function". HARUS ada nama function. HARUS bisa dipanggil sebelum dideklarasikan (hoisting). Return object dengan shape dan area.',
              expectedOutput: { shape: "circle", area: 78.54 },
              initialCode: `// Test hoisting - panggil function sebelum deklarasi
const testResult = calculateArea("circle", 5);

// HARUS: function calculateArea(shape, radius) { ... }
// JANGAN: const calculateArea = function() { ... }
// JANGAN: const calculateArea = () => { ... }

`,
              testFunction: `
                const result = calculateArea("circle", 5);
                return result.shape === "circle" && Math.abs(result.area - 78.54) < 0.1;
              `
            }
          },
          {
            id: 'function-expression',
            title: 'Function Expressions',
            content: `Function expression adalah cara lain membuat function dengan menyimpannya dalam variabel.

**Perbedaan dengan Declaration:**
- Tidak hoisted (harus dideklarasi dulu)
- Bisa anonymous (tanpa nama)
- Bisa disimpan dalam variabel
- Bisa dipass sebagai argument

**Anonymous Functions:**
Function tanpa nama, sering digunakan sebagai callback.`,
            analogies: 'Function declaration seperti resep di buku masak (ada nama, bisa dicari kapan saja). Function expression seperti resep di sticky note (bisa dipindah-pindah, kadang tanpa judul).',
            examples: [
              `// Function expression
const greet = function(name) {
  return "Hello, " + name;
};`,
              `// Anonymous function sebagai callback
setTimeout(function() {
  console.log("Timer done");
}, 1000);`
            ],
            fillInBlanks: [
              {
                id: 'fe1',
                code: `const square = _____(x) {
  return x * x;
};`,
                blanks: ['function'],
                explanation: 'Function expression syntax'
              },
              {
                id: 'fe2',
                code: `_____ calculate = function(a, b) {
  return a + b;
};`,
                blanks: ['const'],
                explanation: 'Simpan function dalam const'
              },
              {
                id: 'fe3',
                code: `let numbers = [1, 2, 3];
numbers.map(_____(n) {
  return n * 2;
});`,
                blanks: ['function'],
                explanation: 'Anonymous function sebagai callback'
              },
              {
                id: 'fe4',
                code: `const greet = function _____(name) {
  return "Hi, " + name;
};
// name optional untuk recursion`,
                blanks: ['sayHi'],
                explanation: 'Named function expression (optional)'
              }
            ],
            caseStudy: {
              id: 'cs-funcexpr',
              title: 'Function Expression vs Declaration',
              description: 'Buat function expression (anonymous dan named) dan bandingkan dengan function declaration. Tunjukkan perbedaan hoisting dan penggunaan.',
              expectedOutput: { declaration: "works", expression: "error", named: "works" },
              initialCode: `// Test hoisting behavior
try {
  // Panggil sebelum deklarasi
  var result1 = funcDeclaration(); // harus work
} catch(e) {
  var result1 = "error";
}

// Buat function declaration
// function funcDeclaration() { return "works"; }

// Buat function expression
// const funcExpression = function() { return "works"; };

// Buat named function expression  
// const namedFunc = function myFunc() { return "works"; };

function testBehavior() {
  // Return object dengan hasil test
}`,
              testFunction: `
                const result = testBehavior();
                return result.declaration === "works";
              `
            }
          },
          {
            id: 'basic-arrow-function',
            title: 'Basic Arrow Functions',
            content: `Arrow function adalah sintaks modern dan ringkas untuk menulis function.

**Sintaks:**
- () => {} untuk multiple statements
- () => expression untuk single expression
- Parameter tunggal tidak perlu ()
- Return implisit untuk single expression

**Kapan Menggunakan:**
- Callbacks singkat
- Array methods (map, filter, reduce)
- Event handlers sederhana`,
            analogies: 'Arrow function seperti SMS vs surat. Function biasa seperti surat formal (lengkap dengan pembuka-penutup), arrow function seperti SMS (langsung ke inti).',
            examples: [
              `// Traditional
function add(a, b) {
  return a + b;
}
// Arrow
const add = (a, b) => a + b;`,
              `// Single parameter
const double = x => x * 2;
// Multiple statements
const greet = name => {
  const msg = "Hello, " + name;
  return msg;
};`
            ],
            fillInBlanks: [
              {
                id: 'af1',
                code: `const multiply = (a, b) _____ a * b;`,
                blanks: ['=>'],
                explanation: 'Arrow function syntax'
              },
              {
                id: 'af2',
                code: `const square = x _____ x * x;`,
                blanks: ['=>'],
                explanation: 'Single parameter tanpa parentheses'
              },
              {
                id: 'af3',
                code: `const greet = _____ => {
  return "Hello, " + name;
};`,
                blanks: ['name'],
                explanation: 'Single parameter dengan body'
              },
              {
                id: 'af4',
                code: `[1, 2, 3].map(_____ _____ n * 2);`,
                blanks: ['n', '=>'],
                explanation: 'Arrow function dalam map'
              }
            ],
            caseStudy: {
              id: 'cs-arrow',
              title: 'Arrow Function Syntax',
              description: 'Buatlah object dengan berbagai arrow function: singleParam (x => x * 2), multiParam ((a, b) => a + b), noParam (() => "hello"), blockBody (x => { return x > 0 ? "positive" : "negative" }).',
              expectedOutput: { single: 10, multi: 7, none: "hello", block: "positive" },
              initialCode: `function createArrowFunctions() {
  // Buat object dengan berbagai bentuk arrow function
  const functions = {
    // singleParam: x => x * 2,
    // multiParam: (a, b) => a + b,
    // noParam: () => "hello",
    // blockBody: x => { return x > 0 ? "positive" : "negative"; }
  };
  
  // Return object dengan hasil pemanggilan
}`,
              testFunction: `
                const result = createArrowFunctions();
                return result.single === 10 && result.multi === 7 && 
                       result.none === "hello" && result.block === "positive";
              `
            }
          }
        ]
      },
      {
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
          }
        ]
      },
      {
        id: 'js-advanced-1',
        title: 'JavaScript Advanced Functions',
        topics: [
          {
            id: 'date',
            title: 'Date',
            content: `Date object digunakan untuk bekerja dengan tanggal dan waktu.

**Creating Dates:**
- new Date(): current date/time
- new Date(dateString): parse string
- Months are 0-indexed (0 = January)`,
            analogies: 'Date object seperti kalender digital.',
            examples: [`const now = new Date();`],
            fillInBlanks: [{
              id: 'date1',
              code: `const now = _____ Date();`,
              blanks: ['new'],
              explanation: 'Create new date instance'
            }],
            caseStudy: {
              id: 'cs-date',
              title: 'Date Calculator',
              description: 'Calculate days between dates',
              expectedOutput: 7,
              initialCode: 'function daysBetween(date1, date2) {}',
              testFunction: 'return daysBetween("2024-01-01", "2024-01-08") === 7;'
            }
          }
        ]
      },
      {
        id: 'js-advanced-2',
        title: 'JavaScript Prototypes & Async',
        topics: [
          {
            id: 'promise',
            title: 'Promise',
            content: `Promise represents eventual completion of async operation.

**States:** pending, fulfilled, rejected
**Usage:** new Promise((resolve, reject) => {})`,
            analogies: 'Promise seperti delivery tracking.',
            examples: [`new Promise(resolve => resolve("done"));`],
            fillInBlanks: [{
              id: 'pr1',
              code: `const promise = new _____(resolve => resolve("hi"));`,
              blanks: ['Promise'],
              explanation: 'Create Promise'
            }],
            caseStudy: {
              id: 'cs-promise',
              title: 'API Promise',
              description: 'Create promise-based function',
              expectedOutput: { success: true },
              initialCode: 'function fetchData() { return new Promise(resolve => resolve({success: true})); }',
              testFunction: 'return fetchData().then(d => d.success === true);'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript Mastery',
    modules: [
      {
        id: 'ts-basics-1',
        title: 'TypeScript Fundamentals',
        topics: [
          {
            id: 'ts-init',
            title: 'TypeScript Init',
            content: `TypeScript adalah JavaScript dengan type system. Ini membantu menangkap error saat development, bukan saat runtime.

**Setup TypeScript:**
1. Install: npm install -D typescript
2. Init config: npx tsc --init
3. Compile: npx tsc
4. Run: node output.js

**File Extension:**
- .ts untuk TypeScript
- .tsx untuk TypeScript dengan JSX

**Keuntungan:**
- Type checking saat compile
- Better IDE support
- Self-documenting code`,
            analogies: 'JavaScript seperti menulis dengan pensil - fleksibel tapi mudah salah. TypeScript seperti menulis dengan template - ada panduan yang memastikan tulisan rapi dan benar.',
            examples: [
              `// JavaScript - error saat runtime
function add(a, b) {
  return a + b;
}
add("5", 3); // "53" - unexpected!`,
              `// TypeScript - error saat compile
function add(a: number, b: number): number {
  return a + b;
}
// add("5", 3); // Error: Argument of type 'string'...`
            ],
            fillInBlanks: [
              {
                id: 'ti1',
                code: `// Install TypeScript
npm install _____ typescript`,
                blanks: ['-D'],
                explanation: 'Install sebagai dev dependency'
              },
              {
                id: 'ti2',
                code: `// Initialize TypeScript config
npx _____ _____`,
                blanks: ['tsc', '--init'],
                explanation: 'Create tsconfig.json'
              },
              {
                id: 'ti3',
                code: `// File extension
let message_____ = "Hello TypeScript";`,
                blanks: ['.ts'],
                explanation: 'TypeScript file extension'
              },
              {
                id: 'ti4',
                code: `// Compile TypeScript
npx _____ app.ts`,
                blanks: ['tsc'],
                explanation: 'TypeScript compiler command'
              }
            ],
            caseStudy: {
              id: 'cs-tsinit',
              title: 'TypeScript Type Annotations',
              description: 'Buatlah fungsi dengan type annotations lengkap: parameter types, return type, dan optional parameters. Buat fungsi createUser(name: string, age: number, email?: string): User.',
              expectedOutput: { name: "Alice", age: 25, email: "alice@example.com", isAdult: true },
              initialCode: `// Define User interface
interface User {
  // Define properties with types
}

function createUser(name, age, email) {
  // Add type annotations
  // Calculate isAdult (age >= 18)
  // Return User object
}`,
              testFunction: `
                const user = createUser("Alice", 25, "alice@example.com");
                return user.name === "Alice" && user.age === 25 && user.isAdult === true;
              `
            }
          },
          {
            id: 'ts-config',
            title: 'TSConfig',
            content: `tsconfig.json mengatur bagaimana TypeScript compiler bekerja.

**Key Options:**
- target: Versi JavaScript output (es5, es6, esnext)
- module: Sistem module (commonjs, es6)
- strict: Enable semua strict checking
- outDir: Folder untuk output
- rootDir: Folder source files
- strictNullChecks: null/undefined checking

**Strict Mode Options:**
Mengaktifkan strict membuat TypeScript lebih ketat dan aman.`,
            analogies: 'tsconfig.json seperti manual book mobil. Target seperti memilih bensin (premium/pertamax), strict seperti mode sport vs eco - lebih ketat tapi lebih aman.',
            examples: [
              `{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`,
              `// Dengan strict: true
let x: string;
// console.log(x); // Error: Variable 'x' is used before being assigned`
            ],
            fillInBlanks: [
              {
                id: 'tc1',
                code: `{
  "compilerOptions": {
    "_____": "ES6",
    "module": "commonjs"
  }
}`,
                blanks: ['target'],
                explanation: 'Target JavaScript version'
              },
              {
                id: 'tc2',
                code: `{
  "compilerOptions": {
    "_____": true,
    "strictNullChecks": true
  }
}`,
                blanks: ['strict'],
                explanation: 'Enable all strict checks'
              },
              {
                id: 'tc3',
                code: `{
  "compilerOptions": {
    "_____": "./dist",
    "_____": "./src"
  }
}`,
                blanks: ['outDir', 'rootDir'],
                explanation: 'Output dan source directories'
              },
              {
                id: 'tc4',
                code: `{
  "compilerOptions": {
    "target": "_____",
    "_____": "commonjs"
  }
}`,
                blanks: ['ES2020', 'module'],
                explanation: 'Modern target dan module system'
              }
            ],
            caseStudy: {
              id: 'cs-tsconfig',
              title: 'TypeScript Configuration',
              description: 'Buatlah fungsi generateTSConfig yang mengembalikan valid tsconfig.json structure. Harus include compilerOptions dengan target, module, strict mode, outDir, rootDir, dan include array untuk source files.',
              expectedOutput: { compilerOptions: { target: "ES2020", module: "ESNext", strict: true, outDir: "./dist", rootDir: "./src" }, include: ["src/**/*"] },
              initialCode: `function generateTSConfig() {\n  // Return object yang valid untuk tsconfig.json\n  // Include compilerOptions dan include array\n  return {\n    // compilerOptions: { ... },\n    // include: [ ... ]\n  };\n}`,
              testFunction: `\n                const config = generateTSConfig();\n                const opts = config.compilerOptions;\n                return opts.target === "ES2020" && opts.module === "ESNext" && \n                       opts.strict === true && config.include.length > 0;\n              `
            }
          }
        ]
      },
      {
        id: 'ts-advanced-1',
        title: 'TypeScript Advanced Types',
        topics: [
          {
            id: 'ts-unions',
            title: 'Union Types',
            content: `Union types allow values to be one of several types using the | operator.

**Syntax:** Type1 | Type2
**Type Narrowing:** Use typeof, instanceof, in operator
**Discriminated Unions:** Use literal types for better type safety`,
            analogies: 'Union types seperti Swiss Army knife - satu variable bisa punya beberapa type.',
            examples: [
              `type ID = string | number;`,
              `type Status = "loading" | "success" | "error";`,
              `function processId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase(); // TypeScript knows id is string
  }
  return id.toString(); // TypeScript knows id is number
}`
            ],
            fillInBlanks: [
              {
                id: 'tsu1',
                code: `type Status = "pending" _____ "completed" _____ "failed";`,
                blanks: ['|', '|'],
                explanation: 'Union operator untuk multiple types'
              },
              {
                id: 'tsu2',
                code: `function getId(): string _____ number {
  return Math.random() > 0.5 ? "abc" : 123;
}`,
                blanks: ['|'],
                explanation: 'Function return type union'
              }
            ],
            caseStudy: {
              id: 'cs-union',
              title: 'API Response Handler',
              description: 'Create function that handles different response types safely using type narrowing',
              expectedOutput: { success: true, data: "processed" },
              initialCode: `type ApiResponse = { success: true; data: string } | { success: false; error: string };

function handleResponse(response: ApiResponse) {
  // Use type narrowing to handle both success and error cases
  // Return { success: true, data: "processed" } for success
  // Return { success: false, error: "failed" } for error
}`,
              testFunction: `
                const successResponse = { success: true, data: "test" };
                const result = handleResponse(successResponse);
                return result.success && result.data === "processed";
              `
            }
          },
          {
            id: 'ts-intersections',
            title: 'Intersection Types',
            content: `Intersection types combine multiple types using the & operator.

**Syntax:** Type1 & Type2
**Usage:** All properties from both types must be present
**Common Use:** Mixing interfaces and adding properties`,
            analogies: 'Intersection types seperti fusion - menggabungkan semua kemampuan dari beberapa types.',
            examples: [
              `type Person = { name: string; age: number; };
type Employee = { employeeId: string; department: string; };
type Worker = Person & Employee; // Has all properties`,
              `interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }
type Duck = Flyable & Swimmable; // Can fly and swim`
            ],
            fillInBlanks: [
              {
                id: 'tsi1',
                code: `type Admin = User _____ { isAdmin: boolean; };`,
                blanks: ['&'],
                explanation: 'Intersection operator'
              },
              {
                id: 'tsi2',
                code: `type Point3D = Point2D _____ { z: number; };`,
                blanks: ['&'],
                explanation: 'Extending type with intersection'
              }
            ],
            caseStudy: {
              id: 'cs-intersection',
              title: 'User Permissions System',
              description: 'Combine base user with role permissions using intersection types',
              expectedOutput: { name: "admin", canRead: true, canWrite: true },
              initialCode: `type BaseUser = { name: string; id: number; };
type Permissions = { canRead: boolean; canWrite: boolean; };
type UserWithPermissions = BaseUser & Permissions;

function createAdminUser(): UserWithPermissions {
  // Return user with all required properties
}`,
              testFunction: `
                const admin = createAdminUser();
                return admin.name && admin.canRead && admin.canWrite && admin.id;
              `
            }
          },
          {
            id: 'ts-literal-types',
            title: 'Literal Types',
            content: `Literal types use exact values as types for more precise type checking.

**String Literals:** "exact string" as type
**Number Literals:** 42 as type  
**Boolean Literals:** true or false as type
**Template Literals:** Pattern-based string types`,
            analogies: 'Literal types seperti exact match - hanya menerima nilai yang persis sama.',
            examples: [
              `type Direction = "up" | "down" | "left" | "right";`,
              `type HttpStatus = 200 | 404 | 500;`,
              `type EventName = \`on\${Capitalize<string>}\`; // onLoad, onClick, etc`
            ],
            fillInBlanks: [
              {
                id: 'tsl1',
                code: `type Size = _____ | "medium" | "large";`,
                blanks: ['"small"'],
                explanation: 'String literal type'
              },
              {
                id: 'tsl2',
                code: `type DiceRoll = 1 | 2 | 3 | 4 | 5 _____ 6;`,
                blanks: ['|'],
                explanation: 'Number literal types'
              }
            ],
            caseStudy: {
              id: 'cs-literal',
              title: 'Theme Configuration',
              description: 'Create strict theme system using literal types',
              expectedOutput: { theme: "dark", size: "large", valid: true },
              initialCode: `type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large";

interface Config {
  theme: Theme;
  size: Size;
}

function validateConfig(config: Config): Config & { valid: boolean } {
  // Return config with valid: true
}`,
              testFunction: `
                const config = { theme: "dark" as const, size: "large" as const };
                const result = validateConfig(config);
                return result.valid === true && result.theme === "dark";
              `
            }
          }
        ]
      },
      {
        id: 'ts-advanced-2',
        title: 'TypeScript Generics & Conditionals',
        topics: [
          {
            id: 'ts-generics',
            title: 'Generic Functions',
            content: `Generics provide type flexibility with type safety using type parameters.

**Syntax:** <T> for type parameter
**Multiple Types:** <T, U, V>
**Constraints:** <T extends SomeType>
**Default Types:** <T = string>`,
            analogies: 'Generics seperti template yang bisa diisi type apapun - reusable dan type-safe.',
            examples: [
              `function identity<T>(value: T): T { return value; }`,
              `function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}`,
              `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`
            ],
            fillInBlanks: [
              {
                id: 'tsg1',
                code: `function first<_____>(arr: T[]): T | undefined { 
  return arr[0]; 
}`,
                blanks: ['T'],
                explanation: 'Generic type parameter'
              },
              {
                id: 'tsg2',
                code: `function swap<T, _____>(a: T, b: U): [U, T] {
  return [b, a];
}`,
                blanks: ['U'],
                explanation: 'Multiple generic parameters'
              }
            ],
            caseStudy: {
              id: 'cs-generics',
              title: 'Generic API Client',
              description: 'Create generic API client that works with any data type',
              expectedOutput: { data: "test", status: "success" },
              initialCode: `interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Return promise with generic response type
  // For testing, return resolved promise with test data
}`,
              testFunction: `
                return fetchData<string>("test-url").then(response => 
                  response.data === "test" && response.status === "success"
                );
              `
            }
          },
          {
            id: 'ts-generic-constraints',
            title: 'Generic Constraints',
            content: `Generic constraints limit the types that can be used as type arguments.

**extends Keyword:** T extends SomeType
**keyof Operator:** T extends keyof SomeObject  
**Conditional Constraints:** Based on other type parameters
**Built-in Constraints:** string, number, object, etc.`,
            analogies: 'Generic constraints seperti job requirements - hanya kandidat yang qualified boleh apply.',
            examples: [
              `function getLength<T extends { length: number }>(item: T): number {
  return item.length; // Works with arrays, strings, etc.
}`,
              `function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}`
            ],
            fillInBlanks: [
              {
                id: 'tsgc1',
                code: `function sortBy<T _____ { name: string }>(items: T[]): T[] {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}`,
                blanks: ['extends'],
                explanation: 'Generic constraint with extends'
              },
              {
                id: 'tsgc2',
                code: `function getValue<T, K extends _____ T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
                blanks: ['keyof'],
                explanation: 'keyof constraint'
              }
            ],
            caseStudy: {
              id: 'cs-constraints',
              title: 'Database Query Builder',
              description: 'Build type-safe query builder with generic constraints',
              expectedOutput: { query: "SELECT name FROM users", valid: true },
              initialCode: `interface Queryable {
  tableName: string;
  columns: string[];
}

function buildSelectQuery<T extends Queryable>(
  table: T, 
  columns: (keyof T['columns'])[]
): { query: string; valid: boolean } {
  // Build SELECT query using table info
  // Return { query: "SELECT name FROM users", valid: true }
}`,
              testFunction: `
                const userTable = { tableName: "users", columns: ["name", "email"] };
                const result = buildSelectQuery(userTable, ["name"]);
                return result.valid && result.query.includes("SELECT");
              `
            }
          },
          {
            id: 'ts-conditional-types',
            title: 'Conditional Types',
            content: `Conditional types select types based on conditions using the ternary-like syntax.

**Syntax:** T extends U ? X : Y
**Usage:** Type-level if-else statements
**infer Keyword:** Extract types from generic types
**Distributive:** Automatically distribute over union types`,
            analogies: 'Conditional types seperti if-else untuk types - pilih type A atau B berdasarkan kondisi.',
            examples: [
              `type IsString<T> = T extends string ? true : false;`,
              `type ArrayElement<T> = T extends (infer U)[] ? U : never;`,
              `type NonNullable<T> = T extends null | undefined ? never : T;`
            ],
            fillInBlanks: [
              {
                id: 'tsct1',
                code: `type IsArray<T> = T _____ any[] ? true : false;`,
                blanks: ['extends'],
                explanation: 'Conditional type condition'
              },
              {
                id: 'tsct2',
                code: `type Flatten<T> = T extends (_____ U)[] ? U : T;`,
                blanks: ['infer'],
                explanation: 'infer keyword for type extraction'
              }
            ],
            caseStudy: {
              id: 'cs-conditional',
              title: 'Smart API Response Type',
              description: 'Create conditional type that adapts based on success status',
              expectedOutput: { success: true, result: "data extracted" },
              initialCode: `type ApiResult<T, Success extends boolean> = Success extends true
  ? { success: true; data: T }
  : { success: false; error: string };

function processResponse<T>(
  response: ApiResult<T, boolean>
): { success: boolean; result: string } {
  // Use type narrowing to handle both success and error cases
  // Return { success: true, result: "data extracted" } for success
}`,
              testFunction: `
                const successResponse = { success: true, data: "test" } as const;
                const result = processResponse(successResponse);
                return result.success && result.result === "data extracted";
              `
            }
          }
        ]
      },
      {
        id: 'ts-advanced-3',
        title: 'TypeScript Utilities & Awaited',
        topics: [
          {
            id: 'ts-pick-omit',
            title: 'Pick and Omit',
            content: `Utility types for selecting or excluding properties from existing types.

**Pick<T, K>:** Select specific properties from T
**Omit<T, K>:** Exclude specific properties from T
**Usage:** Create focused types from larger interfaces`,
            analogies: 'Pick seperti memilih menu di restoran, Omit seperti diet - hindari makanan tertentu.',
            examples: [
              `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
type UserWithoutPassword = Omit<User, 'password'>;`
            ],
            fillInBlanks: [
              {
                id: 'tspo1',
                code: `type LoginData = _____<User, 'email' | 'password'>;`,
                blanks: ['Pick'],
                explanation: 'Pick utility untuk form login'
              },
              {
                id: 'tspo2',
                code: `type SafeUser = _____<User, 'password'>;`,
                blanks: ['Omit'],
                explanation: 'Omit untuk hide sensitive data'
              }
            ],
            caseStudy: {
              id: 'cs-pick-omit',
              title: 'API Response Builder',
              description: 'Create safe API response types using Pick/Omit utilities',
              expectedOutput: { profile: { name: "John", email: "john@example.com" }, success: true },
              initialCode: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserProfile = Pick<User, 'name' | 'email'>;

function getUserProfile(user: User): { profile: UserProfile; success: boolean } {
  // Return safe user profile without sensitive data
}`,
              testFunction: `
                const user = { id: 1, name: "John", email: "john@example.com", password: "secret", createdAt: new Date() };
                const result = getUserProfile(user);
                return result.success && result.profile.name === "John" && !result.profile.hasOwnProperty('password');
              `
            }
          },
          {
            id: 'ts-record-partial',
            title: 'Record and Partial',
            content: `Record creates object types with specific key-value patterns. Partial makes all properties optional.

**Record<K, T>:** Object with keys K and values T
**Partial<T>:** All properties become optional
**Required<T>:** All properties become required
**Readonly<T>:** All properties become read-only`,
            analogies: 'Record seperti dictionary dengan rules, Partial seperti checklist yang flexible.',
            examples: [
              `type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, boolean>;
// { admin: boolean; user: boolean; guest: boolean }`,
              `interface Config {
  theme: string;
  language: string;
  notifications: boolean;
}
type PartialConfig = Partial<Config>; // All optional`
            ],
            fillInBlanks: [
              {
                id: 'tsrp1',
                code: `type StatusMessages = _____<'success' | 'error' | 'loading', string>;`,
                blanks: ['Record'],
                explanation: 'Record untuk mapping status ke messages'
              },
              {
                id: 'tsrp2',
                code: `type OptionalUser = _____<User>;`,
                blanks: ['Partial'],
                explanation: 'Partial untuk optional properties'
              }
            ],
            caseStudy: {
              id: 'cs-record-partial',
              title: 'Settings Manager',
              description: 'Build settings system using Record and Partial utilities',
              expectedOutput: { settings: { theme: "dark" }, defaults: { theme: "light", lang: "en" } },
              initialCode: `type SettingKeys = 'theme' | 'language' | 'notifications';
type Settings = Record<SettingKeys, string | boolean>;
type PartialSettings = Partial<Settings>;

function mergeSettings(
  defaults: Settings, 
  userSettings: PartialSettings
): { settings: Settings; defaults: Settings } {
  // Merge user settings with defaults
  // Return combined settings object
}`,
              testFunction: `
                const defaults = { theme: "light", language: "en", notifications: true };
                const userSettings = { theme: "dark" };
                const result = mergeSettings(defaults, userSettings);
                return result.settings.theme === "dark" && result.defaults.theme === "light";
              `
            }
          },
          {
            id: 'ts-awaited',
            title: 'Awaited and Promise Utilities',
            content: `Awaited extracts the resolved type from Promise types.

**Awaited<T>:** Extract resolved type from Promise<T>
**Promise<T>:** Wrap type in Promise
**Multiple Awaited:** Handle nested promises
**Conditional Awaited:** Works with union types`,
            analogies: 'Awaited seperti unwrap gift - buka packaging untuk lihat isinya.',
            examples: [
              `type StringPromise = Promise<string>;
type AwaitedString = Awaited<StringPromise>; // string`,
              `type NestedPromise = Promise<Promise<number>>;
type AwaitedNumber = Awaited<NestedPromise>; // number`,
              `async function getData(): Promise<User[]> {
  // return user array
}
type UserArray = Awaited<ReturnType<typeof getData>>; // User[]`
            ],
            fillInBlanks: [
              {
                id: 'tsa1',
                code: `type ApiData = _____<Promise<{ users: User[] }>>;`,
                blanks: ['Awaited'],
                explanation: 'Extract type from Promise'
              },
              {
                id: 'tsa2',
                code: `type FetchResult = Awaited<ReturnType<_____ fetchUser>>;`,
                blanks: ['typeof'],
                explanation: 'Get return type of async function'
              }
            ],
            caseStudy: {
              id: 'cs-awaited',
              title: 'Async Data Pipeline',
              description: 'Create type-safe async data processing pipeline',
              expectedOutput: { processed: true, data: ["user1", "user2"] },
              initialCode: `async function fetchUsers(): Promise<{ id: number; name: string }[]> {
  return [{ id: 1, name: "user1" }, { id: 2, name: "user2" }];
}

type UserData = Awaited<ReturnType<typeof fetchUsers>>;

async function processUserData(): Promise<{ processed: boolean; data: string[] }> {
  // Process the user data and return names array
  // Use Awaited type for type safety
}`,
              testFunction: `
                return processUserData().then(result => 
                  result.processed && result.data.includes("user1")
                );
              `
            }
          }
        ]
      },
      {
        id: 'ts-advanced-4',
        title: 'TypeScript Type Guards',
        topics: [
          {
            id: 'ts-builtin-guards',
            title: 'Built-in Type Guards',
            content: `Built-in type guards help narrow types at runtime using JavaScript operators.

**typeof:** Check primitive types (string, number, boolean, etc.)
**instanceof:** Check if object is instance of class
**in operator:** Check if property exists in object
**Array.isArray():** Check if value is array`,
            analogies: 'Built-in type guards seperti checkpoint di perbatasan - validasi identity sebelum masuk.',
            examples: [
              `function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase(); // TypeScript knows it's string
  }
  return value.toFixed(2); // TypeScript knows it's number
}`,
              `if (error instanceof Error) {
  console.log(error.message); // TypeScript knows error properties
}`
            ],
            fillInBlanks: [
              {
                id: 'tstg1',
                code: `if (_____ value === 'number') { 
  return value.toFixed(2); 
}`,
                blanks: ['typeof'],
                explanation: 'typeof untuk check primitive types'
              },
              {
                id: 'tstg2',
                code: `if (obj _____ Error) { 
  console.log(obj.message); 
}`,
                blanks: ['instanceof'],
                explanation: 'instanceof untuk check class instances'
              }
            ],
            caseStudy: {
              id: 'cs-builtin-guards',
              title: 'Input Validator',
              description: 'Create robust input validator using built-in type guards',
              expectedOutput: { valid: true, type: 'string', processed: "HELLO" },
              initialCode: `function validateAndProcess(
  input: unknown
): { valid: boolean; type: string; processed?: any } {
  // Use typeof, instanceof, Array.isArray to validate input
  // Return appropriate result based on input type
  // For string: return uppercase version
  // For number: return rounded version  
  // For array: return length
}`,
              testFunction: `
                const result = validateAndProcess("hello");
                return result.valid && result.type === "string" && result.processed === "HELLO";
              `
            }
          },
          {
            id: 'ts-custom-guards',
            title: 'Custom Type Guards',
            content: `Custom type guards are user-defined functions that perform type checking with type predicates.

**Syntax:** function isType(value: any): value is SpecificType
**Type Predicate:** value is Type tells TypeScript the narrowed type
**Usage:** Complex type checking logic
**Return:** Boolean indicating if value matches type`,
            analogies: 'Custom type guards seperti bouncer klub - rules khusus untuk menentukan siapa yang boleh masuk.',
            examples: [
              `interface User {
  name: string;
  email: string;
}

function isUser(obj: any): obj is User {
  return typeof obj === 'object' && 
         typeof obj.name === 'string' && 
         typeof obj.email === 'string';
}`,
              `function isStringArray(value: any): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}`
            ],
            fillInBlanks: [
              {
                id: 'tsctg1',
                code: `function isNumber(value: any): value _____ number {
  return typeof value === 'number' && !isNaN(value);
}`,
                blanks: ['is'],
                explanation: 'Type predicate dengan is keyword'
              },
              {
                id: 'tsctg2',
                code: `function isPerson(obj: any): obj is Person {
  return typeof obj === 'object' && 
         typeof obj.name === '_____';
}`,
                blanks: ['string'],
                explanation: 'Property type checking dalam custom guard'
              }
            ],
            caseStudy: {
              id: 'cs-custom-guards',
              title: 'API Response Validator',
              description: 'Build custom type guards for API response validation',
              expectedOutput: { isValid: true, user: { name: "John", email: "john@example.com", role: "admin" } },
              initialCode: `interface ApiUser {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function isApiUser(data: any): data is ApiUser {
  // Implement type guard to validate API response
  // Check all required properties and types
}

function validateApiResponse(response: unknown): { isValid: boolean; user?: ApiUser } {
  // Use the type guard to safely validate response
  // Return validation result
}`,
              testFunction: `
                const mockResponse = { name: "John", email: "john@example.com", role: "admin" };
                const result = validateApiResponse(mockResponse);
                return result.isValid && result.user?.name === "John";
              `
            }
          },
          {
            id: 'ts-discriminated-unions',
            title: 'Discriminated Unions',
            content: `Discriminated unions use a common property to distinguish between union types.

**Discriminator:** Literal property that identifies the type
**Type Narrowing:** TypeScript automatically narrows based on discriminator
**Exhaustive Checking:** Ensure all cases are handled
**never Type:** Catch unhandled cases`,
            analogies: 'Discriminated unions seperti ID card - satu property yang jelas menunjukkan jenis/kategori.',
            examples: [
              `interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: string[];
}

interface ErrorState {
  status: 'error';
  error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;

function handleState(state: AppState) {
  switch (state.status) {
    case 'loading':
      return 'Loading...'; // state is LoadingState
    case 'success':
      return state.data.join(', '); // state is SuccessState
    case 'error':
      return state.error; // state is ErrorState
  }
}`
            ],
            fillInBlanks: [
              {
                id: 'tsdu1',
                code: `type Shape = 
  | { type: 'circle'; radius: number }
  | { type: '_____'; width: number; height: number };`,
                blanks: ['rectangle'],
                explanation: 'Discriminated union dengan type property'
              },
              {
                id: 'tsdu2',
                code: `function getArea(shape: Shape): number {
  switch (shape._____) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rectangle': return shape.width * shape.height;
  }
}`,
                blanks: ['type'],
                explanation: 'Switch pada discriminator property'
              }
            ],
            caseStudy: {
              id: 'cs-discriminated-unions',
              title: 'HTTP Response Handler',
              description: 'Design discriminated union for handling different HTTP response types',
              expectedOutput: { handled: true, result: "Success: Data received" },
              initialCode: `type HttpResponse = 
  | { status: 'success'; data: any; code: 200 }
  | { status: 'error'; message: string; code: 404 | 500 }
  | { status: 'loading'; progress: number };

function handleHttpResponse(
  response: HttpResponse
): { handled: boolean; result: string } {
  // Use discriminated union to handle different response types
  // Return appropriate message based on status
  // success: "Success: Data received"
  // error: "Error: [message]"
  // loading: "Loading: [progress]%"
}`,
              testFunction: `
                const successResponse = { status: 'success' as const, data: [], code: 200 as const };
                const result = handleHttpResponse(successResponse);
                return result.handled && result.result.includes("Success");
              `
            }
          }
        ]
      }
    ]
  }
];