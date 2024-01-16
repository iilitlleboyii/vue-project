// @/utils/tools

/**
 * 格式化Get请求Params
 * @author Yuxianhao <yu.xh00@foxmail.com>
 * @date 2024-01-16
 * @param {any} params
 * @returns {any}
 */
export function formatQueryParams(params) {
  const newQuery = {}

  for (const item of Object.keys(params)) {
    const value = params[item]
    if (value !== null && value !== undefined) {
      if (typeof value === 'string' && value.trim() !== '') {
        newQuery[item] = value.trim()
      } else if (typeof value === 'number' && !isNaN(value)) {
        newQuery[item] = value
      } else if (typeof value !== 'string' && typeof value !== 'number') {
        newQuery[item] = value
      }
    }
  }

  return newQuery
}
