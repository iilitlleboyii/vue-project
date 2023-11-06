import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`
      }
    }
  },
  server: {
    host: 'localhost',
    // port: 5173,
    open: true,
    proxy: {
      '/dev-api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})
