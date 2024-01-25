import { createApp } from 'vue'

import App from './App.vue'
import pinia from './stores'
import router from './router'

// 全局样式
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import '@/assets/styles/element/dark.scss'

// 引入动画库
import 'animate.css'

// 注册指令
import truncate from '@/directives/common/truncate'

// 路由守卫
import './permission'

// 国际化
import i18n from './locales'

// SVG图标
import 'virtual:svg-icons-register'

// 右键菜单
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

// VXETable
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(contextmenu)
app.use(VXETable)

app.directive('truncate', truncate)

app.mount('#app')
