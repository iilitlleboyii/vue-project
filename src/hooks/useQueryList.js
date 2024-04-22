/**
 * 快速列表查询
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2024-04-12
 * @param {any} request 查询接口
 * @param {any} params={} 除分页的额外参数
 * @returns {any}
 */
export default function useQueryList(request, params = {}) {
  const loading = ref(false)

  const list = ref([])
  const total = ref(0)
  const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    ...params
  })

  const handleSearch = async () => {
    try {
      loading.value = true
      const res = await request(queryParams)
      if (res) {
        list.value = res.data.results
        total.value = res.data.count
        loading.value = false
      }
    } catch (error) {
      loading.value = false
    }
  }

  return {
    loading,
    queryParams,
    list,
    total,
    handleSearch
  }
}
