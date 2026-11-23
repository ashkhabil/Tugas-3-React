import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './atoms/Input';
import Button from './atoms/Button';

/**
 * Komponen AddProductModal (Pop-up 1: Tambah Produk)
 * Menggunakan utility-first Tailwind CSS.
 */
export default function AddProductModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    setName('');
    setPrice('');
    setErrorMessage('');
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
            <h2 className="text-xl font-bold text-slate-900">Tambah Produk</h2>
            <p className="text-xs text-slate-500 mt-1">
              Masukkan informasi produk baru.
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
            id="add-name"
            label="Nama Produk"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            autoFocus
          />

          <Input
            id="add-price"
            label="Harga (Rp)"
            type="number"
            placeholder="Contoh: 5000"
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
              Simpan Produk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
