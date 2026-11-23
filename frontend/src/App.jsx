import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import EditProductModal from './components/EditProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import { productService, INITIAL_PRODUCTS } from './services/api';

/**
 * Komponen Utama: App
 * Mengatur pemetaan rute menggunakan React Router (Routes & Route),
 * serta state management global untuk sinkronisasi REST API dan preferensi tata letak.
 */
export default function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Preferensi layout: 'grid' atau 'list' (disimpan di localStorage)
  const [layoutPreference, setLayoutPreference] = useState(() => {
    return localStorage.getItem('layout_preference') || 'grid';
  });

  const handleLayoutChange = (newLayout) => {
    setLayoutPreference(newLayout);
    localStorage.setItem('layout_preference', newLayout);
  };

  // Muat data produk saat mount
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

  // Handler: Tambah Produk Baru (REST API POST)
  const handleAddProduct = async (newProduct) => {
    const saved = await productService.create(newProduct);

    if (saved && saved.id) {
      setProducts((prev) => [...prev, saved]);
      setIsConnectedToBackend(true);
    } else {
      const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const createdLocal = { id: nextId, ...newProduct };
      setProducts((prev) => [...prev, createdLocal]);
    }
  };

  // Handler: Update Produk (REST API PUT)
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
    setEditingProduct(null);
  };

  // Handler: Hapus Produk (REST API DELETE)
  const handleDeleteProduct = async (id) => {
    await productService.delete(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setDeletingProduct(null);
    // Jika sedang di halaman detail produk yang dihapus, arahkan ke daftar produk
    navigate('/products');
  };

  return (
    <>
      <Routes>
        {/* Rute Induk dengan Shared AppLayout (Slide 11 & 12 PPT) */}
        <Route path="/" element={<AppLayout isConnectedToBackend={isConnectedToBackend} />}>
          {/* Index Route: Dashboard */}
          <Route index element={<DashboardPage products={products} />} />
          <Route path="dashboard" element={<DashboardPage products={products} />} />

          {/* Rute Daftar Produk */}
          <Route
            path="products"
            element={
              <ProductsPage
                products={products}
                onAddProduct={handleAddProduct}
                onEditProduct={(p) => setEditingProduct(p)}
                onDeleteProduct={(p) => setDeletingProduct(p)}
                layoutPreference={layoutPreference}
              />
            }
          />

          {/* Rute Detail Produk Dinamis :id (Slide 13 PPT) */}
          <Route
            path="products/:id"
            element={
              <ProductDetailPage
                products={products}
                onOpenEdit={(p) => setEditingProduct(p)}
                onOpenDelete={(p) => setDeletingProduct(p)}
              />
            }
          />

          {/* Rute Pengaturan Tampilan (Slide 25 PPT) */}
          <Route
            path="settings"
            element={
              <SettingsPage
                layoutPreference={layoutPreference}
                onLayoutChange={handleLayoutChange}
              />
            }
          />
        </Route>

        {/* Wildcard 404 Route (Slide 14 PPT) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Modal Edit Produk (Global) */}
      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleEditProduct}
      />

      {/* Modal Hapus Produk (Global) */}
      <DeleteProductModal
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
}
