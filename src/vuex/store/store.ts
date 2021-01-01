import { createStore } from 'vuex'
import axios from 'axios'
import { testData, testPosts, testUser } from '@/model/MockData'
import { GlobalDataProps } from '@/model/DataProps'

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: testUser
  },
  actions: {
    async fetchColumns ({ commit }) {
      const { data } = await axios.get('/api/columns')
      commit('fetchColumns', data)
    },
    async featchColumn ({ commit }, cid) {
      const { data } = await axios.get(`/api/columns/${cid}`)
      commit('featchColumn', data)
    },
    async featchPosts ({ commit }, cid) {
      const { data } = await axios.get(`/api/columns/${cid}/posts`)
      commit('featchPosts', data)
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
