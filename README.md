# Tourism Audio Guide App (Prototype)

Sebuah prototype aplikasi pemandu wisata audio inovatif yang dirancang untuk mendukung ekosistem pariwisata terintegrasi Indonesia. Prototype ini dikembangkan sebagai bagian dari Tugas Kuliah **Interaksi Manusia dan Komputer (IMK)**, dan di-desain sebagai konsep awal yang nantinya dapat diintegrasikan ke platform resmi pariwisata nasional, [InJourney](https://injourney.id/).

## Identitas Pembuat
* **Nama**: Fatih Risenda
* **NIM**: 103042400022
* **Kelompok**: 3
* **Mata Kuliah**: Interaksi Manusia dan Komputer (IMK)

---

## 🎯 Tentang Aplikasi

**Tourism Audio Guide App** adalah purwarupa aplikasi berbasis web (mobile-first) yang menawarkan panduan audio interaktif untuk berbagai destinasi wisata di Indonesia. Aplikasi ini memungkinkan wisatawan mendapatkan tur personal melalui perangkat genggam mereka tanpa perlu menyewa pemandu wisata fisik.

### Fitur Utama

1. **Autentikasi Multi-User (Role-based)**
   - Mendukung login sebagai *User* biasa maupun *Admin*.
   - Fitur *Show/Hide Password*.

2. **Eksplorasi Destinasi & Filter Kategori**
   - Penjelajahan berbagai destinasi wisata dummy dari kategori: *Temple*, *Nature*, *Palace*, *Beach*, *Gallery*, dan *Culinary*.
   - Fitur pencarian dan filter harga/rating yang responsif.
   - Penambahan ke daftar *Favorites*.

3. **Booking & Pembelian Tiket (Dummy)**
   - Proses pemesanan tiket dengan pilihan metode pembayaran (Virtual Account & Credit Card).
   - *Electronic Ticket* dengan QR Code siap pakai.
   - Logika privasi di mana setiap *user* hanya bisa melihat tiket yang mereka beli sendiri.

4. **Audio Player Interaktif**
   - Antarmuka pemutar audio (prototipe) dengan dukungan *Playback Speed* (0.5x hingga 2x), *Chapters*, dan transkrip (*Language Toggle* EN/ID).

5. **Dashboard Admin Terintegrasi (CMS)**
   - Statistik pendapatan (Revenue), jumlah transaksi, dan aktivitas pengguna.
   - Sistem CRUD (Create, Read, Update, Delete) penuh untuk data Destinasi.
   - Laporan Transaksi dari semua pengguna secara terpusat.

6. **Pengaturan & Aksesibilitas (A11y)**
   - Mendukung peralihan Bahasa antarmuka (Indonesia / Inggris).
   - Aksesibilitas visual: *High Contrast Mode* & *Large Text Mode*.

---

## 🚀 Cara Menjalankan Prototype Secara Lokal

Aplikasi ini dibangun menggunakan **React** dan **Vite**. Tidak memerlukan database eksternal karena menggunakan *Dummy State Context* sebagai media penyimpanan simulasi.

### Persyaratan Sistem
* [Node.js](https://nodejs.org/) (Versi 18 atau terbaru direkomendasikan)
* Git

### Langkah Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/fatihrisenda/prototypeTAGA.git
   cd prototypeTAGA
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan *Development Server*:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses `http://localhost:5173/` di browser Anda (sangat disarankan menggunakan mode responsif *mobile view* di browser dengan menekan F12 lalu mengaktifkan *Device Toolbar* karena UI-nya dibuat *mobile-first*).

### 🔄 Cara Memperbarui (Update) Aplikasi

Jika ada versi terbaru yang diunggah ke GitHub, Anda dapat memperbarui *clone* di komputer Anda agar sama dengan versi terbaru dengan cara menjalankan perintah ini di dalam folder `prototypeTAGA`:

```bash
git pull origin main
```
Setelah itu, jika ada penambahan *library* baru, jalankan kembali `npm install` sebelum memulai ulang `npm run dev`.

---

## 🔑 Kredensial Pengujian (Dummy Accounts)

Aplikasi memiliki akun bawaan untuk mempermudah pengujian dosen atau asisten praktikum:

| Peran | Email | Password | Kegunaan Utama |
| :--- | :--- | :--- | :--- |
| **User 1** | `fatih@email.com` | `fatih123` | Simulasi User (Fatih Risenda) |
| **User 2** | `yoel@email.com` | `yoel123` | Simulasi User 2 (Yoel Gabriel) |
| **Admin** | `admin@audioguide.com` | `admin123` | Mengakses CMS, CRUD Destinasi, dan Laporan Transaksi |

*Catatan: Di halaman Login, Anda dapat menekan tombol pintas (Quick Fill) untuk login dengan cepat tanpa perlu mengetik ulang kredensial di atas.*

---
*Dibuat untuk keperluan Tugas Kuliah. Konsep prototipe ini ditujukan sebagai bentuk eksplorasi untuk melengkapi ekosistem [InJourney](https://injourney.id/).*
