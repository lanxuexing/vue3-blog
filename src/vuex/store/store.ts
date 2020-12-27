import { createStore } from 'vuex'
import { testData, testPosts, testUser } from '@/model/MockData'
import { GlobalDataProps } from '@/model/DataProps'

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: testUser
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'muziyu' }
    }
  }
})

export default store
