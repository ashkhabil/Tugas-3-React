import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';

/**
 * Komponen ProductsPage
 * Halaman utama pengelolaan produk (CRUD) di /products.
 * Sesuai Ketentuan Fitur 01:
 * "Fitur tambah, lihat, edit, dan hapus produk tetap berfungsi setelah penambahan routing dan styling.
 *  Seluruh proses menggunakan data dari backend, dan perubahan data tersimpan melalui API."
 */
export default function ProductsPage({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  layoutPreference,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Filter pencarian reaktif
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header & Tombol Tambah Produk */}
      <Header onOpenAdd={() => setIsAddModalOpen(true)} />

      {/* 2. Bilah Pencarian & Counter */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={products.length}
      />

      {/* 3. Daftar Kartu / List Produk */}
      <ProductList
        products={filteredProducts}
        totalCount={products.length}
        onEdit={(prod) => setEditingProduct(prod)}
        onDelete={(prod) => setDeletingProduct(prod)}
        layout={layoutPreference}
      />

      {/* 4. Pop-up 1: Tambah Produk */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={onAddProduct}
      />

      {/* 5. Pop-up 2: Edit Produk */}
      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={onEditProduct}
      />

      {/* 6. Pop-up 3: Hapus Produk */}
      <DeleteProductModal
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={onDeleteProduct}
      />
    </div>
  );
}
