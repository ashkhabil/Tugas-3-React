import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Input from './atoms/Input';
import Button from './atoms/Button';
import Badge from './atoms/Badge';

/**
 * Komponen EditProductModal (Pop-up 2: Edit Produk)
 * Menggunakan utility-first Tailwind CSS.
 */
export default function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price !== undefined ? String(product.price) : '');
      setErrorMessage('');
    }
  }, [product]);

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

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Edit Produk</h2>
              <Badge variant="primary">ID: {product.id}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Perbarui informasi produk yang dipilih.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="edit-name"
            label="Nama Produk"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            autoFocus
          />

          <Input
            id="edit-price"
            label="Harga (Rp)"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            min="1"
            error={errorMessage}
            helperText="Harga harus lebih dari 0."
          />

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
