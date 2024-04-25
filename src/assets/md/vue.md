<template>
  <div class="login-page w-screen min-w-106 min-h-screen px-0 py-27.5 relative flex flex-col items-center bg-cover bg-no-repeat">
    <div>
      <el-row justify="center" align="middle">
        <img src="@/assets/images/logo.svg" class="w-11 h-11 mr-4" />
        <span class="text-8 font-bold">Admin Pro</span>
      </el-row>
      <div class="mt-3 mb-10">
        <el-text type="info">Ant Design 是西湖区最具影响力的 Web 设计规范</el-text>
      </div>
    </div>
    <div class="w-100">
      <slot name="default"></slot>
    </div>
    <div class="w-75 absolute bottom-5">
      <el-row justify="space-evenly">
        <el-link :underline="false"><el-text type="info">帮助</el-text></el-link>
        <el-link :underline="false"><el-text type="info">隐私</el-text></el-link>
        <el-link :underline="false"><el-text type="info">条款</el-text></el-link>
      </el-row>
      <br />
      <el-row justify="center">
        <el-text type="info">Copyright © 2020 杭州上树科技有限公司</el-text>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-image: url('@/assets/images/background.svg');
}
</style>
