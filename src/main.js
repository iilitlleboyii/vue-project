import { createApp } from 'vue'

import App from './App.vue'
import pinia from './stores'
import router from './router'

// 全局样式
import '@/assets/styles/element/dark.scss'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'

// 路由守卫
import './permission'

// 国际化
import i18n from './locale'

// SVG图标
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
