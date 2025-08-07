import { QuizQuestion } from './modules';

// Quiz questions for each topic
export const quizData: { [topicId: string]: QuizQuestion[] } = {
  'strict-mode': [
    {
      id: 'sm-q1',
      question: 'Apa fungsi utama dari "use strict" dalam JavaScript?',
      options: [
        'Membuat kode berjalan lebih cepat',
        'Mengaktifkan mode ketat untuk menangkap kesalahan',
        'Menambah fitur baru JavaScript',
        'Mengompres ukuran file'
      ],
      correctAnswer: 1,
      explanation: '"use strict" mengaktifkan strict mode yang membantu menangkap kesalahan umum dan mencegah penggunaan fitur yang tidak aman.'
    },
    {
      id: 'sm-q2',
      question: 'Di mana "use strict" harus ditempatkan?',
      options: [
        'Di akhir file',
        'Di awal file atau fungsi',
        'Di tengah kode',
        'Di dalam loop'
      ],
      correctAnswer: 1,
      explanation: '"use strict" harus ditempatkan di awal file atau di awal fungsi untuk mengaktifkan strict mode.'
    },
    {
      id: 'sm-q3',
      question: 'Apa yang terjadi jika menggunakan variabel tanpa deklarasi dalam strict mode?',
      options: [
        'Variabel menjadi global otomatis',
        'Tidak ada efek',
        'JavaScript akan throw error',
        'Variabel menjadi const'
      ],
      correctAnswer: 2,
      explanation: 'Dalam strict mode, menggunakan variabel tanpa deklarasi akan menyebabkan ReferenceError.'
    },
    {
      id: 'sm-q4',
      question: 'Strict mode dapat diterapkan pada:',
      options: [
        'Hanya seluruh file',
        'Hanya fungsi individual',
        'Seluruh file atau fungsi individual',
        'Hanya modul ES6'
      ],
      correctAnswer: 2,
      explanation: 'Strict mode bisa diterapkan pada seluruh file dengan menempatkannya di awal, atau pada fungsi individual.'
    },
    {
      id: 'sm-q5',
      question: 'Manakah yang TIDAK dilarang dalam strict mode?',
      options: [
        'Menggunakan let dan const',
        'Menghapus variabel dengan delete',
        'Duplicate parameter names',
        'Octal literals (0644)'
      ],
      correctAnswer: 0,
      explanation: 'let dan const justru direkomendasikan dalam strict mode. Yang dilarang adalah delete variabel, duplicate parameters, dan octal literals.'
    },
    {
      id: 'sm-q6',
      question: 'Dalam strict mode, nilai "this" dalam fungsi biasa adalah:',
      options: [
        'window object',
        'global object',
        'undefined',
        'null'
      ],
      correctAnswer: 2,
      explanation: 'Dalam strict mode, "this" dalam fungsi biasa adalah undefined, bukan window/global object.'
    },
    {
      id: 'sm-q7',
      question: 'Apa output dari kode ini dalam strict mode?\n"use strict";\nx = 10;\nconsole.log(x);',
      options: [
        '10',
        'undefined',
        'ReferenceError',
        'null'
      ],
      correctAnswer: 2,
      explanation: 'Kode akan menghasilkan ReferenceError karena x tidak dideklarasikan dengan let, const, atau var.'
    },
    {
      id: 'sm-q8',
      question: 'Strict mode mencegah penggunaan:',
      options: [
        'Arrow functions',
        'Template literals',
        'Reserved keywords sebagai variabel',
        'Async/await'
      ],
      correctAnswer: 2,
      explanation: 'Strict mode mencegah penggunaan reserved keywords (seperti let, static, interface) sebagai nama variabel.'
    },
    {
      id: 'sm-q9',
      question: 'Manakah syntax yang benar untuk strict mode?',
      options: [
        '"use strict";',
        "'use strict';",
        'use strict;',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Strict mode bisa menggunakan double quotes, single quotes, atau tanpa semicolon.'
    },
    {
      id: 'sm-q10',
      question: 'Apa keuntungan menggunakan strict mode?',
      options: [
        'Kode lebih aman dan error mudah ditemukan',
        'Kode berjalan lebih lambat',
        'File size lebih kecil', 
        'Kompatibilitas dengan browser lama'
      ],
      correctAnswer: 0,
      explanation: 'Strict mode membuat kode lebih aman dan membantu developer menemukan error lebih mudah.'
    }
  ],
  
  'variables': [
    {
      id: 'var-q1',
      question: 'Perbedaan utama antara let dan const adalah:',
      options: [
        'let lebih cepat dari const',
        'const tidak bisa diubah nilainya setelah dideklarasi',
        'let hanya untuk number',
        'const hanya untuk string'
      ],
      correctAnswer: 1,
      explanation: 'const membuat variabel yang tidak bisa di-reassign, sedangkan let bisa diubah nilainya.'
    },
    {
      id: 'var-q2',
      question: 'Manakah yang memiliki block scope?',
      options: [
        'Hanya var',
        'var dan let',
        'let dan const',
        'Hanya const'
      ],
      correctAnswer: 2,
      explanation: 'let dan const memiliki block scope, sedangkan var memiliki function scope.'
    },
    {
      id: 'var-q3',
      question: 'Apa yang terjadi jika mencoba mengubah nilai const?',
      options: [
        'Nilai berubah normal',
        'TypeError',
        'SyntaxError',
        'Tidak ada error tapi nilai tidak berubah'
      ],
      correctAnswer: 1,
      explanation: 'Mencoba reassign const akan menghasilkan TypeError: Assignment to constant variable.'
    },
    {
      id: 'var-q4',
      question: 'Hoisting pada let dan const:',
      options: [
        'Sama seperti var',
        'Tidak ada hoisting',
        'Ada hoisting tapi dalam Temporal Dead Zone',
        'Hanya const yang di-hoist'
      ],
      correctAnswer: 2,
      explanation: 'let dan const di-hoist tapi berada dalam Temporal Dead Zone sampai dideklarasikan.'
    },
    {
      id: 'var-q5',
      question: 'Untuk konstanta matematika seperti PI, sebaiknya gunakan:',
      options: [
        'var PI = 3.14',
        'let PI = 3.14',
        'const PI = 3.14',
        'global.PI = 3.14'
      ],
      correctAnswer: 2,
      explanation: 'const ideal untuk nilai yang tidak berubah seperti konstanta matematika.'
    },
    {
      id: 'var-q6',
      question: 'Apa yang dimaksud dengan temporal dead zone?',
      options: [
        'Area dimana let/const belum bisa diakses',
        'Memory yang sudah dihapus',
        'Fungsi yang belum dipanggil',
        'Loop yang infinite'
      ],
      correctAnswer: 0,
      explanation: 'Temporal Dead Zone adalah periode dimana let/const sudah di-hoist tapi belum bisa diakses sampai dideklarasikan.'
    },
    {
      id: 'var-q7',
      question: 'Manakah yang TIDAK bisa dilakukan dengan const?',
      options: [
        'Menyimpan object',
        'Reassignment nilai',
        'Menyimpan array',
        'Menyimpan function'
      ],
      correctAnswer: 1,
      explanation: 'const tidak bisa di-reassign, tapi bisa menyimpan object, array, dan function.'
    },
    {
      id: 'var-q8',
      question: 'Kapan sebaiknya menggunakan let?',
      options: [
        'Untuk nilai yang tidak berubah',
        'Untuk variabel yang nilainya akan berubah',
        'Untuk konstanta matematika',
        'Untuk function declaration'
      ],
      correctAnswer: 1,
      explanation: 'let digunakan untuk variabel yang nilainya akan berubah selama program berjalan.'
    },
    {
      id: 'var-q9',
      question: 'Perbedaan var dengan let/const dalam scope:',
      options: [
        'var: function scope, let/const: block scope',
        'Tidak ada perbedaan',
        'var: block scope, let/const: function scope',
        'Semua memiliki global scope'
      ],
      correctAnswer: 0,
      explanation: 'var memiliki function scope, sedangkan let dan const memiliki block scope.'
    },
    {
      id: 'var-q10',
      question: 'Manakah deklarasi yang akan menyebabkan error?',
      options: [
        'const name = "John"; name = "Jane";',
        'let age = 25; age = 26;',
        'var city = "NY"; city = "LA";',
        'const obj = {}; obj.prop = "value";'
      ],
      correctAnswer: 0,
      explanation: 'const name = "John"; name = "Jane"; akan error karena const tidak bisa di-reassign.'
    }
  ],
  
  'data-types': [
    {
      id: 'dt-q1',
      question: 'Berapa jumlah tipe data primitif dalam JavaScript?',
      options: [
        '5',
        '6',
        '7',
        '8'
      ],
      correctAnswer: 2,
      explanation: 'Ada 7 tipe primitif: Number, String, Boolean, Undefined, Null, Symbol, dan BigInt.'
    },
    {
      id: 'dt-q2',
      question: 'typeof null mengembalikan:',
      options: [
        '"null"',
        '"undefined"',
        '"object"',
        '"empty"'
      ],
      correctAnswer: 2,
      explanation: 'typeof null mengembalikan "object", ini adalah bug historis JavaScript.'
    },
    {
      id: 'dt-q3',
      question: 'Perbedaan undefined dan null:',
      options: [
        'Tidak ada perbedaan',
        'undefined = belum diberi nilai, null = nilai kosong sengaja',
        'null = belum diberi nilai, undefined = nilai kosong',
        'undefined untuk number, null untuk string'
      ],
      correctAnswer: 1,
      explanation: 'undefined berarti variabel belum diberi nilai, null adalah nilai kosong yang disengaja.'
    },
    {
      id: 'dt-q4',
      question: 'Tipe data untuk 42n adalah:',
      options: [
        'Number',
        'String',
        'BigInt',
        'Symbol'
      ],
      correctAnswer: 2,
      explanation: 'Suffix n menandakan BigInt, untuk angka yang sangat besar.'
    },
    {
      id: 'dt-q5',
      question: 'NaN adalah singkatan dari:',
      options: [
        'Not a Null',
        'Not a Number',
        'New and Null',
        'Number and Null'
      ],
      correctAnswer: 1,
      explanation: 'NaN (Not a Number) muncul dari operasi matematika yang invalid.'
    },
    {
      id: 'dt-q6',
      question: 'Hasil dari typeof [] adalah:',
      options: [
        '"array"',
        '"object"',
        '"list"',
        '"undefined"'
      ],
      correctAnswer: 1,
      explanation: 'Array dalam JavaScript adalah tipe object, sehingga typeof [] mengembalikan "object".'
    },
    {
      id: 'dt-q7',
      question: 'Manakah yang merupakan primitive type?',
      options: [
        'Array',
        'Object',
        'Boolean',
        'Function'
      ],
      correctAnswer: 2,
      explanation: 'Boolean adalah primitive type. Array, Object, dan Function adalah reference types.'
    },
    {
      id: 'dt-q8',
      question: 'Symbol digunakan untuk:',
      options: [
        'Menyimpan angka besar',
        'Membuat identifier unik',
        'Konversi tipe data',
        'Operasi matematika'
      ],
      correctAnswer: 1,
      explanation: 'Symbol digunakan untuk membuat identifier yang benar-benar unik.'
    },
    {
      id: 'dt-q9',
      question: 'Hasil dari 5 / 0 dalam JavaScript:',
      options: [
        'Error',
        'NaN',
        'Infinity',
        '0'
      ],
      correctAnswer: 2,
      explanation: 'Pembagian dengan 0 dalam JavaScript menghasilkan Infinity.'
    },
    {
      id: 'dt-q10',
      question: 'Manakah nilai falsy?',
      options: [
        '[]',
        '{}',
        '""',
        '"0"'
      ],
      correctAnswer: 2,
      explanation: 'String kosong ("") adalah falsy. Array kosong [], object kosong {}, dan string "0" adalah truthy.'
    }
  ],
  
  'type-conversions': [
    {
      id: 'tc-q1',
      question: 'Number("42") menghasilkan:',
      options: [
        '"42"',
        '42',
        'NaN',
        'undefined'
      ],
      correctAnswer: 1,
      explanation: 'Number() mengkonversi string "42" menjadi number 42.'
    },
    {
      id: 'tc-q2',
      question: 'String(true) menghasilkan:',
      options: [
        '1',
        '"1"',
        'true',
        '"true"'
      ],
      correctAnswer: 3,
      explanation: 'String(true) mengkonversi boolean true menjadi string "true".'
    },
    {
      id: 'tc-q3',
      question: 'Boolean(0) menghasilkan:',
      options: [
        'true',
        'false',
        '0',
        'undefined'
      ],
      correctAnswer: 1,
      explanation: '0 adalah nilai falsy, sehingga Boolean(0) menghasilkan false.'
    },
    {
      id: 'tc-q4',
      question: 'Manakah yang merupakan nilai falsy?',
      options: [
        '"false"',
        '[]',
        '""',
        '{}'
      ],
      correctAnswer: 2,
      explanation: 'String kosong "" adalah falsy. "false", [], dan {} adalah truthy.'
    },
    {
      id: 'tc-q5',
      question: '+"100" menghasilkan:',
      options: [
        '"100"',
        '100',
        'NaN',
        'SyntaxError'
      ],
      correctAnswer: 1,
      explanation: 'Unary plus (+) mengkonversi string ke number, +"100" = 100.'
    },
    {
      id: 'tc-q6',
      question: 'Boolean("0") menghasilkan:',
      options: [
        'true',
        'false',
        '0',
        'undefined'
      ],
      correctAnswer: 0,
      explanation: 'Boolean("0") menghasilkan true karena string "0" bukan string kosong.'
    },
    {
      id: 'tc-q7',
      question: 'Hasil dari Number("") adalah:',
      options: [
        'NaN',
        '0',
        'undefined',
        'null'
      ],
      correctAnswer: 1,
      explanation: 'Number("") menghasilkan 0, bukan NaN.'
    },
    {
      id: 'tc-q8',
      question: 'parseInt("123abc") menghasilkan:',
      options: [
        'NaN',
        '123',
        'undefined',
        'Error'
      ],
      correctAnswer: 1,
      explanation: 'parseInt membaca angka dari awal string sampai karakter non-numeric pertama.'
    },
    {
      id: 'tc-q9',
      question: 'Implicit conversion: "5" + 3 menghasilkan:',
      options: [
        '8',
        '"8"',
        '"53"',
        'Error'
      ],
      correctAnswer: 2,
      explanation: 'Operator + dengan string melakukan concatenation, bukan penjumlahan.'
    },
    {
      id: 'tc-q10',
      question: 'Implicit conversion: "5" - 3 menghasilkan:',
      options: [
        '2',
        '"2"',
        '"53"',
        'NaN'
      ],
      correctAnswer: 0,
      explanation: 'Operator - memaksa konversi string ke number untuk operasi matematika.'
    }
  ],

  // Add more topics with questions
  'basic-math-operators': [
    {
      id: 'mo-q1',
      question: 'Hasil dari 17 % 5 adalah:',
      options: ['2', '3', '4', '1'],
      correctAnswer: 0,
      explanation: 'Modulo (%) mengembalikan sisa pembagian. 17 dibagi 5 = 3 sisa 2.'
    },
    {
      id: 'mo-q2',
      question: 'Hasil dari 2 ** 3 adalah:',
      options: ['5', '6', '8', '9'],
      correctAnswer: 2,
      explanation: 'Operator ** adalah eksponensial. 2^3 = 8.'
    },
    {
      id: 'mo-q3',
      question: 'Perbedaan ++x dan x++:',
      options: [
        'Tidak ada perbedaan',
        '++x increment dulu, x++ pakai dulu',
        'x++ increment dulu, ++x pakai dulu',
        'Keduanya sama-sama increment dulu'
      ],
      correctAnswer: 1,
      explanation: '++x (pre-increment) menambah dulu lalu return nilai baru. x++ (post-increment) return nilai lama lalu increment.'
    },
    {
      id: 'mo-q4',
      question: 'let x = 10; x += 5; Nilai x sekarang:',
      options: ['10', '15', '50', '105'],
      correctAnswer: 1,
      explanation: 'x += 5 sama dengan x = x + 5. Jadi 10 + 5 = 15.'
    },
    {
      id: 'mo-q5',
      question: 'Operator yang digunakan untuk pangkat:',
      options: ['^', '**', 'pow', '^^'],
      correctAnswer: 1,
      explanation: 'JavaScript menggunakan ** untuk operasi pangkat (exponentiation).'
    }
  ],

  'comparisons': [
    {
      id: 'cp-q1',
      question: '5 == "5" menghasilkan:',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 0,
      explanation: '== melakukan type coercion, sehingga 5 == "5" adalah true.'
    },
    {
      id: 'cp-q2',
      question: '5 === "5" menghasilkan:',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 1,
      explanation: '=== tidak melakukan type coercion, sehingga 5 === "5" adalah false.'
    },
    {
      id: 'cp-q3',
      question: 'null == undefined menghasilkan:',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 0,
      explanation: 'null == undefined adalah true karena keduanya dianggap "empty" values.'
    },
    {
      id: 'cp-q4',
      question: 'null === undefined menghasilkan:',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 1,
      explanation: 'null === undefined adalah false karena keduanya berbeda tipe.'
    },
    {
      id: 'cp-q5',
      question: '"apple" < "banana" menghasilkan:',
      options: ['true', 'false', 'undefined', 'Error'],
      correctAnswer: 0,
      explanation: 'String comparison dilakukan secara alphabetical/lexicographic.'
    }
  ],

  'ifelse': [
    {
      id: 'if-q1',
      question: 'Struktur if-else yang benar:',
      options: [
        'if condition { }',
        'if (condition) { }',
        'if condition: { }',
        'if [condition] { }'
      ],
      correctAnswer: 1,
      explanation: 'JavaScript menggunakan if (condition) dengan parentheses untuk kondisi.'
    },
    {
      id: 'if-q2',
      question: 'Ternary operator untuk if-else sederhana:',
      options: [
        'condition ? true : false',
        'condition ?? true : false',
        'condition && true || false',
        'condition :: true : false'
      ],
      correctAnswer: 0,
      explanation: 'Ternary operator menggunakan syntax: condition ? valueIfTrue : valueIfFalse.'
    },
    {
      id: 'if-q3',
      question: 'if (0) akan mengeksekusi blok kode:',
      options: ['true', 'false', 'kadang-kadang', 'error'],
      correctAnswer: 1,
      explanation: '0 adalah falsy value, sehingga if (0) tidak akan mengeksekusi blok kode.'
    },
    {
      id: 'if-q4',
      question: 'Untuk multiple conditions, gunakan:',
      options: ['if-else if-else', 'if-or-else', 'if-and-else', 'if-then-else'],
      correctAnswer: 0,
      explanation: 'Multiple conditions menggunakan struktur if-else if-else.'
    },
    {
      id: 'if-q5',
      question: 'if ("") akan mengeksekusi blok kode:',
      options: ['true', 'false', 'kadang-kadang', 'error'],
      correctAnswer: 1,
      explanation: 'String kosong ("") adalah falsy value, sehingga if ("") tidak akan mengeksekusi blok kode.'
    }
  ],

  // Logical Operators
  'logical-operators': [
    {
      id: 'lo-q1',
      question: 'Hasil dari true && false adalah:',
      options: ['true', 'false', 'undefined', 'null'],
      correctAnswer: 1,
      explanation: 'Operator && (AND) mengembalikan true hanya jika kedua operand true.'
    },
    {
      id: 'lo-q2',
      question: 'Hasil dari false || true adalah:',
      options: ['true', 'false', 'undefined', 'null'],
      correctAnswer: 0,
      explanation: 'Operator || (OR) mengembalikan true jika salah satu operand true.'
    },
    {
      id: 'lo-q3',
      question: 'Operator !true menghasilkan:',
      options: ['true', 'false', '1', '0'],
      correctAnswer: 1,
      explanation: 'Operator ! (NOT) membalik nilai boolean. !true = false.'
    },
    {
      id: 'lo-q4',
      question: 'Short-circuit evaluation pada && artinya:',
      options: [
        'Evaluasi semua operand',
        'Stop jika operand pertama false',
        'Selalu return true',
        'Selalu return false'
      ],
      correctAnswer: 1,
      explanation: 'Operator && berhenti mengevaluasi jika operand pertama false (short-circuit).'
    },
    {
      id: 'lo-q5',
      question: 'Hasil dari "hello" && "world" adalah:',
      options: ['"hello"', '"world"', 'true', 'false'],
      correctAnswer: 1,
      explanation: 'Operator && mengembalikan operand terakhir jika semua operand truthy.'
    }
  ],

  // Nullish Coalescing
  'nullish-coalescing': [
    {
      id: 'nc-q1',
      question: 'Operator nullish coalescing adalah:',
      options: ['||', '&&', '??', '!!'],
      correctAnswer: 2,
      explanation: 'Operator ?? (nullish coalescing) mengembalikan operand kanan jika operand kiri null atau undefined.'
    },
    {
      id: 'nc-q2',
      question: 'Hasil dari null ?? "default" adalah:',
      options: ['null', '"default"', 'undefined', 'error'],
      correctAnswer: 1,
      explanation: 'Karena null adalah nullish value, operator ?? mengembalikan "default".'
    },
    {
      id: 'nc-q3',
      question: 'Hasil dari 0 ?? "default" adalah:',
      options: ['0', '"default"', 'null', 'undefined'],
      correctAnswer: 0,
      explanation: '0 bukan nullish value (hanya null dan undefined), jadi mengembalikan 0.'
    },
    {
      id: 'nc-q4',
      question: 'Perbedaan ?? dengan || adalah:',
      options: [
        'Tidak ada perbedaan',
        '?? hanya untuk null/undefined, || untuk falsy values',
        '|| hanya untuk null/undefined, ?? untuk falsy values',
        'Keduanya sama persis'
      ],
      correctAnswer: 1,
      explanation: '?? hanya menangani null/undefined, sedangkan || menangani semua falsy values.'
    },
    {
      id: 'nc-q5',
      question: 'Hasil dari false ?? true adalah:',
      options: ['false', 'true', 'null', 'undefined'],
      correctAnswer: 0,
      explanation: 'false bukan nullish value, jadi operator ?? mengembalikan false.'
    }
  ],

  // While and For Loops
  'while-and-for': [
    {
      id: 'wf-q1',
      question: 'Loop yang mengecek kondisi di awal adalah:',
      options: ['do-while', 'while', 'for...in', 'for...of'],
      correctAnswer: 1,
      explanation: 'while loop mengecek kondisi di awal sebelum menjalankan kode.'
    },
    {
      id: 'wf-q2',
      question: 'Loop yang pasti dijalankan minimal sekali:',
      options: ['while', 'for', 'do-while', 'for...in'],
      correctAnswer: 2,
      explanation: 'do-while loop menjalankan kode dulu, baru mengecek kondisi.'
    },
    {
      id: 'wf-q3',
      question: 'Struktur for loop yang benar:',
      options: [
        'for (init; condition; increment)',
        'for (condition; init; increment)',
        'for (increment; condition; init)',
        'for (init; increment; condition)'
      ],
      correctAnswer: 0,
      explanation: 'Struktur for loop: for (initialization; condition; increment/decrement).'
    },
    {
      id: 'wf-q4',
      question: 'Untuk menghentikan loop, gunakan:',
      options: ['stop', 'break', 'exit', 'end'],
      correctAnswer: 1,
      explanation: 'Keyword break digunakan untuk menghentikan loop.'
    },
    {
      id: 'wf-q5',
      question: 'Untuk melompat ke iterasi berikutnya, gunakan:',
      options: ['skip', 'next', 'continue', 'jump'],
      correctAnswer: 2,
      explanation: 'Keyword continue melompat ke iterasi berikutnya dalam loop.'
    }
  ],

  // Switch Statement
  'switch': [
    {
      id: 'sw-q1',
      question: 'Switch statement menggunakan operator perbandingan:',
      options: ['==', '===', '!=', '!=='],
      correctAnswer: 1,
      explanation: 'Switch menggunakan strict equality (===) untuk membandingkan values.'
    },
    {
      id: 'sw-q2',
      question: 'Tanpa break statement, switch akan:',
      options: [
        'Berhenti otomatis',
        'Error',
        'Fall-through ke case berikutnya',
        'Return undefined'
      ],
      correctAnswer: 2,
      explanation: 'Tanpa break, switch akan melanjutkan eksekusi ke case berikutnya (fall-through).'
    },
    {
      id: 'sw-q3',
      question: 'Default case dalam switch:',
      options: [
        'Harus di awal',
        'Harus di akhir',
        'Bisa di mana saja',
        'Tidak boleh ada'
      ],
      correctAnswer: 2,
      explanation: 'Default case bisa ditempatkan di mana saja dalam switch, tapi konvensi di akhir.'
    },
    {
      id: 'sw-q4',
      question: 'Switch statement cocok untuk:',
      options: [
        'Banyak kondisi kompleks',
        'Satu nilai dengan banyak kemungkinan',
        'Operasi matematika',
        'Loop iteration'
      ],
      correctAnswer: 1,
      explanation: 'Switch cocok untuk satu nilai yang dibandingkan dengan banyak kemungkinan.'
    },
    {
      id: 'sw-q5',
      question: 'Alternatif modern untuk switch adalah:',
      options: ['if-else chain', 'object mapping', 'ternary operator', 'semua benar'],
      correctAnswer: 3,
      explanation: 'Semua bisa menjadi alternatif switch, tergantung use case.'
    }
  ],

  // Basic Function
  'basic-function': [
    {
      id: 'bf-q1',
      question: 'Cara mendeklarasikan function yang benar:',
      options: [
        'function myFunc() {}',
        'func myFunc() {}',
        'def myFunc() {}',
        'function: myFunc() {}'
      ],
      correctAnswer: 0,
      explanation: 'JavaScript menggunakan keyword function untuk mendeklarasikan fungsi.'
    },
    {
      id: 'bf-q2',
      question: 'Function tanpa return statement mengembalikan:',
      options: ['null', '0', 'undefined', 'error'],
      correctAnswer: 2,
      explanation: 'Function tanpa return statement secara implisit mengembalikan undefined.'
    },
    {
      id: 'bf-q3',
      question: 'Parameter vs Argument:',
      options: [
        'Parameter saat deklarasi, Argument saat pemanggilan',
        'Argument saat deklarasi, Parameter saat pemanggilan',
        'Keduanya sama',
        'Parameter untuk input, Argument untuk output'
      ],
      correctAnswer: 0,
      explanation: 'Parameter adalah variabel dalam deklarasi, Argument adalah nilai saat pemanggilan.'
    },
    {
      id: 'bf-q4',
      question: 'Function hoisting artinya:',
      options: [
        'Function bisa dipanggil sebelum dideklarasikan',
        'Function harus dideklarasikan dulu',
        'Function berjalan di background',
        'Function tidak bisa dipanggil'
      ],
      correctAnswer: 0,
      explanation: 'Function declaration di-hoist, bisa dipanggil sebelum dideklarasikan.'
    },
    {
      id: 'bf-q5',
      question: 'Scope dalam function adalah:',
      options: ['global', 'local/function', 'block', 'module'],
      correctAnswer: 1,
      explanation: 'Variabel dalam function memiliki function scope (local).'
    }
  ],

  // Function Expression
  'function-expression': [
    {
      id: 'fe-q1',
      question: 'Perbedaan function declaration dan function expression:',
      options: [
        'Tidak ada perbedaan',
        'Declaration di-hoist, expression tidak',
        'Expression di-hoist, declaration tidak',
        'Keduanya sama-sama di-hoist'
      ],
      correctAnswer: 1,
      explanation: 'Function declaration di-hoist, function expression tidak di-hoist.'
    },
    {
      id: 'fe-q2',
      question: 'Function expression yang benar:',
      options: [
        'const myFunc = function() {}',
        'const myFunc = func() {}',
        'const myFunc = def() {}',
        'const function = myFunc() {}'
      ],
      correctAnswer: 0,
      explanation: 'Function expression menggunakan const/let/var = function() {}.'
    },
    {
      id: 'fe-q3',
      question: 'Anonymous function adalah:',
      options: [
        'Function dengan nama',
        'Function tanpa nama',
        'Function yang error',
        'Function yang di-hoist'
      ],
      correctAnswer: 1,
      explanation: 'Anonymous function adalah function tanpa nama.'
    },
    {
      id: 'fe-q4',
      question: 'Named function expression:',
      options: [
        'const fn = function namedFn() {}',
        'const fn = namedFn() {}',
        'function fn = namedFn() {}',
        'const fn() = function namedFn {}'
      ],
      correctAnswer: 0,
      explanation: 'Named function expression: const fn = function namedFn() {}.'
    },
    {
      id: 'fe-q5',
      question: 'Function expression cocok untuk:',
      options: [
        'Callback functions',
        'Conditional function creation',
        'Event handlers',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Function expression cocok untuk callbacks, conditional creation, dan event handlers.'
    }
  ],

  // Arrow Function
  'basic-arrow-function': [
    {
      id: 'af-q1',
      question: 'Syntax arrow function yang benar:',
      options: [
        '() -> {}',
        '() => {}',
        '() ~> {}',
        '() -> () {}'
      ],
      correctAnswer: 1,
      explanation: 'Arrow function menggunakan syntax () => {}.'
    },
    {
      id: 'af-q2',
      question: 'Arrow function dengan satu parameter:',
      options: [
        'x => x * 2',
        '(x) => x * 2',
        'x -> x * 2',
        'A dan B benar'
      ],
      correctAnswer: 3,
      explanation: 'Satu parameter bisa tanpa atau dengan parentheses: x => atau (x) =>.'
    },
    {
      id: 'af-q3',
      question: 'Arrow function dengan implicit return:',
      options: [
        'x => { return x * 2 }',
        'x => x * 2',
        'x => return x * 2',
        'x => { x * 2 }'
      ],
      correctAnswer: 1,
      explanation: 'Tanpa curly braces, arrow function melakukan implicit return.'
    },
    {
      id: 'af-q4',
      question: 'Perbedaan arrow function dengan regular function:',
      options: [
        'Arrow function tidak memiliki "this" binding',
        'Arrow function lebih cepat',
        'Arrow function bisa di-hoist',
        'Tidak ada perbedaan'
      ],
      correctAnswer: 0,
      explanation: 'Arrow function tidak memiliki "this" binding sendiri.'
    },
    {
      id: 'af-q5',
      question: 'Arrow function cocok untuk:',
      options: [
        'Method dalam object',
        'Constructor function',
        'Callback functions',
        'Event handlers dengan this'
      ],
      correctAnswer: 2,
      explanation: 'Arrow function cocok untuk callback karena tidak mengubah "this" context.'
    }
  ],

  // Basic Object
  'basic-object': [
    {
      id: 'bo-q1',
      question: 'Cara membuat object literal:',
      options: [
        'const obj = {}',
        'const obj = new Object()',
        'const obj = Object.create()',
        'A dan B benar'
      ],
      correctAnswer: 3,
      explanation: 'Object bisa dibuat dengan {} atau new Object().'
    },
    {
      id: 'bo-q2',
      question: 'Cara mengakses property object:',
      options: [
        'obj.property',
        'obj["property"]',
        'obj->property',
        'A dan B benar'
      ],
      correctAnswer: 3,
      explanation: 'Property bisa diakses dengan dot notation atau bracket notation.'
    },
    {
      id: 'bo-q3',
      question: 'Dynamic property name:',
      options: [
        'obj.varName',
        'obj[varName]',
        'obj->varName',
        'obj.{varName}'
      ],
      correctAnswer: 1,
      explanation: 'Bracket notation memungkinkan dynamic property name.'
    },
    {
      id: 'bo-q4',
      question: 'Method dalam object:',
      options: [
        'function inside object',
        'property yang berisi function',
        'cara object melakukan action',
        'semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Method adalah property yang berisi function untuk melakukan action.'
    },
    {
      id: 'bo-q5',
      question: 'this dalam object method merujuk ke:',
      options: [
        'window object',
        'global object',
        'object yang memiliki method',
        'undefined'
      ],
      correctAnswer: 2,
      explanation: '"this" dalam object method merujuk ke object yang memiliki method tersebut.'
    }
  ],

  // Object References
  'object-references': [
    {
      id: 'or-q1',
      question: 'Object disimpan sebagai:',
      options: ['value', 'reference', 'copy', 'pointer'],
      correctAnswer: 1,
      explanation: 'Object disimpan dan dipass sebagai reference, bukan value.'
    },
    {
      id: 'or-q2',
      question: 'const obj1 = obj2; kemudian obj1.x = 5; maka obj2.x =',
      options: ['undefined', '5', 'error', 'null'],
      correctAnswer: 1,
      explanation: 'obj1 dan obj2 merujuk object yang sama, perubahan satu mempengaruhi yang lain.'
    },
    {
      id: 'or-q3',
      question: 'Untuk membuat copy object, gunakan:',
      options: [
        'obj1 = obj2',
        'Object.assign({}, obj)',
        '{...obj}',
        'B dan C benar'
      ],
      correctAnswer: 3,
      explanation: 'Object.assign() dan spread operator membuat shallow copy.'
    },
    {
      id: 'or-q4',
      question: 'Shallow copy vs Deep copy:',
      options: [
        'Shallow copy nested objects juga',
        'Deep copy hanya level pertama',
        'Shallow copy level pertama saja',
        'Keduanya sama'
      ],
      correctAnswer: 2,
      explanation: 'Shallow copy hanya meng-copy level pertama, nested objects tetap reference.'
    },
    {
      id: 'or-q5',
      question: 'obj1 === obj2 true jika:',
      options: [
        'Isi properti sama',
        'Merujuk object yang sama',
        'Tipe data sama',
        'Selalu false'
      ],
      correctAnswer: 1,
      explanation: 'Object comparison menggunakan reference equality, bukan content equality.'
    }
  ],

  // Date
  'date': [
    {
      id: 'dt-q1',
      question: 'Cara membuat object Date:',
      options: [
        'new Date()',
        'Date.now()',
        'Date.create()',
        'new Date.now()'
      ],
      correctAnswer: 0,
      explanation: 'Object Date dibuat dengan constructor new Date().'
    },
    {
      id: 'dt-q2',
      question: 'Date.now() mengembalikan:',
      options: [
        'Date object',
        'String tanggal',
        'Timestamp milliseconds',
        'Array tanggal'
      ],
      correctAnswer: 2,
      explanation: 'Date.now() mengembalikan timestamp dalam milliseconds.'
    },
    {
      id: 'dt-q3',
      question: 'Method untuk mengambil tahun:',
      options: [
        'getYear()',
        'getFullYear()',
        'year()',
        'getYr()'
      ],
      correctAnswer: 1,
      explanation: 'getFullYear() mengembalikan tahun 4 digit yang benar.'
    },
    {
      id: 'dt-q4',
      question: 'getMonth() mengembalikan:',
      options: [
        '1-12',
        '0-11',
        '0-12',
        '1-11'
      ],
      correctAnswer: 1,
      explanation: 'getMonth() mengembalikan 0-11 (0 = January, 11 = December).'
    },
    {
      id: 'dt-q5',
      question: 'Format ISO string:',
      options: [
        'YYYY/MM/DD',
        'DD-MM-YYYY',
        'YYYY-MM-DDTHH:mm:ss.sssZ',
        'MM/DD/YYYY'
      ],
      correctAnswer: 2,
      explanation: 'ISO string format: YYYY-MM-DDTHH:mm:ss.sssZ (toISOString()).'
    }
  ],

  // Promise
  'promise': [
    {
      id: 'pr-q1',
      question: 'Promise memiliki berapa state:',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
      explanation: 'Promise memiliki 3 state: pending, fulfilled, dan rejected.'
    },
    {
      id: 'pr-q2',
      question: 'Method untuk menangani Promise yang resolved:',
      options: ['.then()', '.catch()', '.finally()', '.resolve()'],
      correctAnswer: 0,
      explanation: '.then() digunakan untuk menangani Promise yang resolved (fulfilled).'
    },
    {
      id: 'pr-q3',
      question: 'Method untuk menangani Promise yang rejected:',
      options: ['.then()', '.catch()', '.finally()', '.reject()'],
      correctAnswer: 1,
      explanation: '.catch() digunakan untuk menangani Promise yang rejected.'
    },
    {
      id: 'pr-q4',
      question: 'Promise.all() akan resolved jika:',
      options: [
        'Salah satu Promise resolved',
        'Semua Promise resolved',
        'Promise pertama resolved',
        'Tidak ada Promise yang rejected'
      ],
      correctAnswer: 1,
      explanation: 'Promise.all() resolved hanya jika semua Promise resolved.'
    },
    {
      id: 'pr-q5',
      question: 'async/await adalah:',
      options: [
        'Pengganti Promise',
        'Syntax sugar untuk Promise',
        'Method baru Promise',
        'Library external'
      ],
      correctAnswer: 1,
      explanation: 'async/await adalah syntax sugar yang membuat Promise lebih mudah dibaca.'
    }
  ],

  // TypeScript Init
  'ts-init': [
    {
      id: 'tsi-q1',
      question: 'Command untuk initialize TypeScript project:',
      options: ['tsc init', 'tsc --init', 'npm init typescript', 'ts init'],
      correctAnswer: 1,
      explanation: 'tsc --init membuat file tsconfig.json untuk TypeScript project.'
    },
    {
      id: 'tsi-q2',
      question: 'File konfigurasi TypeScript:',
      options: ['typescript.json', 'tsconfig.json', 'ts.config.js', 'config.ts'],
      correctAnswer: 1,
      explanation: 'tsconfig.json adalah file konfigurasi untuk TypeScript compiler.'
    },
    {
      id: 'tsi-q3',
      question: 'Command untuk compile TypeScript:',
      options: ['tsc', 'typescript', 'ts-compile', 'compile-ts'],
      correctAnswer: 0,
      explanation: 'tsc adalah TypeScript compiler untuk compile .ts files ke .js.'
    },
    {
      id: 'tsi-q4',
      question: 'TypeScript compile menjadi:',
      options: ['Machine code', 'Bytecode', 'JavaScript', 'Assembly'],
      correctAnswer: 2,
      explanation: 'TypeScript di-compile menjadi JavaScript yang bisa dijalankan browser/Node.js.'
    },
    {
      id: 'tsi-q5',
      question: 'Install TypeScript secara global:',
      options: [
        'npm install typescript',
        'npm install -g typescript',
        'npm install --global ts',
        'npm i -g ts-node'
      ],
      correctAnswer: 1,
      explanation: 'npm install -g typescript menginstall TypeScript compiler secara global.'
    }
  ],

  // TypeScript Config
  'ts-config': [
    {
      id: 'tsc-q1',
      question: 'Target ES version dalam tsconfig.json:',
      options: ['"target": "ES5"', '"version": "ES5"', '"es": "ES5"', '"ecma": "ES5"'],
      correctAnswer: 0,
      explanation: '"target" menentukan versi ECMAScript yang akan di-generate.'
    },
    {
      id: 'tsc-q2',
      question: 'Untuk enable strict mode:',
      options: ['"strict": true', '"strictMode": true', '"mode": "strict"', '"strict": "on"'],
      correctAnswer: 0,
      explanation: '"strict": true mengaktifkan semua strict type checking options.'
    },
    {
      id: 'tsc-q3',
      question: 'Output directory untuk compiled JavaScript:',
      options: ['"output"', '"outDir"', '"outputDir"', '"dest"'],
      correctAnswer: 1,
      explanation: '"outDir" menentukan folder output untuk compiled JavaScript files.'
    },
    {
      id: 'tsc-q4',
      question: 'Include files untuk compilation:',
      options: ['"files"', '"include"', '"compile"', 'A dan B benar'],
      correctAnswer: 3,
      explanation: '"files" dan "include" keduanya bisa menentukan files untuk di-compile.'
    },
    {
      id: 'tsc-q5',
      question: 'Module system yang disupport:',
      options: ['CommonJS', 'ES6 Modules', 'AMD', 'Semua benar'],
      correctAnswer: 3,
      explanation: 'TypeScript mendukung berbagai module systems: CommonJS, ES6, AMD, UMD, dll.'
    }
  ],

  // TypeScript Unions
  'ts-unions': [
    {
      id: 'tsu-q1',
      question: 'Union type syntax:',
      options: ['string & number', 'string | number', 'string + number', 'string || number'],
      correctAnswer: 1,
      explanation: 'Union type menggunakan pipe symbol (|) untuk menggabungkan types.'
    },
    {
      id: 'tsu-q2',
      question: 'Union type artinya:',
      options: [
        'Gabungan semua properties',
        'Salah satu dari types yang ditentukan',
        'Intersection dari types',
        'Array dari multiple types'
      ],
      correctAnswer: 1,
      explanation: 'Union type berarti nilai bisa salah satu dari types yang ditentukan.'
    },
    {
      id: 'tsu-q3',
      question: 'Type narrowing pada union:',
      options: ['typeof', 'instanceof', 'in operator', 'Semua benar'],
      correctAnswer: 3,
      explanation: 'Type narrowing bisa menggunakan typeof, instanceof, in operator, dll.'
    },
    {
      id: 'tsu-q4',
      question: 'Literal union type:',
      options: [
        '"red" | "green" | "blue"',
        'string | string | string',
        'Color.RED | Color.GREEN',
        'red + green + blue'
      ],
      correctAnswer: 0,
      explanation: 'Literal union type menggunakan literal values dengan pipe symbol.'
    },
    {
      id: 'tsu-q5',
      question: 'Discriminated union menggunakan:',
      options: [
        'Common property untuk differentiate',
        'Union operator',
        'Type assertion',
        'Generic constraint'
      ],
      correctAnswer: 0,
      explanation: 'Discriminated union menggunakan common property untuk membedakan types.'
    }
  ],

  // TypeScript Intersections
  'ts-intersections': [
    {
      id: 'tsi-q1',
      question: 'Intersection type syntax:',
      options: ['A | B', 'A & B', 'A + B', 'A x B'],
      correctAnswer: 1,
      explanation: 'Intersection type menggunakan ampersand (&) untuk menggabungkan types.'
    },
    {
      id: 'tsi-q2',
      question: 'Intersection type artinya:',
      options: [
        'Salah satu dari types',
        'Gabungan semua properties dari semua types',
        'Common properties saja',
        'Optional properties'
      ],
      correctAnswer: 1,
      explanation: 'Intersection type berarti object harus memiliki semua properties dari semua types.'
    },
    {
      id: 'tsi-q3',
      question: 'type AB = A & B; object AB harus memiliki:',
      options: [
        'Properties dari A saja',
        'Properties dari B saja',
        'Properties dari A dan B',
        'Properties dari A atau B'
      ],
      correctAnswer: 2,
      explanation: 'Intersection type mengharuskan object memiliki properties dari semua types.'
    },
    {
      id: 'tsi-q4',
      question: 'Intersection type cocok untuk:',
      options: [
        'Mixins pattern',
        'Combining interfaces',
        'Extension types',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Intersection type cocok untuk mixins, combining interfaces, dan extension types.'
    },
    {
      id: 'tsi-q5',
      question: 'string & number menghasilkan:',
      options: ['string', 'number', 'never', 'unknown'],
      correctAnswer: 2,
      explanation: 'Intersection dari incompatible types menghasilkan never type.'
    }
  ],

  // TypeScript Literal Types
  'ts-literal-types': [
    {
      id: 'tsl-q1',
      question: 'String literal type:',
      options: ['string', '"hello"', 'String', 'text'],
      correctAnswer: 1,
      explanation: 'String literal type menggunakan exact string value dalam quotes.'
    },
    {
      id: 'tsl-q2',
      question: 'Numeric literal type:',
      options: ['number', '42', 'Number', 'int'],
      correctAnswer: 1,
      explanation: 'Numeric literal type menggunakan exact numeric value.'
    },
    {
      id: 'tsl-q3',
      question: 'Boolean literal type:',
      options: ['boolean', 'true', 'Boolean', 'bool'],
      correctAnswer: 1,
      explanation: 'Boolean literal type bisa "true" atau "false" sebagai exact value.'
    },
    {
      id: 'tsl-q4',
      question: 'Template literal type:',
      options: [
        '`hello-${string}`',
        '"hello-" + string',
        'template<string>',
        'String.template'
      ],
      correctAnswer: 0,
      explanation: 'Template literal type menggunakan backticks dengan ${} placeholder.'
    },
    {
      id: 'tsl-q5',
      question: 'Kegunaan literal types:',
      options: [
        'Type safety',
        'Autocompletion',
        'Constraint values',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Literal types memberikan type safety, autocompletion, dan constraint values.'
    }
  ],

  // TypeScript Generics
  'ts-generics': [
    {
      id: 'tsg-q1',
      question: 'Generic type syntax:',
      options: ['Array[T]', 'Array<T>', 'Array(T)', 'Array{T}'],
      correctAnswer: 1,
      explanation: 'Generic type menggunakan angle brackets <T> untuk type parameter.'
    },
    {
      id: 'tsg-q2',
      question: 'Generic function:',
      options: [
        'function fn[T](param: T)',
        'function fn<T>(param: T)',
        'function fn(T)(param: T)',
        'function fn{T}(param: T)'
      ],
      correctAnswer: 1,
      explanation: 'Generic function menggunakan <T> setelah function name.'
    },
    {
      id: 'tsg-q3',
      question: 'Multiple generic parameters:',
      options: ['<T, U>', '<T & U>', '<T | U>', '<T + U>'],
      correctAnswer: 0,
      explanation: 'Multiple generic parameters dipisahkan dengan comma.'
    },
    {
      id: 'tsg-q4',
      question: 'Generic constraint:',
      options: [
        '<T extends string>',
        '<T implements string>',
        '<T instanceof string>',
        '<T as string>'
      ],
      correctAnswer: 0,
      explanation: 'Generic constraint menggunakan keyword "extends".'
    },
    {
      id: 'tsg-q5',
      question: 'Kegunaan generics:',
      options: [
        'Reusable components',
        'Type safety',
        'Code reuse',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Generics memberikan reusability, type safety, dan code reuse.'
    }
  ],

  // TypeScript Generic Constraints
  'ts-generic-constraints': [
    {
      id: 'tsgc-q1',
      question: 'Generic constraint syntax:',
      options: ['T extends K', 'T implements K', 'T inherits K', 'T is K'],
      correctAnswer: 0,
      explanation: 'Generic constraint menggunakan "extends" keyword.'
    },
    {
      id: 'tsgc-q2',
      question: 'keyof constraint:',
      options: [
        'T extends keyof O',
        'T keyof O',
        'T in keyof O',
        'T from keyof O'
      ],
      correctAnswer: 0,
      explanation: '"T extends keyof O" berarti T harus key dari object O.'
    },
    {
      id: 'tsgc-q3',
      question: 'Object constraint:',
      options: [
        'T extends object',
        'T extends {}',
        'T extends Record<string, any>',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Semua syntax tersebut bisa digunakan untuk object constraint.'
    },
    {
      id: 'tsgc-q4',
      question: 'Conditional constraint:',
      options: [
        'T extends string ? A : B',
        'T if string then A else B',
        'T === string ? A : B',
        'if T extends string A else B'
      ],
      correctAnswer: 0,
      explanation: 'Conditional type menggunakan ternary syntax dengan extends.'
    },
    {
      id: 'tsgc-q5',
      question: 'Multiple constraints:',
      options: [
        'T extends A, B',
        'T extends A & B',
        'T extends A and B',
        'T extends A, extends B'
      ],
      correctAnswer: 1,
      explanation: 'Multiple constraints menggunakan intersection type (&).'
    }
  ],

  // TypeScript Conditional Types
  'ts-conditional-types': [
    {
      id: 'tsct-q1',
      question: 'Conditional type syntax:',
      options: [
        'T extends U ? X : Y',
        'T if U then X else Y',
        'if T extends U then X else Y',
        'T === U ? X : Y'
      ],
      correctAnswer: 0,
      explanation: 'Conditional type menggunakan ternary syntax: T extends U ? X : Y.'
    },
    {
      id: 'tsct-q2',
      question: 'infer keyword digunakan untuk:',
      options: [
        'Type assertion',
        'Extract type from conditional',
        'Create new type',
        'Import type'
      ],
      correctAnswer: 1,
      explanation: 'infer keyword mengekstrak type dari conditional type.'
    },
    {
      id: 'tsct-q3',
      question: 'ReturnType<T> adalah:',
      options: [
        'Built-in conditional type',
        'Generic function',
        'Interface',
        'Class'
      ],
      correctAnswer: 0,
      explanation: 'ReturnType<T> adalah built-in conditional type untuk mendapatkan return type function.'
    },
    {
      id: 'tsct-q4',
      question: 'Distributive conditional types:',
      options: [
        'Berlaku untuk union types',
        'Berlaku untuk intersection types',
        'Berlaku untuk primitive types',
        'Berlaku untuk all types'
      ],
      correctAnswer: 0,
      explanation: 'Distributive conditional types otomatis distribute over union types.'
    },
    {
      id: 'tsct-q5',
      question: 'never type dalam conditional:',
      options: [
        'Error type',
        'Type yang tidak pernah terjadi',
        'Empty type',
        'B dan C benar'
      ],
      correctAnswer: 3,
      explanation: 'never type mewakili type yang tidak pernah terjadi / empty type.'
    }
  ],

  // TypeScript Pick & Omit
  'ts-pick-omit': [
    {
      id: 'tspo-q1',
      question: 'Pick<T, K> digunakan untuk:',
      options: [
        'Mengambil semua properties',
        'Mengambil properties tertentu',
        'Menghapus properties',
        'Menambah properties'
      ],
      correctAnswer: 1,
      explanation: 'Pick<T, K> mengambil hanya properties K dari type T.'
    },
    {
      id: 'tspo-q2',
      question: 'Omit<T, K> digunakan untuk:',
      options: [
        'Mengambil properties tertentu',
        'Menghapus properties tertentu',
        'Menambah properties',
        'Mengubah properties'
      ],
      correctAnswer: 1,
      explanation: 'Omit<T, K> menghapus properties K dari type T.'
    },
    {
      id: 'tspo-q3',
      question: 'Pick<User, "name" | "email"> artinya:',
      options: [
        'Ambil semua properties User',
        'Ambil hanya name dan email dari User',
        'Hapus name dan email dari User',
        'Ubah name dan email di User'
      ],
      correctAnswer: 1,
      explanation: 'Pick mengambil hanya properties yang disebutkan (name dan email).'
    },
    {
      id: 'tspo-q4',
      question: 'Omit<User, "password"> artinya:',
      options: [
        'Ambil hanya password',
        'Hapus password dari User type',
        'Ubah password type',
        'Tambah password ke User'
      ],
      correctAnswer: 1,
      explanation: 'Omit menghapus property password dari User type.'
    },
    {
      id: 'tspo-q5',
      question: 'Kegunaan Pick dan Omit:',
      options: [
        'Create subset types',
        'Type transformation',
        'API response typing',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Pick dan Omit berguna untuk membuat subset types, transformasi, dan API typing.'
    }
  ],

  // TypeScript Record & Partial
  'ts-record-partial': [
    {
      id: 'tsrp-q1',
      question: 'Record<K, V> artinya:',
      options: [
        'Array dengan key K dan value V',
        'Object dengan key K dan value V',
        'Function dengan parameter K dan return V',
        'Class dengan property K type V'
      ],
      correctAnswer: 1,
      explanation: 'Record<K, V> adalah object type dengan keys K dan values V.'
    },
    {
      id: 'tsrp-q2',
      question: 'Partial<T> artinya:',
      options: [
        'Semua properties T menjadi required',
        'Semua properties T menjadi optional',
        'Sebagian properties T',
        'T dengan type partial'
      ],
      correctAnswer: 1,
      explanation: 'Partial<T> membuat semua properties dari T menjadi optional.'
    },
    {
      id: 'tsrp-q3',
      question: 'Required<T> adalah:',
      options: [
        'Kebalikan dari Partial<T>',
        'Sama dengan Partial<T>',
        'Subset dari T',
        'Extension dari T'
      ],
      correctAnswer: 0,
      explanation: 'Required<T> membuat semua properties menjadi required (kebalikan Partial).'
    },
    {
      id: 'tsrp-q4',
      question: 'Record<string, number> contohnya:',
      options: [
        '{ [key: string]: number }',
        '{ key: string, value: number }',
        'Map<string, number>',
        'Array<string | number>'
      ],
      correctAnswer: 0,
      explanation: 'Record<string, number> sama dengan index signature { [key: string]: number }.'
    },
    {
      id: 'tsrp-q5',
      question: 'Readonly<T> membuat:',
      options: [
        'Properties T menjadi writable',
        'Properties T menjadi readonly',
        'T menjadi constant',
        'T menjadi immutable'
      ],
      correctAnswer: 1,
      explanation: 'Readonly<T> membuat semua properties dari T menjadi readonly.'
    }
  ],

  // TypeScript Awaited
  'ts-awaited': [
    {
      id: 'tsa-q1',
      question: 'Awaited<T> digunakan untuk:',
      options: [
        'Create Promise<T>',
        'Extract type dari Promise<T>',
        'Make T asynchronous',
        'Wait for T'
      ],
      correctAnswer: 1,
      explanation: 'Awaited<T> mengekstrak type dari Promise<T>.'
    },
    {
      id: 'tsa-q2',
      question: 'Awaited<Promise<string>> adalah:',
      options: ['Promise<string>', 'string', 'Promise', 'async string'],
      correctAnswer: 1,
      explanation: 'Awaited mengekstrak inner type, jadi Promise<string> menjadi string.'
    },
    {
      id: 'tsa-q3',
      question: 'Awaited berguna untuk:',
      options: [
        'async/await functions',
        'Promise type extraction',
        'Return type inference',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Awaited berguna untuk async functions, Promise extraction, dan type inference.'
    },
    {
      id: 'tsa-q4',
      question: 'Nested Promise: Awaited<Promise<Promise<number>>>:',
      options: ['Promise<Promise<number>>', 'Promise<number>', 'number', 'async number'],
      correctAnswer: 2,
      explanation: 'Awaited secara recursive mengekstrak sampai mendapat non-Promise type.'
    },
    {
      id: 'tsa-q5',
      question: 'Awaited<T> vs T:',
      options: [
        'Sama saja jika T bukan Promise',
        'Awaited selalu async',
        'T selalu sync',
        'Awaited lebih lambat'
      ],
      correctAnswer: 0,
      explanation: 'Jika T bukan Promise, Awaited<T> sama dengan T.'
    }
  ],

  // TypeScript Built-in Guards
  'ts-builtin-guards': [
    {
      id: 'tsbg-q1',
      question: 'Built-in type guard:',
      options: ['typeof', 'instanceof', 'Array.isArray', 'Semua benar'],
      correctAnswer: 3,
      explanation: 'typeof, instanceof, dan Array.isArray adalah built-in type guards.'
    },
    {
      id: 'tsbg-q2',
      question: 'typeof guard untuk:',
      options: ['Primitive types', 'Object types', 'Array types', 'Function types'],
      correctAnswer: 0,
      explanation: 'typeof guard paling efektif untuk primitive types.'
    },
    {
      id: 'tsbg-q3',
      question: 'instanceof guard untuk:',
      options: ['Primitive types', 'Class instances', 'Interface types', 'Union types'],
      correctAnswer: 1,
      explanation: 'instanceof guard digunakan untuk mengecek class instances.'
    },
    {
      id: 'tsbg-q4',
      question: 'in operator guard:',
      options: [
        'Mengecek property existence',
        'Mengecek type membership',
        'Mengecek array content',
        'Mengecek function signature'
      ],
      correctAnswer: 0,
      explanation: 'in operator mengecek apakah property ada dalam object.'
    },
    {
      id: 'tsbg-q5',
      question: 'Array.isArray(x) mengecek:',
      options: [
        'x adalah object',
        'x adalah array',
        'x adalah iterable',
        'x adalah collection'
      ],
      correctAnswer: 1,
      explanation: 'Array.isArray() secara spesifik mengecek apakah nilai adalah array.'
    }
  ],

  // TypeScript Custom Guards
  'ts-custom-guards': [
    {
      id: 'tscg-q1',
      question: 'Custom type guard syntax:',
      options: [
        'function isString(x): boolean',
        'function isString(x): x is string',
        'function isString(x): string',
        'function isString(x) -> boolean'
      ],
      correctAnswer: 1,
      explanation: 'Custom type guard menggunakan "x is Type" syntax.'
    },
    {
      id: 'tscg-q2',
      question: 'Type predicate "x is string" artinya:',
      options: [
        'x pasti string',
        'x mungkin string',
        'jika true, x adalah string',
        'x bukan string'
      ],
      correctAnswer: 2,
      explanation: 'Type predicate memberitahu TypeScript bahwa jika function return true, parameter adalah type tersebut.'
    },
    {
      id: 'tscg-q3',
      question: 'Custom guard function harus return:',
      options: ['string', 'boolean', 'Type', 'any'],
      correctAnswer: 1,
      explanation: 'Type guard function harus return boolean value.'
    },
    {
      id: 'tscg-q4',
      question: 'Assertion function syntax:',
      options: [
        'function assert(x): x is Type',
        'function assert(x): asserts x is Type',
        'function assert(x): Type',
        'function assert(x): boolean'
      ],
      correctAnswer: 1,
      explanation: 'Assertion function menggunakan "asserts x is Type" syntax.'
    },
    {
      id: 'tscg-q5',
      question: 'Kegunaan custom type guards:',
      options: [
        'Type narrowing',
        'Runtime type checking',
        'Better type safety',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Custom type guards memberikan type narrowing, runtime checking, dan type safety.'
    }
  ],

  // TypeScript Discriminated Unions
  'ts-discriminated-unions': [
    {
      id: 'tsdu-q1',
      question: 'Discriminated union menggunakan:',
      options: [
        'Common property untuk distinguish',
        'Different property names',
        'Type assertion',
        'Generic constraints'
      ],
      correctAnswer: 0,
      explanation: 'Discriminated union menggunakan common property (discriminant) untuk membedakan types.'
    },
    {
      id: 'tsdu-q2',
      question: 'Tagged union adalah:',
      options: [
        'Union dengan tag property',
        'Union dengan generic tag',
        'Union dengan string tag',
        'A sama dengan discriminated union'
      ],
      correctAnswer: 3,
      explanation: 'Tagged union adalah nama lain untuk discriminated union.'
    },
    {
      id: 'tsdu-q3',
      question: 'Discriminant property biasanya:',
      options: [
        'string literal',
        'number literal',
        'boolean literal',
        'Semua bisa'
      ],
      correctAnswer: 3,
      explanation: 'Discriminant property bisa string, number, atau boolean literal.'
    },
    {
      id: 'tsdu-q4',
      question: 'Exhaustive checking menggunakan:',
      options: ['never type', 'unknown type', 'any type', 'void type'],
      correctAnswer: 0,
      explanation: 'Exhaustive checking menggunakan never type untuk memastikan semua cases ditangani.'
    },
    {
      id: 'tsdu-q5',
      question: 'Keuntungan discriminated union:',
      options: [
        'Type safety',
        'Pattern matching',
        'Exhaustive checking',
        'Semua benar'
      ],
      correctAnswer: 3,
      explanation: 'Discriminated union memberikan type safety, pattern matching, dan exhaustive checking.'
    }
  ]
};

// Helper function to get random questions
export function getRandomQuestions(topicId: string, count: number = 5): QuizQuestion[] {
  const questions = quizData[topicId] || [];
  
  // Debug: log what's happening
  console.log(`Getting questions for topic: ${topicId}`);
  console.log(`Available questions: ${questions.length}`);
  
  if (questions.length === 0) {
    console.log(`No questions found for topic: ${topicId}`);
    return [];
  }
  
  // Shuffle and pick random questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  console.log(`Selected ${selected.length} questions:`, selected.map(q => q.question));
  return selected;
}