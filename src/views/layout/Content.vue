<template>
  <div class="content">
    <a-breadcrumb :routes="routes[0].children" class="breadcrumb">
      <template #itemRender="{ route, paths }">
        {{ route?.meta?.title }}
        <!-- <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route?.meta?.title }}
        </span> -->
        <!-- <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route?.meta?.title }}
        </router-link> -->
      </template>
     <!--  <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item> -->
    </a-breadcrumb>
    <div class="main">
      <RouterView />
    </div>
  </div>
  
</template>

<script setup>
import { routes } from '../../router/index'

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