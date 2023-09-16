import hyRequest from '../index'

import type { IAccount } from '@/types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: LoginAPI.UserInfo + id
  })
}

export function getUserMenus(id: number) {
  return hyRequest.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
