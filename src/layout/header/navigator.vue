<template>
  <div class="flex items-center">
    <!-- 个人菜单 -->
    <Avatar />
    <el-divider direction="vertical" />
    <!-- 消息通知 -->
    <Notification></Notification>
    <el-divider direction="vertical" />
    <!-- 国际化 -->
    <Locale></Locale>
    <el-divider direction="vertical" />
    <!-- 全屏 -->
    <div class="cursor-pointer" @click="toggle">
      <i-material-symbols-light:fullscreen-exit font-size="6" v-if="isFullscreen" />
      <i-material-symbols-light:fullscreen font-size="6" v-else />
    </div>
    <el-divider direction="vertical" />
    <!-- 暗黑模式 -->
    <el-switch v-model="dark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" size="large" />
  </div>
</template>

<script setup>
import Locale from './locale.vue'
import Avatar from './avatar.vue'
import Notification from './notification.vue'
import { useDark, useFullscreen } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const dark = useDark()

const { isFullscreen, toggle } = useFullscreen()
</script>
