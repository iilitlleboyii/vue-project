export default function useForm(addReq, editReq, formRef, cb) {
  const title = ref('')
  const open = ref(false)

  const form = ref({})
  const callback = cb ? cb : () => {}

  const reset = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
    form.value = {}
  }

  const cancel = () => {
    open.value = false
  }

  const submit = () => {
    if (!formRef.value) return
    formRef.value.validate(async (valid) => {
      if (!valid) return
      if (form.value.id) {
        await editReq(form.value)
        open.value = false
        ElMessage.success('修改成功')
        callback()
      } else {
        await addReq(form.value)
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
