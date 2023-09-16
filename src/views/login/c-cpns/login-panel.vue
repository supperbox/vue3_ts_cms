<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <!-- V-model绑定选择tab的名字 -->
      <el-tabs v-model="activeName" type="border-card" stretch="true">
        <!-- pane中的name会赋值给activeName -->
        <el-tab-pane name="account">
          <!-- 标题内容插槽 -->
          <template #label>
            <span class="icon">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </span>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="icon">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </span>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control-account">
      <el-checkbox v-model="isRemPwd" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="loginClick"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

const activeName = ref('account')

//以组件为模板 构造类型实例 获取到账号密码登录模块组件的类型
const accountRef = ref<InstanceType<typeof paneAccount>>()

// 实现功能 根据不同的tab选项 进行不同的登录方式
function loginClick() {
  if (activeName.value === 'account') {
    console.log('账号登录')
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
