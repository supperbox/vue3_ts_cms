<template>
  <div class="name">{{ name }}</div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue'

export default {
  props: {
    name: String
  },

  setup(props, { expose }) {
    const { name } = toRefs(props)
    const val = ref(1)
    const count = () => val.value++
    const countB = computed({
      get: () => val.value + 1,
      set: (value) => {
        val.value += value
      }
    })

    expose({
      count
    })

    countB.value = 1
    console.log(val.value)
    return name
  }
}
</script>

<style lang="less" scoped>
.name {
}
</style>
