I. Junior Level – 50 Pertanyaan dan Jawaban
A. Dasar Pemrograman (15)
Apa itu variabel?
Variabel adalah wadah untuk menyimpan data di dalam program, yang memiliki nama dan tipe data.

Apa itu tipe data?
Tipe data menentukan jenis nilai yang dapat disimpan, seperti integer, string, boolean, dll.

Apa itu array?
Array adalah struktur data yang menyimpan sekumpulan nilai dalam satu variabel dengan indeks.

Apa perbedaan var, let, dan const di JavaScript?

var: function-scoped, dapat di-redeclare.

let: block-scoped, tidak bisa di-redeclare dalam scope yang sama.

const: block-scoped, nilainya tidak dapat diubah.

Apa itu loop?
Struktur kontrol yang digunakan untuk menjalankan kode secara berulang, seperti for, while, dan do...while.

Apa itu conditional statement?
Pernyataan untuk menjalankan kode berdasarkan kondisi tertentu, misalnya if, else if, else.

Apa itu fungsi (function)?
Blok kode yang dapat dipanggil untuk melakukan tugas tertentu.

Apa itu parameter dan argument pada function?

Parameter: variabel yang didefinisikan pada fungsi.

Argument: nilai yang dikirim saat fungsi dipanggil.

Apa itu null dan undefined di JavaScript?

null: nilai yang sengaja dikosongkan.

undefined: variabel belum diinisialisasi atau tidak memiliki nilai.

Apa itu operator aritmatika?
Operator yang digunakan untuk operasi matematika seperti +, -, *, /, %.

Apa itu komentar pada kode?
Baris teks yang tidak dijalankan oleh program, digunakan untuk dokumentasi.

Apa perbedaan == dan === di JavaScript?

==: membandingkan nilai dengan konversi tipe otomatis.

===: membandingkan nilai dan tipe data secara ketat.

Apa itu bug dalam pemrograman?
Kesalahan atau perilaku tak terduga dalam program.

Apa itu compiler dan interpreter?

Compiler: menerjemahkan kode ke bahasa mesin sekaligus.

Interpreter: mengeksekusi kode baris demi baris.

Apa itu exception?
Kesalahan yang terjadi selama eksekusi program yang dapat ditangani dengan try-catch.

B. Algoritma & Struktur Data (10)
Apa itu algoritma?
Langkah-langkah logis untuk menyelesaikan masalah.

Apa itu kompleksitas waktu (time complexity)?
Ukuran berapa lama algoritma berjalan berdasarkan ukuran input.

Apa itu Big O Notation?
Notasi untuk mengukur kompleksitas algoritma, seperti O(1), O(n), O(log n).

Apa itu stack?
Struktur data LIFO (Last In First Out).

Apa itu queue?
Struktur data FIFO (First In First Out).

Apa itu linked list?
Struktur data linear di mana setiap elemen berisi data dan pointer ke elemen berikutnya.

Apa itu hash table?
Struktur data yang menyimpan pasangan key-value untuk akses cepat.

Apa itu sorting?
Proses mengurutkan data, seperti Bubble Sort, Quick Sort, Merge Sort.

Apa itu searching?
Proses mencari elemen dalam struktur data, seperti Linear Search dan Binary Search.

Kapan menggunakan array vs linked list?

Array: akses indeks cepat, ukuran tetap.

Linked List: ukuran fleksibel, insert/delete cepat di tengah.

C. Git & Tools (10)
Apa itu Git?
Sistem version control untuk melacak perubahan kode.

Apa itu repository?
Tempat menyimpan kode dan riwayat versinya.

Apa itu commit di Git?
Menyimpan snapshot perubahan kode.

Apa itu branch di Git?
Cabang pengembangan independen dari kode utama.

Apa itu merge di Git?
Menggabungkan perubahan dari satu branch ke branch lain.

Apa itu pull request?
Permintaan untuk menggabungkan perubahan ke branch utama.

Perintah untuk membuat branch baru?
git checkout -b nama_branch

Apa itu git clone?
Mengunduh repository dari remote ke lokal.

Apa itu git push?
Mengirim perubahan dari lokal ke remote.

Apa itu .gitignore?
File yang berisi daftar file/folder yang tidak dilacak Git.

D. Software Development Basics (15)
Apa itu IDE?
Integrated Development Environment, alat untuk menulis dan mengelola kode.

