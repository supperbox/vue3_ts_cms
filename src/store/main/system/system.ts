import {
  deleteUserById,
  editUserData,
  getUserListData,
  newUserData,
  getPageListData,
  deletePageData,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
  pageList: number
  pageTotalCount: number
}

// 系统中的不同数据的增删改查
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: 0,
    pageTotalCount: 0
  }),
  actions: {
    // 针对系统中用户管理的增删改查
    async createNewUserAction(userInfo: any) {
      const createResult = await newUserData(userInfo)
      console.log(createResult)
      this.postUsersListAction()
    },

    async deleteUserAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 再次发送网络请求，待考虑（是否要保留删除前的位置）
      this.postUsersListAction()
    },

    async editUserAction(id: number, userInfo: any = {}) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      // 编辑之后请求一次数据
      this.postUsersListAction()
    },

    // 查询用户数据
    async postUsersListAction(queryInfo = {}) {
      const usersListResult = await getUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },

    // 对于不同页面数据的增删改查
    async getPageListDataAction(pageName: string, queryInfo: any) {
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataAction(pageName: string, id: number) {
      const res = await deletePageData(pageName, id)
      // 刷新
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageData: any) {
      const res = await newPageData(pageName, pageData)
      // 刷新
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageData: any) {
      const res = await editPageData(pageName, id, pageData)
      // 刷新
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
