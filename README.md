# Tugas 4 Pemrograman Web: React Router, Tailwind CSS, dan Integrasi Backend

Proyek tugas mata kuliah **Pemrograman Web (Pertemuan Minggu 13)** Departemen Teknologi Informasi, Fakultas FTEIC, Institut Teknologi Sepuluh Nopember (ITS).

Proyek ini merupakan kelanjutan dari proyek Manajemen Produk pada tugas sebelumnya. Pada tugas ini, aplikasi ditingkatkan dengan menambahkan **React Router (v7)** untuk navigasi antarhalaman berbasis URL (*Single-Page Application* tanpa *full page reload*) dan **Tailwind CSS (v4)** untuk menata antarmuka yang modern, konsisten, serta responsif, terintegrasi penuh dengan REST API backend Express & Prisma ORM.

---

## Identitas Mahasiswa
- **Nama**: Ashkhabil Abror Budihardjo
- **NRP**: 5027251049
- **Mata Kuliah**: Pemrograman Web (Teknologi Informasi - ITS)
- **Topik**: Minggu 13 · Tugas 4 (React Router, Tailwind CSS, dan Integrasi Backend)

---

## Ketentuan Fitur & Implementasi (Sesuai PPT Minggu 13)

### 1. Pengelolaan Produk (CRUD Tetap Berfungsi)
- Seluruh fitur CRUD produk (**tambah, lihat, edit, dan hapus**) tetap berfungsi normal setelah penambahan routing dan Tailwind CSS.
- Terhubung langsung ke REST API Express (`http://localhost:3000/products`) dengan database PostgreSQL Neon (Prisma ORM), serta dilengkapi mekanisme *smart fallback* lokal.

### 2. Navigasi & Routing Berbasis URL (React Router v7)
- **Shared Layout (`AppLayout` & `Outlet`):**
  - Menggunakan `AppLayout` sebagai layout bersama yang mempertahankan `Navbar` tetap ada di setiap halaman, sementara konten berganti secara mulus melalui komponen `<Outlet />` (Slide 11 & 12).
- **Navbar & Menu Aktif (`NavLink`):**
  - Menggunakan `NavLink` dengan indikator status aktif (`isActive ? "bg-blue-50 text-blue-600 font-semibold" : ...`) untuk navigasi ke **Dashboard**, **Produk**, dan **Settings** (Slide 10 & 21).
- **Halaman Dashboard (`/` & `/dashboard`):**
  - Menampilkan ringkasan metrik produk: Total Produk, Rata-rata Harga, Produk Terendah, Produk Tertinggi, daftar produk terbaru, serta pintasan navigasi cepat (Slide 07 & 25).
- **Halaman Detail Produk (`/products/:id`):**
  - Rute dinamis menangkap parameter `id` dari URL menggunakan hook `useParams()` (Slide 13).
  - Menampilkan rincian lengkap produk (ID, Nama, Harga terformat Rupiah, dan deskripsi).
  - Menyediakan tautan `Link` untuk kembali ke daftar produk.
  - Menangani kondisi jika produk tidak ditemukan (misal: `/products/999`) dengan menampilkan pesan peringatan yang jelas dan tombol kembali.
- **Halaman Pengaturan / Settings (`/settings`):**
  - Memungkinkan pengguna mengubah preferensi tata letak daftar produk antara **Grid Mode** (multi-kolom responsif) dan **List Mode** (susunan baris vertikal) (Slide 25).
  - Pilihan tersimpan secara persisten pada `localStorage`.
- **Halaman 404 Not Found (`*` Wildcard):**
  - Menangkap seluruh URL yang tidak terdaftar menggunakan wildcard `<Route path="*" element={<NotFoundPage />} />` (Slide 14).
  - Menampilkan pesan error bersahabat dan tautan pemulihan kembali ke halaman utama atau daftar produk.

### 3. Tampilan Antarmuka Modern & Responsif (Tailwind CSS v4)
- Menerapkan arsitektur **Atomic Design** (`components/atoms/Button.jsx`, `Input.jsx`, `Badge.jsx`) untuk penggunaan kembali komponen dengan varian konsisten (Slide 23).
- Tata letak responsif menggunakan *mobile-first breakpoints* (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) (Slide 22).
- Palet warna konsisten (`text-blue-600`, `bg-blue-600`, `bg-slate-50`, `border-slate-200`) dan skala spacing yang terstruktur (Slide 18, 19, 20).

---

## Struktur Direktori Proyek

