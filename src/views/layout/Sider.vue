<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @click="handleClick"
  >
    <template v-for="item in routes[0].children" :key="item.path">
      <MenuItem :item="item" />
    </template>
  </a-menu>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { routes } from '../../router'
  import MenuItem from './MenuItem.vue';
  console.log(22, routes);
  const router = useRouter()
  const route = useRoute()
  console.log(1, router, route);
  const selectedKeys = ref(['/home']);
  const openKeys = ref(['sub1']);
  const handleClick = ({ key, keyPath }) => {
    console.log("🚀 ~ file: Sider.vue:60 ~ handleClick ~ e:", key, keyPath)
    router.push(key)
  }
  

</script>

<style lang="less" scoped>

</style>