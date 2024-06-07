
import { message } from 'ant-design-vue'
import { postFormData } from '@/api/request.js'
const UPLOAD_URL = '/ai-platform/hz-admin/system/file/upload'
export function fetchUploadList(file) {
  const data = new FormData()
  data.append('file', file)
  return postFormData(UPLOAD_URL, data)
    .then((res) => {
      if (res.respCode === 200) {
        return res
      }
      message.error(res.respMsg || '上传失败')
      return Promise.reject()
    })
    .catch((error) => {
      message.error(error.message || '上传失败')
      return Promise.reject()
    })
}