Apa itu API?
Antarmuka untuk komunikasi antar aplikasi.

Apa itu REST API?
API yang mengikuti prinsip Representational State Transfer.

Apa itu HTTP method GET dan POST?

GET: mengambil data.

POST: mengirim data.

Apa itu JSON?
Format data ringan berbasis teks untuk pertukaran data.

Apa itu respons status code 200, 404, 500?

200: OK

404: Not Found

500: Server Error

Apa itu frontend dan backend?

Frontend: bagian aplikasi yang berinteraksi dengan pengguna.

Backend: bagian server yang mengelola logika dan data.

Apa itu database?
Sistem untuk menyimpan dan mengelola data.

Apa itu SQL?
Bahasa untuk mengelola data di database relasional.

Apa itu primary key?
Kolom unik untuk mengidentifikasi setiap baris data.

Apa itu foreign key?
Kolom yang menghubungkan tabel satu dengan yang lain.

Apa itu join di SQL?
Menggabungkan data dari beberapa tabel.

Apa itu responsive design?
Desain web yang menyesuaikan tampilan di berbagai perangkat.

Apa itu debugging?
Proses menemukan dan memperbaiki bug.

Apa itu unit testing?
Pengujian kode pada unit terkecil seperti fungsi.

II. Intermediate Level – 50 Pertanyaan dan Jawaban
A. Desain Sistem & Arsitektur (15)
Apa itu MVC?
Model-View-Controller adalah pola desain yang memisahkan logika data (Model), antarmuka (View), dan pengendali (Controller).

Apa itu microservices?
Arsitektur yang membagi aplikasi menjadi layanan-layanan kecil yang dapat berjalan independen.

Kapan memilih monolith vs microservices?

Monolith: saat aplikasi masih kecil dan tim sedikit.

Microservices: saat aplikasi besar, perlu skalabilitas, dan tim terdistribusi.

Apa itu load balancer?
Komponen yang mendistribusikan lalu lintas ke beberapa server.

Apa itu caching?
Penyimpanan data sementara untuk mempercepat akses.

Kapan menggunakan CDN?
Untuk menyajikan file statis lebih cepat dari lokasi terdekat pengguna.

Apa itu API Gateway?
Titik masuk tunggal untuk mengelola request ke berbagai layanan backend.

Apa itu horizontal dan vertical scaling?

Horizontal: menambah jumlah server.

Vertical: meningkatkan kapasitas server.

Apa itu event-driven architecture?
Pola desain di mana komponen berkomunikasi melalui event (peristiwa).

Apa itu rate limiting?
Batasan jumlah request dalam periode tertentu untuk mencegah abuse.

Apa itu reverse proxy?
Server yang menerima request dari client dan meneruskannya ke server lain.

Apa itu failover?
Proses otomatis berpindah ke sistem cadangan jika sistem utama gagal.

Apa itu disaster recovery plan?
Rencana pemulihan sistem setelah kegagalan besar.

Apa itu service discovery?
Mekanisme untuk menemukan alamat layanan dalam sistem terdistribusi.

Apa itu CQRS?
Command Query Responsibility Segregation, memisahkan operasi baca dan tulis.

B. Database & Data Handling (10)
Apa itu index di database?
Struktur yang mempercepat pencarian data.

Kapan index bisa menurunkan performa?
Saat terlalu banyak index sehingga memperlambat insert/update.

Apa itu transaksi di database?
Sekumpulan operasi yang dijalankan secara atomik.

Apa itu ACID?
Atomicity, Consistency, Isolation, Durability — prinsip transaksi database.

Apa itu normalization?
Proses merapikan data untuk menghindari duplikasi.

Apa itu denormalization?
Menambahkan redundansi data untuk meningkatkan kecepatan baca.

Apa itu sharding?
Memecah database menjadi beberapa bagian (shard) untuk skala besar.

Apa itu replication?
Menyalin data ke beberapa server untuk backup dan ketersediaan tinggi.

Apa itu NoSQL?
Database non-relasional, seperti MongoDB, Redis.

Kapan memilih SQL vs NoSQL?

SQL: data terstruktur, butuh relasi kompleks.

NoSQL: data fleksibel, skala besar, dan cepat berubah.

C. Backend & API Development (15)
Apa itu middleware?
Fungsi yang dieksekusi di antara request dan response dalam server.

