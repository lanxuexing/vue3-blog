import axios from 'axios'
import store from '@/vuex/store/store'

export const setConf = () => {
  axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    return config
  })
  axios.interceptors.response.use(config => {
    store.commit('setLoading', false)
    return config
  })
}
