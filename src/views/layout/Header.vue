<template>
  <a-typography-title :level="2" class="title" @click="goHome">后台管理系统</a-typography-title>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goHome = () => {
    router.push('./')
  }
</script>

<style lang="less" scoped>
  .title {
    margin-left: -20px;
    margin-top: 12px;
    color: #fff;
    cursor: pointer
  }
</style>