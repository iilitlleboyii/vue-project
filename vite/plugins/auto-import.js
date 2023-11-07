import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport(isServe) {
  return [
    Icons({
      autoInstall: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      dts: false,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: false,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          enabledCollections: ['ep', 'icon-park-outline']
        })
      ],
      include: isServe ? [/\.vue$/, /\.vue\?vue/, 'element-plus'] : [/\.vue$/, /\.vue\?vue/],
      exclude: isServe
        ? [/[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
        : [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
    })
  ]
}
