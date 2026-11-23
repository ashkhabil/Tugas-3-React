import React from 'react';
import { Search } from 'lucide-react';

/**
 * Komponen SearchBar
 * Menggunakan utility class Tailwind untuk search input dan badge jumlah produk.
 */
export default function SearchBar({ searchQuery, onSearchChange, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs transition"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 shadow-xs self-start sm:self-auto shrink-0">
        {totalCount} produk
      </div>
    </div>
  );
}
