<template>
  <div class="content">
    <a-breadcrumb :routes="currentRoute" class="breadcrumb">
      <template v-for="(item, index) in breadList" :key="index">
        <a-breadcrumb-item>{{ item.meta.title }}</a-breadcrumb-item>
      </template>
    </a-breadcrumb>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = ref([])
const breadList = ref([])

watch(
  () => route.path,
  () => {
    breadList.value = route.matched.filter((item) => item.meta && item.meta.title)
  },
  {
    immediate: true
  }
)
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  padding: 20px 30px;
  .breadcrumb {
    margin-bottom: 15px;
  }
  .main {
    background-color: #fff;
    height: calc(100% - 37px);
  }
}
</style>
