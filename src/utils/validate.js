/**
 * 验证path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function verifyIsExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
