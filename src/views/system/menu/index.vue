<template>
  <div class="app-container">
    <div v-html="html"></div>
  </div>
</template>

<script setup name="Menu">
import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it/core'
import { getHighlighterCore } from 'shiki/core'
import { codeToTokens } from 'shiki'
import { bundledLanguages, bundledThemes, getHighlighter } from 'shiki'
import getWasm from 'shiki/wasm'
import vues from './vue.md?raw'
import javas from './java.md?raw'

// const highlighter = await getHighlighterCore({
//   themes: [import('shiki/themes/vitesse-light.mjs'), import('shiki/themes/monokai.mjs')],
//   langs: [
//     import('shiki/langs/javascript.mjs'),
//     import('shiki/langs/vue.mjs'),
//     import('shiki/langs/java.mjs'),
//     import('shiki/langs/sh.mjs'),
//     import('shiki/langs/md.mjs')
//   ],
//   loadWasm: getWasm
// })

const highlighter = await getHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages)
})

const { tokens } = await codeToTokens('<div class="foo">bar</div>', {
  lang: 'html',
  theme: 'min-dark'
})

console.log(tokens)

const md = MarkdownIt()

md.use(
  fromHighlighter(highlighter, {
    themes: {
      light: 'vitesse-light',
      dark: 'monokai'
    },
    defaultColor: 'light'
  })
)

const html = md.render(javas)
</script>

<style lang="scss" scoped></style>
