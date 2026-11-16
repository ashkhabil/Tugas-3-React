# Tugas 3 Pemrograman Web: Aplikasi Manajemen Produk (React & Express REST API)

Proyek tugas mata kuliah **Pemrograman Web (Minggu 12: Fundamental React)** Departemen Teknologi Informasi, Fakultas FTEIC, Institut Teknologi Sepuluh Nopember (ITS).

Proyek ini dibangun berdasarkan rancangan antarmuka dan spesifikasi teknis pada **Slide 27 PPT Fundamental React**, yang mengimplementasikan aplikasi **"Manajemen Produk"** lengkap dengan antarmuka berbasis komponen React yang terhubung ke backend Express REST API & Prisma ORM.

---

## Identitas Mahasiswa
- **Nama**: Ashkhabil Abror Budihardjo
- **NRP**: 5027251049
- **Mata Kuliah**: Pemrograman Web (Teknologi Informasi - ITS)
- **Topik**: Fundamental React (Week 12) & REST API Integration

---

## Fitur & Spesifikasi Sesuai Slide 27 PPT

### 1. Halaman Utama (Main Dashboard)
- **Header Aplikasi:**
  - Judul: `Manajemen Produk`
  - Subjudul: `Kelola daftar produk dan harga dalam satu tempat.`
  - Tombol Aksi: `+ Tambah Produk` (berwarna biru di kanan atas untuk memicu pembukaan pop-up penambahan produk).
- **Pencarian & Counter:**
  - Bilah pencarian dengan ikon kaca pembesar dan placeholder `Cari nama produk...`.
  - Filter pencarian bersifat *live reactive* (langsung memperbarui kartu produk yang cocok saat mengetik).
  - Badge counter jumlah produk: `{count} produk`.
- **Kartu Produk (Product Cards Grid):**
  - Grid responsif yang menampilkan kartu produk dengan data awal sesuai slide:
    1. **ID: 1** - `Pulpen` - `Rp5.000`
    2. **ID: 2** - `Buku Tulis` - `Rp12.000`
    3. **ID: 3** - `Spidol` - `Rp8.000`
    4. **ID: 4** - `Penggaris` - `Rp6.000`
    5. **ID: 5** - `Penghapus` - `Rp3.000`
  - Setiap kartu memiliki tombol aksi:
    - `Edit` (outline biru) $\rightarrow$ membuka modal edit produk.
    - `Hapus` (outline merah) $\rightarrow$ membuka modal konfirmasi hapus.
- **Status Footer:**
  - Menampilkan keterangan: `Menampilkan X dari Y produk`.

### 2. Tiga Dialog Pop-up (Modals)
1. **Pop-up 1: Tambah Produk (Create Modal)**
   - Judul `Tambah Produk`, tombol tutup `✕`, deskripsi `Masukkan informasi produk baru.`.
   - Input: **Nama Produk** (`Contoh: Pulpen`) dan **Harga (Rp)** (`Contoh: 5000`).
   - Teks bantuan / validasi: `Harga harus lebih dari 0.`.
   - Tombol: `Batal` dan `Simpan Produk`.
2. **Pop-up 2: Edit Produk (Update Modal)**
   - Judul `Edit Produk`, indikator `ID: {id}`, tombol tutup `✕`, deskripsi `Perbarui informasi produk yang dipilih.`.
   - Form otomatis terisi dengan nilai produk yang dipilih.
   - Tombol: `Batal` dan `Simpan Perubahan`.
3. **Pop-up 3: Hapus Produk? (Delete Confirmation Modal)**
   - Ikon tempat sampah merah (`trash icon`).
   - Judul: `Hapus Produk?`.
   - Peringatan: `Produk yang dihapus tidak dapat dikembalikan.`.
   - Kotak ringkasan produk yang akan dihapus: menampilkan Badge ID, Nama Produk (tebal), dan Harga (biru).
   - Tombol: `Batal` dan `Hapus Produk` (merah).

---

## Penerapan Konsep Fundamental React Sesuai PPT

Aplikasi ini dirancang mengikuti seluruh konsep yang diajarkan pada modul presentasi:

