I. Junior Level – 50 Pertanyaan dan Jawaban
A. Dasar Pemrograman (15)
Apa itu variabel?
Variabel adalah wadah untuk menyimpan data di dalam program, yang memiliki nama dan tipe data.
Dipakai untuk menyimpan nilai yang dapat berubah selama program berjalan (kecuali yang dideklarasikan dengan const).
Gunakan penamaan deskriptif (camelCase di JavaScript) dan batasi cakupan (scope) sekecil mungkin.

Apa itu tipe data?
Tipe data menentukan jenis nilai yang dapat disimpan, seperti number, string, boolean, object, array, null, undefined.
Bedakan tipe primitif (number, string, boolean, null, undefined, symbol, bigint) dan tipe referensi (object, array, function).
Pemahaman tipe membantu mencegah bug konversi nilai dan memudahkan validasi input.

Apa itu array?
Array adalah struktur data yang menyimpan sekumpulan nilai dalam satu variabel dengan indeks (0-based).
Operasi umum: push/pop, shift/unshift, map/filter/reduce/sort untuk transformasi data.
Contoh: const angka = [1, 2, 3]; angka[0] === 1.

Apa perbedaan var, let, dan const di JavaScript?

var: function-scoped, di-hoist, dapat di-redeclare (rawan bug).

let: block-scoped, bisa di-reassign, tidak bisa redeclare dalam scope yang sama.

const: block-scoped, tidak bisa di-reassign. Untuk object/array, referensinya tetap tetapi propertinya bisa diubah.
Best practice: gunakan const secara default, gunakan let jika nilainya memang berubah, hindari var.

Apa itu loop?
Struktur kontrol untuk menjalankan kode secara berulang seperti for, while, do...while, for...of (iterable), for...in (key object).
Pilih for...of untuk iterasi array, while untuk kondisi, dan hindari loop tak berujung dengan syarat berhenti yang jelas.

Apa itu conditional statement?
Pernyataan untuk menjalankan kode berdasarkan kondisi (if, else if, else, switch).
Pahami truthy/falsy (0, "", null, undefined adalah falsy). Gunakan switch untuk banyak cabang yang jelas.

Apa itu fungsi (function)?
Blok kode yang dapat dipanggil untuk melakukan tugas tertentu dan bisa mengembalikan nilai.
Bentuk: function declaration, function expression, arrow function. Gunakan parameter default dan destructuring bila perlu.

Apa itu parameter dan argument pada function?

Parameter: variabel yang didefinisikan pada fungsi (placeholder).

Argument: nilai yang dikirim saat fungsi dipanggil.
Contoh: function greet(nama) { ... } greet("Ani"); → nama adalah parameter, "Ani" adalah argumen.

Apa itu null dan undefined di JavaScript?

null: nilai yang sengaja dikosongkan (menandai tidak ada nilai).

undefined: variabel belum diinisialisasi atau properti tidak ada.
Gunakan perbandingan ketat (===) dan operator nullish coalescing (??) untuk fallback aman.

Apa itu operator aritmatika?
Operator untuk operasi matematika seperti +, -, *, /, %, ** (pangkat).
Perhatikan prioritas operator dan pembagian floating point di JS (1/3 ≈ 0.333...).

Apa itu komentar pada kode?
Baris/blok yang tidak dijalankan: // satu baris, /* ... */ multi-baris.
Fokuskan komentar pada "mengapa" bukan "apa"; gunakan nama variabel/fungsi yang jelas agar komentar minimal.

Apa perbedaan == dan === di JavaScript?

==: membandingkan nilai dengan konversi tipe otomatis (rawan kejutan, mis. '5' == 5 → true).

===: membandingkan nilai dan tipe data secara ketat (disarankan dalam kode modern).

Apa itu bug dalam pemrograman?
Kesalahan atau perilaku tak terduga dalam program.
Strategi penanganan: reproduksi, logging/stack trace, debugging step-by-step, tulis test untuk mencegah regresi.

Apa itu compiler dan interpreter?

Compiler: menerjemahkan seluruh kode ke bahasa mesin sebelum dieksekusi (mis. C, Go).

