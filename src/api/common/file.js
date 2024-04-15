import request, { download } from '@/utils/request'
import axios from 'axios'

export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file.raw)
  return request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
    timeout: 0,
    onUploadProgress: function ({ event }) {
      if (event.lengthComputable) {
        file.percentage = Math.floor((event.loaded / event.total) * 100)
      }
    },
    cancelToken: new axios.CancelToken((cancelFn) => {
      file.abort = cancelFn
    })
  })
}

export function downloadFile(data, filename, mime) {
  return download({
    url: '/download',
    method: 'post',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment;filename=${encodeURIComponent(filename)}`
    },
    data,
    filename,
    mime
  })
}

export function exportExcel(filename) {
  return download({
    url: '/download',
    method: 'get',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment;filename=${encodeURIComponent(filename)}`
    },
    filename
  })
}