| Konsep PPT | Implementasi dalam Kode | Lokasi File |
|---|---|---|
| **Deklaratif vs Imperatif** | UI dirender otomatis dari *state* (`products`, `searchQuery`, `editingProduct`) tanpa manipulasi manual `document.getElementById` / `innerHTML`. | `frontend/src/App.jsx` |
| **Komponen Modular** | Memecah antarmuka menjadi komponen terisolasi sesuai batas tanggung jawab. | `frontend/src/components/` |
| **JSX** | Sintaks markup deklaratif dibungkus dalam root fragment `<>...</>`, menggunakan penutupan tag mandiri (`<input />`, `<X />`), atribut `className`, dan format *camelCase* (`onClick`, `onChange`, `onSubmit`). | Seluruh file `.jsx` |
| **Props & Event Handling** | Aliran data satu arah (*unidirectional data flow*): parent mengirim fungsi callback handler (`onOpenAdd`, `onEdit`, `onDelete`, `onSave`) via props ke child. Event handler diteruskan sebagai referensi fungsi (`onClick={handleClick}` atau `onClick={() => handleClick(id)}`). | `ProductCard.jsx`, `Header.jsx`, `SearchBar.jsx` |
| **Rendering List & Key** | Merender daftar kartu menggunakan `.map()` dengan prop unik dan stabil `key={product.id}` (menghindari penggunaan index array). | `ProductList.jsx` |
| **Conditional Rendering** | Menampilkan/menyembunyikan dialog pop-up (`AddProductModal`, `EditProductModal`, `DeleteProductModal`) dan state kosong pencarian hanya jika kondisi bernilai `true`. | `App.jsx`, `ProductList.jsx` |
| **Siklus Update UI** | Alur *Trigger* (klik tombol/input) $\rightarrow$ *Render* (evaluasi fungsi komponen React) $\rightarrow$ *Commit* (Virtual DOM diffing ke real DOM browser). | Siklus `useState` & `useEffect` |

---

## Arsitektur & Struktur Direktori

```text
Tugas 3/
├── backend/                             # REST API Express & Prisma ORM
│   ├── controllers/
│   │   └── productController.js        # Controller logika bisnis CRUD & validasi
│   ├── prisma/
│   │   ├── schema.prisma               # Definisi Model Product
│   │   └── seed.js                     # Seeder data awal (5 produk sesuai PPT)
│   ├── routes/
│   │   └── productRoute.js             # Routing endpoint /products
│   ├── .env                            # Variabel lingkungan database PostgreSQL Neon
│   ├── index.js                        # Entry point server Express + Middleware CORS
│   └── package.json                    # Dependensi backend
│
├── frontend/                            # Antarmuka Pengguna React (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx              # Judul, deskripsi, dan tombol "+ Tambah Produk"
│   │   │   ├── SearchBar.jsx           # Input pencarian produk & badge counter
│   │   │   ├── ProductCard.jsx         # Kartu item produk (ID, Nama, Harga, Edit, Hapus)
│   │   │   ├── ProductList.jsx         # Grid kartu produk & status footer
│   │   │   ├── AddProductModal.jsx     # Pop-up 1: Tambah Produk
│   │   │   ├── EditProductModal.jsx    # Pop-up 2: Edit Produk
│   │   │   └── DeleteProductModal.jsx  # Pop-up 3: Konfirmasi Hapus Produk
│   │   ├── services/
│   │   │   └── api.js                  # Service koneksi REST API dengan fallback cerdas
│   │   ├── App.jsx                     # Komponen induk (State Management)
│   │   ├── App.css                     # Desain styling antarmuka sesuai PPT
│   │   ├── index.css                   # Global reset & typography
│   │   └── main.jsx                    # Entry point React DOM
│   ├── index.html                      # Template HTML utama
│   ├── package.json                    # Dependensi frontend (React, Vite, Lucide-React)
│   └── vite.config.js                  # Konfigurasi bundler Vite
│
├── package.json                         # Root helper scripts
└── README.md                            # Dokumentasi lengkap proyek
```

---

## Cara Menjalankan Proyek

### 1. Menjalankan Frontend (React)
Buka terminal dan arahkan ke folder `frontend`:
```bash
cd "E:\Pemweb\Tugas kuliah\Tugas 3\frontend"
npm install
npm run dev
```
Buka browser pada URL yang ditampilkan (biasanya `http://localhost:5173`).
> **Catatan:** Frontend memiliki fitur *smart fallback*. Jika backend tidak dinyalakan, antarmuka tetap berjalan 100% lancar menggunakan state lokal dengan 5 produk awal sesuai slide presentasi.

### 2. Menjalankan Backend (Express REST API - Opsional untuk Sinkronisasi DB)
Buka terminal kedua dan arahkan ke folder `backend`:
```bash
cd "E:\Pemweb\Tugas kuliah\Tugas 3\backend"
npm install
npx prisma generate
npm run dev
```
Server Express akan aktif di `http://localhost:3000`. Frontend secara otomatis mendeteksi koneksi backend dan menyinkronkan data langsung ke database cloud PostgreSQL.

Jika ingin mereset/mengisi database dengan 5 produk awal PPT:
```bash
npm run seed
```
