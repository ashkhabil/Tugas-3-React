import React from 'react';
import ProductCard from './ProductCard';

/**
 * Komponen ProductList
 * Menampilkan grid kartu-kartu produk dan status kuantitas di bagian bawah.
 * Menggunakan prinsip Rendering List dengan prop key unik (product.id).
 * 
 * Menerima props:
 * - products: array produk hasil filter
 * - totalCount: jumlah total seluruh produk yang tersimpan
 * - onEdit: handler edit diteruskan ke ProductCard
 * - onDelete: handler hapus diteruskan ke ProductCard
 */
export default function ProductList({ products, totalCount, onEdit, onDelete }) {
  return (
    <section className="product-list-section">
      {products.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">Tidak ada produk ditemukan</p>
          <p className="empty-desc">Coba sesuaikan kata kunci pencarian Anda atau tambahkan produk baru.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Status Footer Tampilan sesuai spesifikasi Slide 27 */}
      <footer className="list-footer">
        <p className="footer-status-text">
          Menampilkan {products.length} dari {totalCount} produk
        </p>
      </footer>
    </section>
  );
}
