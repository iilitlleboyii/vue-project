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

  // 菜单色调设置
  --el-menu-bg-color: #0c193d !important;
  --el-menu-hover-bg-color: #152f70 !important;
  --el-menu-text-color: #fff !important;
  --el-menu-active-color: #165dff !important;
  .el-sub-menu .el-menu {
    --el-menu-bg-color: #08122b !important;
  }
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

// 设置表单标题字体加粗
.el-form {
  .el-form-item__label {
    font-weight: bold;
  }
}

// 引入Unocss后引起的小问题
.el-icon {
  &.el-cascader-node__prefix {
    position: absolute;
  }
  &.el-cascader-node__postfix {
    position: absolute;
  }
}

// // 遮罩背景虚化效果
// .el-overlay {
//   background-color: transparent;
//   -webkit-backdrop-filter: blur(3px);
//   backdrop-filter: blur(3px);
// }
</style>
