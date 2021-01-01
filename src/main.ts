import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/vuex/store/store'
import { setConf } from '@/conf/AxiosInterceptors'
setConf()
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
