/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ios-safe': 'rgb(34, 197, 94)',
        'ios-warning': 'rgb(251, 191, 36)',
        'ios-danger': 'rgb(248, 113, 113)',
        'ios-safe-light': 'rgba(34, 197, 94, 0.12)',
        'ios-warning-light': 'rgba(251, 191, 36, 0.12)',
        'ios-danger-light': 'rgba(248, 113, 113, 0.12)',
        'slate-dark': 'rgb(15, 23, 42)',
        'slate-light': 'rgba(255, 255, 255, 0.45)',
      },
      backdropFilter: {
        'blur-20': 'blur(20px)',
        'blur-30': 'blur(30px)',
      },
      borderRadius: {
        'ios': '24px',
        'ios-sm': '12px',
      },
      boxShadow: {
        'ios': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'ios-sm': '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.45)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.25)',
          'border-radius': '24px',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        },
        '.glassmorphism-light': {
          'background': 'rgba(248, 250, 252, 0.9)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(226, 232, 240, 0.8)',
          'border-radius': '24px',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
