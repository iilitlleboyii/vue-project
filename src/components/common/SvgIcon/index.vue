<template>
  <svg class="use-svg" aria-hidden="true" :style="{ fontSize }">
    <use :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: [String, Number],
    default: 24
  }
})

const symbolId = computed(() => `#icon-${props.name}`)

const fontSize = computed(() => `${props.size}px`)
</script>

<style lang="scss">
.use-svg {
  width: 1em;
  height: 1em;
}
</style>
