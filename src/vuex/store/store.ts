import { createStore } from 'vuex'
import { testData, testPosts, testUser } from '@/model/MockData'
import { GlobalDataProps } from '@/model/DataProps'
import { getAndCommit } from '@/utils/helper'

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: testUser
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    featchColumn ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'featchColumn', commit)
    },
    featchPosts ({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'featchPosts', commit)
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'muziyu' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    featchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    featchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => state.columns.find(c => c._id === id),
    getPostsByCid: (state) => (cid: string) => state.posts.filter(post => post.column === cid)
  }
})

export default store
