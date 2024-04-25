<template>
  <div class="w-60 h-full flex flex-col gap-4 pb-5">
    <el-input v-model="filterText" :placeholder="$t('components.treeselector.placeholder')" @input="onInput" clearable />
    <el-scrollbar>
      <el-tree
        ref="treeRef"
        :data="dataSource"
        :props="defaultProps"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :show-checkbox="multiple"
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
        @check="onCheck"
        v-bind="attrs"
      >
        <template #default="{ node }">
          <el-tooltip :content="node.label" :disabled="!truncateObj[node.id]">
            <span v-truncate="{ obj: truncateObj, id: node.id }" class="truncate">{{ node.label }}</span>
          </el-tooltip>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['nodes-change'])

const filterText = ref('')

const treeRef = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label'
}

const attrs = useAttrs()

function onInput(value) {
  if (!treeRef.value) return
  treeRef.value.filter(value)
}

function filterNode(value, data) {
  return !value ? true : data.deptName.includes(value)
}

function onNodeClick(node) {
  emit('nodes-change', node)
}

function onCheck() {
  if (!treeRef.value) return
  emit('nodes-change', treeRef.value.getCheckedNodes())
}

// 记录节点内容是否溢出
const truncateObj = ref(getTruncateObj())
function getTruncateObj() {
  const obj = {}
  for (const item of flattenArray(props.dataSource)) {
    obj[item.id] = false
  }
  return obj
}
function flattenArray(data) {
  const result = []
  for (const node of data) {
    dfs(node)
  }
  function dfs(node) {
    result.push(node)
    if (node.children) {
      for (const child of node.children) {
        dfs(child)
      }
    }
  }
  return result
}
</script>
