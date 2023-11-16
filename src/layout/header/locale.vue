<template>
  <el-dropdown trigger="click" @command="onCommand">
    <SvgIcon name="international" size="30"></SvgIcon>
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
  }
}
</script>

<style lang="scss" scoped>
.el-tooltip__trigger {
  outline: none;
}
</style>
