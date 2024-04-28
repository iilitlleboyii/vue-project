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
    <div @click="switchTheme">
      <el-switch v-model="dark" :active-action-icon="Moon" :inactive-action-icon="Sunny" :before-change="beforeChangeTheme" />
    </div>
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

let resolveFn
const beforeChangeTheme = () => {
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}
const switchTheme = (event) => {
  const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    resolveFn(true)
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = document.startViewTransition(async () => {
    resolveFn(true)
    await nextTick()
  })
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      },
      {
        duration: 600,
        easing: 'ease-in-out',
        direction: dark.value ? 'reverse' : 'normal',
        pseudoElement: dark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-switch .el-switch__core .el-switch__action) {
  color: #606266;
}

:deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  color: #cfd3dc;
  background-color: #141414;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #2c2c2c;
  border-color: #48494b;
}
</style>
