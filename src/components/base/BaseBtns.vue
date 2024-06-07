<template>
  <template v-for="(btn, index) in btnItems" :key="index">
    <template v-if="!btn.code || isShowBtn(btn.code)">
      <a-dropdown v-if="btn.type === '1'">
        <template #overlay>
          <a-menu @click="btn.fun">
            <a-menu-item key="1">导出当前页</a-menu-item>
            <a-menu-item key="-1">导出全部</a-menu-item>
          </a-menu>
        </template>
        <a-button class="mr8" type="primary" v-bind="btn.props">
          {{ btn.name }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-button v-else class="mr8" type="primary" v-bind="btn.props" @click="btn.fun">{{
        btn.name
      }}</a-button>
    </template>
  </template>
</template>

<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { useGetBtns } from '@/hooks/useGetBtns'

defineProps({
  btnItems: {
    type: Array,
    default: () => []
  }
})
const isShowBtn = useGetBtns()
</script>

<style lang="less" scoped></style>
