import React from 'react';
import { Link } from 'react-router';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Badge from './atoms/Badge';
import Button from './atoms/Button';

/**
 * Komponen ProductCard
 * Sesuai Slide 13, 19, 21, dan 22 PPT:
 * Menampilkan kartu produk dengan Tailwind utility class.
 * Mendukung mode Grid dan List (sesuai preferensi dari SettingsPage).
 * Menyediakan tautan Detail (/products/:id) serta tombol Edit & Hapus.
 */
export default function ProductCard({ product, onEdit, onDelete, layout = 'grid' }) {
  const formattedPrice = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  if (layout === 'list') {
    return (
      <article className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="default">ID: {product.id}</Badge>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">
              {product.description || 'Peralatan kantor dan sekolah berkualitas.'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-lg font-bold text-blue-600 shrink-0">
            {formattedPrice}
          </span>

          <div className="flex items-center gap-2">
            <Link to={`/products/${product.id}`}>
              <Button variant="secondary" className="px-3 py-1.5 text-xs">
                <Eye size={14} />
                <span>Detail</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => onEdit(product)}
              className="px-3 py-1.5 text-xs"
            >
              <Pencil size={14} />
              <span>Edit</span>
            </Button>

            <Button
              variant="dangerOutline"
              onClick={() => onDelete(product)}
              className="px-3 py-1.5 text-xs"
            >
              <Trash2 size={14} />
              <span>Hapus</span>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid Layout Card
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <Badge variant="default">ID: {product.id}</Badge>
        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
          Tersedia
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <p className="text-xl font-extrabold text-blue-600">
          {formattedPrice}
        </p>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
          {product.description || 'Peralatan kantor dan sekolah berkualitas standar terpercaya.'}
        </p>
      </div>

      {/* Aksi: Detail (Link), Edit, Hapus */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button variant="secondary" className="w-full text-xs py-2">
            <Eye size={14} />
            <span>Detail</span>
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={() => onEdit(product)}
          className="px-3 py-2 text-xs"
          title="Edit Produk"
        >
          <Pencil size={14} />
          <span>Edit</span>
        </Button>

        <Button
          variant="dangerOutline"
          onClick={() => onDelete(product)}
          className="px-3 py-2 text-xs"
          title="Hapus Produk"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </article>
  );
}
