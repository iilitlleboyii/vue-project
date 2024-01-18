export default {
  mounted(el, binding, vnode, prevVnode) {
    const handleResize = () => {
      binding.value.obj[binding.value.id] = el.scrollWidth > el.clientWidth
    }
    handleResize()
    window.addEventListener('resize', handleResize)
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    const handleResize = () => {
      binding.value.obj[binding.value.id] = el.scrollWidth > el.clientWidth
    }
    window.removeEventListener('resize', handleResize)
  }
}
