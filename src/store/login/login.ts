import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserById,
  getUserMenus
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuToPersssions } from '@/utils/map-menus'
import router, { getRoutesByMenu } from '@/router'
// 引入常量
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? { role: { id: 1 } },
    userMenus: localCache.getCache('userMenus') ?? '',
    permissions: localCache.getCache('permissions') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const { id, token } = loginResult.data
      this.token = token

      // 保存在cache中,这一步至关重要,网络请求需要拿到token
      localCache.setCache(LOGIN_TOKEN, token)

      // 1、获取用户id
      const userInfoResult = await getUserById(id)
      this.userInfo = userInfoResult.data

      // 2、根据用户的角色请求对应的权限，也就是菜单信息 (/role/id/menu)
      const menus = await getUserMenus(this.userInfo.role.id)
      this.userMenus = menus.data

      // 3、获取所有数据（个人和部门信息）
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()

      // 4、保存权限信息
      const permissions = mapMenuToPersssions(this.userMenus)
      this.permissions = permissions

      // 5、本地缓存数据
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache('userInfo', userInfoResult.data)
      localCache.setCache('userMenus', menus.data)
      localCache.setCache('permissions', this.permissions)

      // 6、登录时候添加动态路由
      getRoutesByMenu(this.userMenus)

      // 跳转到主页
      router.push('./main')
    },

    // 刷新时的操作，已整合入app.use(store)函数内
    loadLocalCacheAction() {
      // 刷新时候注册路由组件
      if (this.token && this.userInfo && this.userMenus) {
        getRoutesByMenu(this.userMenus)
      }
      // 刷新时重新获取数据
      const mainStore = useMainStore()
      mainStore.getEntireDataAction()
    }
  }
})

export default useLoginStore
