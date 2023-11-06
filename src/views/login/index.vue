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
      <el-tabs v-model="loginType" style="width: 400px">
        <el-tab-pane label="账号密码登录" name="0">
          <el-form :model="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.username" placeholder="用户名" size="large">
                <template #prefix>
                  <i-ep-user color="#165dff" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.password" placeholder="密码" size="large">
                <template #prefix> <i-ep-lock color="#165dff" /></template
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="1">
          <el-form :model="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.phoneNumber" placeholder="手机号" size="large">
                <template #prefix> <i-ep-iphone color="#165dff" /></template
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-row justify="space-between" style="width: 100%">
                <el-col :span="17">
                  <el-input v-model="loginForm.code" placeholder="验证码" size="large">
                    <template #prefix> <i-ep-message color="#165dff" /></template
                  ></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button size="large">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
const loginType = ref('0')

const loginForm = reactive({
  username: '',
  password: '',
  phoneNumber: '',
  code: ''
})
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

.login-page {
  position: fixed;
  width: 100%;
  height: 100%;
  // background-image: url('@/assets/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 110px 0 144px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

:deep(.el-button--large) {
  padding: 12px 14px;
}
</style>
