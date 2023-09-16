import type { RouteRecordRaw } from 'vue-router'

// 获取到本地文件中所有的注册路由文件
function getLocalRoutes() {
  const mainRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    mainRoutes.push(module.default)
  }
  return mainRoutes
}

export let firstRoute: any = null

// 根据菜单注册对应路由
export function mapMenusToRoutes(menus: any) {
  const mainRoutes = getLocalRoutes()
  const routes: RouteRecordRaw[] = []
  // 拿到菜单对象进行遍历
  for (const menu of menus) {
    for (const submenu of menu.children) {
      // 找到菜单对象中含有的页面以及其对应的路由
      const route = mainRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          // 手动注册一级路由 重定向到第一个子路由页面
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 拿到第一个匹配的路由
      if (!firstRoute && route) firstRoute = submenu
    }
  }
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToCrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

export function mapMenuToIds(menus: any[]) {
  const ids: number[] = []
  function _recurseGetId(menusList: any[]) {
    for (const menu of menusList) {
      if (menu.children) {
        _recurseGetId(menu.children)
      } else {
        ids.push(menu.id)
      }
    }
  }
  _recurseGetId(menus)
  return ids
}

export function mapMenuToPersssions(menus: any[]) {
  const permissions: string[] = []
  function _recurseGetPermission(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(menus)
  return permissions
}
