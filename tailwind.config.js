/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root', // This ensures Tailwind styles can override MUI
  theme: {
    extend: {},
  },
  corePlugins: {
    // Disable Tailwind's preflight as it can conflict with MUI
    preflight: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}