<template>
  <el-pagination
    v-model:current-page="pageNum_"
    v-model:page-size="pageSize_"
    :total="total"
    :layout="layout"
    :background="true"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind="$attrs"
    class="mt-5 justify-end"
  />
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageNum: {
    type: Number,
    required: false,
    default: 1
  },
  pageSize: {
    type: Number,
    required: false,
    default: 10
  },
  layout: {
    type: String,
    required: false,
    default: 'total, sizes, prev, pager, next, jumper'
  }
})

const emit = defineEmits(['update:pageNum', 'update:pageSize', 'pagination'])

// 也可以使用 Vue3.4 新特性 defineModel
const pageNum_ = useVModel(props, 'pageNum', emit)
const pageSize_ = useVModel(props, 'pageSize', emit)

function handleCurrentChange(value) {
  emit('pagination', { pageNum: value, pageSize: pageSize_.value })
}

function handleSizeChange(value) {
  if (value * pageNum_.value > props.total) {
    pageNum_.value = 1
  }
  emit('pagination', { pageNum: pageNum_.value, pageSize: value })
}
</script>
