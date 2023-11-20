<template>
  <div class="center">
    <template v-if="type === 'default'">
      <i-healthicons:yes color="#52c41a" v-if="value" />
      <i-healthicons:no color="#f5222d" v-else />
    </template>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'default'
  }
})
</script>
