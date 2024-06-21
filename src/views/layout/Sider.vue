<template>
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" @click="handleClick">
    <template v-for="item in routes[0].children" :key="item.path">
      <MenuItem :item="item" />
    </template>
  </a-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '../../router'
import MenuItem from './MenuItem.vue'

const router = useRouter()
const selectedKeys = ref(['/home'])
const handleClick = ({ key, keyPath }) => {
  console.log('🚀 ~ file: Sider.vue:60 ~ handleClick ~ e:', key, keyPath)
  router.push(key)
}
</script>

<style lang="less" scoped></style>
