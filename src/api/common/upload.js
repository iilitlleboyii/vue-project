import request from '@/utils/request'

// const cancelTokenSource = request.CancelToken.source()

export function uploadFile(data) {
  return request({
    url: '/upload/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    onUploadProgress: (progress) => {
      const percentage = Math.round((progress.loaded * 100) / progress.total)
      console.log('上传进度：' + percentage + '%')
    }
    // cancelToken: cancelTokenSource.token
  })
}
