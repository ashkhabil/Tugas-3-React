import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Komponen Header
 * Menampilkan judul aplikasi, deskripsi singkat, dan tombol pemicu pop-up tambah produk.
 * Menerima prop onOpenAdd: callback fungsi saat tombol diklik.
 */
export default function Header({ onOpenAdd }) {
  return (
    <header className="page-header">
      <div className="header-text">
        <h1 className="app-title">Manajemen Produk</h1>
        <p className="app-subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
      </div>
      <button 
        type="button" 
        className="btn btn-primary"
        onClick={onOpenAdd}
      >
        <Plus size={18} />
        <span>Tambah Produk</span>
      </button>
    </header>
  );
}
