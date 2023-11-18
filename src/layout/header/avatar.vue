<template>
  <el-dropdown trigger="click" @command="onCommand">
    <div class="flex items-center cursor-pointer">
      <el-avatar :src="avatarSrc" @error="onError">
        <i-ep:user />
      </el-avatar>
      <i-ep:caret-bottom />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="select-none">
        <template v-for="(item, index) in dropdownItems">
          <el-dropdown-item :command="item.command" :divided="index === dropdownItems.length - 1">
            <div class="center">
              <i-material-symbols:frame-person-outline v-if="item.command === 'profile'" />
              <i-icon-park-outline:theme v-if="item.command === 'theme'" />
              <i-material-symbols:logout v-if="item.command === 'logout'" />
              <span class="ml-2">{{ item.text }}</span>
            </div>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="open" :title="$t('remainder')" width="25%" append-to-body>
    <span>{{ $t('info_logout') }}</span>
    <template #footer>
      <span>
        <el-button @click="open = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useUserStore } from '@/stores/modules'
import useLocale from '@/hooks/useLocale'

const { t } = useLocale().i18n

const avatarSrc = new URL('@/assets/images/avatar.jpg', import.meta.url).href
const onError = () => ElMessage.error(t('fail_avatal'))

const dropdownItems = [
  {
    command: 'profile',
    text: t('profile')
  },
  {
    command: 'theme',
    text: t('theme')
  },
  {
    command: 'logout',
    text: t('logout')
  }
]
const onCommand = (command) => {
  switch (command) {
    case 'profile':
      ElMessage(`Click on item ${command}`)
      break
    case 'theme':
      ElMessage(`Click on item ${command}`)
      break
    case 'logout':
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
    ElMessage.success(t('success_logout'))
    $router.replace('/login')
  })
}
</script>
