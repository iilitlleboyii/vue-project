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
</template>

<script setup>
const avatarSrc = new URL('@/assets/images/avatar.jpg', import.meta.url).href
const onError = () => ElMessage.error('头像数据加载失败')

const open = ref(false)
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
</script>
