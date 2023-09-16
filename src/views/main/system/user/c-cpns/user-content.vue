<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="120"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="120"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="180"
        />
        <el-table-column align="center" prop="enable" label="状态" width="120">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="EditPen"
              link
              @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              link
              @click="handleDeleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="sizes, prev, pager, next, jumper,total "
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
// 首次调用首页用户数据
getUsersData()
const usersList = storeToRefs(systemStore).usersList

function getUsersData(formData: any = {}) {
  // 1、获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 2、拼凑查询参数
  const queryInfo = { size, offset, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

function handleSizeChange() {
  getUsersData()
}
function handleCurrentChange() {
  getUsersData()
}

defineExpose({ getUsersData })

// 删除数据功能 删除完之后重新请求
function handleDeleteClick(id: number) {
  console.log('删除操作', id)
  systemStore.deleteUserAction(id)
  // getUsersData()
}

// 新建用户功能
function handleNewUserClick() {
  emit('newClick')
}

// 编辑用户功能
function handleEditClick(obj: any) {
  emit('editClick', obj)
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
}

.table {
  // padding: 10px;
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
