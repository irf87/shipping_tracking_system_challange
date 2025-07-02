import React from 'react';
import theme from './theme';

const cssVars = Object.values(theme).flatMap((values) =>
  Object.entries(values).map(
    ([key, value]) => `--${key}: ${value};`
  )
).join(' ');

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ cssText: cssVars } as React.CSSProperties}>
      {children}
    </div>
  );
};

export default ThemeProvider; 