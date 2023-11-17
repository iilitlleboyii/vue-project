<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
// 语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'

import useLocale from '@/hooks/useLocale'

const { currentLocale } = useLocale()

const locale = computed(() => (currentLocale.value === 'zh-CN' ? zhCn : enUS))
</script>

<style lang="scss">
:root {
  --animate-duration: 500ms !important;
  // --animate-delay: 1s;
}

body {
  font-family: 'HarmonyOS_Sans', sans-serif;
}
/* 设置全局字体样式为鸿蒙字体 */
@font-face {
  font-family: 'HarmonyOS_Sans';
  src: url('./assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'HarmonyOS_Sans';
  src: url('./assets/fonts/HarmonyOS_Sans_SC_Bold.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: 'HarmonyOS_Sans_Black';
  src: url('./assets/fonts/HarmonyOS_Sans_SC_Black.ttf') format('truetype');
}
</style>
