<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" :width="isFold ? '64px' : '210px'">
        <MainMenu :is-fold="isFold"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="changeAside"></MainHeader>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
function changeAside(val: boolean) {
  isFold.value = val
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;
  width: 100%;
  .aside {
    background-color: aqua;
    transition: width 0.5s ease;
  }

  .el-header {
    background-color: bisque;
  }

  .el-main {
    background-color: rgb(250, 248, 247);
  }
}
</style>
