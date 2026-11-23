import React from 'react';
import { Trash2, X } from 'lucide-react';
import Badge from './atoms/Badge';
import Button from './atoms/Button';

/**
 * Komponen DeleteProductModal (Pop-up 3: Hapus Produk?)
 * Menggunakan utility-first Tailwind CSS.
 */
export default function DeleteProductModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  const formattedPrice = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 text-center space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Trash2 size={28} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Hapus Produk?</h2>
          <p className="text-xs text-slate-500 mt-1">
            Produk yang dihapus tidak dapat dikembalikan.
          </p>
        </div>

        {/* Ringkasan Item */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-left">
          <Badge variant="default">ID: {product.id}</Badge>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">{product.name}</p>
            <p className="text-xs font-bold text-blue-600">{formattedPrice}</p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm(product.id);
              onClose();
            }}
            className="flex-1"
          >
            Hapus Produk
          </Button>
        </div>
      </div>
    </div>
  );
}
