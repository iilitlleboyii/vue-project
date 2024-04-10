<template>
  <div class="app-container">
    <el-button @click="handleClick">download</el-button>
  </div>
</template>

<script setup name="Home">
import { downloadFile } from '@/api/common'

function handleClick() {
  downloadFile(null, '新建文本文档.7z')
    .then((res) => {
      ElMessage.success('下载成功')
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
</script>

<style lang="scss" scoped></style>
