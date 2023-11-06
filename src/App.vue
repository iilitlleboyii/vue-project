<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
// 全局样式
import '@/assets/styles/index.scss'
import '@/assets/styles/element/dark.scss'

// 语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'

import useLocale from '@/hooks/useLocale'

const { currentLocale } = useLocale()

const locale = computed(() => (currentLocale.value === 'zh-CN' ? zhCn : enUS))
</script>

<style lang="scss" scoped></style>
