<template>
  <div class="w-150">
    <!-- 拖拽区 -->
    <el-upload
      v-model:file-list="fileList"
      :drag="true"
      :multiple="true"
      :auto-upload="false"
      :show-file-list="false"
      :accept="mime.join(',')"
      :http-request="() => {}"
      :on-change="handleChange"
      class="w-full"
    >
      <div class="flex flex-col items-center">
        <i-ep:upload-filled font-size="12" />
        <el-text type="primary">点击或拖拽上传文件</el-text>
      </div>
      <el-text>文件类型仅限jpeg/png，大小不得超过500kb</el-text>
    </el-upload>
    <!-- 按钮栏 -->
    <el-row justify="space-between" class="w-full my-3">
      <div>
        <input id="select-file" type="file" multiple @change="onFileChange" class="hidden" />
        <input
          id="select-dir"
          type="file"
          multiple
          webkitdirectory
          mozdirectory
          odirectory
          @change="onDirChange"
          class="hidden"
        />
        <el-button type="primary" plain @click="onSelectFile">选择文件</el-button>
        <el-button type="primary" plain @click="onSelectDir">选择目录</el-button>
      </div>
      <div>
        <el-button type="success" plain @click="onUpload">开始上传</el-button>
        <el-button type="warning" plain @click="onClear">清空列表</el-button>
        <el-button type="primary" plain @click="onAgain">重新上传</el-button>
      </div>
    </el-row>
    <!-- 文件上传列表-->
    <el-table :data="fileList" :height="400" border class="w-full">
      <el-table-column
        prop="name"
        label="文件名"
        align="center"
        show-overflow-tooltip
        :formatter="(row, column, cellValue, index) => cellValue.split('.')[0]"
      />
      <el-table-column
        prop="name"
        label="类型"
        align="center"
        width="60"
        :formatter="(row, column, cellValue, index) => cellValue.split('.')[1]"
      />
      <el-table-column prop="size" label="大小" align="center" width="90" />
      <el-table-column prop="status" label="状态" align="center" width="90">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'ready'" type="info" disable-transitions
            >待上传</el-tag
          >
          <el-tag v-else-if="scope.row.status === 'uploading'" disable-transitions>上传中</el-tag>
          <el-tag v-else-if="scope.row.status === 'success'" type="success" disable-transitions
            >已上传</el-tag
          >
          <el-tag v-else-if="scope.row.status === 'canceled'" type="danger" disable-transitions
            >已取消</el-tag
          >
          <el-tag v-else type="warning" disable-transitions>已失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="percentage" label="进度" align="center" width="150">
        <template #default="scope">
          <el-progress
            :percentage="scope.row.percentage"
            :status="formatProgress(scope.row.status)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template #default="scope">
          <el-row justify="space-between">
            <el-button
              type="danger"
              link
              size="small"
              :disabled="scope.row.status !== 'ready'"
              @click="removeFile(scope.row.name)"
              >移除</el-button
            >
            <el-button
              type="warning"
              link
              size="small"
              :disabled="scope.row.status !== 'uploading'"
              @click="cancelUpload(scope.row)"
              >取消</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 文件上传详情 -->
    <el-row justify="space-between" class="w-full my-3">
      <el-tag type="info" disable-transitions>文件数量：{{ fileNums }}</el-tag>
      <el-tag type="info" disable-transitions>文件大小：{{ totalSize }}</el-tag>
      <el-tag type="success" disable-transitions>已上传：{{ uploadedNums }}</el-tag>
      <el-tag type="danger" disable-transitions>已失败：{{ failedNums }}</el-tag>
      <el-tag type="warning" disable-transitions>已取消：{{ cancelNums }}</el-tag>
    </el-row>
  </div>
</template>

<script setup>
import { storageKeys, getItem } from '@/utils/auth'

// 文件类型限制
const mime = ['image/jpeg', 'image/png']
// 文件大小限制
const limit = 1024 * 500
// 文件列表
const fileList = ref([])
// 文件数量
const fileNums = computed(() => fileList.value.length)
// 上传总大小
const totalSize = computed(() =>
  fileList.value.map((item) => item.size).reduce((total, curr) => total + curr, 0)
)
// 已上传数量
const uploadedNums = computed(
  () => fileList.value.filter((item) => item.status === 'success').length
)
// 已失败数量
const failedNums = computed(() => fileList.value.filter((item) => item.status === 'failed').length)
// 已取消数量
const cancelNums = computed(
  () => fileList.value.filter((item) => item.status === 'canceled').length
)
// 格式化进度条
const formatProgress = (status) => {
  let progress = ''
  if (status === 'success') {
    progress = 'success'
  } else if (status === 'failed') {
    progress = 'exception'
  } else if (status === 'canceled') {
    progress = 'warning'
  }
  return progress
}

