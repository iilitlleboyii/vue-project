<template>
  <div class="flex items-center justify-around h-15 cursor-default bg-#0c193d select-none">
    <SvgIcon :name="iconName" size="36"></SvgIcon>
    <span v-show="!isCollapse" class="text-white">{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  },
  title: {
    type: String
  },
  iconName: {
    type: String
  }
})
</script>
