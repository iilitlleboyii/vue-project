import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // console.log(env)
  return {
    base: '/',
    plugins: createVitePlugins(command === 'serve'),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
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
    },
    build: {
      sourcemap: true
    },
    publicDir: 'public'
  }
})
