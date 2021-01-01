import { createApp } from 'vue'
import { Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import {
  ImageProps,
  CheckCondition,
  ErrorType,
  MessageType,
  ColumnProps,
  UserProps
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

/**
 * 异步请求并提交Mutations
 * @param url 请求地址
 * @param mutationName mutation名称
 * @param commit commit实例
 * @param config axios配置
 * @param extraData 额外参数
 */
export async function asyncAndCommit (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: unknown) {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
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

export function objToArr<T> (obj: {[key: string]: T}) {
  return Object.keys(obj).map(key => obj[key])
}

export function addColumnAvatar (data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}

export function arrToObj<T extends { _id?: string }> (arr: Array<T>) {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
