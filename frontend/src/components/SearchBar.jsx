import React from 'react';
import { Search } from 'lucide-react';

/**
 * Komponen SearchBar
 * Mengontrol input pencarian produk dan menampilkan total jumlah produk.
 * Menerima props:
 * - searchQuery: string kata kunci pencarian saat ini
 * - onSearchChange: callback handler saat nilai input berubah
 * - totalCount: jumlah produk total
 */
export default function SearchBar({ searchQuery, onSearchChange, totalCount }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="product-count-badge">
        {totalCount} produk
      </div>
    </div>
  );
}