Interpreter: mengeksekusi baris demi baris (mis. Python). JavaScript memakai JIT (kombinasi parse + optimisasi saat runtime).

Apa itu exception?
Kesalahan yang terjadi selama eksekusi program yang dapat ditangani dengan try-catch-finally.
Gunakan throw new Error('pesan'); tangani kasus yang bisa dipulihkan, log sisanya; tutup resource di finally bila perlu.

B. Algoritma & Struktur Data (10)
Apa itu algoritma?
Langkah-langkah terstruktur untuk menyelesaikan masalah dari input → proses → output.
Kriteria: benar, efisien, mudah dipahami, dan dapat dipelihara.

Apa itu kompleksitas waktu (time complexity)?
Estimasi waktu berjalan relatif terhadap ukuran input n (bukan waktu nyata).
Contoh: O(n) linear, O(n log n) sort efisien, O(n^2) nested loop.

Apa itu Big O Notation?
Notasi batas atas kompleksitas (worst case). Juga ada Big Ω (best), Θ (tight bound).
Dipakai membandingkan efisiensi algoritma secara skala besar.

Apa itu stack?
Struktur LIFO (Last In First Out). Operasi: push, pop, peek. Contoh: call stack, undo/redo.

Apa itu queue?
Struktur FIFO (First In First Out). Operasi: enqueue, dequeue, front. Contoh: antrian tugas, scheduler.

Apa itu linked list?
Rangkaian node dengan pointer ke node berikutnya. Insert/delete O(1) di tengah, akses acak lambat.

Apa itu hash table?
Penyimpanan key→value dengan akses rata-rata O(1) menggunakan fungsi hash. Tangani collision (chaining/open addressing).

Apa itu sorting?
Mengurutkan data. Algoritma umum: QuickSort, MergeSort, HeapSort (O(n log n)). Pilih berdasarkan stabilitas dan memori.

Apa itu searching?
Mencari elemen. Linear Search O(n), Binary Search O(log n) pada data terurut. Gunakan struktur indeks bila perlu.

Kapan menggunakan array vs linked list?

Array: akses indeks O(1), cocok untuk banyak baca; resize mahal.

Linked List: insert/delete di tengah cepat, akses acak lambat. Pilih sesuai pola operasi.

C. Git & Tools (10)
Apa itu Git?
Sistem version control terdistribusi untuk melacak perubahan kode dan kolaborasi. Fitur: branching, merging, history, revert.

Apa itu repository?
Direktori proyek yang menyimpan kode dan riwayat versi (local/remote seperti GitHub). Ada working directory, staging area, commit history.

Apa itu commit di Git?
Snapshot perubahan dengan pesan deskriptif. Best practice: commit kecil, pesan jelas (imperative), kaitkan issue.

Apa itu branch di Git?
Cabang pengembangan terpisah agar fitur/bugfix tidak mengganggu main. Workflow umum: feature branches + pull request.

Apa itu merge di Git?
Menggabungkan perubahan antar branch (merge commit) atau rebase (linear history). Tangani conflict dengan memilih perubahan yang tepat.

Apa itu pull request?
Permintaan review sebelum menggabungkan ke branch utama. Sertakan deskripsi, test, dan bukti hasil.

Perintah untuk membuat branch baru?
git checkout -b nama_branch (atau git switch -c nama_branch).

Apa itu git clone?
Mengunduh repository remote ke lokal (riwayat lengkap). Contoh: git clone https://github.com/org/repo.git

Apa itu git push?
Mengirim commit lokal ke remote. Contoh: git push origin nama_branch.

Apa itu .gitignore?
Daftar file/folder yang diabaikan (mis. node_modules, build, secret). Simpan template sesuai bahasa/framework.

D. Software Development Basics (15)
Apa itu IDE?
Lingkungan terpadu untuk coding: editor, debugging, build, plugin. Contoh: VS Code, WebStorm.

Apa itu API?
Antarmuka komunikasi antar aplikasi/komponen (kontrak input/output). Contoh: REST, GraphQL, gRPC, SDK.

