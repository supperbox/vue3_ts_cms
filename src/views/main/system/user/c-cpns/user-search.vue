<template>
  <div class="search">
    <el-form size="large" ref="formRef" :model="searchForm" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="realname" label-width="100px">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone" label-width="100px">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择状态" prop="enable" label-width="100px">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="createAt" label-width="100px">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button
        icon="Refresh"
        type="primary"
        size="large"
        @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        icon="search"
        type="primary"
        size="large"
        @click="handleSearchClick"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

const formRef = ref<InstanceType<typeof ElForm>>()

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

const emit = defineEmits(['searchClick', 'resetClick'])

// 重置操作
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleSearchClick() {
  emit('searchClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: white;
  margin-bottom: 20px;
  .el-form-item {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 30px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 20px 20px 0;
}
</style>