Apa itu JWT?
JSON Web Token, format token untuk autentikasi.

Apa itu OAuth?
Protokol otorisasi untuk mengizinkan akses tanpa berbagi password.

Apa itu CORS?
Cross-Origin Resource Sharing, mekanisme izin akses dari domain berbeda.

Apa itu rate limiting di API?
Membatasi jumlah request yang dapat dilakukan user.

Apa itu pagination?
Pembagian data besar menjadi halaman kecil.

Apa itu WebSocket?
Protokol komunikasi dua arah real-time antara client dan server.

Apa itu gRPC?
Protokol RPC yang menggunakan HTTP/2 dan Protobuf untuk performa tinggi.

Apa itu API versioning?
Menentukan versi API untuk kompatibilitas ke depan.

Apa itu idempotent API?
API yang memberikan hasil sama jika dipanggil berkali-kali dengan data yang sama.

Apa itu logging?
Pencatatan peristiwa atau error untuk debugging.

Apa itu monitoring?
Pemantauan performa dan kesehatan aplikasi.

Apa itu health check API?
Endpoint untuk mengecek status layanan.

Apa itu circuit breaker pattern?
Pola untuk menghentikan request ke layanan yang gagal untuk menghindari beban.

Apa itu retry mechanism?
Mekanisme untuk mengulang request yang gagal.

D. Best Practices & Testing (10)
Apa itu code review?
Proses memeriksa kode oleh rekan kerja untuk memastikan kualitas.

Apa itu unit test vs integration test?

Unit test: menguji fungsi kecil.

Integration test: menguji interaksi antar komponen.

Apa itu TDD?
Test-Driven Development, menulis test sebelum kode.

Apa itu CI/CD?
Continuous Integration / Continuous Deployment, otomatisasi build dan deploy.

Apa itu linting?
Analisis kode untuk menemukan kesalahan gaya atau sintaks.

Apa itu refactoring?
Memperbaiki struktur kode tanpa mengubah perilaku.

Apa itu DRY principle?
Don’t Repeat Yourself, hindari duplikasi kode.

Apa itu KISS principle?
Keep It Simple, Stupid — buat kode sederhana.

Apa itu YAGNI?
You Aren’t Gonna Need It — jangan buat fitur sebelum dibutuhkan.

Apa itu code smell?
Tanda bahwa kode memiliki masalah desain yang perlu diperbaiki.

III. Senior Level – 50 Pertanyaan dan Jawaban
A. Arsitektur Skala Besar & High-Level Design (15)
Apa itu high availability?
Sistem yang dirancang untuk tetap beroperasi meskipun ada kegagalan sebagian.

Bagaimana cara mendesain sistem yang skalabel?
Gunakan load balancing, caching, database partitioning, dan desain modular.

Apa itu eventual consistency?
Model konsistensi di mana data akan konsisten setelah periode waktu tertentu.

Kapan memilih SQL vs NoSQL untuk sistem skala besar?

SQL: relasi kompleks, konsistensi ketat.

NoSQL: data fleksibel, throughput tinggi, distribusi global.

Apa itu CAP theorem?
Teorema bahwa sistem terdistribusi hanya bisa memenuhi dua dari tiga: Consistency, Availability, Partition tolerance.

Apa itu data lake vs data warehouse?

Data lake: menyimpan data mentah dari berbagai sumber.

Data warehouse: menyimpan data yang sudah terstruktur untuk analisis.

Bagaimana mengatasi bottleneck di sistem besar?
Optimasi query, caching, scaling horizontal, asinkronisasi proses.

Apa itu domain-driven design (DDD)?
Pendekatan desain perangkat lunak yang berfokus pada model domain bisnis.

Apa itu service mesh?
Lapisan infrastruktur untuk mengatur komunikasi antar layanan microservices.

Apa itu blue-green deployment?
Strategi deployment dengan dua lingkungan identik untuk menghindari downtime.

Apa itu canary release?
Merilis fitur ke sebagian kecil pengguna untuk pengujian sebelum rilis penuh.

Bagaimana cara mengelola state pada sistem terdistribusi?
Gunakan state store terpusat atau sistem event sourcing.

Apa itu saga pattern?
Pola untuk mengelola transaksi terdistribusi di microservices.

Apa itu backpressure di sistem streaming?
Mekanisme mengatur aliran data agar konsumen tidak kewalahan.

