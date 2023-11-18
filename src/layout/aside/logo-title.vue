<template>
  <div class="flex items-center justify-around h-50px cursor-default bg-#0c193d select-none">
    <SvgIcon :name="iconName" size="30" color="white"></SvgIcon>
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