/**
 * 选择文件
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onSelectFile() {
  const fileElem = document.getElementById('select-file')
  if (fileElem) {
    fileElem.click()
  }
}

/**
 * 选择目录
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onSelectDir() {
  const fileElem = document.getElementById('select-dir')
  if (fileElem) {
    fileElem.click()
  }
}

/**
 * 手动选择文件处理
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onFileChange() {
  const fileElem = document.getElementById('select-file')
  if (fileElem) {
    const files = Array.from(fileElem.files)
      .map((raw) => {
        const uid = Date.now()
        raw.uid = uid
        return {
          name: raw.name,
          percentage: 0,
          size: raw.size,
          status: 'ready',
          uid: uid,
          raw: raw
        }
      })
      .filter((file) => {
        const isExist = fileList.value.some((item) => item.name === file.name)
        return mime.includes(file.raw.type) && file.size <= limit && !isExist
      })
    fileList.value = fileList.value.concat(files)
    // 每次选择文件后，清空选择框
    fileElem.value = null
  }
}

/**
 * 手动选择目录处理
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onDirChange() {
  const fileElem = document.getElementById('select-dir')
  if (fileElem) {
    const files = Array.from(fileElem.files)
      .map((raw) => {
        const uid = Date.now()
        raw.uid = uid
        return {
          name: raw.name,
          percentage: 0,
          size: raw.size,
          status: 'ready',
          uid: uid,
          raw: raw
        }
      })
      .filter((file) => {
        const isExist = fileList.value.some((item) => item.name === file.name)
        return mime.includes(file.raw.type) && file.size <= limit && !isExist
      })
    fileList.value = fileList.value.concat(files)
    // 每次选择文件后，清空选择框
    fileElem.value = null
  }
}

/**
 * 自带上传文件列表处理，注意这里一定要异步处理
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @param {any} file
 * @returns {any}
 */
async function handleChange(file) {
  const isExist = fileList.value.some((item) => item.name === file.name)
  await nextTick()
  // 如果已存在，则记录的是首个下标，否则是最新重复的下标
  const index = fileList.value.findLastIndex((item) => item.name === file.name)
  // 已存在的、文件格式不符合的、文件大小超过限制的文件不上传
  const flag = !mime.includes(file.raw.type) || file.size > limit || isExist
  if (flag) {
    fileList.value.splice(index, 1)
  }
}

/**
 * 移除文件
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @param {any} name
 * @returns {any}
 */
function removeFile(name) {
  fileList.value = fileList.value.filter((file) => file.name !== name)
}

/**
 * 取消上传
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @param {any} file
 * @returns {any}
 */
function cancelUpload(file) {
  if (file.abort && typeof file.abort === 'function') {
    file.abort()
    file.status = 'canceled'
  }
}

/**
 * 清空文件上传列表
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onClear() {
  fileList.value = []
}

/**
 * 重新上传失败的文件
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onAgain() {
  const failedFile = fileList.value.filter((item) => item.status === 'failed')
  if (failedFile.length <= 0) return
  const url = 'http://127.0.0.1:8000/upload/'
  const access = getItem(storageKeys.access)
  for (const file of failedFile) {
    file.abort = uploadFile(file, url, access)
  }
}

/**
 * 开始文件上传
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @returns {any}
 */
function onUpload() {
  const readyFile = fileList.value.filter((item) => item.status === 'ready')
  if (readyFile.length <= 0) return
  // 采用分别上传的方式
  const url = 'http://127.0.0.1:8000/upload/'
  const access = getItem(storageKeys.access)
  for (const file of readyFile) {
    file.abort = uploadFile(file, url, access)
  }
}

/**
 * 发送文件上传请求
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-19
 * @param {any} file 文件子项
 * @param {any} url 请求地址
 * @param {any} access 访问令牌
 * @returns {any}
 */
function uploadFile(file, url, access) {
  const xhr = new XMLHttpRequest()
  // 设置请求方法和请求地址
  xhr.open('POST', url)
  // 设置请求头
  xhr.setRequestHeader('Content-Type', 'multipart/form-data')
  xhr.setRequestHeader('Authorization', 'Bearer ' + access)
  // 处理请求响应
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      file.status = 'success'
      // console.log('请求结果:', JSON.parse(xhr.responseText))
    } else {
      file.status = 'failed'
      ElMessage.error(
        '文件' +
          file.name +
          '上传失败，' +
          '错误状态码:' +
          xhr.status +
          '，错误描述:' +
          xhr.statusText
      )
    }
  }
  // 监控上传请求进度
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percentage = Math.floor((e.loaded / e.total) * 100)
      file.percentage = percentage
    }
  }
  // 发送上传请求
  const formData = new FormData()
  formData.append('file', file.raw)
  xhr.send(formData)
  file.status = 'uploading'
  // 返回取消上传方法
  return () => xhr.abort()
}
</script>

<style lang="scss" scoped>
:deep(.el-progress__text) {
  min-width: unset;
}
</style>
