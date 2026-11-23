import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Package, Settings, PackageOpen } from 'lucide-react';

/**
 * Komponen Navbar
 * Sesuai Slide 10 dan 21 PPT:
 * Menggunakan NavLink dengan conditional active style dan flex layout Tailwind.
 */
export default function Navbar({ isConnectedToBackend }) {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-blue-50 text-blue-600 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <PackageOpen size={22} />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base leading-tight block">
              Manajemen Produk
            </span>
            <span className="text-xs text-slate-500 font-normal">
              Tugas 4 · Pemrograman Web
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navLinkClass}>
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            <Package size={18} />
            <span className="hidden sm:inline">Produk</span>
          </NavLink>

          <NavLink to="/settings" className={navLinkClass}>
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </NavLink>
        </nav>

        {/* Backend Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-600">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnectedToBackend ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-amber-500 ring-4 ring-amber-100'
            }`}
          />
          <span>{isConnectedToBackend ? 'API Online' : 'Data Lokal'}</span>
        </div>
      </div>
    </header>
  );
}
