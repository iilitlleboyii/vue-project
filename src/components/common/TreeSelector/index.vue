<template>
  <div class="w-60 h-full flex flex-col gap-4 pb-5">
    <el-input
      v-model="filterText"
      :placeholder="$t('components.treeselector.placeholder')"
      @input="onInput"
      clearable
    />
    <el-scrollbar>
      <el-tree
        ref="treeRef"
        :data="dataSource"
        :props="defaultProps"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :show-checkbox="showCheckbox"
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
        @check="onCheck"
      >
        <template #default="{ node }">
          <el-tooltip :content="node.label" :disabled="node.label.length <= 20">
            <span>{{
              node.label.length <= 20 ? node.label : node.label.slice(0, 20) + '...'
            }}</span>
          </el-tooltip>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
defineProps({
  dataSource: {
    type: Array,
    required: true
  },
  showCheckbox: {
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

function onInput(value) {
  if (!treeRef.value) return
  treeRef.value.filter(value)
}

function filterNode(value, data) {
  if (!value) return true
  return data.label.includes(value)
}

function onNodeClick(node) {
  emit('nodes-change', node)
}

function onCheck() {
  if (!treeRef.value) return
  emit('nodes-change', treeRef.value.getCheckedNodes())
}
</script>

<style lang="scss" scoped></style>
