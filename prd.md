# Product Requirements Document (PRD)
## Tourism Audio Guide App (Web Prototype)

### 1. Pendahuluan
Aplikasi ini adalah prototipe berbasis web untuk "Tourism Audio Guide App" yang dirancang identik dengan desain UI/UX yang telah disediakan. Prototipe ini akan difokuskan pada tampilan (frontend) dan interaksi pengguna (UX) menggunakan data dummy tanpa koneksi database (backend). Aplikasi ini harus sangat responsif dan dioptimalkan untuk tampilan mobile.

### 2. Tujuan
- Membangun antarmuka pengguna (UI) yang interaktif dan sangat identik dengan desain referensi.
- Mengimplementasikan alur pengguna (user flow) secara penuh dari awal hingga akhir menggunakan data dummy.
- Menambahkan portal Admin sederhana untuk memantau aktivitas pengguna dan transaksi.
- Memastikan programmer memahami detail alur, state, dan komponen yang perlu dieksekusi.

### 3. Pengguna Sistem (Roles)
1. **User (Pengguna Biasa / Turis):** Dapat mengeksplorasi destinasi, melakukan pemesanan (booking), menyimulasikan pembayaran, dan menyimulasikan penggunaan panduan audio.
2. **Admin (Pengelola):** Dapat memantau aktivitas pengguna, melihat transaksi masuk, dan melihat statistik sederhana.

---

### 4. Fitur Utama & Alur Aplikasi

#### 4.1. Alur Otentikasi (Auth Flow)
- **Splash / Onboarding Screen:** Menampilkan 3 layar onboarding ("Explore the beauty of the world", "Let's make your dream travel", "Enjoy your travel experience") dengan tombol Next/Skip.
- **Login:**
  - Form login dengan email dan password.
  - **Pemilihan Role:** Terdapat toggle atau tab untuk login sebagai "User" (Default) atau "Admin".
  - Link ke Forgot Password dan Sign Up.
- **Sign Up:** Form pendaftaran dengan Full Name, Email, Date of Birth, dan Password. Simulasi verifikasi sukses.
- **Forgot & Reset Password:** Flow untuk memasukkan email, simulasi pengiriman OTP/Link, dan form pembuatan password baru.

#### 4.2. Alur Pengguna Biasa (User Flow)
- **Home / Dashboard:**
  - Header dengan sapaan "Hi, [Nama]!" dan lokasi saat ini.
  - Search bar.
  - Carousel "Featured Tour" (contoh: Borobudur Temple).
  - List "Nearby Destinations".
  - Kategori navigasi (Temple, Nature, Palace, Beach, Gallery, Culinary).
- **Explore / Destinations:**
  - Halaman daftar destinasi dengan tab filter kategori.
  - Setiap card destinasi menampilkan foto, nama, rating, jarak, dan harga.
- **Detail Destinasi:**
  - Gambar cover besar, informasi detail tentang tempat wisata.
  - Form booking: Pilih jumlah pengunjung (visitors) dan tanggal.
  - Tombol "Proceed to Payment".
- **Booking & Payment Flow:**
  - **Order Summary:** Rincian tiket, tanggal, dan total harga.
  - **Payment Method:** Simulasi pemilihan metode pembayaran (Virtual Account/Credit Card).
  - **Payment Process:** Simulasi instruksi pembayaran dan tombol "Check status" yang berujung pada halaman Payment Success atau Failed.
- **My Tickets & Audio Connect (Bookings):**
  - Daftar tiket aktif dan riwayat aktivitas.
  - **QR Ticket & Audio Connect:** Halaman untuk menghubungkan perangkat audio via Bluetooth (simulasi state: Turn on device, Enable Bluetooth, Select AudioGuide, Connected).
  - **Audio Player:** Antarmuka pemutar audio (Start Tour, play/pause, progress bar) saat tour berlangsung.
- **Profile:**
  - Menampilkan data diri, statistik (Tours Done, Upcoming, Avg Rating).
  - Fitur Edit Profile.
  - Fitur Change Password.
  - Fitur Logout.

#### 4.3. Alur Admin (Admin Flow)
- **Admin Dashboard:**
  - **Overview Stats:** Total Revenue (Total Pendapatan), Total Active Users, Total Tours Completed.
  - **Live User Activity:** Tabel/List yang menampilkan aktivitas pengguna terkini (contoh: "Yoel sedang mendengarkan audio di Borobudur Temple").
  - **Recent Transactions:** Daftar transaksi pembayaran terakhir beserta statusnya (Success/Failed).

---

### 5. Kebutuhan Teknis (Technical Requirements)
- **Platform:** Web Application (Single Page Application menggunakan React.js / Vite).
- **Styling:** Vanilla CSS dengan pendekatan modular (CSS Modules). Menghindari penggunaan framework CSS seperti Tailwind agar kontrol desain lebih fleksibel sesuai instruksi, menggunakan variabel CSS untuk warna, typography, dan spacing.
- **Data Management:** Menggunakan React Context API atau global state sederhana untuk menyimpan data dummy sementara (daftar destinasi, data user, status login, keranjang/tiket, log aktivitas pengguna untuk admin).
- **Responsivitas:** Karena ini desain mobile app, layout web akan dibuat dengan max-width (misal 480px) dan diletakkan di tengah layar untuk desktop, sehingga menyerupai tampilan mobile yang responsif dan proporsional.

### 6. Struktur Data Dummy (Contoh Skema)
- **Users:** Menyimpan role, nama, email, password.
- **Destinations:** Menyimpan id, nama, kategori, harga, rating, jarak, deskripsi, image URL.
- **Transactions:** Menyimpan history transaksi (id, user_id, destination_id, total, status, date).
- **Activities:** Menyimpan log aktivitas user untuk ditampilkan di dashboard admin (id, user_id, action, timestamp).

### 7. Catatan Desain (UI/UX)
- **Aesthetic:** Harus terlihat modern, premium, dan dinamis. Gunakan transisi halus, hover states, dan micro-animations.
- **Color Palette:** Sesuai desain referensi (Primary Blue, White background, Light Gray untuk surfaces, Dark text).
- **Typography:** Gunakan font modern seperti 'Inter' atau 'Outfit' (Google Fonts).
- **Komponen:** Gunakan sudut melengkung (rounded corners), bayangan lembut (soft shadows) untuk elemen card.
- **Navigasi:** Pengguna biasa menggunakan Bottom Navigation Bar, sedangkan Admin bisa menggunakan Sidebar atau Top Navigation Bar.
