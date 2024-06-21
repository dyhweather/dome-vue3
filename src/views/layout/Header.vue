<template>
  <div class="head">
    <div class="title" @click="goHome">后台管理系统</div>
    <a-dropdown>
      <div>
        欢迎，小华
        <DownOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item> 账号管理 </a-menu-item>
          <a-menu-item> 退出登录 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('./')
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  color: #fff;
  justify-content: space-between;
  margin: 0 -20px;
  .title {
    font-size: 22px;
    letter-spacing: 6px;
    cursor: pointer;
  }
}
</style>
