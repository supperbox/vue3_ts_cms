import exp from 'constants'
import hyRequest from '../../index'

/** 用户的网络请求 */
export function getUserListData(queryInfo: any = {}) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 新建用户角色
export function newUserData(userInfo: any = {}) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 修改用户角色
export function editUserData(id: number, dataInfo: any = {}) {
  return hyRequest.patch({
    url: `users/${id}`,
    data: dataInfo
  })
}

/** 获取部门的信息 */
export function getDepartmentData(queryInfo: any = {}) {
  return hyRequest.post({
    url: '/department/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any = {}) {
  return hyRequest.post({
    url: '/role/list',
    data: queryInfo
  })
}

// 获取菜单信息
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}

// 动态查询（列表）
export function getPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

// 动态查询（单个）
export function getPageData(pageName: string, id: number, queryInfo: any) {
  return hyRequest.get({
    url: `/${pageName}/${id}`
  })
}

// 动态增加
export function newPageData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: queryInfo
  })
}
// 动态删除
export function deletePageData(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 动态改动
export function editPageData(pageName: string, id: number, queryInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: queryInfo
  })
}
