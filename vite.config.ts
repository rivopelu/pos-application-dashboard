import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-expect-error
  test: {
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/*.test.js',
      '__tests__/**/*.test.js',
      'src/**/*.test.ts',
      '__tests__/**/*.test.ts',
      'src/**/*.test.tsx',
      '__tests__/**/*.test.tsx',
    ],

    setupFiles: './src/__tests__/setup.js',
  },
});
