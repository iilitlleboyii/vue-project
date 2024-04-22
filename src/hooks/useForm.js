/**
 * 快速表单新增或修改
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2024-04-12
 * @param {any} formRef 表单ref
 * @param {any} addReq 新增接口
 * @param {any} editReq 修改接口
 * @param {any} cb 操作回调
 * @param {any} bp 提交前数据处理
 * @returns {any}
 */
export default function useForm(formRef, addReq, editReq, cb, bp) {
  const title = ref('')
  const open = ref(false)

  const form = ref({})
  const callback = cb ? cb : () => {}
  const beforePost = bp ? bp : () => form.value

  const reset = () => {
    if (!formRef.value) return
    form.value = {}
    formRef.value.resetFields()
  }

  const cancel = () => {
    open.value = false
  }

  const submit = () => {
    if (!formRef.value) return
    formRef.value.validate(async (valid) => {
      if (!valid) return
      if (form.value.id) {
        const data = beforePost()
        await editReq(data)
        open.value = false
        ElMessage.success('修改成功')
        callback()
      } else {
        const data = beforePost()
        await addReq(data)
        open.value = false
        ElMessage.success('添加成功')
        callback()
      }
    })
  }

  return {
    open,
    title,
    form,
    reset,
    cancel,
    submit
  }
}
