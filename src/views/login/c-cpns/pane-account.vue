<template>
  <div>
    <el-form :model="account" :rules="rules" status-icon ref="formRef">
      <el-form-item label="帐号" label-width="60px" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" label-width="60px" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

// 定义数据
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 定义校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    // { min: 6, max: 20, message: '必须是6到20位', trigger: 'change' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6到20位的数字和字母',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6到20位的数字和字母',
      trigger: 'change'
    }
  ]
}

//登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

//  向外暴露两种功能 1、校验  2、登录
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取账号密码
      const name = account.name
      const password = account.password
      // 进行登录操作
      loginStore.loginAccountAction({ name, password }).then(() => {
        //记住密码
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
      })
    } else {
      // 需要引入样式
      ElMessage.error('格式不正确')
    }
  })
}

// 暴露函数
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
