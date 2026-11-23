import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

/**
 * Komponen AppLayout
 * Sesuai Slide 11 & 12 PPT:
 * Shared layout yang mempertahankan Navbar di semua child route,
 * sementara halaman anak berganti di dalam Outlet.
 */
export default function AppLayout({ isConnectedToBackend }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar isConnectedToBackend={isConnectedToBackend} />
      <main className="mx-auto max-w-6xl w-full p-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
