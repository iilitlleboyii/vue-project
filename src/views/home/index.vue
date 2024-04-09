<template>
  <div class="app-container">
    <el-button @click="handleClick">download</el-button>
  </div>
</template>

<script setup name="Home">
import { downloadFile } from '@/api/common'

function handleClick() {
  downloadFile(null, 'users.xlsx').then((res) => {
    ElMessage.success('下载成功')
  })
}
</script>

<style lang="scss" scoped></style>
