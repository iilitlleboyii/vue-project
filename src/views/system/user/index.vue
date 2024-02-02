<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <SearchBar v-model="queryParams" :config="config" @search="handleSearch"></SearchBar>
    <!-- 数据表 -->
    <el-table v-loading="loading" :data="list" border stripe max-height="600" class="w-full">
      <el-table-column prop="id" label="编号" width="80" show-overflow-tooltip />
      <el-table-column prop="username" label="用户名" min-width="100" show-overflow-tooltip />
      <el-table-column prop="nickname" label="昵称" min-width="100" show-overflow-tooltip />
      <el-table-column prop="telephone" label="手机号" width="120" show-overflow-tooltip />
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip />
      <el-table-column prop="is_active" label="激活" width="70" align="center">
        <template #default="{ row }">
          <BoolTag :value="row.is_active"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="is_staff" label="管理人员" width="90" align="center">
        <template #default="{ row }">
          <BoolTag :value="row.is_staff"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="is_superuser" label="超级用户" width="90" align="center">
        <template #default="{ row }">
          <BoolTag :value="row.is_superuser"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="last_login" label="上次登录时间" width="180" align="center" />
      <el-table-column prop="date_joined" label="创建时间" width="180" align="center" />
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="{ row }">
          <el-row justify="space-between">
            <el-button
              link
              size="small"
              type="primary"
              @click="handleEdit(row)"
              :disabled="row.is_superuser"
              >编辑</el-button
            >
            <el-button link size="small" type="danger" @click="handleRemove(row)" disabled
              >停用</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-model:page-size="queryParams.pageSize"
      v-model:page-num="queryParams.pageNum"
      :total="total"
      @pagination="handleSearch"
    ></Pagination>
    <!-- 对话框 -->
    <el-dialog
      v-model="open"
      :title="title"
      :append-to-body="true"
      :close-on-click-modal="false"
      @closed="reset"
      width="30%"
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
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="User">
import { getUserList, getUser, createUser, updateUser } from '@/api/common'
import { useUserStore } from '@/stores/modules'
import useQueryList from '@/hooks/useQueryList'
import useForm from '@/hooks/useForm'

const $userStore = useUserStore()

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
const { loading, queryParams, list, total, handleSearch } = useQueryList(getUserList)

const formRef = ref(null)
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
const { open, title, form, reset, cancel, submit } = useForm(
  createUser,
  updateUser,
  formRef,
  handleSearch
)

async function handleEdit(row) {
  if (row.id !== $userStore.userInfo.id && !$userStore.roles.includes('admin')) {
    ElMessage.warning('只能修改自己的哦~')
    return
  }
  try {
    const { data } = await getUser(row.id)
    form.value = data
    title.value = '修改用户'
    open.value = true
  } catch (error) {}
}
function handleRemove(row) {}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped>
// // 设置表头样式
// .el-table {
//   --el-table-header-text-color: #909399;
//   --el-table-header-bg-color: var(--el-bg-color);
// }
</style>
