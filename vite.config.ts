import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('react/')) return 'react';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'icons';
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
