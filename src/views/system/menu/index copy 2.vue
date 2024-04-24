<template>
  <div class="app-container">
    <el-button @click="onToggleTheme">切换主题</el-button>
    <el-button @click="onCopy">复制</el-button>

    <div style="background-color: antiquewhite; padding: 0 1em 1em 1em; border-radius: 0.5em">
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane label="vue" name="vue"></el-tab-pane>
        <el-tab-pane label="java" name="java"></el-tab-pane>
      </el-tabs>
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script setup name="Menu">
import vues from './vue.md?raw'
import javas from './java.md?raw'

import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it/core'

/* 全量捆绑 */
import { bundledLanguages, bundledThemes, getHighlighter } from 'shiki'

const highlighter = await getHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages)
})

/* 细粒度捆绑 */
// import { getHighlighterCore } from 'shiki/core'
// import getWasm from 'shiki/wasm'

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

const md = MarkdownIt()

md.use(
  fromHighlighter(highlighter, {
    themes: {
      dark: 'monokai',
      light: 'vitesse-light'
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-'
  })
)

const content = ref(addStringToFirstAndLastLine(javas, 'java'))

const html = computed(() => md.render(content.value))

// const themes = ['light', 'dark']
// document.body.dataset.theme = themes[(Math.max(themes.indexOf(document.body.dataset.theme), 0) + 1) % themes.length]

function onToggleTheme() {
  const language = document.querySelector('.shiki > code').classList.value.split('-').pop()
  if (language === 'java') {
    content.value = addStringToFirstAndLastLine(vues, 'vue')
    document.body.dataset.theme = 'dark'
  } else {
    content.value = addStringToFirstAndLastLine(javas, 'java')
    document.body.dataset.theme = 'light'
  }
  console.log('当前语言是：', language)
}

import { useClipboard } from '@vueuse/core'

const { text, copy, copied, isSupported } = useClipboard({
  legacy: true
})

function onCopy() {
  if (!isSupported.value) {
    ElMessage.warning('当前浏览器环境不支持复制！')
    return
  }
  copy(removeFirstAndLastLine(content.value)).then(() => {
    if (copied.value) {
      ElMessage.success('复制成功！')
    } else {
      ElMessage.error('复制失败！')
    }
  })
}

function addStringToFirstAndLastLine(code, language) {
  const lines = code.split('\n')
  lines.unshift('```' + language)
  lines.push('```')
  return lines.join('\n')
}

function removeFirstAndLastLine(code) {
  return code.replace(/^.*\n|\n.*$/g, '')
}

const activeName = ref('vue')

function handleClickTab(tab) {
  console.log('@tab ===> ', tab.paneName)
}
</script>

<style lang="scss" scoped></style>
