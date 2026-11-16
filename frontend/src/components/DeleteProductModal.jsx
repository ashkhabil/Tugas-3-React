import React from 'react';
import { Trash2, X } from 'lucide-react';

/**
 * Komponen DeleteProductModal (Pop-up Hapus Produk?)
 * Sesuai rancangan Pop-up 3 pada Slide 27:
 * - Header: tombol close ✕
 * - Ikon Visual: Ikon trash merah
 * - Judul: "Hapus Produk?"
 * - Peringatan: "Produk yang dihapus tidak dapat dikembalikan."
 * - Kotak Info Produk: ID, Nama (tebal), Harga (biru)
 * - Aksi: "Batal" dan "Hapus Produk" (tombol merah)
 */
export default function DeleteProductModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  const formattedPrice = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box delete-modal-box">
        <div className="modal-header-simple">
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="delete-modal-content">
          <div className="delete-icon-wrapper">
            <Trash2 size={28} className="delete-icon" />
          </div>

          <h2 className="modal-title text-center">Hapus Produk?</h2>
          <p className="delete-warning-text text-center">
            Produk yang dihapus tidak dapat dikembalikan.
          </p>

          <div className="product-to-delete-card">
            <span className="badge-id">ID: {product.id}</span>
            <div className="product-delete-details">
              <span className="product-delete-name">{product.name}</span>
              <span className="product-delete-price">{formattedPrice}</span>
            </div>
          </div>

          <div className="modal-footer delete-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onConfirm(product.id);
                onClose();
              }}
            >
              Hapus Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
