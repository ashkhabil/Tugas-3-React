import React from 'react';
import ProductCard from './ProductCard';

/**
 * Komponen ProductList
 * Sesuai Slide 21 dan 22 PPT:
 * Menggunakan responsive grid breakpoints:
 * grid-cols-1 (< 768px), md:grid-cols-2 (>= 768px), lg:grid-cols-3 (>= 1024px).
 * Juga mendukung tata letak List jika diatur di SettingsPage.
 */
export default function ProductList({
  products,
  totalCount,
  onEdit,
  onDelete,
  layout = 'grid',
}) {
  return (
    <section className="space-y-6">
      {products.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <p className="text-base font-bold text-slate-800 mb-1">
            Tidak ada produk ditemukan
          </p>
          <p className="text-sm text-slate-500">
            Coba sesuaikan kata kunci pencarian Anda atau tambahkan produk baru.
          </p>
        </div>
      ) : layout === 'list' ? (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              layout="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              layout="grid"
            />
          ))}
        </div>
      )}

      {/* Status Footer Tampilan */}
      <footer className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          Menampilkan {products.length} dari {totalCount} produk
        </p>
      </footer>
    </section>
  );
}
