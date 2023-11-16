<template>
  <el-container class="w-screen h-screen overflow-hidden bg-#eff6fc">
    <el-aside>
      <el-scrollbar>
        <el-menu
          :unique-opened="true"
          :default-active="$route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <MenuItem v-for="item in menuItems" :key="item.path" :item="item"></MenuItem>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header> </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition :enter-active-class="`animate__animated animate__fadeInLeft`">
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
import MenuItem from './aside/menu-item.vue'
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

<style lang="scss" scoped></style>
