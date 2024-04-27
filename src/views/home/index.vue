<template>
  <div class="app-container">
    <div class="flex gap-10">
      <div>
        <el-button @click="handleDownload">下载文件</el-button>
        <el-button @click="handleExport">导出表格</el-button>
      </div>
      <AsyncTag style="width: 600px">
        <CodeContainer :source="source" theme="light"></CodeContainer>
      </AsyncTag>
    </div>
  </div>
</template>

<script setup name="Home">
import { downloadFile, exportExcel } from '@/api/common'
/* 代码内容 */
import vues from '@/assets/md/vue.md?raw'
import javas from '@/assets/md/java.md?raw'

const source = ref([
  {
    name: 'vue.vue',
    lang: 'vue',
    code: vues
  },
  {
    name: 'java.java',
    lang: 'java',
    code: javas
  }
])

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
