<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in crumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login'
import { mapPathToCrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menus = useLoginStore().userMenus
const crumbs = computed(() => {
  return mapPathToCrumbs(route.path, menus)
})
</script>

<style lang="less" scoped></style>
