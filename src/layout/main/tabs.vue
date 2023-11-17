<template>
  <el-tabs v-model="activeRoute" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
    <template v-for="route in loadedRoutes">
      <el-tab-pane :name="route.name" :closable="route.name !== 'Home'">
        <template #label>
          <i-material-symbols-skateboarding-outline
            font-size="3"
            v-show="route.name === activeRoute"
            class="pb-0.5"
          />
          <span class="select-none">{{ route.title }}</span>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup>
import { useMenuStore } from '@/stores/modules'

const $route = useRoute()
const $router = useRouter()

const $menuStore = useMenuStore()
const { activeRoute, loadedRoutes } = storeToRefs($menuStore)

watch(
  $route,
  (newValue) => {
    activeRoute.value = newValue.name
    if (loadedRoutes.value.some((route) => route.name === newValue.name)) return
    loadedRoutes.value.push({
      name: newValue.name,
      title: newValue.meta.title
    })
  },
  {
    immediate: true
  }
)

const tabClick = (tab) => {
  $router.replace({ name: tab.paneName })
}

const tabRemove = (name) => {
  if (name === activeRoute.value) {
    loadedRoutes.value.forEach((route, index) => {
      if (route.name === name) {
        const nextRoute = loadedRoutes.value[index + 1] || loadedRoutes.value[index - 1]
        if (nextRoute) {
          $router.replace({ name: nextRoute.name })
        }
      }
    })
  }
  loadedRoutes.value = loadedRoutes.value.filter((route) => route.name !== name)
}
</script>

<style lang="scss" scoped>
.el-tabs {
  --el-tabs-header-height: 30px;
  // X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色
  box-shadow: 0 1px 5px 0 rgba(149, 157, 165, 0.2);

  :deep(.el-tabs__nav) {
    gap: 10px;
  }

  :deep(.el-tabs__item) {
    padding: 0 10px !important;

    &.is-active {
      padding: 0 10px !important;
    }
  }

  :deep(.el-tabs__header) {
    --el-border-color-light: transparent;
    // border-bottom: 1px solid var(--el-border-color-light);

    .el-tabs__nav {
      // border: 1px solid var(--el-border-color-light);
      // border-radius: 4px 4px 0 0;
      border-radius: 0;
    }

    .el-tabs__item {
      // border-bottom: 1px solid transparent;
      // border-left: 1px solid var(--el-border-color-light);
      border: 1px solid rgba($color: gray, $alpha: 0.2);
    }
  }
}
</style>
