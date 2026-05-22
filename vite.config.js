import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true }),
  ],
  build: {
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
  esbuild: {
    // Solo elimina console.* y debugger en el build de producción, no en dev
    drop: command === 'build' ? ['console', 'debugger'] : [],
  },
}))
