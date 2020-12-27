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
        console.log('🎄', resp)
        ctx.commit('fetchColumns', resp.data)
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
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c._id.length > 20).length
    },
    getColumnById: (state) => (id: string) => state.columns.find(c => c._id === id),
    getPostsByCid: (state) => (cid: number) => state.posts.filter(post => post.columnId === cid)
  }
})

export default store
