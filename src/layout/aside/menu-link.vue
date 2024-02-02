<template>
  <component :is="item.external ? 'a' : 'router-link'" v-bind="linkProps()">
    <el-menu-item :index="item.path">
      <el-icon>
        <i-healthicons:ui-menu-grid />
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </component>
</template>

<script setup>
const props = defineProps(['item'])

const linkProps = () => {
  if (props.item.external) {
    return {
      href: props.item.path,
      target: '_blank',
      rel: 'external'
    }
  }
  return {
    to: props.item.path
  }
}
</script>
