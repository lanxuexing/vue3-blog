import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/vuex/store/store'

// 测试前段跨域代码
import axios from 'axios'
axios.get('/api/columns?currentPage=1&pageSize=5').then(res => {
  console.log(res.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
