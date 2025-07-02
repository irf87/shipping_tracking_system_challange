import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--backgroundSecondary)]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout; 