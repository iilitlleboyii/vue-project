<template>
  <div ref="CodeContainerRef" class="Code-Container">
    <div class="copy-btn" title="复制代码">
      <template v-if="!copied">
        <el-button @click="onCopy">
          <template #default>
            <img
              style="transform: scale(0.6)"
              src="data:image/png;base64,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"
              alt=""
            />
          </template>
        </el-button>
      </template>
      <template v-else>
        <div class="copied-btns">
          <el-button>
            <template #default>
              <span>已复制</span>
            </template>
          </el-button>
          <el-button>
            <template #default>
              <img
                style="transform: scale(0.6)"
                src="data:image/png;base64,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AOAGALEYg4C+FgEAVwCIwci/BT4HAgDuAIi8G0yz/wNA+t3gSfr1B0CK3WA2EABwDYC4EdlzQMr9HwBC5jCiXqC9LADgIgCxOBlJ/7cuAOAmgEi6wduBAICrACLoBi3o/wCQYjdoT/0BkIaAp4EAgNsAxED4PUJ3bxcFAFwHIIbCdoN3L8sCAO4DCN0NnlhVfwCEz5tQe4VfFwUA/AAQ6jngdSAA4AsA0aEtYNm2+gPAKE80BfzbuvoD4L/tnYtOGlEURY8UMVETEa3vFyhqramiAZ/xQS0YVAyhGjXBqDHN/P8X1DRNaqzivTjMnJlZ6wu2Zy9h7p07w8eY37Ja//UKAoRLACmarwXWPo0JAoRNAJkwfqdsRmP/CODZjtBjryBAGAWQ4lYwr/8RwLUrwW/B7R8BvFkN3mjtHwHc+QxofkZo7Ve/IECYBWh+RmjuZkwQINwCyMrQm2E+p0QQIOwCSPytn4jrqwsCREAA2T29fCXJ/dclQYBICCCykJ98sS1YGI3tCgJERQCR2nS18eXvld/AZLK80iuCABES4Imf38t3R9vZm3yuU4IAAkQcBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABIicAAnjqJMUa8qk8VATvmctGGcdoFhTBoyHWvA964xx1rVumjWje814qDO+h103/7oaoVozRsxnuu572Kx52BjVmhEzn2nW97AZ87BlqjWjbD7TjO9hq+ZhG1RrRsN8plXfwy6bh3XO6daEc4uRLvueNmWRdpByTRi0GGnK97Q5i7TODu2+z47NRHO+x92ziZulXlfXVY6zF6Rdqyc26Pc9NmzmqWF3ddgmsFOk4eYUrcY5rCBx3iqx00/Hzei3m2Y+aNcsGu5eqKZgN00NV9XdCbvMt3wGvP3/f2s3y4SK+2slxzJ1naZfp275v+SUVMSuOrbM0/VrzFsPsqoi95R1bic5Qd0vmUjaz3FKRfIRpwUKj7N0/o/Zx0IrU1RywuLCaYmuo9WzekfUq++on60edbU2wQslf8O0A74wrcXiGbrwgxk1H2MPlOEHD2oEGLmiDe+5UnTINkMd3pNRdCm7SR3es6lpMbNOH16zrql/m4PM4A7KDtlv04i3bCvb0NqZoxMvmVN3vvaOUrzkTt2e9u4JrXjHya6+uxpT1OIdU6KQCr14RUXljc2FPprxhr4Fnbe2U1TjDSlRCl8CEf4C+MMh7bSfQ8Xnm/ov6afdXKp+ruJgkYbay+KB7jOO7AZEcQfgOct01E6WRT0sBaK5AGApEPEFwDOSNNUekkF52iVNV+0gHZznnXhWqA1MS4DYpC+32ZRAERuiMjcZCtybtms9tOYePTUJHPFBenOLwbgEkdMC1blB4VQCyhLPDLpAZkmCS65BgR+jkZNgk96ixNbZSkvgWcnSY6tkVyQMjI8m6NKexOi4hIVa+geF2vEjXZNQMcG2gM3CP4xv0oxt3NKsCbcbof2Fxdli5ZjnyJswd1wphv0Vqp3716V7qv6f+9L1fqdEhPhefb+Yv64kS10Rp5SsXOeL+/W9uAAAAAAAAAAAAAAAAAAAAAAAAAAAALTGb0YhGMbVc6cLAAAAAElFTkSuQmCC"
                alt=""
              />
            </template>
          </el-button>
        </div>
      </template>
    </div>
    <div class="code-lang">{{ activeName }}</div>
    <el-tabs v-model="activeName" @tab-click="handleClickTab" :class="lineNums ? 'line-numbers-mode' : ''">
      <el-tab-pane v-for="item in source" :label="item.name" :name="item.lang"></el-tab-pane>
    </el-tabs>
    <div ref="ContentRef" v-html="html" style="display: flex"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick, onMounted } from 'vue'
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

const activeName = ref(props.source[0].lang)

function handleClickTab() {
  nextTick(() => {
    setThemeToBody(activeName.value)
  })
}

function setThemeToBody(val) {
  if (props.theme === 'auto') {
    document.body.dataset.theme = val === 'vue' ? 'light' : 'dark'
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
  setThemeToBody(activeName.value)
  content.value = props.source.find((item) => item.lang === activeName.value)?.code || ''
  html.value = md.render(addStringToFirstAndLastLine(content.value, activeName.value))
})

onMounted(() => {
  handleClickTab() // 设置默认主题
  setCssVarToParent()
  showCopyBtn()
})

function setCssVarToParent() {
  if (!ContentRef.value || !CodeContainerRef.value) return
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
}

.line-numbers-wrapper {
  padding: 0.5em 1em 0.5em 0;
  border-right: 2px solid;
  text-align: center;
  margin-right: 1em;

  .line-number {
    color: #8e8e92;
    font-size: 0.875em;
    line-height: inherit;
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
