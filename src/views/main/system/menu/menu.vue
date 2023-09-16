<template>
  <div class="name">
    <pageContent :content-config="contentConfig"> </pageContent>
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped></style>
