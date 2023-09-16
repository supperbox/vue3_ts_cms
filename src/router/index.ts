import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import {
  createRouter,
  createWebHashHistory
  // type RouteRecordRaw
} from 'vue-router'
import { firstRoute, mapMenusToRoutes } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/notFound.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
      // children: mainRoutes
    }
  ]
})

//添加动态路由
export function getRoutesByMenu(menus: any) {
  const routes = mapMenusToRoutes(menus)
  console.log('角色所有的路由:', routes)

  routes.forEach((route) => {
    router.addRoute('main', route)
  })
}

// 导航守卫
// 参数 to 目标路由 from 来源路由（当下路由）
// 返回值 最终跳转的路由
router.beforeEach((to) => {
  // 只有登录成功才可以进入main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path != '/login' && !token) {
    // 刷新后 更新路由
    return '/login'
  }
  if (to.path === '/main') {
    return firstRoute?.url
  }
})

export default router
