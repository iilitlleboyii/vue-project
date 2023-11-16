<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-aside>
      <LogoTitle :is-collapse="isCollapse" icon-name="home" title="后台管理系统"></LogoTitle>
      <el-scrollbar>
        <el-menu
          :unique-opened="true"
          :default-active="$route.path"
          :collapse="isCollapse"
          :collapse-transition="true"
          class="h-full"
        >
          <MenuItem v-for="item in menuItems" :key="item.path" :item="item"></MenuItem>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="flex items-center justify-between">
        <div class="flex items-center">
          <el-divider direction="vertical" />
          <BreadCrumb></BreadCrumb>
        </div>
        <Navigator></Navigator>
      </el-header>
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
import { useMenuStore } from '@/stores/modules'

const isCollapse = ref(false)

const $route = useRoute()

const $menuStore = useMenuStore()

const cachedComponents = computed(() => [])

const menuItems = computed(() => filterHidden($menuStore.menuList))

function filterHidden(arr) {
  const stack = [...arr]
  while (stack.length) {
    const item = stack.pop()
    if (item) {
      if (item.hidden) {
        if (item.children?.length) {
          item.children = item.children.filter((child) => !child.hidden)
        }
      } else if (item.children?.length) {
        item.children.forEach((child) => stack.push(child))
      }
    }
  }
  return arr.filter((item) => !item.hidden)
}
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar) {
  height: calc(100vh - 3.75rem);

  .el-scrollbar__view {
    height: 100%;
  }
}

.el-menu {
  --el-menu-bg-color: #bfa;
  --el-menu-hover-bg-color: gray;
  --el-menu-text-color: black;
  --el-menu-active-color: blue;
}
</style>
