import React from 'react';
import { Link } from 'react-router';
import { LayoutGrid, List, Check, ArrowRight } from 'lucide-react';
import Button from '../components/atoms/Button';

/**
 * Komponen SettingsPage
 * Sesuai Slide 07, 11, dan 25 PPT:
 * "Settings: ubah preferensi tata letak (grid / list) untuk daftar produk."
 */
export default function SettingsPage({ layoutPreference, onLayoutChange }) {
  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Pengaturan Aplikasi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sesuaikan tata letak dan preferensi tampilan halaman daftar produk.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Tata Letak Daftar Produk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih bagaimana produk ditampilkan pada halaman utama (/products).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Opsi 1: Grid Mode */}
          <button
            type="button"
            onClick={() => onLayoutChange('grid')}
            className={`p-5 rounded-xl border text-left transition flex flex-col justify-between gap-4 cursor-pointer ${
              layoutPreference === 'grid'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <LayoutGrid size={20} />
              </div>
              {layoutPreference === 'grid' && (
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check size={14} />
                </span>
              )}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Tampilan Grid (Kartu)</p>
              <p className="text-xs text-slate-500 mt-1">
                Menampilkan produk dalam bentuk kartu responsif multi-kolom (1 hingga 3 kolom).
              </p>
            </div>
          </button>

          {/* Opsi 2: List Mode */}
          <button
            type="button"
            onClick={() => onLayoutChange('list')}
            className={`p-5 rounded-xl border text-left transition flex flex-col justify-between gap-4 cursor-pointer ${
              layoutPreference === 'list'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <List size={20} />
              </div>
              {layoutPreference === 'list' && (
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check size={14} />
                </span>
              )}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Tampilan List (Tabel / Baris)</p>
              <p className="text-xs text-slate-500 mt-1">
                Menampilkan produk dalam susunan baris vertikal ringkas dengan aksi horizontal.
              </p>
            </div>
          </button>
        </div>

        {/* Status Aktif & Tombol Navigasi */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Preferensi saat ini: <span className="font-bold text-slate-900 uppercase">{layoutPreference}</span>
          </p>

          <Link to="/products">
            <Button variant="primary">
              <span>Buka Halaman Produk</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
