<template>
  <div class="app-container">
    <!-- 数据表 -->
    <el-table :data="list" border stripe class="w-full">
      <el-table-column prop="planProductTime" label="生产日期" align="center" />
      <el-table-column prop="planProductNums" label="生产数" align="center">
        <template #default="scope">
          <!-- <el-input-number
            v-if="status"
            v-model="scope.row.planProductNums"
            :min="calRowMin(scope.row)"
            :max="V"
            @change="onChangeProduct(scope.row)"
          /> -->
          <span>{{ scope.row.planProductNums }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planOutNums" label="出货数" align="center">
        <template #default="scope">
          <el-input-number
            v-if="status"
            v-model="scope.row.planOutNums"
            :min="0"
            :max="mean + std"
            @change="onChangeOut(scope.row)"
          />
          <span v-else>{{ scope.row.planOutNums }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastFinishedNums" label="成品数" align="center" />
    </el-table>
    <br />
    <!-- <el-button type="warning" plain @click="onCal">计算</el-button> -->
    <el-button type="primary" plain @click="onEdit">编辑</el-button>
    <el-button type="success" plain @click="onSave">保存</el-button>
    <el-button type="danger" plain @click="onCancel">取消</el-button>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

import * as math from 'mathjs'
import { onMounted } from 'vue'

// 最大可生产数
const PRODUCT_NUMS_MAX = 20

// 每期最大生产数
const PRODUCT_NUMS_PER_PERIOD_MAX = 10
const a = -0.12
const V = ~~(PRODUCT_NUMS_PER_PERIOD_MAX * (1 + a))

// 期数
const K = 6

// 已有成品数
const FINISHED_NUMS = 0

// 过去M期出货数
const pastOutNums = ref(mockPastMPeriodShipNums(30))
// 平均值
const mean = computed(() => {
  return pastOutNums.value.length > 0 ? ~~math.mean(pastOutNums.value) : 0
})
// 标准差
const std = computed(() => {
  return pastOutNums.value.length > 0 ? ~~math.std(pastOutNums.value) : 0
})
// mock 过去M期出货数
function mockPastMPeriodShipNums(M) {
  const arr = []

  for (let i = 1; i <= M; i++) {
    const min = Math.floor(Math.random() * 10) + 1
    const max = Math.ceil(Math.random() * 10) + 1
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    arr.push(num)
  }

  return arr
}

// 计划K期生产数
const planProductNums = ref([])
// 计算计划K期生产数
function calPlanProductNums(config) {
  const { PRODUCT_NUMS_MAX, V, K } = config

  let arr = []

  const remainder = PRODUCT_NUMS_MAX % V
  const quotient = ~~(PRODUCT_NUMS_MAX / V)

  if (remainder >= 0) {
    if (quotient >= K) {
      arr = Array.from({ length: K }, () => V)
    } else {
      arr = Array.from({ length: K }, (v, i) => (i < quotient ? V : i === quotient ? remainder : 0))
    }
  }

  return arr
}

// 计划K期出货数
const planOutNums = ref(Array.from({ length: K }, () => mean.value))

// 计划K期结余成品数
const planFinishedNums = ref([])
// 计算计划K期结余成品数
function calPlanFinishedNums(FINISHED_NUMS, planProductNums, planOutNums) {
  let lastFinishedNums = FINISHED_NUMS
  return Array.from({ length: K }, () => 0).map((v, i) => {
    lastFinishedNums = lastFinishedNums + planProductNums[i] - planOutNums[i]
    return lastFinishedNums
  })
}

// 调整计划K期出货数
function adjustPlan_lt0() {
  const index_lt0 = planFinishedNums.value.findIndex((item) => item < 0)
  if (index_lt0 !== -1) {
    // 取出计划K期结余成品数最后一个大于等于0的值
    const value_lt0 = planFinishedNums.value[index_lt0 - 1]

    // TODO 是否存在值大于最值的可能
    console.log('存在值大于最值的情况吗？', value_lt0 > mean.value + std.value)

    // 将不能出货的值设为0
    planOutNums.value = planOutNums.value.map((v, i) =>
      i > index_lt0 ? 0 : i === index_lt0 ? value_lt0 : v
    )
    // 清空负值
    planFinishedNums.value = planFinishedNums.value.map((v, i) => (i >= index_lt0 - 1 ? 0 : v))
  }
}
function adjustPlan_eq0() {
  const diff = mean.value + std.value
  const index_eq0 = planOutNums.value.findIndex((item) => item === 0)

  if (index_eq0 === -1) return

  // 取出计划K期结余成品数该列的值
  const value_eq0 = planFinishedNums.value[index_eq0]

  if (value_eq0 <= 0) return

  // 如果该值符合浮动区间，直接与最值比较
  if (value_eq0 <= diff) {
    // 直接将该值赋给同列计划K期出货数，后面的清空为0
    planOutNums.value = planOutNums.value.map((v, i) =>
      i > index_eq0 ? 0 : i === index_eq0 ? value_eq0 : v
    )
    // 清空剩余值
    planFinishedNums.value = planFinishedNums.value.map((v, i) => (i >= index_eq0 ? 0 : v))
  } else {
    planOutNums.value = planOutNums.value.map((v, i) =>
      i > index_eq0 ? 0 : i === index_eq0 ? diff : v
    )
    planFinishedNums.value = planFinishedNums.value.map((v, i) =>
      i > index_eq0 ? 0 : i === index_eq0 ? value_eq0 - diff : v
    )
  }

  // 递归检查剩余的
  adjustPlan_eq0()
}

const dates = ref(generateDates(K))
const list = ref([])
function getList() {
  const arr = []
  if (
    planProductNums.value.length > 0 &&
    planOutNums.value.length > 0 &&
    planFinishedNums.value.length > 0
  ) {
    for (let i = 0; i < K; i++) {
      arr.push({
        planProductTime: dates.value[i],
        planProductNums: planProductNums.value[i],
        planOutNums: planOutNums.value[i],
        lastFinishedNums: planFinishedNums.value[i]
      })
    }
  }
  return arr
}

function generateDates(k) {
  const startDate = dayjs() // 获取当前日期
  const dates = []

  for (let i = 0; i < k; i++) {
    dates.push(startDate.add(i, 'day').format('YYYY-MM-DD')) // 添加天数并转换为日期对象
  }

  return dates
}

const status = ref(false)
const lastData = ref(null)
const hasChangeProduct = ref(false)

function onCal() {
  if (!hasChangeProduct.value) {
    planProductNums.value = calPlanProductNums({ PRODUCT_NUMS_MAX, V, K })
  }
  hasChangeProduct.value = false

  planFinishedNums.value = calPlanFinishedNums(
    FINISHED_NUMS,
    planProductNums.value,
    planOutNums.value
  )
  console.log('最大可生产数：', PRODUCT_NUMS_MAX)
  console.log('每期最大生产数：', PRODUCT_NUMS_PER_PERIOD_MAX)
  console.log('已有成品数：', FINISHED_NUMS)
  console.log('期数：', K)
  console.log('------------------------------------------------------------------------------')
  console.log('平均值：', mean.value)
  console.log('标准差：', std.value)
  console.log('------------------------------------------------------------------------------')
  console.log('计划K期生产数：', planProductNums.value)
  console.log('计划K期出货数：', planOutNums.value)
  console.log('计划K期结余成品数：', planFinishedNums.value)
  console.log('------------------------------------------------------------------------------')
  adjustPlan_lt0()
  adjustPlan_eq0()
  console.log('最终K期生产数：', planProductNums.value)
  console.log('最终K期出货数：', planOutNums.value)
  console.log('最终K期结余成品数：', planFinishedNums.value)
  list.value = getList()
}
function onEdit() {
  lastData.value = {
    planProductNums: JSON.parse(JSON.stringify(planProductNums.value)),
    planOutNums: JSON.parse(JSON.stringify(planOutNums.value))
  }
  status.value = true
}
function onSave() {
  if (status.value) {
    status.value = false
    onCal()
  }
}
function onCancel() {
  if (status.value) {
    planProductNums.value = lastData.value.planProductNums
    planOutNums.value = lastData.value.planOutNums
    status.value = false
    onCal()
  }
}

onMounted(() => {
  onCal()
})

function onChangeOut(row) {
  const index = dates.value.indexOf(row.planProductTime)
  if (index !== -1) {
    planOutNums.value[index] = JSON.parse(JSON.stringify(row)).planOutNums
  }
}

function onChangeProduct(row) {
  const index = dates.value.indexOf(row.planProductTime)
  if (index !== -1) {
    // hasChangeProduct.value = true
    planProductNums.value[index] = JSON.parse(JSON.stringify(row)).planProductNums
  }
}

// 编辑生产数时计算可取最小值
function calRowMin(row) {
  let min = row.planOutNums
  if (FINISHED_NUMS > 0) {
    if (FINISHED_NUMS - row.planOutNums >= 0) {
      min = 0
    } else {
      min = row.planOutNums - FINISHED_NUMS
    }
  }
  return min
}
</script>

<style lang="scss" scoped></style>
