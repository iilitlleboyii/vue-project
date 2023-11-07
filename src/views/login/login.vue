<template>
  <AppIndex>
    <el-tabs v-model="loginType">
      <el-tab-pane label="账号密码登录" name="0"> </el-tab-pane>
      <el-tab-pane label="手机号登录" name="1"> </el-tab-pane>
    </el-tabs>
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" @submit.prevent>
      <template v-if="loginType === '0'">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名:admin" size="large">
            <template #prefix>
              <i-ep-user color="#165dff" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码:123456"
            size="large"
            type="password"
            show-password
            @keyup.enter="onLoginFormClick"
          >
            <template #prefix><i-ep-lock color="#165dff" /></template
          ></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="loginForm.phoneNumber"
            placeholder="手机号"
            size="large"
            :maxlength="11"
          >
            <template #prefix><i-ep-iphone color="#165dff" /></template
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row justify="space-between" style="width: 100%">
            <el-input
              v-model="loginForm.code"
              placeholder="验证码"
              size="large"
              :maxlength="6"
              @keyup.enter="onLoginFormClick"
              style="width: 70%"
            >
              <template #prefix><i-ep-message color="#165dff" /></template
            ></el-input>
            <el-button size="large">获取验证码</el-button>
          </el-row>
        </el-form-item>
      </template>
      <el-form-item>
        <el-row justify="space-between" style="width: 100%">
          <el-checkbox v-model="rememberMe" label="记住密码" size="large" />
          <el-button type="primary" link>忘记密码</el-button>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          style="width: 100%"
          :loading="loading"
          @click="onLoginFormClick"
          >确 定</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-row justify="space-between" style="width: 100%">
          <div class="login-type-other">
            <span>其它登录方式</span>
            <div class="login-type-item">
              <i-icon-park-outline-wechat font-size="16" color="white" />
            </div>
          </div>
          <el-button type="primary" link @click="$router.replace('/register')">注册账户</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </AppIndex>
</template>

<script setup>
import AppIndex from './index.vue'
import { useUserStore } from '@/stores'

const loginFormRef = ref()

const loginType = ref('0')

const rememberMe = ref(!!JSON.parse(localStorage.getItem('IsRemember')))

const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  phoneNumber: '',
  code: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[\u4E00-\u9FA5a-zA-Z0-9@\-_\.]+$/,
      message: '请输入正确的用户名',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      pattern: /^\d{6}$/,
      message: '验证码为6位数字',
      trigger: 'blur'
    }
  ]
}

const $router = useRouter()
const $userStore = useUserStore()

const loginSuccess = () => {
  setTimeout(() => {
    localStorage.setItem('IsRemember', JSON.stringify(rememberMe.value))
    ElMessage.success('登录成功')
    $router.push('/home')
  }, 1500)
}

function onLoginFormClick() {
  if (!loginFormRef.value) return
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      if (loginType.value === '0') {
        $userStore
          .Login({ username: loginForm.username, password: loginForm.password })
          .then(() => {
            loginSuccess()
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        loginSuccess()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

.login-type-other {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.login-type-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #165dff;
  }
}
</style>