```text
Tugas-3-React/
├── backend/                             # REST API Express & Prisma ORM
│   ├── controllers/
│   │   └── productController.js        # Controller CRUD & validasi
│   ├── prisma/
│   │   ├── schema.prisma               # Skema database Prisma
│   │   └── seed.js                     # Seeder 5 data awal
│   ├── routes/
│   │   └── productRoute.js             # Route /products
│   ├── index.js                        # Server Express + CORS
│   └── package.json
│
├── frontend/                            # Antarmuka React Router + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── Button.jsx          # Tombol varian (primary, secondary, danger, outline)
│   │   │   │   ├── Input.jsx           # Input form dengan label & error helper
│   │   │   │   └── Badge.jsx           # Badge label status & ID
│   │   │   ├── Navbar.jsx              # Navigasi utama dengan NavLink & status API
│   │   │   ├── Header.jsx              # Header halaman produk & tombol tambah
│   │   │   ├── SearchBar.jsx           # Pencarian produk & counter
│   │   │   ├── ProductCard.jsx         # Kartu produk (dukungan mode Grid & List + link Detail)
│   │   │   ├── ProductList.jsx         # Wrapper grid responsif & footer counter
│   │   │   ├── AddProductModal.jsx     # Pop-up tambah produk
│   │   │   ├── EditProductModal.jsx    # Pop-up edit produk
│   │   │   └── DeleteProductModal.jsx  # Pop-up konfirmasi hapus
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx           # Shared layout dengan Navbar & Outlet
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx       # Halaman dashboard metrik & navigasi cepat
│   │   │   ├── ProductsPage.jsx        # Halaman utama pengelolaan produk
│   │   │   ├── ProductDetailPage.jsx   # Halaman detail rincian produk (/products/:id)
│   │   │   ├── SettingsPage.jsx        # Halaman pengaturan preferensi layout (Grid/List)
│   │   │   └── NotFoundPage.jsx        # Halaman 404 rute tidak dikenal
│   │   ├── services/
│   │   │   └── api.js                  # Service fetch API backend dengan fallback
│   │   ├── App.jsx                     # Konfigurasi rute React Router & state global
│   │   ├── index.css                   # Impor Tailwind CSS v4 (@import "tailwindcss")
│   │   └── main.jsx                    # Entry point dengan BrowserRouter
│   ├── vite.config.js                  # Konfigurasi bundler Vite dengan plugin Tailwind v4
│   └── package.json                    # Dependensi frontend (react-router, tailwindcss)
│
├── package.json                         # Root convenience scripts
└── README.md                            # Dokumentasi lengkap proyek
```

---

## Cara Menjalankan Proyek

### 1. Menjalankan Frontend (React Router + Tailwind CSS)
Buka terminal:
```bash
cd frontend
npm install
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`.

### 2. Menjalankan Backend (Express REST API)
Buka terminal kedua:
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
Server backend berjalan di `http://localhost:3000`.

---

## Bukti Pengujian Fitur

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Navigasi Menu Navbar | Berpindah antar Dashboard (`/`), Produk (`/products`), dan Settings (`/settings`) tanpa reload halaman (*SPA*), indikator menu aktif menyala | Sesuai |
| Halaman Dashboard | Menampilkan ringkasan statistik (total produk, rata-rata, harga terendah, harga tertinggi) dan daftar produk terbaru | Sesuai |
| Halaman Daftar Produk | Menampilkan daftar produk dengan search filter real-time dan indikator jumlah produk | Sesuai |
| Navigasi Detail Produk (`/products/:id`) | Mengklik tautan "Detail" pada salah satu produk membuka halaman detail produk yang sesuai (misal: `/products/2` menampilkan Buku Tulis) | Sesuai |
| Detail Produk Tidak Ditemukan | Membuka ID produk yang tidak ada (misal: `/products/999`) menampilkan pesan error "Produk Tidak Ditemukan" dan tombol kembali | Sesuai |
| Navigasi Halaman 404 | Mengakses URL sembarang (misal: `/alamat-salah`) menampilkan pesan "404: Halaman tidak ditemukan" dan link pemulihan | Sesuai |
| Pengaturan Tata Letak (Settings) | Mengubah preferensi ke "List" membuat daftar produk pada `/products` tertata dalam baris horizontal; tersimpan di localStorage | Sesuai |
| Operasi Tambah Produk (POST) | Pop-up tambah terbuka, validasi harga `> 0` bekerja, produk baru berhasil ditambahkan dan tersimpan ke backend | Sesuai |
| Operasi Edit Produk (PUT) | Pop-up edit terbuka dengan data produk terisi, perubahan berhasil diperbarui | Sesuai |
| Operasi Hapus Produk (DELETE) | Pop-up konfirmasi terbuka dengan ikon peringatan merah, produk terhapus dari daftar dan database | Sesuai |
