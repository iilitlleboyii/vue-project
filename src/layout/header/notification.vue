<template>
  <el-badge :value="msgNum" class="mx-2 cursor-pointer">
    <i-ep-bell />
  </el-badge>
</template>

<script setup>
const msgNum = ref('9')
</script>
