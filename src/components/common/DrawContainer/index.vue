<template>
  <div class="Draw-Container">
    <el-form @submit.prevent>
      <template v-for="item in staticData" :key="item.id">
        <!-- 边框 -->
        <el-form-item :style="item.style" v-if="item.type === 'border'">
          <div
            :style="{
              width: '100%',
              height: '100%',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: '#cfd8dc',
              borderRadius: '4px'
            }"
          ></div>
        </el-form-item>
        <!-- 标签 -->
        <el-form-item :style="item.style" v-if="item.type === 'tag'">
          <el-text>{{ item.value }}</el-text>
        </el-form-item>
        <!-- 图标 -->
        <el-form-item :style="item.style" v-if="item.type === 'picture'">
          <el-image :src="'data:image/png;base64,' + item.value" />
        </el-form-item>
      </template>
      <template v-for="item in dynamicData" :key="item.id">
        <!-- 输入框 -->
        <el-form-item :style="item.style" v-if="item.type === 'input'">
          <el-input v-model="item.value" :disabled="false" @change="onChange"></el-input>
        </el-form-item>
        <!-- 选择框 -->
        <el-form-item :style="item.style" v-if="item.type === 'select'">
          <el-select v-model="item.value" :disabled="false" @change="onChange">
            <el-option v-for="(option, index) in item.options" :key="index" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item :style="item.style" v-if="item.type === 'switch'">
          <el-tag
            :disable-transitions="true"
            :effect="item.value === '0' ? 'light' : 'dark'"
            :style="{
              '--el-tag-text-color': item.value === '0' ? 'black' : 'white',
              '--el-tag-bg-color': item.value === '0' ? item.closeColor : item.openColor,
              '--el-tag-border-color': '#eceff1'
            }"
            >{{ item.openWord }}</el-tag
          >
          <!-- <el-switch
            v-model="item.value"
            :disabled="false"
            :active-text="item.openWord"
            :inactive-text="item.closeWord"
            :style="{
              '--el-switch-on-color': item.openColor,
              '--el-switch-off-color': item.closeColor
            }"
          /> -->
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup>
const props = defineProps({
  staticData: {
    type: null,
    required: true
  },
  dynamicData: {
    type: null,
    required: true
  }
})

const emit = defineEmits(['update:dynamicData'])

function onChange() {
  emit('update:dynamicData', props.dynamicData)
}
</script>

<style lang="scss" scoped>
.Draw-Container {
  position: relative;
  height: 100%;

  .el-form-item {
    margin-bottom: 0;
  }

  :deep(.el-form-item__content) {
    line-height: unset;
    height: 100%;
  }

  :deep(.el-input) {
    width: 100%;
    height: 100%;

    .el-input__wrapper {
      padding: 0;
    }

    .el-input__inner {
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 0;
    }

    .el-icon {
      width: 2em;
    }
  }

  :deep(.el-tag) {
    width: 100%;
    height: 100%;
  }

  :deep(.el-text) {
    width: 100%;
    height: 100%;
    overflow-wrap: unset;
    white-space: pre;
    color: #4b7299;
    font-weight: bold;
  }

  :deep(.el-select) {
    width: 100%;
    height: 100%;

    .select-trigger {
      width: 100%;
      height: 100%;
    }

    .el-select__wrapper {
      width: 100%;
      height: 100%;
      padding-inline: 4px;
      min-height: unset;

      .el-select__selected-item {
        text-align: center;
      }
    }
  }
}
</style>
