<template>
  <div class="flex items-center justify-around h-15 cursor-default bg-blueGray select-none">
    <SvgIcon :name="iconName" color="black" size="42"></SvgIcon>
    <span v-show="!isCollapse" class="text-black">{{ title }}</span>
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
