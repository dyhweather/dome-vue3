<template>
  <a-layout class="layout">
    <a-layout-header><Header /></a-layout-header>
    <a-layout>
      <a-layout-sider collapsible><Sider /></a-layout-sider>
      <a-layout-content><Content /></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Sider from './Sider.vue'
import Header from './Header.vue'
import Content from './Content.vue'

</script>

<style lang="less" scoped>
  .layout { 
    height: 100%;
  }
</style>