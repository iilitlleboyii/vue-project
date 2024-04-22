<template>
  <div class="app-container">
    <div v-html="html"></div>
  </div>
</template>

<script setup name="Menu">
import { codeToHtml } from 'shiki'

const code = `<template>
<div>
<h1>hello word</h1>  
</div>  
</template>
`
const html = await codeToHtml(code, {
  lang: 'vue',
  theme: 'vitesse-dark'
})

console.log(html) // 带有高亮显示的 HTML 字符串
</script>

<style lang="scss" scoped></style>
