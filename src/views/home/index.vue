<template>
  <div class="app-container">
    <el-button @click="handleClick">download</el-button>
  </div>
</template>

<script setup name="Home">
import { downloadFile } from '@/api/common'

function handleClick() {
  downloadFile(null, 'test.docx').then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped></style>
