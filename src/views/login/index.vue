<template>
  <div class="login-page">
    <div class="header">
      <div class="logo-title">
        <img src="@/assets/images/logo.svg" class="logo" />
        <span class="title">Admin Pro</span>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="main">
      <slot name="default"></slot>
    </div>
    <div class="footer">
      <el-row justify="space-evenly">
        <el-link>帮助</el-link>
        <el-link>隐私</el-link>
        <el-link>条款</el-link>
      </el-row>
      <br />
      <el-row justify="center">
        <span class="info">Copyright © 2020 杭州上树科技有限公司</span>
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
  .logo-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 44px;
      height: 44px;
      margin-right: 16px;
    }
    .title {
      color: black;
      font-size: 33px;
      font-weight: 600;
    }
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
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
  .info {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
