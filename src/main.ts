import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/vuex/store/store'
import { setAxiosInterceptorConf } from '@/conf/interceptors'

setAxiosInterceptorConf()
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
