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
      '/api': {
        target: 'https://caresynq.onrender.com', // Backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  // Use '/' as the base for production builds
  base: mode === 'production' ? '/' : '/',
}));
