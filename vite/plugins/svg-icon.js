import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: {
      plugins: [
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        }
      ]
    },
    inject: 'body-last',
    customDomId: '__svg__icons__dom__'
  })
}
