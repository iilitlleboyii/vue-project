<template>
  <AppIndex>
    <div style="width: 100%; text-align: center">账户注册</div>
    <br />
    <el-form :model="registerForm" :rules="rules" ref="registerFormRef" @submit.prevent>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" placeholder="邮箱" size="large" />
      </el-form-item>
      <el-form-item prop="password1">
        <el-input
          v-model="registerForm.password1"
          placeholder="至少6位密码，区分大小写"
          size="large"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          v-model="registerForm.password2"
          placeholder="确认密码"
          size="large"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="phoneNumber">
        <el-input
          v-model="registerForm.phoneNumber"
          placeholder="手机号"
          size="large"
          :maxlength="11"
        >
          <template #prepend>
            <el-select v-model="select" size="large" style="width: 80px">
              <el-option label="+86" value="1" />
              <el-option label="+87" value="2" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row justify="space-between" style="width: 100%">
          <el-input
            v-model="registerForm.code"
            placeholder="验证码"
            size="large"
            :maxlength="6"
            @keyup.enter="onRegisterFormClick"
            style="width: 70%"
          />
          <el-button size="large">获取验证码</el-button>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row justify="space-between" style="width: 100%">
          <el-button
            type="primary"
            size="large"
            style="width: 50%"
            :loading="loading"
            @click="onRegisterFormClick"
            >注 册</el-button
          >
          <el-button type="primary" link @click="$router.replace('/')">使用已有账户登录</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </AppIndex>
</template>

<script setup>
import AppIndex from './index.vue'

const registerFormRef = ref()

const loading = ref(false)

const select = ref('1')

const registerForm = reactive({
  email: '',
  password1: '',
  password2: '',
  phoneNumber: '',
  code: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur'
    }
  ],
  password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  password2: [{ required: true, message: '请确认密码', trigger: 'blur' }],
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

function onRegisterFormClick() {
  if (!registerFormRef.value) return
  registerFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        ElMessage.success('注册成功')
        $router.replace('/')
      }, 1500)
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-input-group__prepend) {
  background-color: transparent;
}
</style>
