import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/components/column/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/vuex/store/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // 路由元数据meta：https://next.router.vuejs.org/guide/advanced/meta.html#route-meta-fields
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    }
  ]
})

// 全局前置守卫：https://next.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
