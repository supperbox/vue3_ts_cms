<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

// element国际化注入
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
