import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

/**
 * Komponen ProductCard
 * Menampilkan kartu individual untuk satu produk: ID, Nama, Harga, dan Tombol Aksi (Edit, Hapus).
 * Menerima props:
 * - product: objek { id, name, price }
 * - onEdit: fungsi handler saat tombol Edit diklik (meneruskan objek product)
 * - onDelete: fungsi handler saat tombol Hapus diklik (meneruskan objek product)
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  // Format harga ke format Rupiah standar Indonesia
  const formattedPrice = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  return (
    <article className="product-card">
      <div className="card-top">
        <span className="card-id-badge">ID: {product.id}</span>
      </div>
      
      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onEdit(product)}
        >
          <Pencil size={15} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(product)}
        >
          <Trash2 size={15} />
          <span>Hapus</span>
        </button>
      </div>
    </article>
  );
}
