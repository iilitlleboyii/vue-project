<template>
  <div class="app-container">
    <CodeContainer :source="source"></CodeContainer>
  </div>
</template>

<script setup name="Menu">
/* 代码内容 */
import vues from '@/views/system/menu/vue.md?raw'
import javas from '@/views/system/menu/java.md?raw'

const source = [
  {
    name: 'vue',
    code: vues
  },
  {
    name: 'java',
    code: javas
  }
]
</script>

<style lang="scss" scoped></style>
