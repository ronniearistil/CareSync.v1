import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/analytics': {
        target: 'http://localhost:5555', // Backend URL
        changeOrigin: true,
        secure: false,
      },
      '/appointments': {
        target: 'http://localhost:5555', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
