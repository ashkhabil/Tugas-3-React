import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
        styles[variant] || styles.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
