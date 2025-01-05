import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/analytics': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        secure: false,
      },
      '/appointments': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Add base path for production only
  base: mode === 'production' ? './' : '/',
}));