Apa itu REST API?
API dengan prinsip resource-based, stateless, cacheable, uniform interface. Gunakan HTTP verbs dan status codes.

Apa itu HTTP method GET dan POST?

GET: mengambil data, idempotent, tanpa efek samping.

POST: mengirim/menbuat data, tidak idempotent. Pakai query params untuk filter, body untuk payload.

Apa itu JSON?
Format data teks ringan: pasangan key-value. Contoh: { "id":1, "name":"Alice" }.

Apa itu respons status code 200, 404, 500?

200: OK (berhasil). 404: Not Found (resource tidak ada). 500: Server Error (kesalahan server).
Gunakan kode yang tepat untuk observabilitas yang baik.

Apa itu frontend dan backend?

Frontend: UI/UX di browser/mobile (HTML/CSS/JS/TS).

Backend: logika bisnis, database, API, otentikasi, background jobs.

Apa itu database?
Sistem untuk menyimpan/mengelola data terstruktur/ tidak terstruktur. Tipe: relasional (SQL) dan non-relasional (NoSQL).

Apa itu SQL?
Bahasa untuk mengelola database relasional (SELECT/INSERT/UPDATE/DELETE), JOIN, agregasi, transaksi.

Apa itu primary key?
Kolom unik untuk identifikasi baris (tidak boleh null/duplikat). Contoh: id UUID/auto-increment.

Apa itu foreign key?
Kolom yang mereferensikan primary key tabel lain untuk menjaga integritas relasi. Dapat memiliki aturan cascading.

Apa itu join di SQL?
Menggabungkan data antar tabel: INNER, LEFT, RIGHT, FULL. Pilih sesuai kebutuhan inklusi baris yang tidak cocok.

Apa itu responsive design?
Desain yang adaptif di berbagai ukuran layar dengan layout fleksibel (grid, flex), breakpoint, media queries.

Apa itu debugging?
Proses menemukan dan memperbaiki bug menggunakan logging, breakpoint, dan devtools. Strategi: isolate, simplify, test hypothesis.

Apa itu unit testing?
Pengujian fungsi/komponen terkecil secara terisolasi. Manfaat: mencegah regresi, dokumentasi perilaku, desain modular.

II. Intermediate Level – 50 Pertanyaan dan Jawaban
A. Desain Sistem & Arsitektur (15)
Apa itu MVC?
Pola yang memisahkan Model (data/logika), View (presentasi), Controller (koordinasi). Manfaat: modular, mudah diuji, dipelihara.

Apa itu microservices?
Arsitektur memecah aplikasi menjadi layanan kecil independen, dideploy terpisah. Tantangan: komunikasi, observabilitas, konsistensi data.

Kapan memilih monolith vs microservices?

Monolith: tim kecil, domain belum stabil, kecepatan awal.

Microservices: skala tim besar, domain jelas, perlu skalabilitas/isolasi; migrasi bertahap lebih aman.

Apa itu load balancer?
Komponen yang membagi traffic ke beberapa instance untuk ketersediaan dan throughput. Strategi: round-robin, least-connections, IP-hash.

Apa itu caching?
Menyimpan hasil mahal (query/render) agar akses berikutnya lebih cepat. Lapisan: client, CDN, reverse proxy, aplikasi, database.

Kapan menggunakan CDN?
Saat menyajikan aset statis global untuk menurunkan latency; atur cache headers (Cache-Control/ETag).

Apa itu API Gateway?
Pintu masuk tunggal untuk routing, auth, rate-limit, transformasi; menyederhanakan client dan kebijakan terpusat.

Apa itu horizontal dan vertical scaling?

Horizontal: tambah instance (scale-out).

Vertical: tambah resource per mesin (scale-up). Prioritaskan horizontal untuk elastisitas.

Apa itu event-driven architecture?
Komunikasi via event async (pub/sub, queue/stream) untuk decoupling dan throughput tinggi.

Apa itu rate limiting?
Batasi request per waktu demi stabilitas/keamanan. Teknik: token bucket, leaky bucket, fixed/sliding window.

