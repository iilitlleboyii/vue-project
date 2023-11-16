<template>
  <div class="flex items-center">
    <!-- 暗黑模式 -->
    <el-switch v-model="dark" inline-prompt active-icon="Moon" inactive-icon="Sunny" />
    <el-divider direction="vertical" />
    <!-- 国际化 -->
    <Locale></Locale>
    <el-divider direction="vertical" />
    <!-- 个人菜单 -->
    <Avatar />
  </div>
</template>

<script setup>
import Locale from './locale.vue'
import Avatar from './avatar.vue'
import { useDark } from '@vueuse/core'

const dark = useDark()
</script>
