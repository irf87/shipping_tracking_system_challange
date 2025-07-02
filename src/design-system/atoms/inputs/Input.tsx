import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ label, helper, error, className, ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 rounded-md border focus:outline-none transition-colors ${
          error
            ? 'border-[var(--accent)] text-[var(--accent)] placeholder-[var(--accent)]'
            : 'border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)]'
        } bg-[var(--background)] ${className || ''}`}
        {...props}
      />
      {helper && (
        <p className={`mt-1 text-xs ${error ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>{helper}</p>
      )}
    </div>
  );
};

export default Input; 