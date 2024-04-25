<template>
  <div class="flex flex-col items-center justify-evenly p-6">
    <div class="w-75 flex flex-col items-center gap-6">
      <div>国际化:{{ locale ? 'English' : '中文' }}</div>
      <el-button @click="onChangeLocale">{{ locale ? '中文' : '英文' }}</el-button>
      <div>Message:{{ $t('hello') }}</div>
      <el-divider />
    </div>
    <div class="w-75 flex flex-col items-center gap-6">
      <div>暗黑模式:{{ dark ? '开' : '关' }}</div>
      <el-switch v-model="dark" inline-prompt active-icon="Moon" inactive-icon="Sunny" />
      <el-divider />
    </div>
    <div class="w-75 flex flex-col items-center gap-6">
      <el-input v-model="input" @blur="onInputBlur" class="w-60" />
      <el-divider />
    </div>
    <div class="w-75 flex flex-col items-center gap-6">
      <div>全屏开关:{{ isFullscreen ? '开' : '关' }}</div>
      <el-button @click="onChangeFullScreen">{{ isFullscreen ? '退出全屏' : '开启全屏' }}</el-button>
      <el-divider />
    </div>
    <div class="w-75 flex flex-col items-center gap-6">
      <div>
        <SvgIcon name="home" color="black" size="42"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import useLocale from '@/hooks/useLocale'
import { useDark, useFullscreen } from '@vueuse/core'
import { getUserList } from '@/api/common'

const { setLocale } = useLocale()
const locale = ref(false)

function onChangeLocale() {
  locale.value = !locale.value
  setLocale(locale.value ? 'en-US' : 'zh-CN')
}

const dark = useDark()

const input = ref('')

function onInputBlur() {
  if (input.value) ElMessage(`输入内容:${input.value}`)
}

const { isSupported, isFullscreen, toggle } = useFullscreen()

function onChangeFullScreen() {
  if (isSupported.value) {
    toggle()
  }
}

onMounted(async () => {
  const res = await getUserList()
  if (res) {
    console.log('userList =>', res)
  }
})
</script>
