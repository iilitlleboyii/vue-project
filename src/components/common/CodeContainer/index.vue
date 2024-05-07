<template>
  <div ref="CodeContainerRef" class="Code-Container">
    <div class="copy-btn" title="Copy Code">
      <template v-if="!copied">
        <el-button @click="onCopy">
          <template #default>
            <i-lucide:clipboard />
          </template>
        </el-button>
      </template>
      <template v-else>
        <div class="copied-btns">
          <el-button>
            <template #default>
              <span>Copied</span>
            </template>
          </el-button>
          <el-button>
            <template #default>
              <i-lucide:clipboard-check />
            </template>
          </el-button>
        </div>
      </template>
    </div>
    <div class="code-lang">{{ activeName }}</div>
    <el-tabs v-model="activeName" @tab-click="handleClickTab" :class="lineNums ? 'line-numbers-mode' : ''">
      <el-tab-pane v-for="item in source" :label="item.name" :name="item.lang"></el-tab-pane>
    </el-tabs>
    <div ref="ContentRef" v-html="html" class="flex"></div>
  </div>
</template>

<script setup>
/* 全量捆绑 */
import { bundledLanguages, bundledThemes, getHighlighter } from 'shiki'
/* 细粒度捆绑 */
// import { getHighlighterCore } from 'shiki/core'
// import getWasm from 'shiki/wasm'
import { useClipboard } from '@vueuse/core'
import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it/core'

const props = defineProps({
  /**
   * 数据源
   *
   * @type {Array<{name: string, lang: string, code: string}>}
   * @description name 文件名
   * @description lang 语言
   * @description code 代码内容
   */
  source: {
    type: Array,
    required: true
  },
  /**
   * 主题色
   *
   * @type {'light' | 'dark' | 'auto'}
   * @default 'light'
   */
  theme: {
    type: String,
    required: false,
    default: 'light'
  },
  /** 是否显示行号
   *
   * @type {boolean}
   * @default false
   */
  lineNums: {
    type: Boolean,
    required: false,
    default: false
  }
})

const CodeContainerRef = ref(null)
const ContentRef = ref(null)

const activeName = ref('')

function handleClickTab() {
  nextTick(() => {
    setThemeToBody(activeName.value)
  })
}

function setThemeToBody(val) {
  if (props.theme === 'auto') {
    // TODO 自动逻辑
    // document.body.dataset.theme = val === 'vue' ? 'light' : 'dark'
  } else {
    document.body.dataset.theme = props.theme
  }
}

const { copy, copied, isSupported } = useClipboard({
  legacy: true
})

function onCopy() {
  if (!isSupported.value) return ElMessage.warning('当前浏览器环境不支持复制！')
  if (copied.value) return
  copy(content.value)
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
    /* 配置深浅色主题 */
    themes: {
      dark: 'github-dark',
      light: 'github-light'
    },
    defaultColor: false,
    cssVariablePrefix: '--shiki-'
  })
).use(lineNumberPlugin, props.lineNums)

const content = ref('')

const html = ref('')

watchEffect(() => {
  if (props.source instanceof Array && props.source.length > 0) {
    !activeName.value && (activeName.value = props.source[0].lang)
    setThemeToBody(activeName.value)
    content.value = props.source.find((item) => item.lang === activeName.value)?.code || ''
    html.value = md.render(addStringToFirstAndLastLine(content.value, activeName.value))
  }
})

onMounted(() => {
  handleClickTab() // 设置默认主题
  setCssVarToParent()
  showCopyBtn()
})

