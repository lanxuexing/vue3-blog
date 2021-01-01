import { createApp } from 'vue'
import { Commit } from 'vuex'
import axios from 'axios'
import {
  ImageProps,
  CheckCondition,
  ErrorType,
  MessageType
} from '@/model/DataProps'
import Message from '@/components/Message.vue'

export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

/**
 * Get请求并提交Mutations
 * @param url 请求地址
 * @param mutationName mutation名称
 * @param commit commit实例
 */
export async function getAndCommit (url: string, mutationName: string, commit: Commit) {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

export function beforeUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export function createMessage (message: string, type: MessageType, timeout = 2000) {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}
