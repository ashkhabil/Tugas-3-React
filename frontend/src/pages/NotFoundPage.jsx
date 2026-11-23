import React from 'react';
import { Link } from 'react-router';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/atoms/Button';

/**
 * Komponen NotFoundPage
 * Sesuai Slide 14 PPT dan Ketentuan Fitur 03:
 * "Halaman 404: Tambahkan halaman untuk URL yang tidak terdaftar.
 *  Tampilkan pesan bahwa halaman tidak ditemukan dan tautan untuk kembali ke halaman utama atau daftar produk."
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-xs">
        <FileQuestion size={44} />
      </div>

      <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
        Galat 404
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        404: Halaman tidak ditemukan
      </h1>

      <p className="text-slate-600 max-w-md text-sm sm:text-base mb-8 leading-relaxed">
        Maaf, alamat URL yang Anda tuju tidak terdaftar atau telah dipindahkan.
        Silakan kembali ke dashboard atau ke halaman daftar produk.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/products">
          <Button variant="primary">
            <ArrowLeft size={16} />
            <span>Kembali ke Produk</span>
          </Button>
        </Link>

        <Link to="/">
          <Button variant="secondary">
            <Home size={16} />
            <span>Ke Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
