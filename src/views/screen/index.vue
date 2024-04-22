<template>
  <div class="app-container">
    <div style="float: right">
      <div>
        <el-button-group>
          <el-button type="primary" plain @click="onPrevPage">上一页</el-button>
          <el-button type="primary" plain @click="onNextPage">下一页</el-button>
        </el-button-group>
        <el-select v-model="pageSelector.current" :filterable="true" placeholder="请选择页面" @change="onChangePage" style="width: 240px">
          <el-option v-for="(item, index) in pageSelector.pages" :key="index" :label="item.name" :value="index" />
        </el-select>
      </div>
      <div>
        <el-form-item label="选择层级">
          <el-select v-model="pageSelector.layerIdx" :filterable="true" placeholder="请选择层级" @change="onChangeLayer" style="width: 240px">
            <el-option v-for="(item, index) in currentPage.layer" :key="index" :label="index" :value="index" />
          </el-select>
        </el-form-item>
      </div>
      <div>
        是否横屏: <el-button @click="horizontal = !horizontal">{{ horizontal ? '是' : '否' }}</el-button>
      </div>
    </div>
    <div
      class="draw"
      v-loading="loading"
      :style="{
        width: horizontal ? '1024px' : '768px',
        height: horizontal ? '768px' : '1024px'
      }"
    >
      <Draw-Container :pageData="pageData"></Draw-Container>
    </div>
    <!-- <div>
      <el-button v-for="(item, index) in originalData?.button || []" :key="index" type="info" plain @click="onClick(index)">按钮</el-button>
    </div> -->
  </div>
</template>

<script setup name="Home">
/* 加载效果 */
const loading = ref(true)

/* 原始数据 */
const originalData = ref(null)

/* 页面选择器 */
const pageSelector = ref({
  current: 0,
  layerIdx: 0,
  pages: []
})

/* 当前页面 */
const currentPage = computed(() => {
  let ret = {}
  if (pageSelector.value.pages.length > 0 && pageSelector.value.current >= 0) {
    const data = pageSelector.value.pages[pageSelector.value.current]
    ret = {
      ...data
    }
  }
  return ret
})

/* 页面数据 */
const pageData = computed(() => {
  let ret = currentPage.value.common || []
  if (currentPage.value.layer && currentPage.value.layer.length > 0) {
    ret = ret.concat(currentPage.value.layer[pageSelector.value.layerIdx])
  }
  return formatPageData(ret)
})

// /* 按钮组 */
// const btns = computed(() => {
//   let ret = []
//   if (originalData.value && originalData.value.button && originalData.value.button.length > 0) {
//     ret = originalData.value.button
//   }
//   console.log(ret)
//   return formatPageData(ret)
// })

/* 格式化数据 */
function formatPageData(data) {
  return data
    .map((item) => {
      const ret = {
        id: item.id,
        type: item.type,
        value: item.value,
        style: {
          position: 'absolute',
          top: item.top,
          left: item.left,
          width: item.width,
          height: item.height
        }
      }
      if (item.type === 'input') {
        ret.reg = item.reg
        ret.bitWidth = item.bitWidth
      } else if (item.type === 'select') {
        ret.reg = item.reg
        ret.bitWidth = item.bitWidth
        ret.options = item.selectList
      } else if (item.type === 'switch') {
        ret.reg = item.reg
        ret.bitWidth = item.bitWidth
        ret.bitNum = item.bitNum
        ret.open = item.open
        ret.close = item.close
        ret.openColor = item.openColor
        ret.closeColor = item.closeColor
        ret.openWord = item.openWord
        ret.closeWord = item.closeWord
      }
      return ret
    })
    .reduce((acc, cur) => {
      if (!acc.some((obj) => obj.id === cur.id)) {
        acc.push(cur)
      }
      return acc
    }, [])
}

// new URL('@/assets/json/draw.json', import.meta.url).href
// https://arcuchi-static.oss-cn-shenzhen.aliyuncs.com/record.json
// https://diebaos-oss.oss-cn-shenzhen.aliyuncs.com/user/2024/03/07/b9233d6e819e46bc8e941d470a580e16.json
fetch(new URL('@/assets/json/draw(19).json', import.meta.url).href)
  .then((res) => res.json())
  .then((data) => {
    loading.value = false
    originalData.value = data
    console.log(originalData.value)
    pageSelector.value = {
      current: 0,
      layerIdx: 0,
      pages: Object.entries(data)
        .filter(([key, value]) => {
          return !['title', 'menu', 'button', 'aside'].includes(key)
        })
        .map((item) => item[1])
    }
  })

function onPrevPage() {
  if (pageSelector.value.current > 0) {
    pageSelector.value.current -= 1
  } else {
    ElMessage.warning('已经是第一页了~')
  }
}

function onNextPage() {
  if (pageSelector.value.current < pageSelector.value.pages.length - 1) {
    pageSelector.value.current += 1
  } else {
    ElMessage.warning('已经是最后一页了~')
  }
}

function onChangePage(value) {
  console.log('当前页面：', value)
  console.log('当前页面数据：', pageData.value)
}

function onChangeLayer(value) {
  console.log('当前层级：', value)
}

function onClick(index) {
  console.log('点击了' + index)
}

const horizontal = ref(true)
</script>

<style lang="scss" scoped>
.draw {
  // width: 768px;
  // height: 1024px;
  background-color: #e2e7e8;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 4px;
  scale: 0.8;
  transform-origin: top left;
}
</style>