Apa itu reverse proxy?
Server perantara (Nginx/Envoy) untuk TLS termination, caching, routing. Meningkatkan keamanan dan performa.

Apa itu failover?
Perpindahan otomatis ke sistem cadangan saat utama gagal. Butuh health check, replika siap, data sinkron.

Apa itu disaster recovery plan?
Rencana pemulihan pasca bencana: RTO/RPO, backup, latihan DR drill. Dokumentasi dan simulasi rutin.

Apa itu service discovery?
Mekanisme menemukan alamat layanan dinamis (Consul, Eureka, DNS-SRV). Sering digabung client-side LB.

Apa itu CQRS?
Pisahkan command (tulis) dan query (baca) untuk skala dan model optimal. Sering dipasangkan dengan Event Sourcing.

B. Database & Data Handling (10)
Apa itu index di database?
Struktur data bantu (B-Tree/Hash) untuk mempercepat pencarian di kolom. Trade-off: ruang dan biaya write lebih tinggi.

Kapan index bisa menurunkan performa?
Jika terlalu banyak index/kolom sering berubah; operasi write/insert menjadi lambat. Pilih index selektif dan ukur dengan EXPLAIN.

Apa itu transaksi di database?
Sekumpulan operasi yang dieksekusi atomik sebagai satu unit kerja (berhasil semua atau rollback semua).

Apa itu ACID?
Atomicity, Consistency, Isolation, Durability. Isolation levels mempengaruhi fenomena seperti dirty/phantom reads.

Apa itu normalization?
Teknik merapikan skema untuk mengurangi duplikasi/inconsistency (1NF, 2NF, 3NF, BCNF). Seimbangkan dengan performa.

Apa itu denormalization?
Penambahan redundansi terkontrol untuk baca cepat (materialized view, kolom ringkasan). Perlu sinkronisasi data.

Apa itu sharding?
Pembagian data ke partisi fisik berdasarkan kunci shard. Tantangan: rebalancing, cross-shard query, konsistensi.

Apa itu replication?
Menyalin data ke replika (sync/async) untuk HA/reading scale. Atur failover dan lag monitoring.

Apa itu NoSQL?
Database non-relasional: dokumen, key-value, kolom lebar, graf. Pilih sesuai pola data (skema fleksibel, skala horizontal).

Kapan memilih SQL vs NoSQL?

SQL: relasi kompleks, transaksi kuat, konsistensi.

NoSQL: skema fleksibel, throughput masif, geodistribusi. Polyglot persistence sering jadi pilihan.

C. Backend & API Development (15)
Apa itu middleware?
Fungsi perantara request→response (logging, auth, validation) yang memudahkan komposisi cross-cutting concerns.

Apa itu JWT?
Token JSON yang ditandatangani (header.payload.signature) untuk auth stateless. Simpan singkat (expiry), amankan di HttpOnly cookie.

Apa itu OAuth?
Protokol otorisasi delegasi akses (tanpa berbagi password). Flow: Auth Code, PKCE, Client Credentials. Gunakan scope untuk pembatasan granular.

Apa itu CORS?
Mekanisme browser untuk kontrol resource lintas origin. Atur header: Origin, Methods, Headers, Credentials. Konfigurasi minimal yang aman.

Apa itu rate limiting di API?
Batasi request per user/IP/token untuk mencegah abuse. Gabungkan throttling dan circuit breaker.

Apa itu pagination?
Membagi hasil besar menjadi halaman. Teknik: offset/limit, cursor-based (stabil), keyset pagination. Sertakan metadata (total, nextCursor).

Apa itu WebSocket?
Koneksi dua arah persistent untuk real-time (chat, notifikasi). Sediakan fallback SSE/polling jika perlu.

Apa itu gRPC?
RPC di atas HTTP/2 dengan Protobuf (strongly typed, streaming). Baik untuk antar service; gateway untuk akses HTTP/JSON publik.

Apa itu API versioning?
Strategi pengelolaan perubahan: path (/v1), header, atau resource versioning. Dokumentasikan deprecation policy.

