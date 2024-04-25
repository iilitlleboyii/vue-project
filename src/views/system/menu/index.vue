<template>
  <div class="app-container">
    <AsyncTag :width="600" :height="600">
      <CodeContainer :source="source"></CodeContainer>
    </AsyncTag>
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
