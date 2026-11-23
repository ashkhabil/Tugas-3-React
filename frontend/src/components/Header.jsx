import React from 'react';
import { Plus } from 'lucide-react';
import Button from './atoms/Button';

/**
 * Komponen Header Halaman Produk
 */
export default function Header({ onOpenAdd }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Manajemen Produk
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>

      <Button
        variant="primary"
        onClick={onOpenAdd}
        className="self-start sm:self-auto"
      >
        <Plus size={18} />
        <span>Tambah Produk</span>
      </Button>
    </header>
  );
}
