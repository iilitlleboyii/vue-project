<template>
  <div class="w-60 h-full flex flex-col gap-4 pb-5">
    <el-input v-model="filterText" placeholder="请输入关键字" clearable />
    <el-scrollbar>
      <el-tree
        ref="treeRef"
        :data="model"
        :props="defaultProps"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :show-checkbox="true"
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
        @check="onCheck"
      />
    </el-scrollbar>
  </div>
</template>

<script setup>
const model = defineModel({
  type: Array
})

const filterText = ref('')

const treeRef = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (value) => {
  if (treeRef.value) {
    treeRef.value.filter(value)
  }
})

function filterNode(value, data) {
  if (!value) return true
  return data.label.includes(value)
}

function onNodeClick(node) {
  console.log(node)
}

function onCheck() {
  if (treeRef.value) {
    const checkedNodes = treeRef.value.getCheckedNodes()
    console.log(checkedNodes)
  }
}
</script>

<style lang="scss" scoped></style>
