import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

import createSvgIcon from './svg-icon'
import createAutoImport from './auto-import'
import createCompression from './compression'

export default function createVitePlugins() {
  const vitePlugins = [
    vue(),
    vueJsx(),
    createSvgIcon(),
    ...createAutoImport(),
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
