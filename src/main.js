import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

// 路由守卫
import './permission'

// 国际化
import i18n from './locale'

// SVG图标
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
