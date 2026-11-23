const API_BASE_URL = 'http://localhost:3000/products';

// Data produk awal sesuai contoh spesifikasi PPT
export const INITIAL_PRODUCTS = [
  { id: 1, name: 'Pulpen', price: 5000, description: 'Pulpen tinta hitam gel 0.5mm dengan aliran tinta lancar dan cepat kering.' },
  { id: 2, name: 'Buku Tulis', price: 12000, description: 'Buku tulis bergaris 58 lembar dengan kertas tebal berkualitas tinggi.' },
  { id: 3, name: 'Spidol', price: 8000, description: 'Spidol whiteboard warna hitam pekat, mudah dihapus tanpa bekas.' },
  { id: 4, name: 'Penggaris', price: 6000, description: 'Penggaris mika bening presisi 30cm dengan angka anti luntur.' },
  { id: 5, name: 'Penghapus', price: 3000, description: 'Penghapus pensil karet lembut bebas debu (dust-free) kualitas premium.' },
];

/**
 * Service API untuk berinteraksi dengan backend Express (PORT 3000).
 * Dilengkapi fallback cerdas: jika backend offline/tidak dijalankan,
 * aplikasi tetap dapat berjalan secara mandiri (standalone) menggunakan state lokal/localStorage.
 */
export const productService = {
  // GET: Mengambil seluruh produk
  async getAll() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Gagal mengambil data dari server');
      return await response.json();
    } catch (error) {
      console.warn('Backend Express tidak aktif atau gagal dijangkau, menggunakan data lokal:', error.message);
      return null;
    }
  },

  // GET: Mengambil satu produk berdasarkan ID
  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Gagal mengambil detail produk');
      }
      return await response.json();
    } catch (error) {
      console.warn(`Gagal memuat produk ID ${id} dari backend, memeriksa fallback:`, error.message);
      return undefined; // Penanda untuk fallback ke state lokal
    }
  },

  // POST: Menambah produk baru
  async create(data) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menambahkan produk');
      }
      return await response.json();
    } catch (error) {
      console.warn('Operasi POST dialihkan ke state lokal:', error.message);
      return null;
    }
  },

  // PUT: Mengupdate data produk
  async update(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memperbarui produk');
      }
      return await response.json();
    } catch (error) {
      console.warn('Operasi PUT dialihkan ke state lokal:', error.message);
      return null;
    }
  },

  // DELETE: Menghapus data produk
  async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus produk');
      }
      return await response.json();
    } catch (error) {
      console.warn('Operasi DELETE dialihkan ke state lokal:', error.message);
      return null;
    }
  },
};
