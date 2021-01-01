import { Commit } from 'vuex'
import axios from 'axios'
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

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
