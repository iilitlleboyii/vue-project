// @/utils/tools

/**
 * 格式化Get请求Params
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

/**
 * 通过二进制数据流下载文件
 * @param {BlobPart} data 文件流
 * @param {string} filename 文件名
 * @param {string} mime 类型（可选）
 * @returns {any}
 */
export function downloadByData(data, filename, mime) {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 图片地址转base64
 * @param {string} url 图片地址
 * @returns {any}
 */
export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/jpeg', 0.92)
      resolve(dataURL)
    }
    img.onerror = reject
    img.src = url
  })
}

/**
 * base64转Blob
 * @param {string} base64
 * @returns {any}
 */
export function base64ToBlob(base64) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * 通过base64下载图片
 * @param {any} base64
 * @param {any} filename
 * @param {any} mime
 * @returns {any}
 */
export function downloadByBase64(base64, filename, mime) {
  downloadByData(base64ToBlob(base64), filename, mime)
}

/**
 * 通过图片地址下载图片
 * @param {any} url
 * @param {any} filename
 * @returns {any}
 */
export function downloadByOnlineUrl(url, filename) {
  urlToBase64(url).then((data) => {
    downloadByData(base64ToBlob(data), filename, 'image/jpeg')
  })
}
