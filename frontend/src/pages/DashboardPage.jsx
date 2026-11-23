import React from 'react';
import { Link } from 'react-router';
import { Package, TrendingUp, DollarSign, Award, ArrowRight, Settings, Plus } from 'lucide-react';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';

/**
 * Komponen DashboardPage
 * Sesuai Slide 07, 11, dan 25 PPT:
 * "Dashboard: ringkasan produk dan navigasi cepat."
 */
export default function DashboardPage({ products }) {
  const totalCount = products.length;
  const totalPrice = products.reduce((acc, p) => acc + Number(p.price || 0), 0);
  const avgPrice = totalCount > 0 ? Math.round(totalPrice / totalCount) : 0;

  const sortedByPrice = [...products].sort((a, b) => Number(a.price) - Number(b.price));
  const cheapest = sortedByPrice[0];
  const mostExpensive = sortedByPrice[sortedByPrice.length - 1];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ringkasan data produk, metrik harga, dan jalan pintas navigasi.
          </p>
        </div>
        <Link to="/products">
          <Button variant="primary">
            <Package size={16} />
            <span>Lihat Semua Produk</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Grid Kartu Metrik Statistik (Tailwind Grid & Spacing) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metrik 1: Total Produk */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Produk
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              {totalCount}
            </p>
          </div>
        </div>

        {/* Metrik 2: Rata-rata Harga */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Rata-rata Harga
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              Rp{avgPrice.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Metrik 3: Produk Terjangkau */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Harga Terendah
            </p>
            <p className="text-base font-bold text-slate-900 mt-0.5 truncate max-w-[140px]" title={cheapest?.name}>
              {cheapest ? `Rp${Number(cheapest.price).toLocaleString('id-ID')}` : '-'}
            </p>
            <span className="text-xs text-slate-500 truncate block max-w-[140px]">
              {cheapest?.name || ''}
            </span>
          </div>
        </div>

        {/* Metrik 4: Produk Tertinggi */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Harga Tertinggi
            </p>
            <p className="text-base font-bold text-slate-900 mt-0.5 truncate max-w-[140px]" title={mostExpensive?.name}>
              {mostExpensive ? `Rp${Number(mostExpensive.price).toLocaleString('id-ID')}` : '-'}
            </p>
            <span className="text-xs text-slate-500 truncate block max-w-[140px]">
              {mostExpensive?.name || ''}
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Pintasan & Produk Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom 1 & 2: Preview Produk Terbaru */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Produk Terbaru
            </h2>
            <Link to="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Lihat semua &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="default">ID: {p.id}</Badge>
                  <span className="font-semibold text-slate-900">{p.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-blue-600">
                    Rp{Number(p.price).toLocaleString('id-ID')}
                  </span>
                  <Link
                    to={`/products/${p.id}`}
                    className="text-xs font-medium text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-md transition"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom 3: Navigasi Cepat & Pengaturan */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Navigasi Cepat
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Akses cepat fitur pengelolaan dan konfigurasi tampilan.
            </p>

            <div className="space-y-3">
              <Link
                to="/products"
                className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block group-hover:text-blue-600">
                      Kelola Produk
                    </span>
                    <span className="text-xs text-slate-500">
                      Tambah, edit, atau hapus item
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600" />
              </Link>

              <Link
                to="/settings"
                className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Settings size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block group-hover:text-blue-600">
                      Pengaturan Tampilan
                    </span>
                    <span className="text-xs text-slate-500">
                      Ubah tata letak Grid atau List
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
