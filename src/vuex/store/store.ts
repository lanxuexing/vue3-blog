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
    fetchColumns (ctx) {
      axios.get('/api/columns').then(resp => {
        ctx.commit('fetchColumns', resp.data)
      })
    },
    featchColumn ({ commit }, cid) {
      axios.get(`/api/columns/${cid}`).then(resp => {
        commit('featchColumn', resp.data)
      })
    },
    featchPosts ({ commit }, cid) {
      axios.get(`/api/columns/${cid}/posts`).then(resp => {
        commit('featchPosts', resp.data)
      })
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
