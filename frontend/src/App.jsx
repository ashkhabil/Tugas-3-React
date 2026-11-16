import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import { productService, INITIAL_PRODUCTS } from './services/api';
import './App.css';

/**
 * Komponen Utama: App
 * Mengelola state utama aplikasi:
 * 1. products: daftar seluruh produk
 * 2. searchQuery: query pencarian aktif
 * 3. isAddModalOpen: kontrol dialog tambah produk
 * 4. editingProduct: objek produk yang sedang diedit (atau null)
 * 5. deletingProduct: objek produk yang akan dihapus (atau null)
 * 6. isConnectedToBackend: indikator status sinkronisasi ke Express REST API
 */
export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);

  // Ambil data produk saat pertama kali komponen dimuat (Mount)
  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      const data = await productService.getAll();
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setProducts(data);
        setIsConnectedToBackend(true);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handler: Tambah Produk Baru
  const handleAddProduct = async (newProduct) => {
    // Coba simpan ke Backend API jika aktif
    const saved = await productService.create(newProduct);

    if (saved && saved.id) {
      setProducts((prev) => [...prev, saved]);
      setIsConnectedToBackend(true);
    } else {
      // Fallback state lokal: buat ID baru secara otomatis
      const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const createdLocal = { id: nextId, ...newProduct };
      setProducts((prev) => [...prev, createdLocal]);
    }
  };

  // Handler: Perbarui / Edit Produk
  const handleEditProduct = async (id, updatedData) => {
    const updated = await productService.update(id, updatedData);

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return updated ? updated : { ...item, ...updatedData };
        }
        return item;
      })
    );
  };

  // Handler: Hapus Produk
  const handleDeleteProduct = async (id) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter daftar produk secara reaktif berdasarkan query pencarian nama produk
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="app-layout">
      <div className="app-container">
        {/* Indikator Status Koneksi Backend REST API */}
        <div className="connection-status-bar">
          <span className={`status-dot ${isConnectedToBackend ? 'online' : 'offline'}`} />
          <span className="status-label">
            {isConnectedToBackend
              ? 'Terhubung ke REST API Express (PORT 3000)'
              : 'Mode Standalone (Data Lokal / Fallback Mandiri)'}
          </span>
        </div>

        {/* 1. Header & Tombol Tambah Produk */}
        <Header onOpenAdd={() => setIsAddModalOpen(true)} />

        {/* 2. Bilah Pencarian & Counter Produk */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={products.length}
        />

        {/* 3. Daftar Kartu Produk & Status Footer */}
        <ProductList
          products={filteredProducts}
          totalCount={products.length}
          onEdit={(prod) => setEditingProduct(prod)}
          onDelete={(prod) => setDeletingProduct(prod)}
        />

        {/* 4. Pop-up 1: Tambah Produk (Conditional Rendering) */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />

        {/* 5. Pop-up 2: Edit Produk (Conditional Rendering) */}
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
        />

        {/* 6. Pop-up 3: Hapus Produk? (Conditional Rendering) */}
        <DeleteProductModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
