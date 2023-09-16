<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '修改用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="" v-model="formData.realname"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder=""
              v-model="formData.cellphone"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder=""
              v-model="formData.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="department">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            {{ isNewRef ? '确认新建' : '确认修改' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editDataRef = ref()
const systemStore = useSystemStore()
const mainStore = useMainStore()
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  departmentId: '',
  roleId: ''
})
// 获取角色和部门数据
const { entireDepartments, entireRoles } = storeToRefs(mainStore)

// 控制弹窗显示
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  // 保存待编辑数据
  editDataRef.value = isNew ? null : itemData
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      // 赋值待编辑数据
      formData[key] = itemData[key]
    }
  }
}
defineExpose({ setModalVisible })

// 确定操作
function handleConfirmClick() {
  dialogVisible.value = false
  if (isNewRef.value) {
    systemStore.createNewUserAction(formData)
  } else {
    systemStore.editUserAction(editDataRef.value.id, formData)
  }
}
</script>

<style lang="less" scoped>
.modal {
  .form {
    padding: 0 20px 0 0;
  }
}
</style>
