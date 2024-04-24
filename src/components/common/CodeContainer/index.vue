<template>
  <div ref="CodeContainerRef" class="Code-Container">
    <div class="copy-btn">
      <!-- <el-button @click="onCopy" :icon="DocumentCopy"></el-button> -->
      <el-button @click="onCopy">
        <template #default>
          <i-ep-document-copy />
        </template>
      </el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClickTab">
      <el-tab-pane v-for="item in source" :label="item.name" :name="item.name"></el-tab-pane>
    </el-tabs>
    <div ref="ContentRef" v-html="html"></div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
/* 全量捆绑 */
import { bundledLanguages, bundledThemes, getHighlighter } from 'shiki'
/* 细粒度捆绑 */
// import { getHighlighterCore } from 'shiki/core'
// import getWasm from 'shiki/wasm'
import { useClipboard } from '@vueuse/core'
import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it/core'

const props = defineProps({
  source: {
    type: Array,
    required: true
  }
})

const CodeContainerRef = ref(null)
const ContentRef = ref(null)

const activeName = ref('')
nextTick(() => {
  activeName.value = props.source[0].name
})

function handleClickTab() {
  nextTick(() => {
    setThemeToBody(activeName.value)
  })
}

function setThemeToBody(val) {
  if (val === 'vue') {
    document.body.dataset.theme = 'light'
  } else {
    document.body.dataset.theme = 'dark'
  }
}

const { text, copy, copied, isSupported } = useClipboard({
  legacy: true
})

function onCopy() {
  if (!isSupported.value) {
    ElMessage.warning('当前浏览器环境不支持复制！')
    return
  }
  copy(content.value).then(() => {
    if (copied.value) {
      ElMessage.success('复制成功！')
    } else {
      ElMessage.error('复制失败！')
    }
  })
}

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

const md = MarkdownIt()

md.use(
  fromHighlighter(highlighter, {
    themes: {
      dark: 'dracula',
      light: 'vitesse-light'
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-'
  })
)

const content = computed(() => props.source.find((item) => item.name === activeName.value)?.code)

const html = computed(() => md.render(addStringToFirstAndLastLine(content.value, activeName.value)))

onMounted(() => {
  handleClickTab() // 设置默认主题
  setCssVarToParent()
  showCopyBtn()
})

function setCssVarToParent() {
  const vars = ['--shiki-light-bg', '--shiki-dark-bg', '--shiki-light', '--shiki-dark']
  for (const varName of vars) {
    const value = getCssVar(ContentRef.value.getElementsByTagName('pre')[0], varName)
    applyCssVarToParent(CodeContainerRef.value, varName, value)
  }
  function getCssVar(el, varName) {
    return el.style.getPropertyValue(varName)
  }
  function applyCssVarToParent(el, varName, value) {
    el.style.setProperty(varName, value)
  }
}

/* 添加markdown代码块格式 */
function addStringToFirstAndLastLine(code, language) {
  const lines = code.split('\n')
  lines.unshift('```' + language)
  lines.push('```')
  return lines.join('\n')
}
/* 删除markdown代码块格式 */
function removeFirstAndLastLine(code) {
  return code.trim().replace(/^.*\n|\n.*$/g, '')
}

/* 解决css方案 el-tab hover状态切换主题时复制按钮颜色闪烁的不好体验 */
function showCopyBtn() {
  if (!ContentRef.value) return
  ContentRef.value.addEventListener(
    'mouseenter',
    function () {
      const dom = document.querySelector('.Code-Container .copy-btn')
      dom.style.opacity = 1
    },
    false
  )
  ContentRef.value.addEventListener(
    'mouseleave',
    function () {
      const dom = document.querySelector('.Code-Container .copy-btn')
      dom.style.opacity = 0
    },
    false
  )
}
</script>

<style lang="scss" scoped>
.Code-Container {
  padding: 0 1em 1em 1em;
  border-radius: 0.5em;
  position: relative;
  max-width: 600px;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.copy-btn {
  position: absolute;
  right: 1em;
  top: 3em;
  opacity: 0;
  transition: opacity 300ms;

  :deep(.el-button) {
    padding: 0;
    width: 36px;
    height: 36px;
  }

  &:hover {
    opacity: 1 !important;
  }
}
</style>

<style lang="scss">
.shiki {
  padding: 0.5em;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 10px;
    transition: opacity 250ms;
  }
  &::-webkit-scrollbar-track {
    height: 12px;
  }
}

/* 设置深浅色主题 */
[data-theme='light'] .Code-Container,
[data-theme='light'] .shiki,
[data-theme='light'] .shiki span {
  background-color: var(--shiki-light-bg) !important;
  color: var(--shiki-light) !important;
  font-style: var(--shiki-light-font-style) !important;
  font-weight: var(--shiki-light-font-weight) !important;
  text-decoration: var(--shiki-light-text-decoration) !important;
}
[data-theme='dark'] .Code-Container,
[data-theme='dark'] .shiki,
[data-theme='dark'] .shiki span {
  background-color: var(--shiki-dark-bg) !important;
  color: var(--shiki-dark) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

/* 设置深浅色主题tab相关颜色 */
[data-theme='light'] .Code-Container {
  .el-tabs__active-bar {
    background-color: #a8b1ff;
  }
  .el-tabs__item {
    color: rgba(60, 60, 67, 0.78);
    &:hover {
      color: rgba(60, 60, 67);
    }
    &.is-active {
      color: rgba(60, 60, 67);
    }
  }
  .el-tabs__nav-wrap::after {
    background-color: #e2e2e3;
  }
}
[data-theme='dark'] .Code-Container {
  .el-tabs__active-bar {
    background-color: #a8b1ff;
  }
  .el-tabs__item {
    color: rgba(235, 235, 245, 0.6);
    &:hover {
      color: rgba(255, 255, 245, 0.86);
    }
    &.is-active {
      color: rgba(255, 255, 245, 0.86);
    }
  }
  .el-tabs__nav-wrap::after {
    background-color: #000000;
  }
}

/* 设置深浅色主题复制按钮相关颜色 */
[data-theme='light'] .Code-Container .copy-btn {
  .el-button {
    color: #212121;
    background-color: #f6f6f7;
    border-color: #e2e2e3;
  }
}
[data-theme='dark'] .Code-Container .copy-btn {
  .el-button {
    color: #e0e0e0;
    background-color: #202127;
    border-color: #2e2e32;
  }
}

/* 设置滚动条深浅色主题背景色 */
[data-theme='light'] .shiki::-webkit-scrollbar-thumb {
  background-color: #8b8b8b;
}
[data-theme='dark'] .shiki::-webkit-scrollbar-thumb {
  background-color: #9f9f9f;
}
</style>
