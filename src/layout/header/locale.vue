<template>
  <el-dropdown trigger="hover" @command="onCommand">
    <i-ion:language font-size="5" />
    <template #dropdown>
      <el-dropdown-menu class="select-none">
        <template v-for="item in dropdownItems">
          <el-dropdown-item :command="item.command">
            <div class="center">
              <i-flagpack:cn v-if="item.command === 'zh-CN'" />
              <i-flagpack:us v-else />
              <span class="ml-2">{{ item.text }}</span>
            </div>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import useLocale from '@/hooks/useLocale'

const { currentLocale, setLocale } = useLocale()

const dropdownItems = [
  {
    command: 'zh-CN',
    text: '简体中文'
  },
  {
    command: 'en-US',
    text: 'English'
  }
]

const onCommand = (command) => {
  if (currentLocale.value !== command) {
    setLocale(command)
    location.reload()
  }
}
</script>

<style lang="scss" scoped>
.el-tooltip__trigger {
  outline: none;
}
</style>
