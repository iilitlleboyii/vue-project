<template>
  <component :is="item.meta.isExternalLink ? 'a' : 'router-link'" v-bind="linkProps()">
    <el-menu-item :index="item.path">
      <!-- <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon> -->
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </component>
</template>

<script setup>
const props = defineProps(['item'])

const linkProps = () => {
  if (props.item.meta.isExternalLink) {
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
