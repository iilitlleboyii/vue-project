import { customRef } from 'vue'

/**
 * 自定义防抖ref
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2023-11-20
 * @param {any} value
 * @param {any} delay=200
 * @returns {any}
 */
export function debounceRef(value, delay = 200) {
  let timeoutId = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
