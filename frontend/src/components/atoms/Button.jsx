import React from 'react';

/**
 * Komponen Atom: Button
 * Sesuai contoh Slide 23 PPT:
 * Menggunakan utility-first Tailwind dengan varian warna dan ukuran yang konsisten.
 */
const styles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outline: 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50',
  dangerOutline: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
};

export default function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        styles[variant] || styles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
