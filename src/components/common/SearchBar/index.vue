<template>
  <div>
    <el-form ref="searchBarRef" :model="queryParams" label-width="auto" @submit.prevent>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in visibleItems" :key="index" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              v-if="item.name === 'el-input'"
              v-bind="item.bindProps"
              v-model="queryParams[item.prop]"
              v-on="item?.events || {}"
              @keyup.enter="handleSearch"
              class="w-full"
            ></el-input>
            <el-select
              v-if="item.name === 'el-select'"
              v-bind="item.bindProps"
              v-model="queryParams[item.prop]"
              v-on="item?.events || {}"
              class="w-full"
            >
              <el-option v-for="(option, index) in item.slot.value" :key="index" :label="option.label" :value="option.value" />
            </el-select>
            <el-cascader
              v-if="item.name === 'el-cascader'"
              v-bind="item.bindProps"
              v-model="queryParams[item.prop]"
              v-on="item?.events || {}"
              class="w-full"
            ></el-cascader>
            <el-date-picker
              v-if="item.name === 'el-date-picker'"
              v-bind="item.bindProps"
              v-model="queryParams[item.prop]"
              v-on="item?.events || {}"
              class="w-full"
            ></el-date-picker>
            <el-autocomplete
              v-if="item.name === 'el-autocomplete'"
              v-bind="item.bindProps"
              v-model="queryParams[item.prop]"
              v-on="item?.events || {}"
              class="w-full"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col
          :lg="isCollapse ? 6 : 24 - (config.length % 4) * 6"
          :md="isCollapse ? 8 : 24 - (config.length % 3) * 8"
          :sm="isCollapse ? 12 : 24 - (config.length % 2) * 12"
          :xs="24"
        >
          <el-form-item class="search-bar__btns">
            <el-button type="primary" @click="handleSearch"
              ><span>{{ $t('components.searchbar.search') }}</span>
              <template #icon>
                <i-ep:search />
              </template>
            </el-button>
            <el-button @click="resetForm"
              ><span>{{ $t('components.searchbar.reset') }}</span>
              <template #icon>
                <i-ep:refresh />
              </template>
            </el-button>
            <el-button v-if="isShow" type="primary" size="small" link @click="isCollapse = !isCollapse">
              <template #default>
                <span>{{ isCollapse ? $t('components.searchbar.expand') : $t('components.searchbar.collapse') }}</span>
                <i-ep:arrow-down v-if="isCollapse" />
                <i-ep:arrow-up v-else />
              </template>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { debounce } from 'lodash-es'

const props = defineProps({
  modelValue: {
    type: null,
    required: true
  },
  config: {
    type: Array,
    default: () => []
  }
  /*   {
    name: '',
    lable: '',
    prop: '',
    bindProps: {},
    slot: {
    name: '',
    value: ''
    },
    events: {}
} */
})
const emit = defineEmits(['update:modelValue', 'search'])

const queryParams = useVModel(props, 'modelValue', emit)
const searchBarRef = ref(null)
function handleSearch() {
  emit('search')
}
function resetForm() {
  if (!searchBarRef.value) return
  searchBarRef.value.resetFields()
  handleSearch()
}

const isCollapse = ref(true)
const innerWidth = ref(window.innerWidth)
const counter = computed(() => (innerWidth.value >= 1200 ? 3 : innerWidth.value >= 992 ? 2 : 1))
const visibleItems = computed(() => (isCollapse.value ? props.config.slice(0, counter.value) : props.config))
const isShow = computed(() => !isCollapse.value || props.config.length > visibleItems.value.length)

const handleResize = debounce(() => {
  innerWidth.value = window.innerWidth
}, 300)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.search-bar__btns {
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}

.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
