<template>
  <div class="dashboard">Vue 学习</div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'

const name = ref('jlw')

watch(name, (val, oldVal, fn) => {
  fn(() => {
    console.log(val + oldVal)
  })
  console.log(val)
  console.log(oldVal)
})

name.value = 'ghl'
name.value = '111'
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