Apa itu idempotent API?
Permintaan yang menghasilkan efek sama jika diulang (PUT/DELETE umumnya idempotent). Gunakan Idempotency-Key untuk POST tertentu.

Apa itu logging?
Pencatatan event/error terstruktur (JSON log) dengan level (debug/info/warn/error). Agregasi log dan korelasi trace-ID.

Apa itu monitoring?
Pemantauan metrik (latensi, error rate, throughput), tracing, dan alerting (SLO/SLA). Dashboard dan alarm yang actionable.

Apa itu health check API?
Endpoint untuk memeriksa kesehatan (liveness/readiness) agar orchestrator bisa me-restart/route. Periksa dependency kritikal untuk readiness.

Apa itu circuit breaker pattern?
Memutus sementara panggilan ke layanan yang gagal untuk mencegah cascading failure. State: closed→open→half-open. Gabungkan retry/backoff.

Apa itu retry mechanism?
Mengulang permintaan yang gagal sementara dengan backoff dan jitter. Hati-hati dengan operasi non-idempotent.

D. Best Practices & Testing (10)
Apa itu code review?
Proses peer review untuk kualitas, keamanan, maintainability. Fokus pada desain, kejelasan, test; gunakan checklist.

Apa itu unit test vs integration test?

Unit test: menguji unit kecil terisolasi (cepat, deterministik).

Integration test: menguji interaksi antar komponen/dependency. Seimbangkan dengan end-to-end test.

Apa itu TDD?
Menulis test dulu → gagal → implementasi minimal → lulus test → refactor. Manfaat: desain bersih, keyakinan perubahan.

Apa itu CI/CD?
Integrasi/pengiriman berkelanjutan otomatis (build, test, deploy) pada setiap perubahan. Kurangi lead time dan risiko rilis.

Apa itu linting?
Analisis statis gaya/smell (ESLint) untuk konsistensi dan bug awal. Kombinasikan dengan formatter.

Apa itu refactoring?
Meningkatkan struktur internal tanpa mengubah perilaku eksternal. Lakukan kecil dan aman dengan dukungan test.

Apa itu DRY principle?
Hindari duplikasi logic; ekstrak ke fungsi/modul. Waspadai over-abstraction dini.

Apa itu KISS principle?
Sederhanakan solusi; hindari kompleksitas tidak perlu. Prefer solusi yang mudah dipahami.

Apa itu YAGNI?
Jangan implementasikan fitur sebelum dibutuhkan; fokus pada kebutuhan nyata. Kurangi beban pemeliharaan.

Apa itu code smell?
Sinyal desain kurang baik: fungsi panjang, duplikasi, nama buruk, ketergantungan rapuh. Tindaki dengan refactor terarah.

III. Senior Level – 50 Pertanyaan dan Jawaban
A. Arsitektur Skala Besar & High-Level Design (15)
Apa itu high availability?
Kemampuan sistem tetap beroperasi meski ada kegagalan komponen. Teknik: redundancy, failover, health checks, multi-AZ/region.

Bagaimana cara mendesain sistem yang skalabel?
Skala horizontal, stateless service, cache, queue, database partitioning. Ukur bottleneck dan optimalkan berbasis data.

Apa itu eventual consistency?
Konsistensi data tercapai pada akhirnya dalam sistem terdistribusi. Gunakan untuk throughput tinggi; pahami dampak UX.

Kapan memilih SQL vs NoSQL untuk sistem skala besar?

SQL: transaksi kuat, relasi kompleks, konsistensi prioritas.

NoSQL: throughput tinggi, skema fleksibel, geo-replikasi. Pertimbangkan SLA, pola data, dan biaya operasional.

Apa itu CAP theorem?
Tidak mungkin sekaligus konsisten dan tersedia saat terjadi partisi jaringan; pilih dua dari C/A/P. Sistem nyata memilih titik di spektrum.

Apa itu data lake vs data warehouse?

Data lake: data mentah semua jenis untuk eksplorasi/ML.

Data warehouse: data terstruktur untuk BI/analytics dengan skema terdefinisi.

