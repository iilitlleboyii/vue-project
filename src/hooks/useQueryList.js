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
      const { data } = await request(queryParams)
      list.value = data.results
      total.value = data.count
      loading.value = false
    } catch (error) {}
  }

  return {
    loading,
    queryParams,
    list,
    total,
    handleSearch
  }
}
