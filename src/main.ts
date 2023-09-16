import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/index.less'
import store from './store'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import registerIcons from './global/register-icons'

// 全局注册 element-plus
// import ElementPlus from 'element-plus'

// 1、引入全局样式 (在template之外的组件需要样式)
// import 'element-plus/dist/index.css'
// 2、局部引入el-message
import 'element-plus/theme-chalk/el-message.css'
// 3、插件引入
// 见思维导图

const app = createApp(App)
// 全局注册图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
// 在store组件注册时,同时加载缓存
app.use(store)
app.use(router)
app.use(registerIcons)
// app.use(ElementPlus)

app.mount('#app')