Bagaimana mengatasi bottleneck di sistem besar?
Profiling, caching berjenjang, asynchronous processing, scale-out, backpressure. Fokuskan pada 20% paling berdampak (Pareto).

Apa itu domain-driven design (DDD)?
Pendekatan pemodelan berdasarkan domain bisnis, ubiquitous language, bounded context. Membantu pemisahan servis dan evolusi desain.

Apa itu service mesh?
Lapisan infrastruktur untuk observabilitas, mTLS, retry, rate-limit via sidecar (Istio/Linkerd). Memindahkan concern jaringan dari aplikasi.

Apa itu blue-green deployment?
Dua lingkungan identik (Blue/Green); alihkan trafik setelah verifikasi untuk zero-downtime dan rollback cepat.

Apa itu canary release?
Rilis bertahap ke sebagian pengguna; pantau metrik; percepat/rollback sesuai hasil.

Bagaimana cara mengelola state pada sistem terdistribusi?
Gunakan store terpusat (Redis), event sourcing, atau sticky session dengan hati-hati. Pertimbangkan idempotency dan ordering.

Apa itu saga pattern?
Orkestrasi/choreography serangkaian transaksi lokal dengan kompensasi untuk konsistensi akhir.

Apa itu backpressure di sistem streaming?
Mekanisme menahan/menyesuaikan laju produksi agar konsumen tidak kewalahan. Teknik: buffer, drop, throttle, windowing.

Apa itu idempotency key pada API pembayaran?
Kunci unik pada request untuk mencegah duplikasi transaksi saat retry. Simpan jejak request-key sementara di backend.

B. Performance & Optimization (10)
Bagaimana mengoptimalkan query database besar?
Index tepat, batasi kolom, hindari SELECT *, pecah query mahal, gunakan EXPLAIN/ANALYZE. Pertimbangkan materialized view atau cache.

Apa itu lazy loading?
Menunda pemuatan data/resource sampai diperlukan (gambar di bawah fold, modul dinamis). Menghemat bandwidth/waktu muat awal.

Apa itu eager loading?
Memuat relasi di awal (JOIN/preload) untuk menghindari N+1 query. Seimbangkan dengan payload yang masuk akal.

Bagaimana cara mengurangi latency API?
CDN, cache, kompresi (gzip/br), pengurangan payload (JSON selektif), parallelism, penempatan service dekat pengguna (edge/region tepat).

Bagaimana mengukur kinerja aplikasi?
Gunakan metrik utama (latensi p95/p99, throughput, error rate), tracing, dan profil CPU/memori. Tetapkan SLO yang relevan.

Apa itu profiling aplikasi?
Analisis eksekusi untuk menemukan hotspot CPU/IO/memori (profilers, flame graph) agar optimasi fokus.

Apa itu garbage collection tuning?
Penyesuaian GC agar jeda minim (heap size, generational GC, concurrent/parallel GC). Pantau pause time dan throughput.

Bagaimana mengoptimalkan performa JavaScript di browser?
Minimalkan reflow/DOM ops, gunakan debouncing/throttling, code-splitting, prefetching. Pakai Lighthouse/Performance panel.

Apa itu query batching di GraphQL?
Menggabungkan beberapa query/multiple resolvers dalam satu permintaan untuk mengurangi round-trip. DataLoader untuk batch+cache per request.

Apa itu edge computing?
Menjalankan komputasi dekat pengguna/sumber data (CDN edge, worker) untuk latency rendah: personalisasi, caching cerdas, validasi cepat.

C. Security & Reliability (15)
Apa itu OWASP Top 10?
Daftar risiko keamanan web paling umum (Injection, Broken Auth, XSS, dll.). Jadikan baseline mitigasi saat merancang/meninjau aplikasi.

Bagaimana mencegah SQL Injection?
Gunakan parameterized queries/ORM, hindari string concatenation. Validasi input dan least-privilege DB user.

Bagaimana mencegah XSS (Cross-Site Scripting)?
Escape output sesuai konteks, gunakan Content Security Policy, sanitasi input, hindari dangerouslySetInnerHTML.

