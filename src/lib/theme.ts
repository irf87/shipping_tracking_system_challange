export const theme = {
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    foreground: '#111111',
    accent: '#FF3C3C',
    muted: '#C5C5C5',
    border: '#E5E5E5',
    overlay: 'rgba(0,0,0,0.4)',
    transparent: 'transparent',
    primary: '#000000',
    secondary: '#111111',
    tertiary: '#222222',
    quaternary: '#333333',
    quinary: '#444444',
    senary: '#555555',
    septenary: '#666666',
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '4rem',  // 64px
  },
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.25rem',   // 20px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '3rem',   // 48px
  },
  fonts: {
    mono: "'Space Mono', monospace",
    sans: "'Inter', sans-serif",
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 6px rgba(0,0,0,0.1)',
    lg: '0 4px 12px rgba(0,0,0,0.15)',
  },
  zIndex: {
    base: 0,
    dropdown: 10,
    overlay: 20,
    modal: 30,
    toast: 40,
  }
}

export default theme;