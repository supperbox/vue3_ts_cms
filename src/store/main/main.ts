import {
  getDepartmentData,
  getEntireMenus,
  getRoleData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    // 获取所有的数据：部门信息、角色信息
    async getEntireDataAction() {
      const roles = await getRoleData()
      const department = await getDepartmentData()
      const menus = await getEntireMenus()

      this.entireRoles = roles.data.list
      this.entireDepartments = department.data.list
      this.entireMenus = menus.data.list
    }
  }
})

export default useMainStore
