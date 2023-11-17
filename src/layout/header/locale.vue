<template>
  <el-dropdown trigger="hover" @command="onCommand">
    <i-ion-language font-size="5" />
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in dropdownItems">
          <el-dropdown-item :command="item.command">
            {{ item.text }}
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
    command: 'en-US',
    text: 'English'
  },
  {
    command: 'zh-CN',
    text: '简体中文'
  }
]

const onCommand = (command) => {
  if (currentLocale.value !== command) {
    setLocale(command)
  }
}
</script>

<style lang="scss" scoped>
.el-tooltip__trigger {
  outline: none;
}
</style>
