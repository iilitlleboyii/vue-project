<template>
  <MenuLink v-if="!item.children" :item="item" />
  <MenuLink v-else-if="item.children.length === 1" :item="item.children[0]" />
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon>
        <i-material-symbols:lists-rounded />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
</template>

<script setup>
import MenuLink from './menu-link.vue'

defineProps(['item'])
</script>
