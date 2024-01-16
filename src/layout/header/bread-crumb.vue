<template>
  <el-breadcrumb separator="/" class="select-none">
    <el-breadcrumb-item :to="{ path: '/' }">{{ $t('layout.routes.home') }}</el-breadcrumb-item>
    <template v-for="route in matchedArr">
      <el-breadcrumb-item v-if="route.meta.breadCrumb" :to="{ path: route.path }">
        {{ route.meta.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{ route.meta.title }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup>
const $route = useRoute()

const matchedArr = computed(() => {
  if ($route.matched[0].path === '/') {
    return []
  }
  return $route.matched
})
</script>
