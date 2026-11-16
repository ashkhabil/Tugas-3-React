import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Komponen AddProductModal (Pop-up Tambah Produk)
 * Sesuai rancangan Pop-up 1 pada Slide 27:
 * - Header: "Tambah Produk" + tombol close ✕
 * - Deskripsi: "Masukkan informasi produk baru."
 * - Input: Nama Produk, Harga (Rp)
 * - Pesan Bantuan/Validasi: "Harga harus lebih dari 0."
 * - Aksi: "Batal" dan "Simpan Produk"
 */
export default function AddProductModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Jangan render apapun jika modal tidak aktif (Conditional Rendering)
  if (!isOpen) return null;

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

    onSave({
      name: name.trim(),
      price: parsedPrice,
    });

    // Reset input dan tutup dialog
    setName('');
    setPrice('');
    setErrorMessage('');
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
            <h2 className="modal-title">Tambah Produk</h2>
            <p className="modal-subtitle">Masukkan informasi produk baru.</p>
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
            <label htmlFor="add-name" className="form-label">Nama Produk</label>
            <input
              id="add-name"
              type="text"
              className="form-input"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-price" className="form-label">Harga (Rp)</label>
            <input
              id="add-price"
              type="number"
              className="form-input"
              placeholder="Contoh: 5000"
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
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