function setCssVarToParent() {
  if (!ContentRef.value || !CodeContainerRef.value || !ContentRef.value.getElementsByTagName('pre')[0]) return
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

/* 添加 markdown 代码块格式 */
function addStringToFirstAndLastLine(code, language) {
  const lines = code.split('\n')
  lines.unshift('```' + language)
  lines.push('```')
  return lines.join('\n')
}
/* 删除 markdown 代码块格式 */
function removeFirstAndLastLine(code) {
  return code.trim().replace(/^.*\n|\n.*$/g, '')
}

/* 解决 css 方案 el-tab hover状态切换主题时复制按钮颜色闪烁的不好体验 */
function showCopyBtn() {
  if (!ContentRef.value) return
  ContentRef.value.addEventListener(
    'mouseenter',
    function () {
      const btn = document.querySelector('.Code-Container .copy-btn')
      const lang = document.querySelector('.Code-Container .code-lang')
      btn.style.opacity = 1
      lang.style.opacity = 0
    },
    false
  )
  ContentRef.value.addEventListener(
    'mouseleave',
    function () {
      const btn = document.querySelector('.Code-Container .copy-btn')
      const lang = document.querySelector('.Code-Container .code-lang')
      btn.style.opacity = 0
      lang.style.opacity = 1
    },
    false
  )
}

/**
 * 来自vitepress重写的插件，稍加改造
 * @param {any} md
 * @param {any} enable 默认值false
 * @returns {any}
 */
function lineNumberPlugin(md, enable = false) {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const [tokens, idx] = args
    const info = tokens[idx].info
    if ((!enable && !/:line-numbers($| |=)/.test(info)) || (enable && /:no-line-numbers($| )/.test(info))) {
      return rawCode
    }
    let startLineNumber = 1
    const matchStartLineNumber = info.match(/=(\d*)/)
    if (matchStartLineNumber && matchStartLineNumber[1]) {
      startLineNumber = parseInt(matchStartLineNumber[1])
    }
    const lines = rawCode.split('\n')
    const lineNumbersCode = [...Array(lines.length - 2)].map((_, index) => `<span class="line-number">${index + startLineNumber}</span><br>`).join('')
    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`
    const finalCode = `${lineNumbersWrapperCode}\n` + rawCode
    return finalCode
  }
}
</script>

<style lang="scss" scoped>
.Code-Container {
  padding: 0 1em 1em 1em;
  border-radius: 0.5em;
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  :deep(.el-tabs__item) {
    box-shadow: none;
  }
}

.copy-btn {
  position: absolute;
  right: 1em;
  top: 3em;
  opacity: 0;
  transition: opacity 300ms;
  z-index: 1;

  :deep(.el-button) {
    padding: 0;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  &:hover {
    opacity: 1 !important;

    ~ .code-lang {
      opacity: 0 !important;
    }
  }
}

.code-lang {
  position: absolute;
  right: 1em;
  top: 3em;
  width: fit-content;
  height: fit-content;
  font-size: 14px;
  color: #8e8e92;
  cursor: default;
  user-select: none;
  opacity: 1;
  transition: opacity 300ms;
}

.copied-btns {
  .el-button + .el-button {
    margin-left: 0;
  }

  .el-button:first-child {
    width: 5em;
    font-size: 12px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
  .el-button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}

/* !实际应该根据.line-numbers-wrapper的宽度来动态计算的 */
.line-numbers-mode :deep(.el-tabs__nav-wrap.is-top) {
  padding-left: 4em;
}
</style>

<style lang="scss">
:root {
  --code-line-height: 1.2;
}

.shiki {
  padding: 0.5em;
  overflow: auto;
  outline: none;

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

  code {
    line-height: var(--code-line-height);
  }
}

.line-numbers-wrapper {
  padding: 0.5em 1em 0.5em 0;
  border-right: 2px solid;
  text-align: center;
  margin-right: 1em;

  .line-number {
    color: #8e8e92;
    font-size: 0.875em;
    line-height: var(--code-line-height);
  }
}

[data-theme='light'] .line-numbers-wrapper {
  border-right-color: #e2e2e3;
}
[data-theme='dark'] .line-numbers-wrapper {
  border-right-color: #000000;
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
    color: #808080;
    background-color: #f6f6f7;
    border-color: #e2e2e3;
  }
}
[data-theme='dark'] .Code-Container .copy-btn {
  .el-button {
    color: #808080;
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
