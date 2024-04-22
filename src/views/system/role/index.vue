<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <SearchBar v-model="queryParams" :config="config" @search="handleSearch"></SearchBar>
    <!-- 操作栏 -->
    <el-row :gutter="10" class="mb">
      <el-col :span="1.5">
        <el-button type="primary" plain @click="handleAdd">
          <span>新增</span>
          <template #icon>
            <i-ep:plus />
          </template>
        </el-button>
      </el-col>
    </el-row>
    <!-- 数据表 -->
    <el-table v-loading="loading" :data="list" border stripe max-height="600" class="w-full">
      <el-table-column prop="id" label="#" width="80" show-overflow-tooltip />
      <el-table-column prop="name" label="角色名" min-width="100" show-overflow-tooltip />
      <el-table-column prop="code" label="角色编码" min-width="100" show-overflow-tooltip />
      <el-table-column prop="is_active" label="激活" width="70" align="center">
        <template #default="{ row }">
          <BoolTag :value="row.is_active"></BoolTag>
        </template>
      </el-table-column>
      <el-table-column prop="created_time" label="创建时间" width="180" align="center" />
      <el-table-column prop="updated_time" label="更新时间" width="180" align="center" />
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="{ row }">
          <el-row justify="space-between">
            <el-button link size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
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
    <el-dialog v-model="open" :title="title" :append-to-body="true" :close-on-click-modal="false" @closed="reset" width="30%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" @submit.prevent>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="form.name" :maxlength="20" placeholder="请输入角色名" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code" :maxlength="100" placeholder="请输入角色编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="激活" prop="is_active">
          <el-switch v-model="form.is_active" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" :maxlength="150" show-word-limit placeholder="请输入描述" clearable></el-input>
        </el-form-item>
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

<script setup name="Role">
import { getRoleList, getRole, createRole, updateRole, deleteRole } from '@/api/common'
import useQueryList from '@/hooks/useQueryList'
import useForm from '@/hooks/useForm'

const config = [
  {
    name: 'el-input',
    label: '角色名',
    prop: 'name',
    bindProps: {
      maxlength: 20,
      clearable: true,
      placeholder: '请输入'
    }
  },
  {
    name: 'el-input',
    label: '角色编码',
    prop: 'code',
    bindProps: {
      maxlength: 100,
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
  }
]
const { loading, queryParams, list, total, handleSearch } = useQueryList(getRoleList)

const formRef = ref(null)
const rules = {
  name: [
    {
      required: true,
      message: '请输入角色名',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入角色编码',
      trigger: 'blur'
    }
  ]
}
const { open, title, form, reset, cancel, submit } = useForm(createRole, updateRole, formRef, handleSearch)

function handleAdd() {
  title.value = '新增角色'
  open.value = true
}
function handleEdit(row) {
  getRole(row.id).then((res) => {
    form.value = res.data
    title.value = '修改角色'
    open.value = true
  })
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
