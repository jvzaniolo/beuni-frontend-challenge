import type { Config } from 'tailwindcss'
import tailwindForms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './app/routes/$.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindForms],
} satisfies Config
