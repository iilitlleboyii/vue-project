<template>
  <el-dropdown trigger="click" @command="onCommand">
    <div class="flex items-center cursor-pointer">
      <el-avatar :src="avatarSrc" @error="onError">
        <i-ep-user />
      </el-avatar>
      <i-ep-caret-bottom />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="(item, index) in dropdownItems">
          <el-dropdown-item :command="item.command" :divided="index === dropdownItems.length - 1">
            {{ item.text }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="open" title="注销提醒" width="25%" append-to-body>
    <span>是否确认注销登录？记得先保存好重要的数据哦！</span>
    <template #footer>
      <span>
        <el-button @click="open = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useUserStore } from '@/stores/modules'

const avatarSrc = new URL('@/assets/images/avatar.jpg', import.meta.url).href
const onError = () => ElMessage.error('头像数据加载失败')

const dropdownItems = [
  {
    command: 'PersonalInfo',
    text: '个人信息'
  },
  {
    command: 'ThemeSettings',
    text: '主题设置'
  },
  {
    command: 'LogOut',
    text: '注销登录'
  }
]
const onCommand = (command) => {
  switch (command) {
    case 'PersonalInfo':
      ElMessage(`Click on item ${command}`)
      break
    case 'ThemeSettings':
      ElMessage(`Click on item ${command}`)
      break
    case 'LogOut':
      open.value = true
      break
  }
}

const open = ref(false)
const $userStore = useUserStore()
const $router = useRouter()
const onConfirm = () => {
  $userStore.Logout().then(() => {
    open.value = false
    ElMessage.success('注销成功')
    $router.replace('/login')
  })
}
</script>