Apa itu CSRF dan cara mencegahnya?
Serangan pemalsuan permintaan lintas situs. Cegah dengan anti-CSRF token, SameSite cookies, dan verifikasi origin.

Apa itu rate limiting untuk keamanan API?
Membatasi percobaan brute force/abuse. Kombinasikan dengan captcha, lockout adaptif.

Apa itu HTTPS dan mengapa penting?
Enkripsi lalu lintas (TLS) untuk menjaga kerahasiaan dan integritas data. Gunakan HSTS dan TLS modern, rotasi sertifikat.

Bagaimana cara mengelola secret & credentials?
Simpan di secret manager (Vault/Parameter Store), enkripsi at-rest/in-transit, rotasi berkala. Jangan commit ke repo/public log.

Apa itu zero trust security model?
Asumsikan tidak ada komponen yang otomatis dipercaya. Verifikasi eksplisit, least privilege, segmentasi jaringan.

Bagaimana menangani DDoS attack?
Gunakan CDN/WAF, autoscale, rate-limit, filter trafik, dan strategi absorpsi. Siapkan playbook insiden.

Apa itu audit logging?
Pencatatan aktivitas penting (login, perubahan sensitif) dengan jejak yang tidak bisa dimodifikasi. Penuhi kebutuhan forensik/kepatuhan.

Bagaimana memastikan high availability di cloud?
Multi-AZ/region, autoscaling, managed services, desain stateless, backup + DR drill.

Apa itu chaos engineering?
Uji ketahanan dengan mensimulasikan kegagalan terkontrol untuk menemukan kelemahan sebelum kejadian nyata.

Bagaimana memulihkan data setelah kegagalan besar?
Pulihkan dari backup/replica sesuai RTO/RPO, uji prosedur pemulihan secara berkala.

Apa itu RTO dan RPO dalam DRP?

RTO: target waktu pemulihan layanan.

RPO: toleransi kehilangan data maksimal. Desain backup/replikasi sesuai target.

Bagaimana mengamankan pipeline CI/CD?
Least privilege pada token, secret ter-enkripsi, verifikasi supply chain (signed artifacts), scanning SCA/SAST/DAST.

D. Leadership & Problem-Solving (10)
Bagaimana membagi tugas dalam tim software besar?
Bagi berdasarkan domain/bounded context, pemilik jelas, dan antarmuka yang disepakati. Hindari kepemilikan tumpang tindih.

Bagaimana menangani konflik teknis dalam tim?
Diskusi berbasis data, POC kecil, fallback ke prinsip arsitektur yang disepakati. Dokumentasikan keputusan (ADR).

Bagaimana memutuskan teknologi baru untuk proyek?
Nilai kecocokan kebutuhan, kurva belajar, ekosistem, biaya, dan risiko vendor lock-in. Mulai pilot kecil sebelum adopsi penuh.

Bagaimana memimpin migrasi sistem lama ke arsitektur baru?
Strategi strangler pattern, migrasi bertahap, kompatibilitas mundur, observability ketat. Rencanakan rollback.

Bagaimana mengatur prioritas bug vs fitur baru?
Berdasarkan dampak pengguna, risiko keamanan, kewajiban regulasi, dan nilai bisnis. Gunakan matriks prioritas.

Bagaimana memastikan kualitas kode di tim besar?
Standar coding, lint+format otomatis, code review, coverage test, CI. Arsitektur modular untuk mengurangi coupling.

Bagaimana membimbing junior developer?
Pairing/mentoring terstruktur, feedback spesifik, target belajar, dan kesempatan praktek. Rayakan progres kecil.

Bagaimana menangani deadline ketat?
Negosiasi scope, fokus fitur inti, timeboxing, parallel workstream, hilangkan hambatan. Transparansi dengan stakeholder.

Bagaimana menilai kinerja tim engineering?
Ukuran hasil (delivery lead time, change failure rate), kualitas, kolaborasi, pembelajaran berkelanjutan. Hindari metrik baris kode.

Bagaimana menjaga dokumentasi tetap up-to-date?
Masukkan update ke Definition of Done, gunakan docs-as-code, review berkala, dan tautkan dokumen ke PR.


