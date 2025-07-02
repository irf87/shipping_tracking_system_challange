import theme from './src/lib/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{tsx}'],
  theme: {
    extend: {
      colors: theme.colors,
      spacing: theme.spacing,
      fontSize: theme.fontSizes,
      fontFamily: {
        mono: [theme.fonts.mono],
        sans: [theme.fonts.sans],
      },
      borderRadius: theme.radii,
      boxShadow: theme.shadows,
      zIndex: theme.zIndex,
    },
  },
  plugins: [],
}

export default config; 