Apa itu idempotency key pada API pembayaran?
Kunci unik untuk mencegah duplikasi transaksi.

B. Performance & Optimization (10)
Bagaimana mengoptimalkan query database besar?
Gunakan index, batasi kolom, optimasi join, dan query plan analysis.

Apa itu lazy loading?
Memuat data hanya saat diperlukan.

Apa itu eager loading?
Memuat semua data terkait sekaligus untuk menghindari N+1 query problem.

Bagaimana cara mengurangi latency API?
Gunakan CDN, caching, parallel request, dan optimasi payload.

Bagaimana mengukur kinerja aplikasi?
Gunakan metrics seperti response time, throughput, error rate.

Apa itu profiling aplikasi?
Analisis eksekusi kode untuk menemukan bagian yang lambat.

Apa itu garbage collection tuning?
Penyesuaian pengelolaan memori otomatis untuk mengurangi jeda eksekusi.

Bagaimana mengoptimalkan performa JavaScript di browser?
Minimalkan DOM manipulation, gunakan debounce/throttle, bundling, minification.

Apa itu query batching di GraphQL?
Menggabungkan beberapa query menjadi satu untuk mengurangi request.

Apa itu edge computing?
Memproses data lebih dekat ke sumbernya untuk mengurangi latency.

C. Security & Reliability (15)
Apa itu OWASP Top 10?
Daftar 10 risiko keamanan aplikasi web paling umum.

Bagaimana mencegah SQL Injection?
Gunakan prepared statements dan parameterized queries.

Bagaimana mencegah XSS (Cross-Site Scripting)?
Escape output, gunakan CSP, validasi input.

Apa itu CSRF dan cara mencegahnya?
Cross-Site Request Forgery; gunakan token anti-CSRF.

Apa itu rate limiting untuk keamanan API?
Membatasi jumlah request untuk mencegah brute force.

Apa itu HTTPS dan mengapa penting?
Protokol aman menggunakan SSL/TLS untuk enkripsi data.

Bagaimana cara mengelola secret & credentials?
Gunakan vault atau secret manager, jangan hardcode di kode.

Apa itu zero trust security model?
Prinsip bahwa tidak ada komponen yang otomatis dipercaya.

Bagaimana menangani DDoS attack?
Gunakan WAF, rate limiting, CDN dengan proteksi.

Apa itu audit logging?
Pencatatan semua aktivitas penting untuk keperluan forensik.

Bagaimana memastikan high availability di cloud?
Multi-region deployment, load balancing, auto scaling.

Apa itu chaos engineering?
Pengujian sistem dengan memicu kegagalan untuk menguji ketahanannya.

Bagaimana memulihkan data setelah kegagalan besar?
Gunakan backup teratur dan disaster recovery plan.

Apa itu RTO dan RPO dalam DRP?

RTO: waktu maksimum pemulihan.

RPO: kehilangan data maksimum yang bisa diterima.

Bagaimana mengamankan pipeline CI/CD?
Gunakan akses terbatas, enkripsi secret, dan verifikasi kode.

D. Leadership & Problem-Solving (10)
Bagaimana membagi tugas dalam tim software besar?
Gunakan agile dengan pembagian modul dan tanggung jawab jelas.

Bagaimana menangani konflik teknis dalam tim?
Diskusi berbasis data, POC, dan kesepakatan kolektif.

Bagaimana memutuskan teknologi baru untuk proyek?
Evaluasi kebutuhan bisnis, dukungan komunitas, dan ROI.

Bagaimana memimpin migrasi sistem lama ke arsitektur baru?
Rencanakan bertahap, buat backward compatibility, dan monitor performa.

Bagaimana mengatur prioritas bug vs fitur baru?
Berdasarkan dampak pada pengguna dan urgensi.

Bagaimana memastikan kualitas kode di tim besar?
Code review, linting, testing, dan standar coding.

Bagaimana membimbing junior developer?
Pair programming, feedback konstruktif, dan mentoring rutin.

Bagaimana menangani deadline ketat?
Prioritaskan fitur penting, kurangi scope, tingkatkan koordinasi.

Bagaimana menilai kinerja tim engineering?
Berdasarkan delivery, kualitas, kolaborasi, dan inovasi.

Bagaimana menjaga dokumentasi tetap up-to-date?
Integrasikan update dokumentasi ke proses development.


