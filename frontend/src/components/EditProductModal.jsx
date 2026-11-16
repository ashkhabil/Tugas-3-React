import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Komponen EditProductModal (Pop-up Edit Produk)
 * Sesuai rancangan Pop-up 2 pada Slide 27:
 * - Header: "Edit Produk" + tombol close ✕
 * - Deskripsi: "Perbarui informasi produk yang dipilih."
 * - Indikator ID: "ID: {product.id}"
 * - Input: Nama Produk, Harga (Rp)
 * - Pesan Bantuan/Validasi: "Harga harus lebih dari 0."
 * - Aksi: "Batal" dan "Simpan Perubahan"
 */
export default function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronisasi data form saat prop product berubah
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price !== undefined ? String(product.price) : '');
      setErrorMessage('');
    }
  }, [product]);

  // Jika tidak ada produk yang sedang diedit, sembunyikan modal
  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Nama produk wajib diisi.');
      return;
    }

    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Harga harus lebih dari 0.');
      return;
    }

    onSave(product.id, {
      name: name.trim(),
      price: parsedPrice,
    });

    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="title-with-badge">
              <h2 className="modal-title">Edit Produk</h2>
              <span className="badge-id">ID: {product.id}</span>
            </div>
            <p className="modal-subtitle">Perbarui informasi produk yang dipilih.</p>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-name" className="form-label">Nama Produk</label>
            <input
              id="edit-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-price" className="form-label">Harga (Rp)</label>
            <input
              id="edit-price"
              type="number"
              className="form-input"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              min="1"
            />
            <p className={`form-hint ${errorMessage ? 'text-danger' : ''}`}>
              {errorMessage || 'Harga harus lebih dari 0.'}
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
