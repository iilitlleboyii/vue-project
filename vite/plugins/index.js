import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

import createSvgIcon from './svg-icon'
import createAutoImport from './auto-import'
import createCompression from './compression'
import UnoCSS from 'unocss/vite'

export default function createVitePlugins(isServe) {
  const vitePlugins = [
    vue(),
    UnoCSS(),
    vueJsx(),
    createSvgIcon(),
    ...createAutoImport(isServe),
    ...createCompression(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'stats.html',
      open: true
    })
  ]
  return vitePlugins
}
