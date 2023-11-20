/**
 * 防抖函数，用于限制事件的触发频率
 * @param func 需要防抖的函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 一个新的函数，具有防抖功能
 */
export function debounce(func, delay) {
  let timerId = null
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(this, args)
      timerId = null
    }, delay)
  }
}

/**
 * 节流函数，用于限制事件的触发频率
 * @param func 需要节流的函数
 * @param delay 节流延迟时间（毫秒）
 * @param immediately 是否立即执行
 * @returns 一个新的函数，具有节流功能
 */
export function throttle(func, delay, immediately = false) {
  if (immediately) {
    let previous = null
    return function (...args) {
      if (!previous || Date.now() - previous >= delay) {
        func.apply(this, args)
        previous = Date.now()
      }
    }
  } else {
    let timerId = null
    return function (...args) {
      if (!timerId) {
        timerId = setTimeout(() => {
          func.apply(this, args)
          timerId = null
        }, delay)
      }
    }
  }
}
