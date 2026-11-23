import React from 'react';

export default function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition ${
          error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
