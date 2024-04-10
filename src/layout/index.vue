<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <LogoTitle :is-collapse="isCollapse" icon-name="home" :title="$t('layout.backend')"></LogoTitle>
      <el-scrollbar>
        <el-menu :unique-opened="true" :default-active="$route.path" :collapse="isCollapse" :collapse-transition="false" class="h-full select-none">
          <MenuItem v-for="item in menuItems" :key="item.path" :item="item"></MenuItem>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <!-- 下阴影需要适配暗黑模式 -->
      <el-header class="flex items-center justify-between shadow-sm">
        <div class="flex items-center">
          <div @click="isCollapse = !isCollapse" class="cursor-pointer">
            <i-line-md:menu-fold-right font-size="6" v-if="isCollapse" />
            <i-line-md:menu-fold-left font-size="6" v-else />
          </div>
          <el-divider direction="vertical" />
          <BreadCrumb></BreadCrumb>
        </div>
        <Navigator></Navigator>
      </el-header>
      <Tabs></Tabs>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition enter-active-class="animate__animated animate__fadeInLeft">
            <keep-alive :include="cachedComponents">
              <component :is="Component" :key="$route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import LogoTitle from './aside/logo-title.vue'
import MenuItem from './aside/menu-item.vue'
import BreadCrumb from './header/bread-crumb.vue'
import Navigator from './header/navigator.vue'
import Tabs from './main/tabs.vue'
import { useMenuStore } from '@/stores/modules'

const isCollapse = ref(false)

const $route = useRoute()

const $menuStore = useMenuStore()

const cachedComponents = computed(() => $menuStore.getCachedRoutes)

const menuItems = computed(() => filterHidden($menuStore.menuList))

function isHidden(item) {
  if (item.hidden) {
    return true
  }
  if (item.children?.length) {
    item.children = item.children.filter((child) => !isHidden(child))
  }
  return false
}
function filterHidden(arr) {
  return arr.filter((item) => !isHidden(item))
}
</script>

<style lang="scss" scoped>
:deep(.el-aside .el-scrollbar) {
  height: calc(100vh - 50px);

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-menu {
  border-right: 0;
}

.el-header {
  --el-header-padding: 0 5px;
  --el-header-height: 50px;
}

.el-main {
  --el-main-padding: 0;
}
</style>
