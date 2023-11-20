<template>
  <div class="app-container">
    <SearchBar v-model="formData" :config="config" :handleSearch="handleSearch"></SearchBar>
  </div>
</template>

<script setup>
import chinaAreaData from '@/assets/js/area_data'

const regionOptions = markRaw(chinaAreaData)

const formData = reactive({
  workOrderNo: '',
  productName: '',
  deviceNo: '',
  companyId: '',
  moduleName: '',
  createTime: '',
  autocomplete: '',
  region: ''
})

const selectOptions = ref([
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  }
])
const cascaderOptions = ref([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  }
])

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
const restaurants = ref(loadAll())
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const config = computed(() => [
  {
    name: 'el-input',
    label: '工单编号',
    key: 'workOrderNo',
    bindProps: {
      maxlength: 20,
      formatter: (value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')
    }
  },
  {
    name: 'el-input',
    label: '产品名称',
    key: 'productName',
    bindProps: {
      maxlength: 20,
      formatter: (value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')
    }
  },
  {
    name: 'el-input',
    label: '设备编号',
    key: 'deviceNo',
    bindProps: {
      maxlength: 20,
      formatter: (value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')
    }
  },
  {
    name: 'el-select',
    label: '公司名称',
    key: 'companyId',
    slot: {
      name: 'el-option',
      value: selectOptions.value
    }
  },
  {
    name: 'el-cascader',
    label: '模具名称',
    key: 'moduleName',
    bindProps: {
      options: cascaderOptions.value
    }
  },
  {
    name: 'el-cascader',
    label: '区域',
    key: 'region',
    bindProps: {
      options: regionOptions
    }
  },
  {
    name: 'el-date-picker',
    label: '创建时间',
    key: 'createTime',
    bindProps: {
      type: 'datetime',
      editable: false,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    name: 'el-autocomplete',
    label: '自动补全',
    key: 'autocomplete',
    bindProps: {
      maxlength: 20,
      formatter: (value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, ''),
      fetchSuggestions: querySearch
    }
  }
])

const handleSearch = () => {
  // 添加搜索的业务代码
  console.log(formData)
}
</script>

<style lang="scss" scoped></style>
