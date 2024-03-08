<template>
  <a-menu-item v-if="!item.children" :key="item.path">
    <template #icon><component :is="item.meta.icon"/></template>
    {{ item.meta.title }}
  </a-menu-item>
  <a-sub-menu v-if="item.children" :key="item.path">
    <template #icon><component :is="item.meta.icon"/></template>
    <template #title>{{ item.meta.title }}</template>
    <template v-for="subItem in item.children" :key="subItem.path">
      <MenuItem :item="subItem"></MenuItem>
    </template>
  </a-sub-menu>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { onMounted } from 'vue'
const props = defineProps({
  item: {
    type: Object
  }
})
onMounted(() => {
  props.item
  console.log("🚀 ~ file: MenuItem.vue:30 ~ onMounted ~ props.item:", props.item)
})
  

</script>

<style lang="less" scoped>

</style>