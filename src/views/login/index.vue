<template>
  <div class="login-page">
    <div class="header">
      <el-row justify="center" align="middle">
        <img src="@/assets/images/logo.svg" class="logo" />
        <span class="title">Admin Pro</span>
      </el-row>
      <div class="desc">
        <el-text type="info">Ant Design 是西湖区最具影响力的 Web 设计规范</el-text>
      </div>
    </div>
    <div class="main">
      <slot name="default"></slot>
    </div>
    <div class="footer">
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

<script setup></script>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  min-width: 425px;
  min-height: 100vh;
  background-image: url('@/assets/images/background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 110px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.header {
  .logo {
    width: 44px;
    height: 44px;
    margin-right: 16px;
  }
  .title {
    font-size: 33px;
    font-weight: 600;
  }
  .desc {
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
.main {
  width: 400px;
}
.footer {
  width: 300px;
  bottom: 20px;
  position: absolute;
}
</style>
