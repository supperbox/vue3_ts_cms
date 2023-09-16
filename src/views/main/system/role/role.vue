<template>
  <div class="name">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-data-click="handleEditDataClick"
      @new-data-click="handleNewDataClick"
    ></pageContent>
    <pageModal
      :modal-config="modalConfig"
      ref="modalRef"
      :other-info="otherInfo"
    >
      <template v-slot:menulist="treeData">
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleEltreeCheck"
        />
        <!-- :default-checked-keys="getMenus(treeData.data.menuList)" -->
      </template>
    </pageModal>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import type { ElTree } from 'element-plus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewDataClick, handleEditDataClick } =
  usePageModal(editGetIds)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
function handleEltreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 方法1：使用作用域插槽，在modal组件处获取编辑时需要的数据（包括 权限数据）
function getMenus(data = []) {
  let menus: any = []
  function getId(arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        getId(item.children)
      } else {
        menus.push(item.id)
      }
    })
  }
  getId(data)
  console.log(menus)
  return menus
}

// 方法2：使用回调函数，在编辑按钮处触发回调获取数据
const treeRef = ref<InstanceType<typeof ElTree>>()
function editGetIds(data: any) {
  let menus: number[] = []
  function getId(arr: any = []) {
    arr.forEach((item: any) => {
      if (item.children) {
        getId(item.children)
      } else {
        menus.push(item.id)
      }
    })
  }
  getId(data.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menus)
  })
}
</script>

<style lang="less" scoped></style>
