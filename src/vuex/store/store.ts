import { createStore } from 'vuex'
import { testUser } from '@/model/MockData'
import { GlobalDataProps } from '@/model/DataProps'
import {
  asyncAndCommit,
  objToArr,
  arrToObj
} from '@/utils/helper'

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    columns: { data: {}, isLoaded: false, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: testUser,
    loading: false
  },
  actions: {
    fetchColumns ({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      return asyncAndCommit(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn ({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts ({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    createPost ({ commit }, payload) {
      return asyncAndCommit('/api/posts', 'createPost', commit, { method: 'post', data: payload })
    }
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'muziyu' }
    },
    createPost (state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns (state, rawData) {
      const { data } = state.columns
      const { list, count } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        isLoaded: true
      }
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    }
  },
  getters: {
    getColumns: (state) => objToArr(state.columns.data),
    getColumnById: (state) => (id: string) => state.columns.data[id],
    getPostsByCid: (state) => (cid: string) => objToArr(state.posts.data).filter(post => post.column === cid)
  }
})

export default store
