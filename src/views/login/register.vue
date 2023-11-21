<template>
  <AppIndex>
    <div class="w-full text-center mb-4">账户注册</div>
    <el-form
      ref="registerFormRef"
      label-width="auto"
      :model="registerForm"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名" size="large" />
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
          @keyup.enter="onRegisterFormClick"
        />
      </el-form-item>
      <template v-if="isRequired">
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱" size="large" />
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="registerForm.phoneNumber"
            placeholder="手机号"
            size="large"
            :maxlength="11"
          >
            <template #prepend>
              <el-select v-model="select" size="large" class="w-20">
                <el-option label="+86" value="1" />
                <el-option label="+87" value="2" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row justify="space-between" class="w-full">
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
      </template>
      <el-form-item>
        <el-row justify="space-between" class="w-full">
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="onRegisterFormClick"
            class="w-1/2"
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
import { register } from '@/api/common'

const registerFormRef = ref()

const loading = ref(false)

const select = ref('1')

const isRequired = ref(false)

const registerForm = reactive({
  username: '',
  email: '',
  password1: '',
  password2: '',
  phoneNumber: '',
  code: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: false, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur'
    }
  ],
  password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  password2: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value !== registerForm.password1) {
            reject('两次密码输入不一致')
          } else {
            resolve()
          }
        })
      },
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    { required: false, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    { required: false, message: '请输入验证码', trigger: 'blur' },
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
      const data = {
        username: registerForm.username,
        password: registerForm.password2
      }
      if (registerForm.email) {
        data.email = registerForm.email
      }
      if (registerForm.phoneNumber) {
        data.phoneNumber = registerForm.phoneNumber
      }
      register(data)
        .then(() => {
          ElMessage.success('注册成功')
          $router.replace('/')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-input-group__prepend) {
  background-color: transparent;
}
</style>
