<template>
  <div class="user">
    <UserSearch
      @search-click="handleSearchClick"
      @reset-click="handleResetClick"
    ></UserSearch>
    <UserContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></UserContent>
    <UserModal ref="modalRef"></UserModal>
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserSearch from './c-cpns//user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

function handleSearchClick(formData: any) {
  contentRef.value?.getUsersData(formData)
}

// 重置后发送一次网络请求
function handleResetClick() {
  contentRef.value?.getUsersData()
}

function handleNewClick() {
  // 使弹框可见
  modalRef.value?.setModalVisible()
}

// 编辑用户信息
function handleEditClick(obj: any) {
  // 按编辑状态打开弹框
  modalRef.value?.setModalVisible(false, obj)
}
</script>

<style lang="less" scoped></style>
