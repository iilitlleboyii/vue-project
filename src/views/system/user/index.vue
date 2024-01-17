<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <SearchBar v-model="query" :config="config" :handleSearch="handleSearch"></SearchBar>
    <!-- 数据表 -->
    <el-table v-loading="loading" :data="list" border stripe class="w-full">
      <el-table-column prop="id" label="编号" width="80" show-overflow-tooltip />
      <el-table-column prop="username" label="用户名" min-width="100" show-overflow-tooltip />
      <el-table-column prop="nickname" label="昵称" min-width="100" show-overflow-tooltip />
      <el-table-column prop="telephone" label="手机号" width="120" show-overflow-tooltip />
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip />
      <el-table-column prop="is_active" label="激活" width="70" align="center">
        <template #default="scope">
          <BoolTag :value="scope.row.is_active"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="is_staff" label="管理人员" width="90" align="center">
        <template #default="scope">
          <BoolTag :value="scope.row.is_staff"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="is_superuser" label="超级用户" width="90" align="center">
        <template #default="scope">
          <BoolTag :value="scope.row.is_superuser"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="last_login" label="上次登录时间" width="180" align="center" />
      <el-table-column prop="date_joined" label="创建时间" width="180" align="center" />
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="scope">
          <el-row justify="space-between">
            <el-button
              link
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              :disabled="scope.row.is_superuser"
              >编辑</el-button
            >
            <el-button link size="small" type="danger" @click="handleRemove(scope.row)" disabled
              >停用</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-model:page-size="query.pageSize"
      v-model:page-num="query.pageNum"
      :total="total"
      @pagination="handleSearch"
    ></Pagination>
    <!-- 对话框 -->
    <el-dialog
      v-model="open"
      title="编辑"
      width="30%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :closed="reset"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" @submit.prevent>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            :maxlength="150"
            :formatter="(value) => value.replace(/[^a-zA-Z0-9@\.\-_]/g, '')"
            placeholder="只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input
            v-model="form.telephone"
            :maxlength="11"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="激活" prop="is_active">
          <el-switch v-model="form.is_active" />
        </el-form-item> -->
        <el-form-item label="管理人员" prop="is_staff">
          <el-switch v-model="form.is_staff" />
        </el-form-item>
        <!-- <el-form-item label="超级用户" prop="is_superuser">
          <el-switch v-model="form.is_superuser" />
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getUserList, getUser, updateUser } from '@/api/common'
import { useUserStore } from '@/stores/modules'

const query = reactive({
  pageNum: 1,
  pageSize: 10
})
async function handleSearch() {
  try {
    loading.value = true
    const { data } = await getUserList(query)
    list.value = data.results
    total.value = data.count
    loading.value = false
  } catch (error) {}
}

const loading = ref(false)
const list = ref([])
const total = ref(0)

onMounted(() => {
  handleSearch()
})

const open = ref(false)
const formRef = ref(null)
const form = ref({})
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  telephone: [
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '手机号不合法',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ]
}
const $userStore = useUserStore()

function reset() {
  if (!formRef.value) return
  formRef.value.resetFields()
}
async function onConfirm() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      if (form.value.id) {
        await updateUser(form.value)
        open.value = false
        ElMessage.success('修改成功')
        handleSearch()
      }
    }
  })
}
function onCancel() {
  open.value = false
}

async function handleEdit(row) {
  if (row.id !== $userStore.userInfo.id && !$userStore.roles.includes('admin')) {
    ElMessage.warning('只能修改自己的哦~')
    return
  }
  try {
    const { data } = await getUser(row.id)
    form.value = data
    open.value = true
  } catch (error) {}
}
function handleRemove(row) {}

// 搜索栏配置
const config = [
  {
    name: 'el-input',
    label: '用户名',
    prop: 'username',
    bindProps: {
      maxlength: 32,
      clearable: true,
      placeholder: '请输入'
    }
  },
  {
    name: 'el-input',
    label: '昵称',
    prop: 'nickname',
    bindProps: {
      maxlength: 20,
      clearable: true,
      placeholder: '请输入'
    }
  },
  {
    name: 'el-select',
    label: '激活',
    prop: 'is_active',
    bindProps: {
      clearable: true,
      placeholder: '请选择'
    },
    slot: {
      name: 'el-option',
      value: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ]
    }
  },
  {
    name: 'el-select',
    label: '管理人员',
    prop: 'is_staff',
    bindProps: {
      clearable: true,
      placeholder: '请选择'
    },
    slot: {
      name: 'el-option',
      value: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ]
    }
  },
  {
    name: 'el-select',
    label: '超级用户',
    prop: 'is_superuser',
    bindProps: {
      clearable: true,
      placeholder: '请选择'
    },
    slot: {
      name: 'el-option',
      value: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ]
    }
  }
]
</script>

<style lang="scss" scoped>
// // 设置表头样式
// .el-table {
//   --el-table-header-text-color: #909399;
//   --el-table-header-bg-color: var(--el-bg-color);
// }
</style>
