import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Pencil, Trash2, Package, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import { productService } from '../services/api';

/**
 * Komponen ProductDetailPage
 * Sesuai Slide 13 PPT dan Ketentuan Fitur 02:
 * "Halaman detail produk (/products/:id):
 *  Tampilkan data produk sesuai parameter id pada URL dan sediakan Link untuk kembali ke daftar produk.
 *  Jika produk tidak ditemukan, tampilkan pesan yang jelas."
 */
export default function ProductDetailPage({ products, onOpenEdit, onOpenDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek dari daftar products yang ada di state
    const matched = products.find((p) => String(p.id) === String(id));

    if (matched) {
      setProduct(matched);
      setLoading(false);
    } else {
      // 2. Jika tidak ada di local state, coba ambil dari API backend
      async function fetchFromBackend() {
        setLoading(true);
        const data = await productService.getById(id);
        if (data) {
          setProduct(data);
        } else {
          setProduct(null);
        }
        setLoading(false);
      }
      fetchFromBackend();
    }
  }, [id, products]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-500">Memuat rincian produk...</p>
      </div>
    );
  }

  // Jika produk tidak ditemukan (sesuai Slide 13 & 14)
  if (!product) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Produk Tidak Ditemukan
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          Produk dengan ID <span className="font-semibold text-slate-900">"{id}"</span> tidak terdaftar dalam basis data sistem atau telah dihapus.
        </p>
        <Link to="/products">
          <Button variant="primary">
            <ArrowLeft size={16} />
            <span>Kembali ke Daftar Produk</span>
          </Button>
        </Link>
      </div>
    );
  }

  const formattedPrice = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Tombol Navigasi Kembali (Slide 13) */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Produk</span>
        </Link>
      </div>

      {/* Kartu Rincian Produk (Tailwind Styling) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Header Produk */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ID: {product.id}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-100 bg-white/10 px-2.5 py-1 rounded-full">
                <ShieldCheck size={14} /> Terverifikasi
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {product.name}
            </h1>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-blue-100 block">Harga Satuan</span>
            <span className="text-3xl font-black text-white">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Isi Informasi Produk */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Deskripsi Produk
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm">
              {product.description ||
                `${product.name} adalah perlengkapan alat tulis kantor dan sekolah berkualitas tinggi dengan daya tahan optimal dan standar terpercaya.`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <Package size={18} className="text-blue-600" />
              <span>Kategori: <strong>Alat Tulis & Kantor</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar size={18} className="text-blue-600" />
              <span>Status: <strong className="text-emerald-600">Stok Tersedia</strong></span>
            </div>
          </div>

          {/* Tombol Aksi CRUD Halaman Detail */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenEdit(product)}
            >
              <Pencil size={15} />
              <span>Edit Produk</span>
            </Button>

            <Button
              variant="dangerOutline"
              onClick={() => onOpenDelete(product)}
            >
              <Trash2 size={15} />
              <span>Hapus Produk</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
