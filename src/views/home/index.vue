<template>
  <div class="app-container">
    <el-button @click="handleDownload">下载文件</el-button>
    <el-button @click="handleExport">导出表格</el-button>
  </div>
</template>

<script setup name="Home">
import { downloadFile, exportExcel } from '@/api/common'

function handleDownload() {
  downloadFile(null, 'test.rar')
    .then((res) => {
      ElMessage.success('下载成功')
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}

function handleExport() {
  exportExcel('users.xlsx')
    .then((res) => {
      ElMessage.success('导出成功')
    })
    .catch((err) => {
      ElMessage.error(err)
    })
}
</script>

<style lang="scss" scoped></style>
