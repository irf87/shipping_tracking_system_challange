import React from 'react';
import theme from './theme';

const cssVarsObj: Record<string, string> = Object.values(theme).reduce((acc, values) => {
  Object.entries(values).forEach(([key, value]) => {
    acc[`--${key}`] = value;
  });
  return acc;
}, {} as Record<string, string>);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={cssVarsObj}>
      {children}
    </div>
  );
};

export default ThemeProvider; 