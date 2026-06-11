import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import fs from 'fs'
import path from 'path'

// Plugin que sirve archivos HTML en public/ sin que el fallback SPA los intercepte
function servePublicHtml() {
  return {
    name: 'serve-public-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (url !== '/' && url.endsWith('.html')) {
          const filePath = path.join(process.cwd(), 'public', url)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(filePath))
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true }),
    command === 'serve' ? servePublicHtml() : null,
  ].filter(Boolean),
  build: {
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-charts': ['recharts'],
        },
      },
    },
  },
  esbuild: {
    // Solo elimina console.* y debugger en el build de producción, no en dev
    drop: command === 'build' ? ['console', 'debugger'] : [],
  },
}))
