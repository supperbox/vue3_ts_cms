<template>
  <div class="overview">
    <p>Vue学习</p>
    <p>{{ name }}</p>
    <childComponent></childComponent>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import childComponent from './childCom.vue'

export default {
  setup() {
    const name = ref('jlw')

    return { name }
  },
  components: {
    childComponent
  }
}
</script>

<style lang="less" scoped>
.overview {
}
</style>
