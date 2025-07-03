import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  loading = false,
  disabled,
  className,
  ...props
}) => {
  const baseStyles =
    'w-full flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none cursor-pointer';
  const contained =
    'bg-[var(--accent)] text-white border border-[var(--accent)] hover:bg-[var(--primary)]';
  const outlined =
    'bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--accent)] hover:text-white';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={[
        baseStyles,
        variant === 'contained' ? contained : outlined,
        (disabled || loading) ? disabledStyles : '',
        className || '',
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loader mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
