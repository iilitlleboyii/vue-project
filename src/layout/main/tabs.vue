<template>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item @click="onRefreshCurrent">
      <div class="flex items-center">
        <i-material-symbols:refresh /><span class="ml-2">{{ $t('layout.tab.refresh') }}</span>
      </div></v-contextmenu-item
    >
    <v-contextmenu-item @click="onCloseOther"
      ><div class="flex items-center">
        <i-material-symbols:close /><span class="ml-2">{{ $t('layout.tab.others') }}</span>
      </div></v-contextmenu-item
    >
    <v-contextmenu-item @click="onCloseLeft"
      ><div class="flex items-center">
        <i-icon-park-outline:to-left /><span class="ml-2">{{ $t('layout.tab.left') }}</span>
      </div></v-contextmenu-item
    >
    <v-contextmenu-item @click="onCloseRight"
      ><div class="flex items-center">
        <i-icon-park-outline:to-right /><span class="ml-2">{{ $t('layout.tab.right') }}</span>
      </div></v-contextmenu-item
    >
    <v-contextmenu-item @click="onCloseAll"
      ><div class="flex items-center">
        <i-icon-park-outline:clear /><span class="ml-2">{{ $t('layout.tab.all') }}</span>
      </div></v-contextmenu-item
    >
  </v-contextmenu>
  <el-tabs v-model="activeRoute" type="card" @tab-click="tabClick" @tab-remove="tabRemove" @contextmenu.prevent class="w-full">
    <template v-for="route in loadedRoutes">
      <el-tab-pane :name="route.name" :closable="route.name !== 'Home'">
        <template #label>
          <div class="center h-full" v-contextmenu:contextmenu @contextmenu.prevent="triggerRoute = route">
            <i-material-symbols:skateboarding-outline font-size="3" v-show="route.name === activeRoute" />
            <span class="select-none">{{ route.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup>
import { useMenuStore } from '@/stores/modules'
import { nextTick } from 'vue'

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

// 右键菜单响应
const triggerRoute = ref(null)

const onRefreshCurrent = async () => {
  const triggerName = triggerRoute.value.name
  const activeName = $route.name
  if (triggerName === activeName) {
    $router.replace({ name: 'Blank' })
    await nextTick()
    $router.replace({ name: triggerName })
  } else {
    $router.replace({ name: triggerName })
  }
}
const onCloseOther = async () => {
  const triggerName = triggerRoute.value.name
  const activeName = $route.name
  loadedRoutes.value = loadedRoutes.value.filter((route) => route.name === triggerName || route.name === 'Home')
  if (triggerName !== activeName) {
    $router.replace({ name: triggerName })
  }
}
const onCloseLeft = async () => {
  const triggerName = triggerRoute.value.name
  const activeName = $route.name
  const triggerIndex = loadedRoutes.value.findIndex((route) => route.name === triggerName)
  loadedRoutes.value = loadedRoutes.value.filter((route, index) => route.name === triggerName || route.name === 'Home' || index > triggerIndex)
  if (triggerName !== activeName) {
    $router.replace({ name: triggerName })
  }
}
const onCloseRight = async () => {
  const triggerName = triggerRoute.value.name
  const activeName = $route.name
  const triggerIndex = loadedRoutes.value.findIndex((route) => route.name === triggerName)
  loadedRoutes.value = loadedRoutes.value.filter((route, index) => route.name === triggerName || route.name === 'Home' || index < triggerIndex)
  if (triggerName !== activeName) {
    $router.replace({ name: triggerName })
  }
}
const onCloseAll = async () => {
  loadedRoutes.value = loadedRoutes.value.filter((route) => route.name === 'Home')
  $router.replace({ name: 'Home' })
}
</script>

<style lang="scss" scoped>
.el-tabs {
  --el-tabs-header-height: 30px;
  // X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色
  // 需要适配暗黑模式
  box-shadow: 0 2px 6px 0 rgba(149, 157, 165, 0.2);
  // border-bottom: 1px solid rgba($color: gray, $alpha: 0.2);

  :deep(.el-tabs__nav) {
    gap: 5px;
    padding: 5px;
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
    margin: 0 0 10px;
    .el-tabs__nav {
      // border: 1px solid var(--el-border-color-light);
      // border-radius: 4px 4px 0 0;
      border-radius: 0;
    }

    .el-tabs__item {
      // border-bottom: 1px solid transparent;
      // border-left: 1px solid var(--el-border-color-light);
      border: 1px solid rgba($color: gray, $alpha: 0.2);
      // border-radius: 4px;
      // box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
  }
}
</style>
